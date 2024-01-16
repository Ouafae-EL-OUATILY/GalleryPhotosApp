const express = require('express');
const router = express.Router();
const galleyController = require('../controllers/GalleryController');

// Create a new galley
router.post('/', galleyController.createGallery);

// Get all galleys
router.get('/', galleyController.getAllGallerys);

//update a galley
router.put('/:id', galleyController.updateGallery);

//delete a galley
router.delete('/gallery/id:',galleyController.deleteGallery);

module.exports = router;
