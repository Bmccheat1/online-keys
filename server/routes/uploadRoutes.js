const express = require('express');
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Memory storage — no filesystem writes, works on Vercel serverless AND local.
// The image is returned as a base64 data URL and stored inside MongoDB,
// so it survives on any platform (serverless FS is ephemeral).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG, PNG, WebP or GIF images are allowed'));
  },
});

// POST /api/upload — admin only
// Returns: { success, url: "data:image/png;base64,..." }
router.post('/', protect, adminOnly, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }
    const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    res.json({
      success: true,
      url: dataUrl,
      message: 'Image uploaded',
    });
  });
});

module.exports = router;
