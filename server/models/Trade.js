const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    ticker: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    strategy: {
        type: String,
        required: true,
        enum: ['Iron Condor', 'Butterfly', 'Straddle', 'Strangle', 'Covered Call', 'Cash Secured Put', 'Other']
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Closed', 'Assigned', 'Rolled', 'Expired'],
        default: 'Open'
    },
    entryDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    exitDate: {
        type: Date,
        default: null
    },
    entryPrice: {
        type: Number,
        required: true
    },
    exitPrice: {
        type: Number,
        default: null
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    profitLoss: {
        type: Number,
        default: 0
    },
    roi: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    tags: [{
        type: String,
        trim: true
    }],
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    expirationDate: {
        type: Date,
        default: null
    },
    strikePrice: {
        type: Number,
        default: null
    },
    optionType: {
        type: String,
        enum: ['Call', 'Put', 'Stock', 'Other'],
        default: 'Other'
    }
}, {
    timestamps: true
});

// Index for better query performance
tradeSchema.index({ user: 1, ticker: 1, status: 1, entryDate: -1 });
tradeSchema.index({ status: 1, entryDate: -1 });

// Virtual for calculating days held
tradeSchema.virtual('daysHeld').get(function () {
    if (!this.exitDate) return null;
    const diffTime = Math.abs(this.exitDate - this.entryDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Method to close a trade
tradeSchema.methods.closeTrade = function (exitPrice, exitDate = new Date()) {
    this.status = 'Closed';
    this.exitPrice = exitPrice;
    this.exitDate = exitDate;
    this.profitLoss = (exitPrice - this.entryPrice) * this.quantity;
    return this.save();
};

// Static method to get trade statistics
tradeSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
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
    return stats[0] || { totalTrades: 0, openTrades: 0, closedTrades: 0, totalProfitLoss: 0, avgProfitLoss: 0 };
};

module.exports = mongoose.model('Trade', tradeSchema); 