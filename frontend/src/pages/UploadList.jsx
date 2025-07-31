import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadList = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [lists, setLists] = useState([]);

    const token = localStorage.getItem('token');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/lists/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(res.data.message || 'File uploaded and distributed!');
            setTimeout(() => {
                setMessage("");
            },3000);
            fetchDistributedLists();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Upload failed');
        }
    };

    const fetchDistributedLists = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/lists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLists(res.data);
        } catch (err) {
            console.error('Error fetching lists:', err.message);
        }
    };

    useEffect(() => {
        fetchDistributedLists();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload and Distribute CSV</h2>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded w-full sm:w-2/3"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Upload
                </button>
            </form>

            {message && (
                <p className="text-green-600 font-medium mb-4">{message}</p>
            )}

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Distributed Lists</h3>

                {lists.map((list, index) => {
                    const agent = list.agentId;
                    const agentName = agent?.name || 'Unknown Agent';
                    const agentEmail = agent?.email || 'N/A';
                    const agentMobile = agent?.mobile || 'N/A';

                    return (
                        <div key={index} className="bg-gray-50 border rounded-lg p-4 mb-6 shadow-sm">
                            <div className="mb-3">
                                <h4 className="text-lg font-semibold text-gray-800">Agent Details</h4>
                                <p className="text-gray-600">👤 {agentName}</p>
                                <p className="text-gray-600">📧 {agentEmail}</p>
                                <p className="text-gray-600">📱 {agentMobile}</p>
                            </div>

                            <ul className="list-disc ml-5 text-gray-700">
                                {Array.isArray(list.data) &&
                                    list.data.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="font-medium">{item.FirstName || item.name}</span> - {item.Phone || item.mobile} - {item.Notes || item.email}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UploadList;
