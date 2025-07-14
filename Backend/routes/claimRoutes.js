const express = require("express");
const router = express.Router();
const {
  claimPoints,
  getLeaderboard,
  getUserHistory,
} = require("../controllers/claimController");

router.post("/claim", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history/:userId", getUserHistory);

module.exports = router;
