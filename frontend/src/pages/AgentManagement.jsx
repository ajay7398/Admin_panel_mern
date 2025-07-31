import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchAgents = async () => {
    try {
      const res = await axios.get('https://admin-panel-mern.onrender.com/api/agents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setMessage('');
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
     const res = await axios.post(
  'https://admin-panel-mern.onrender.com/api/agents',
  {
    ...formData,
    mobile: `${formData.countryCode}${formData.mobile}`, // Combine here
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMessage('Agent added successfully');
      setFormData({ name: '', email: '', mobile: '', password: '' });
      fetchAgents();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add agent');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-0 md:mt-10 p-4 md:border md:rounded md:shadow">
      <h2 className="text-xl font-semibold mb-4">Agent Management</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Agent Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
       <div className="flex gap-2">
  <select
    name="countryCode"
    value={formData.countryCode}
    onChange={handleChange}
    className="border p-2 rounded"
    required
  >
    <option value="+91">🇮🇳 +91 (India)</option>
    <option value="+977">🇳🇵 +977 (Nepal)</option>
    <option value="+1">🇺🇸 +1 (USA)</option>
    <option value="+44">🇬🇧 +44 (UK)</option>
    <option value="+61">🇦🇺 +61 (Australia)</option>
  </select>

  <input
    type="text"
    name="mobile"
    value={formData.mobile}
    placeholder="Mobile Number"
    onChange={handleChange}
    className="w-full border p-2 rounded"
    required
  />
</div>

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Agent
        </button>
      </form>

      {
        
                  message &&  <p className="mt-4 text-green-600 font-medium">{message}</p>
     

      }

      <h3 className="text-lg font-semibold mt-6 mb-2">All Agents</h3>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{agent.name}</td>
              <td className="p-2 border">{agent.email}</td>
              <td className="p-2 border">{agent.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentManagement;
