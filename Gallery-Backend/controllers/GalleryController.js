const Gallery = require('../models/GalleryModel');

// Create a new gallery
const createGallery = async (req, res) => {
  try {

    const gallery = new Gallery(req.body);

    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all gallerys
const getAllGallerys = async (req, res) => {
  try {
    const gallerys = await Gallery.find();
    res.json(gallerys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a gallery
const updateGallery = async (req, res) => {
  try {
    const { text } = req.body;
    const galleryId = req.params.id;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    gallery.text = text;
    await gallery.save();

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a gallery
const deleteGallery = async (req, res) => {
  try {
    const galleryId = req.params.id;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    await gallery.remove();

    res.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions
module.exports = {
  createGallery,
  getAllGallerys,
  updateGallery,
  deleteGallery
};
