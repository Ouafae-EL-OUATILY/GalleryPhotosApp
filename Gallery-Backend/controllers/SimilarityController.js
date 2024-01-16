const Similarity = require('../models/SimilarityModel');

// Get all image entries for a user
const getSimilarityByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const image = await Similarity.find({ userId: userId });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update image
const EditSimilarity = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { SimSet } = req.body;
    const similar = await Similarity.findOne({"ImageId": imageId});
    SimSet.forEach((element, index) => {
      similar.SimilarSet[index].distance = element.distance

    })
    let sim = similar.SimilarSet.sort((a, b) => a.distance - b.distance);

    sim.forEach((obj)=>{
      console.log(obj.distance)
    })


    const updated = await Similarity.findByIdAndUpdate(similar._id, {"SimilarSet":sim})
    if (!updated) {
      return res.status(404).json({ message: 'Similarity entry not found' });
    }
    res.json(sim.slice(0,SimSet.length));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a image entry
const deleteSimilarity = async (req, res) => {
  try {
    const { imageId } = req.params;

    const deleted = await Similarity.findByIdAndDelete(imageId);

    if (!deleted) {
      return res.status(404).json({ message: 'Similarity  not found' });
    }

    res.json({ message: 'Similarity entry deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





module.exports = {
  getSimilarityByUser,
  deleteSimilarity,
  EditSimilarity
};
