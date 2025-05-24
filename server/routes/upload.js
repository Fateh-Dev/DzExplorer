const express = require("express");
const upload = require("../config/storage");
const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    console.log("File received:", req.file);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    res.json({
      url: req.file.path,
      public_id: req.file.filename
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error uploading file" });
  }
});

module.exports = router;
