import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className=" mx-auto w-[90%] md:max-w-[60%] mt-10 p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => navigate('/upload')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload & Distribute List
        </button>

        <button
          onClick={() => navigate('/agents')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Manage Agents
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
