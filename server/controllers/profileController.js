const { Profile, User } = require("../models");

// Create or update profile
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [profile, created] = await Profile.upsert({ ...req.body, userId }, { returning: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to save profile" });
  }
};

// Get profile by user
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.params.userId } });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
