const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Trade = require('../models/Trade');

// All routes below require authentication
router.use(auth);

// GET all trades with optional filtering (only for current user)
router.get('/', async (req, res) => {
    try {
        const { status, ticker, strategy, sortBy = 'entryDate', sortOrder = 'desc', limit } = req.query;
        const filter = { user: req.user.userId };
        if (status) filter.status = status;
        if (ticker) filter.ticker = { $regex: ticker.toUpperCase(), $options: 'i' };
        if (strategy) filter.strategy = strategy;
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        let query = Trade.find(filter).sort(sort);
        if (limit) query = query.limit(parseInt(limit));
        const trades = await query.exec();
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trades', error: error.message });
    }
});

// GET single trade by ID (only if owned by user)
router.get('/:id', async (req, res) => {
    try {
        const trade = await Trade.findOne({ _id: req.params.id, user: req.user.userId });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.json(trade);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trade', error: error.message });
    }
});

// POST create new trade (associate with user)
router.post('/', async (req, res) => {
    try {
        const tradeData = {
            ...req.body,
            ticker: req.body.ticker?.toUpperCase(),
            user: req.user.userId
        };
        const trade = new Trade(tradeData);
        const savedTrade = await trade.save();
        res.status(201).json(savedTrade);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        }
        res.status(500).json({ message: 'Error creating trade', error: error.message });
    }
});

// PUT update trade (only if owned by user)
router.put('/:id', async (req, res) => {
    try {
        const tradeData = { ...req.body };
        if (tradeData.ticker) {
            tradeData.ticker = tradeData.ticker.toUpperCase();
        }
        const trade = await Trade.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            tradeData,
            { new: true, runValidators: true }
        );
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.json(trade);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: error.message });
        }
        res.status(500).json({ message: 'Error updating trade', error: error.message });
    }
});

// DELETE trade (only if owned by user)
router.delete('/:id', async (req, res) => {
    try {
        const trade = await Trade.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.json({ message: 'Trade deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trade', error: error.message });
    }
});

// PATCH close trade (only if owned by user)
router.patch('/:id/close', async (req, res) => {
    try {
        const { exitPrice, exitDate } = req.body;
        const trade = await Trade.findOne({ _id: req.params.id, user: req.user.userId });
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        if (trade.status !== 'Open') {
            return res.status(400).json({ message: 'Trade is already closed' });
        }
        await trade.closeTrade(exitPrice, exitDate);
        res.json(trade);
    } catch (error) {
        res.status(500).json({ message: 'Error closing trade', error: error.message });
    }
});

// GET trade statistics (only for current user)
router.get('/stats/summary', async (req, res) => {
    try {
        const stats = await Trade.aggregate([
            { $match: { user: req.user.userId } },
            {
                $group: {
                    _id: null,
                    totalTrades: { $sum: 1 },
                    openTrades: { $sum: { $cond: [{ $eq: ['$status', 'Open'] }, 1, 0] } },
                    closedTrades: { $sum: { $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0] } },
                    totalProfitLoss: { $sum: '$profitLoss' },
                    avgProfitLoss: { $avg: '$profitLoss' }
                }
            }
        ]);
        res.json(stats[0] || { totalTrades: 0, openTrades: 0, closedTrades: 0, totalProfitLoss: 0, avgProfitLoss: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
});

// GET trades by status (only for current user)
router.get('/status/:status', async (req, res) => {
    try {
        const trades = await Trade.find({ user: req.user.userId, status: req.params.status }).sort({ entryDate: -1 });
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trades by status', error: error.message });
    }
});

// GET trades by ticker (only for current user)
router.get('/ticker/:ticker', async (req, res) => {
    try {
        const trades = await Trade.find({
            user: req.user.userId,
            ticker: { $regex: req.params.ticker.toUpperCase(), $options: 'i' }
        }).sort({ entryDate: -1 });
        res.json(trades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trades by ticker', error: error.message });
    }
});

module.exports = router; 