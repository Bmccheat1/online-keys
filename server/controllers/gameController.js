const { Game } = require('../models');

// @desc    Get all games
// @route   GET /api/games
const getGames = async (req, res, next) => {
  try {
    const { active } = req.query;
    const filter = {};
    if (active === 'true') filter.isActive = true;

    const games = await Game.find(filter).sort({ name: 1 });
    
    res.json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single game
// @route   GET /api/games/:id
const getGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404);
      throw new Error('Game not found');
    }
    res.json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Create game
// @route   POST /api/games
const createGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
const updateGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      res.status(404);
      throw new Error('Game not found');
    }
    res.json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
const deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      res.status(404);
      throw new Error('Game not found');
    }
    res.json({ success: true, message: 'Game removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getGames, getGame, createGame, updateGame, deleteGame };