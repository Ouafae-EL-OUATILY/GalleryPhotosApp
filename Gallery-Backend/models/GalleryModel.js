const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
