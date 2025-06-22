import React, { useState } from 'react'
import TradeRow from './TradeRow'
import NewTradeModal from './NewTradeModal'
import CloseTradeModal from './CloseTradeModal'
import StatsDashboard from './StatsDashboard'
import { CustomTable } from './CustomTable'

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

const initialTrade = {
    openDate: getCurrentDate(),
    type: '',
    ticker: '',
    qty: '',
    strike: '',
    expDate: '',
    credit: '',
    status: '',
    closeDate: '',
    debit: '',
    profitLoss: 0,
    roi: 0
};

const WheelTracker = () => {
    const [trades, setTrades] = useState([]);
    const [showNewTradeModal, setShowNewTradeModal] = useState(false);
    const [showCloseTradeModal, setShowCloseTradeModal] = useState(false);
    const [showDashboard, setShowDashboard] = useState(true);
    const [newTrade, setNewTrade] = useState(initialTrade);
    const [tradeToClose, setTradeToClose] = useState(null);

    const addTrade = (e) => {
        e.preventDefault();

        // Calculate profit/loss and ROI for the new trade
        const { profitLoss, roi } = calculateProfitLossAndROI(newTrade);
        const completeTrade = {
            ...newTrade,
            profitLoss,
            roi
        };

        // console.log(completeTrade);
        completeTrade.status = 'Open';
        setTrades([...trades, completeTrade]);
        setNewTrade(initialTrade);
        setShowNewTradeModal(false);
    };

    const handleCloseTrade = (trade, index) => {
        setTradeToClose({ ...trade, originalIndex: index });
        setShowCloseTradeModal(true);
    };

    const onCloseTrade = (updatedTrade, rolledPosition = null) => {
        const newTrades = [...trades];

        // Update the original trade
        newTrades[updatedTrade.originalIndex] = updatedTrade;

        // If this was a roll, add the new position
        if (rolledPosition) {
            const newPositionIndex = newTrades.length;

            // Update the parent trade with the child reference
            newTrades[updatedTrade.originalIndex].childTradeId = newPositionIndex;

            // Add the new rolled position
            newTrades.push({
                ...rolledPosition,
                originalIndex: newPositionIndex,
                parentTradeId: updatedTrade.originalIndex
            });
        }

        setTrades(newTrades);
    };

    function calculateProfitLossAndROI(trade) {
        const strike = parseFloat(trade.strike) || 0;
        const qty = parseFloat(trade.qty) || 0;
        const credit = parseFloat(trade.credit) || 0;
        const debit = parseFloat(trade.debit) || 0;

        // Calculate profit/loss (credit received - debit paid)
        const profitLoss = credit - debit;

        // Calculate capital at risk (strike price × quantity × 100 for options)
        const capitalAtRisk = strike * qty;

        // Calculate ROI as percentage of capital at risk
        // For wheel strategy: ROI = (Profit/Loss / Capital at Risk) × 100
        const roi = capitalAtRisk > 0 ? (profitLoss / capitalAtRisk).toFixed(2) : 0;

        return {
            profitLoss: profitLoss.toFixed(2),
            roi: parseFloat(roi)
        };
    }

    // Organize trades hierarchically for display
    const organizeTradesHierarchically = (trades) => {
        const organized = [];
        const processed = new Set();

        trades.forEach((trade, index) => {
            // Skip if already processed as a child
            if (processed.has(index)) return;

            // Add parent trade
            organized.push({
                ...trade,
                originalIndex: index,
                isChild: false,
                parentIndex: null
            });

            // Get all children if this trade has a child (was rolled)
            while (trade.childTradeId !== undefined && trade.childTradeId !== 'pending') {
                const childTrade = trades[trade.childTradeId];
                if (childTrade) {
                    organized.push({
                        ...childTrade,
                        originalIndex: trade.childTradeId,
                        isChild: true,
                        parentIndex: index
                    });
                    processed.add(trade.childTradeId);
                }

                trade = childTrade;
            }
        });

        return organized;
    };

    const organizedTrades = organizeTradesHierarchically(trades);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Wheel Strategy Options Tracker</h2>
                <button
                    onClick={() => setShowDashboard(!showDashboard)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
                >
                    <span>{showDashboard ? 'Hide' : 'Show'} Dashboard</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${showDashboard ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Stats Dashboard */}
            {showDashboard && <StatsDashboard trades={trades} />}

            {/* Modal trigger */}
            <button
                onClick={() => setShowNewTradeModal(true)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                + New Trade
            </button>

            {/* Trade Table */}
            <CustomTable
                headers={[
                    'Open Date', 'Type', 'Ticker', 'QTY', 'Strike', 'Exp. Date', 'Credit ($)',
                    'Status', 'Close Date', 'Debit ($)', 'Profit/Loss ($)', 'ROI'
                ]}
            >
                {organizedTrades.map((trade, displayIndex) => (
                    <TradeRow
                        key={trade.originalIndex}
                        trade={trade}
                        index={trade.originalIndex}
                        onCloseTrade={handleCloseTrade}
                        isChild={trade.isChild}
                        parentIndex={trade.parentIndex}
                    />
                ))}
            </CustomTable>

            {/* New Trade Modal */}
            <NewTradeModal
                showNewTradeModal={showNewTradeModal}
                setShowNewTradeModal={setShowNewTradeModal}
                newTrade={newTrade}
                setNewTrade={setNewTrade}
                addTrade={addTrade}
            />

            {/* Close Trade Modal */}
            <CloseTradeModal
                showCloseTradeModal={showCloseTradeModal}
                setShowCloseTradeModal={setShowCloseTradeModal}
                tradeToClose={tradeToClose}
                onCloseTrade={onCloseTrade}
                calculateProfitLossAndROI={calculateProfitLossAndROI}
            />
        </div>
    );
}

export default WheelTracker