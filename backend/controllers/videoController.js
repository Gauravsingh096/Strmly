const Video = require('../models/Video');
const User = require('../models/User');

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newVideo = new Video({
      title,
      description,
      filePath: req.file.path,
      uploader: req.user.id
    });

    const video = await newVideo.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort('-createdAt')
      .populate('uploader', 'name');

    res.json(videos.map(video => ({
      id: video._id,
      title: video.title,
      description: video.description,
      url: `${req.protocol}://${req.get('host')}/${video.filePath}`,
      uploader: video.uploader.name,
      createdAt: video.createdAt
    })));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};