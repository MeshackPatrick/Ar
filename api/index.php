<?php
header('Content-Type: application/json');
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

$endpoint = $uri[1] ?? '';

switch ($method) {
    case 'GET':
        if ($endpoint === 'projects') {
            getProjects();
        } elseif ($endpoint === 'targets') {
            getTargets();
        }
        break;
    
    case 'POST':
        if ($endpoint === 'projects') {
            createProject();
        } elseif ($endpoint === 'targets') {
            createTarget();
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getProjects() {
    $conn = connectDB();
    $result = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
    $projects = [];
    
    while ($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }
    
    echo json_encode($projects);
    $conn->close();
}

function getTargets() {
    $conn = connectDB();
    $result = $conn->query("SELECT * FROM targets");
    $targets = [];
    
    while ($row = $result->fetch_assoc()) {
        $targets[] = $row;
    }
    
    echo json_encode($targets);
    $conn->close();
}

function createProject() {
    $data = json_decode(file_get_contents('php://input'), true);
    $conn = connectDB();
    
    $stmt = $conn->prepare("INSERT INTO projects (id, name, description) VALUES (?, ?, ?)");
    $id = uniqid();
    $stmt->bind_param("sss", $id, $data['name'], $data['description']);
    
    if ($stmt->execute()) {
        echo json_encode(['id' => $id, 'message' => 'Project created']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create project']);
    }
    
    $stmt->close();
    $conn->close();
}

function createTarget() {
    if (!isset($_FILES['image']) || !isset($_FILES['model'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing files']);
        return;
    }
    
    $imageFile = $_FILES['image'];
    $modelFile = $_FILES['model'];
    
    // Validate files
    if (!in_array($imageFile['type'], ALLOWED_IMAGE_TYPES) ||
        !in_array($modelFile['type'], ALLOWED_MODEL_TYPES)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type']);
        return;
    }
    
    // Process uploads
    $imagePath = processUpload($imageFile, 'images/');
    $modelPath = processUpload($modelFile, 'models/');
    
    if (!$imagePath || !$modelPath) {
        http_response_code(500);
        echo json_encode(['error' => 'Upload failed']);
        return;
    }
    
    // Save to database
    $conn = connectDB();
    $stmt = $conn->prepare("INSERT INTO targets (id, project_id, image_url, model_url) VALUES (?, ?, ?, ?)");
    $id = uniqid();
    $projectId = $_POST['project_id'];
    
    $stmt->bind_param("ssss", $id, $projectId, $imagePath, $modelPath);
    
    if ($stmt->execute()) {
        echo json_encode([
            'id' => $id,
            'image_url' => $imagePath,
            'model_url' => $modelPath
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save target']);
    }
    
    $stmt->close();
    $conn->close();
}

function processUpload($file, $subdir) {
    $targetDir = UPLOAD_PATH . $subdir;
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $targetDir . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return $subdir . $fileName;
    }
    return false;
}