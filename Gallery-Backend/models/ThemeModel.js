const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  insideTheme: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: false,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;
