const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ThemeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  mutation:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Image',
  }],
  dominant:[[]],
  Histogram:{Red:[],Green:[],Blue:[]},
  moment:{
    l_mean:{},l_std:{},l_skew:{} , l_kurtosis:{} ,
    a_mean:{}, a_std:{}, a_skew:{} , a_kurtosis:{} ,
    b_mean: {}, b_std:{} , b_skew:{}, b_kurtosis:{}
  },
  tamura:{
    contrast :{},
    coarseness:{},
    regularity:{},
    roughness:{}
  },
  gabor:[]
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
