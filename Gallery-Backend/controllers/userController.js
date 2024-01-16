const User = require("../models/userModel");

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get User by id

const getUserbyId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserbyPass = async (req, res) => {
  try {
    const { password,email } = req.params;
    const user = await User.findOne({password:password,email:email});
    console.log("user",user)
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user_id, activity_type, post_id, comment_id } = req.body;

    const updated = await User.findByIdAndUpdate(
        userId,
        { user_id, activity_type, post_id, comment_id },
        { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User entry not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return res.status(404).json({ message: 'User  not found' });
    }

    res.json({ message: 'User entry deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





// Export the controller functions
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserbyId,
  getUserbyPass
};
