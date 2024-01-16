const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



const userRoutes = require('./routes/UserRoutes');
const GalleryRoutes = require('./routes/galleryRoutes');
const ImageRoutes = require('./routes/ImageRoutes');
const ThemeRoutes = require('./routes/ThemeRoutes');
const SimilarityRoutes = require('./routes/SimilarityRoutes');




const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

dotenv.config({path: './config.env'});

//middleware
app.use(express.json());

// // Routes
app.use('/users', userRoutes);
app.use('/gallery', GalleryRoutes);
app.use('/theme', ThemeRoutes);
app.use('/image', ImageRoutes);
app.use('/similar',SimilarityRoutes)

// server
const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// Connect to MongoDB
const dataBase = process.env.DATABASE;
mongoose.connect(dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


