const express = require('express');
const router = express.Router();
const {
  getGames, getGame, createGame, updateGame, deleteGame,
} = require('../controllers/gameController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/', protect, adminOnly, createGame);
router.put('/:id', protect, adminOnly, updateGame);
router.delete('/:id', protect, adminOnly, deleteGame);

module.exports = router;