import React, { useState } from 'react'
import TradeRow from './TradeRow'
import NewTradeModal from './NewTradeModal'
import CloseTradeModal from './CloseTradeModal'

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
        const status = (<div>Open (<button className='bg-gray-700 text-white rounded-md p-2'>Close trade</button>)</div>);
        completeTrade.status = status;
        setTrades([...trades, completeTrade]);
        setNewTrade(initialTrade);
        setShowNewTradeModal(false);
    };

    const handleCloseTrade = (trade, index) => {
        setTradeToClose({ ...trade, originalIndex: index });
        setShowCloseTradeModal(true);
    };

    const onCloseTrade = (updatedTrade) => {
        const newTrades = [...trades];
        newTrades[updatedTrade.originalIndex] = updatedTrade;
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
    
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Wheel Strategy Options Tracker</h2>
            {/* Modal trigger */}
            <button
                onClick={() => setShowNewTradeModal(true)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                + New Trade
            </button>

            {/* Trade Table */}
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        {[
                            'Open Date', 'Type', 'Ticker', 'QTY', 'Strike', 'Exp. Date', 'Credit ($)',
                            'Status', 'Close Date', 'Debit ($)', 'Profit/Loss ($)', 'ROI'
                        ].map((heading) => (
                            <th key={heading} className="border p-2">{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {trades.map((trade, index) => (
                        <TradeRow
                            key={index}
                            trade={trade}
                            index={index}
                            onCloseTrade={handleCloseTrade}
                        />
                    ))}
                </tbody>
            </table>

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
            />
        </div>
    );
}

export default WheelTracker