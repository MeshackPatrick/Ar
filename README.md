w# React AR Image Target Viewer

## Overview
This application allows users to view 3D models in augmented reality by scanning image targets. The app supports both Android and iOS devices through web browsers with AR capabilities.

## Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git
- Web server with cPanel access
- Modern web browser with WebXR support
- Camera-enabled mobile device

## Project Setup

### 1. Local Development Setup
```bash
# Clone the repository
git clone <your-repository-url>
cd react-ar-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Database Setup (Using MySQL in cPanel)

1. Log in to your cPanel account
2. Navigate to MySQL Databases
3. Create a new database:
   - Database name: `ar_projects`
   - Create new user with privileges
   - Note down credentials

4. Create the following tables:
```sql
CREATE TABLE projects (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE targets (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36),
    image_url VARCHAR(512) NOT NULL,
    model_url VARCHAR(512) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### 3. File Storage Setup (cPanel)

1. Create directory structure in cPanel File Manager:
```
public_html/
├── ar-assets/
│   ├── images/
│   └── models/
├── api/
└── .htaccess
```

2. Configure .htaccess:
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>
```

### 4. Environment Configuration

Create `.env` file:
```env
VITE_API_BASE_URL=https://your-domain.com/api
VITE_ASSETS_URL=https://your-domain.com/ar-assets
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=ar_projects
```

## Usage Guide

### 1. Admin Panel
1. Access `/admin` route
2. Log in with admin credentials
3. Upload new projects:
   - Project name & description
   - Image target (JPG/PNG, max 5MB)
   - 3D model (GLB format, max 50MB)

### 2. Viewing AR Content
1. Visit the application on a mobile device
2. Select a project from the list
3. Allow camera access when prompted
4. Point camera at the image target
5. The 3D model will appear and animate

### 3. Supported Platforms
- iOS: Safari (iOS 12+)
- Android: Chrome (Android 8.0+)
- Desktop: Chrome, Edge (for testing)

## Development Guidelines

### 1. Adding New Features
1. Create feature branch
2. Implement changes
3. Test on multiple devices
4. Submit pull request

### 2. Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

### 3. Building for Production
```bash
# Build application
npm run build

# Preview production build
npm run preview
```

## Deployment

### 1. Build Project
```bash
npm run build
```

### 2. Upload to cPanel
1. Compress `dist` folder
2. Upload via File Manager
3. Extract to `public_html/ar-app`

### 3. Configure Server
1. Set up SSL certificate
2. Configure domain/subdomain
3. Update API endpoints

## Troubleshooting

### Common Issues
1. Camera Access
   - Ensure HTTPS is enabled
   - Check browser permissions

2. Model Loading
   - Verify model format (GLB)
   - Check file size limits
   - Confirm proper lighting

3. Database Connection
   - Verify credentials
   - Check server logs
   - Confirm MySQL user privileges

### Support
For technical support:
1. Check documentation
2. Submit issue on GitHub
3. Contact development team

## Security Considerations
1. Implement rate limiting
2. Validate file uploads
3. Sanitize database inputs
4. Use prepared statements
5. Enable CORS selectively

## Performance Optimization
1. Compress 3D models
2. Optimize image targets
3. Use CDN for assets
4. Enable browser caching
5. Implement lazy loading

## License
[Your License Type]

## Contributing
[Contribution Guidelines]# Ar
