const Theme = require('../models/ThemeModel');

// Create a new theme
const createTheme = async (req, res) => {
  try {
    // Create a new theme object using the Theme model
    const theme = new Theme(req.body);
    // Save the theme to the database
    const newTheme = await theme.save();
    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the theme' });
  }
};

// Get all themes
const getThemes = async (req, res) => {
  try {
    // Find all themes in the database
    const themes = await Theme.find();

    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch themes' });
  }
};
const getTheme = async (req, res) => {
  try {
    // Find all themes in the database
    const themes = await Theme.findById(req.params.id);

    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theme with id' + req.params.id  });
  }
};
const getUserThemes = async (req, res) => {
  try {
    // Find all themes in the database
    const themes = await Theme.find({userId:req.params.id});
    res.json(themes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch theme with id' + req.params.id  });
  }
};

const updateTheme = async (req, res) => {
  try {
    const { themeBody, image, userId } = req.body;
    const themeId = req.params.id;

    // Find the theme by ID in the database
    const theme = await Theme.findById(themeId);

    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    // Update the theme fields
    theme.themeBody = themeBody;
    theme.image = image;
    theme.userId = userId;

    // Save the updated theme to the database
    const updatedTheme = await theme.save();

    res.json(updatedTheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the theme' });
  }
};
// Delete a theme
const deleteTheme = async (req, res) => {
  try {
    const themeId = req.params.id;

    // Find the theme by ID in the database
    const theme = await Theme.findById(themeId);

    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }

    // Delete the theme from the database
    await theme.remove();

    res.json({ message: 'Theme deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the theme' });
  }
};


module.exports = {
  createTheme,
  getThemes,
  updateTheme,
  deleteTheme,
  getTheme,
  getUserThemes
};
