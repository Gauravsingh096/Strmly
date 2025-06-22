import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/videos');
                // const res = await axios.get('/api/videos');
                setVideos(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="feed-container">
            <h2>Video Feed</h2>

            {videos.length === 0 ? (
                <p>No videos available</p>
            ) : (
                <div className="video-grid">
                    {videos.map(video => (
                        <div key={video.id} className="video-card">
                            <video controls width="100%">
                                {/* <source src={video.url} type="video/mp4" /> */}
                                <source src={`http://localhost:5000/${video.filePath}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <div className="video-meta">
                                <span>By: {video.uploader}</span>
                                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Feed;