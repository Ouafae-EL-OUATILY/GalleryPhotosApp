const express = require('express');
const router = express.Router();
const themeController = require('../controllers/ThemeController');

router.route('/')
    .get( themeController.getThemes)
    .post(themeController.createTheme)

router.route('/:id')
    .get(themeController.getTheme)
    .put( themeController.updateTheme)
    .delete(themeController.deleteTheme)

router.route('/user/:id')
    .get(themeController.getUserThemes)


// Export the router
module.exports = router;
