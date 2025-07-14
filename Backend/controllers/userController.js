const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");


exports.addUser = async (req, res) => {
        try {
                const { name } = req.body;
                if (!name) return res.status(400).json({ msg: "Name is required" });

                const user = new User({ name });
                await user.save();
                res.json(user);
                //     console.log("User added successfully:", user);
        } catch (err) {
                res.status(500).json({ error: err.message });
                //     console.error("Error adding user:", err);
        }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
        //     console.log("Fetched all users successfully:", users);
  } catch (err) {
    res.status(500).json({ error: err.message });
        //     console.error("Error fetching users:", err);
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