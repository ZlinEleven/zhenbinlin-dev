import React from 'react';

const StatsDashboard = ({ trades }) => {
    // Calculate total profit/loss
    const totalProfitLoss = trades.reduce((total, trade) => {
        return total + (parseFloat(trade.profitLoss) || 0);
    }, 0);

    // Calculate profit/loss by ticker
    const profitLossByTicker = trades.reduce((acc, trade) => {
        const ticker = trade.ticker;
        const profitLoss = parseFloat(trade.profitLoss) || 0;

        if (!acc[ticker]) {
            acc[ticker] = {
                ticker: ticker,
                totalProfitLoss: 0,
                tradeCount: 0,
                trades: []
            };
        }

        acc[ticker].totalProfitLoss += profitLoss;
        acc[ticker].tradeCount += 1;
        acc[ticker].trades.push(trade);

        return acc;
    }, {});

    // Convert to array and sort by total profit/loss
    const tickerStats = Object.values(profitLossByTicker)
        .sort((a, b) => b.totalProfitLoss - a.totalProfitLoss);

    // Calculate additional stats
    const totalTrades = trades.length;
    const winningTrades = trades.filter(trade => (parseFloat(trade.profitLoss) || 0) > 0).length;
    const losingTrades = trades.filter(trade => (parseFloat(trade.profitLoss) || 0) < 0).length;
    const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(1) : 0;

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Trading Statistics</h3>

            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">
                        ${totalProfitLoss.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Total P&L</div>
                </div>

                <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">
                        {totalTrades}
                    </div>
                    <div className="text-sm text-gray-600">Total Trades</div>
                </div>

                <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">
                        {winRate}%
                    </div>
                    <div className="text-sm text-gray-600">Win Rate</div>
                </div>

                <div className="text-center p-3 bg-orange-50 rounded">
                    <div className="text-2xl font-bold text-orange-600">
                        {tickerStats.length}
                    </div>
                    <div className="text-sm text-gray-600">Stocks Traded</div>
                </div>
            </div>

            {/* Ticker Breakdown */}
            <div>
                <h4 className="text-md font-semibold mb-3">Performance by Stock</h4>
                {tickerStats.length > 0 ? (
                    <div className="space-y-2">
                        {tickerStats.map((stat) => (
                            <div
                                key={stat.ticker}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-800">
                                        {stat.ticker}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ({stat.tradeCount} trade{stat.tradeCount !== 1 ? 's' : ''})
                                    </span>
                                </div>
                                <div className={`font-semibold ${stat.totalProfitLoss > 0 ? 'text-green-600' :
                                    stat.totalProfitLoss < 0 ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    ${stat.totalProfitLoss.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        No trades found. Add some trades to see statistics.
                    </div>
                )}
            </div>

            {/* Win/Loss Breakdown */}
            {totalTrades > 0 && (
                <div className="mt-4">
                    <h4 className="text-md font-semibold mb-3">Trade Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded">
                            <div className="text-xl font-bold text-green-600">
                                {winningTrades}
                            </div>
                            <div className="text-sm text-gray-600">Winning Trades</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded">
                            <div className="text-xl font-bold text-red-600">
                                {losingTrades}
                            </div>
                            <div className="text-sm text-gray-600">Losing Trades</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsDashboard; 