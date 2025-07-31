import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadList from './pages/UploadList';
import AgentManagement from './pages/AgentManagement';
import React from 'react';
function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/upload"
          element={isAuthenticated ? <UploadList /> : <Login />}
        />
        <Route
          path="/agents"
          element={isAuthenticated ? <AgentManagement /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
