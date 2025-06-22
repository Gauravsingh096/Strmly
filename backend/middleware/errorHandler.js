const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      msg: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message) 
    });
  }
  
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ 
      msg: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }
  
  if (err.name === 'MulterError') {
    return res.status(400).json({ msg: err.message });
  }
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ msg: 'Invalid token' });
  }

  res.status(500).json({ msg: 'Server Error' });
};

module.exports = errorHandler;