const express = require('express');
const router = express.Router();
const SimilarityController = require('../controllers/SimilarityController');

// Get all image  for a user
router.get('/users/:userId', SimilarityController.getSimilarityByUser);

// Update image
router.put('/:imageId', SimilarityController.EditSimilarity);

// Delete a image
router.delete('/:imageId', SimilarityController.deleteSimilarity);

module.exports = router;
