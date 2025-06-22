import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!file) {
            setError('Please select a video file');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                //   const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            });

            setSuccess('Video uploaded successfully!');
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (err) {
            setError(err.response?.data?.msg || 'Upload failed');
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Video</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="video/mp4"
                    onChange={e => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Upload;