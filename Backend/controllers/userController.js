const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");


exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
     console.log("User added successfully:", newUser);
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
    console.error("Error adding user:", error.message);
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json(users);
    console.log("Fetched all users successfully:", users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
    console.error("Error fetching users:", error.message);
  }
};



exports.claimPoints = async (req, res) => {
  try {
    const userId = req.params.id;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
//   console.log("User found:", user);
    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({
      userId,
      points: randomPoints
    });
    await history.save();

    res.json({ user, history });
        //     console.log("Points claimed successfully:", { user, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
        //     console.error("Error claiming points:", err);
  }
};