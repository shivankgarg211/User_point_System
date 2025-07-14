const mongoose = require('mongoose');
const User = require('../models/User');
const ClaimHistory = require("../models/ClaimHistory");

// Function to calculate ranks based on totalPoints
const calculateRanks = async () => {
  const users = await User.find().sort({ totalPoints: -1 });
  const rankings = {};
  users.forEach((user, index) => {
    rankings[user._id.toString()] = index + 1;
  });
  return rankings;
};

// POST /api/claim
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
   return res.status(400).json({ message: "User ID is required" });


    }

    // Generate random points (1-10)
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    // Save claim history
    const history = new ClaimHistory({
      userId,
      pointsClaimed: points,
    });
    await history.save();



    // Get rank after update
    const rankings = await calculateRanks();
    const rank = rankings[user._id.toString()];

    res.status(200).json({
      message: "Points claimed successfully",
      user,
      pointsClaimed: points,
      currentRank: rank,
    });
  } catch (error) {
    console.error("Error in claimPoints", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET /api/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};

// GET /api/history/:userId
const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching claim history", error });
  }
};

module.exports = {
  claimPoints,
  getLeaderboard,
  getUserHistory,
};
