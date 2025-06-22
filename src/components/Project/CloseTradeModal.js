import React, { useState } from 'react';

const CloseTradeModal = ({
    showCloseTradeModal,
    setShowCloseTradeModal,
    tradeToClose,
    onCloseTrade
}) => {
    const [closeData, setCloseData] = useState({
        status: 'closed',
        closeDate: '',
        debit: ''
    });

    if (!showCloseTradeModal || !tradeToClose) return null;

    const handleChange = (field, value) => {
        setCloseData({ ...closeData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate close date
        const openDate = new Date(tradeToClose.openDate);
        const expDate = new Date(tradeToClose.expDate);
        const closeDate = new Date(closeData.closeDate);

        if (closeDate < openDate) {
            alert('Close date must be on or after the open date');
            return;
        }

        if (closeDate > expDate) {
            alert('Close date must be on or before the expiration date');
            return;
        }

        // Update the trade with close data
        const updatedTrade = {
            ...tradeToClose,
            status: closeData.status,
            closeDate: closeData.closeDate,
            debit: parseFloat(closeData.debit) || 0
        };

        // Recalculate profit/loss and ROI
        const credit = parseFloat(tradeToClose.credit) || 0;
        const debit = parseFloat(closeData.debit) || 0;
        const profitLoss = credit - debit;

        const strike = parseFloat(tradeToClose.strike) || 0;
        const qty = parseFloat(tradeToClose.qty) || 0;
        const capitalAtRisk = strike * qty;
        const roi = capitalAtRisk > 0 ? (profitLoss / capitalAtRisk).toFixed(2) : 0;

        updatedTrade.profitLoss = profitLoss.toFixed(2);
        updatedTrade.roi = parseFloat(roi);

        onCloseTrade(updatedTrade);
        setShowCloseTradeModal(false);
        setCloseData({ status: 'closed', closeDate: '', debit: '' });
    };

    const getMinDate = () => {
        return tradeToClose.openDate;
    };

    const getMaxDate = () => {
        return tradeToClose.expDate;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Close Trade</h3>
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <p><strong>Ticker:</strong> {tradeToClose.ticker}</p>
                    <p><strong>Type:</strong> {tradeToClose.type}</p>
                    <p><strong>Strike:</strong> ${tradeToClose.strike}</p>
                    <p><strong>Credit:</strong> ${tradeToClose.credit}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={closeData.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="closed">Closed</option>
                            <option value="assigned">Assigned</option>
                            <option value="rolled">Rolled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Close Date</label>
                        <input
                            type="date"
                            value={closeData.closeDate}
                            min={getMinDate()}
                            max={getMaxDate()}
                            onChange={(e) => handleChange('closeDate', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must be between {tradeToClose.openDate} and {tradeToClose.expDate}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Debit ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={closeData.debit}
                            onChange={(e) => handleChange('debit', e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                            placeholder="0.00"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowCloseTradeModal(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Close Trade
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CloseTradeModal; 