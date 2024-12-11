import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import ARScene from './components/ar/ARScene';
import TargetList from './components/ui/TargetList';
import ErrorBoundary from './components/common/ErrorBoundary';
import { theme } from './config/theme';
import { useARStore } from './store/arStore';

function App() {
  const { selectedTarget } = useARStore();

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<TargetList />} />
            <Route 
              path="/ar" 
              element={
                selectedTarget ? (
                  <ARScene target={selectedTarget} />
                ) : (
                  <div className="p-4 text-center">Please select a target first</div>
                )
              } 
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;