const mongoose = require('mongoose');

const SimilaritySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  SimilarSet:[{
    ImgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: true,

    },distance:{
      type:Number,
      required: true,
    },
    src:{
      type:String,
      required: true,
    }

  }]
});

const Similarity = mongoose.model('Similarity', SimilaritySchema);

module.exports = Similarity;
