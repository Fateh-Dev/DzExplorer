const { Profile, User } = require("../models");

// Create or update profile
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, location, dateOfBirth, interests } = req.body;

    // Basic validation
    if (bio && bio.length > 500) {
      return res.status(400).json({ error: "Bio must be less than 500 characters" });
    }

    // Sanitize data
    const profileData = {
      userId,
      bio: bio?.trim() || null,
      location: location?.trim() || null,
      dateOfBirth: dateOfBirth || null,
      interests: interests || null
    };

    const [profile, created] = await Profile.upsert(profileData, {
      returning: true
    });

    res.json({
      ...profile.toJSON(),
      isNew: created
    });
  } catch (err) {
    console.error("Upsert profile error:", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
};

// Get profile by user ID
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await Profile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"]
        }
      ]
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Get authenticated user's profile
exports.getAuthenticatedProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"]
        }
      ]
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Get my profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
