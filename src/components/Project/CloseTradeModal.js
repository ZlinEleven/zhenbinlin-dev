import React, { useState, useEffect } from 'react';

const CloseTradeModal = ({
    showCloseTradeModal,
    setShowCloseTradeModal,
    tradeToClose,
    onCloseTrade,
    calculateProfitLossAndROI
}) => {
    const [closeData, setCloseData] = useState({
        status: 'Closed',
        closeDate: '',
        debit: ''
    });

    const [newPosition, setNewPosition] = useState({
        openDate: '',
        type: '',
        ticker: '',
        qty: '',
        strike: '',
        expDate: '',
        credit: ''
    });

    // Update new position defaults when status changes to 'rolled' or 'expired'
    useEffect(() => {
        if (closeData.status === 'Rolled' && tradeToClose) {
            setNewPosition({
                openDate: closeData.closeDate || getCurrentDate(),
                type: tradeToClose.type,
                ticker: tradeToClose.ticker,
                qty: tradeToClose.qty,
                strike: '',
                expDate: '',
                credit: ''
            });
        } else if (closeData.status === 'Expired' && tradeToClose) {
            setCloseData(prev => ({
                ...prev,
                closeDate: tradeToClose.expDate,
                debit: '0'
            }));
        }
    }, [closeData.status, closeData.closeDate, tradeToClose]);

    if (!showCloseTradeModal || !tradeToClose) return null;

    const handleChange = (field, value) => {
        setCloseData({ ...closeData, [field]: value });
    };

    const handleNewPositionChange = (field, value) => {
        setNewPosition({ ...newPosition, [field]: value });
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

        // Recalculate profit/loss and ROI using the shared function
        const { profitLoss, roi } = calculateProfitLossAndROI(updatedTrade);
        updatedTrade.profitLoss = profitLoss;
        updatedTrade.roi = roi;

        // If rolled, create the new position and establish parent-child relationship
        if (closeData.status === 'Rolled') {
            // Validate new position data
            if (!newPosition.openDate || !newPosition.type || !newPosition.strike ||
                !newPosition.expDate || !newPosition.credit) {
                alert('Please fill in all required fields for the new position');
                return;
            }

            // Create new position with parent reference
            const rolledPosition = {
                ...newPosition,
                openDate: newPosition.openDate,
                type: newPosition.type,
                ticker: newPosition.ticker || tradeToClose.ticker, // Default to same ticker
                qty: newPosition.qty || tradeToClose.qty, // Default to same quantity
                strike: parseFloat(newPosition.strike),
                expDate: newPosition.expDate,
                credit: parseFloat(newPosition.credit),
                status: 'Open',
                closeDate: '',
                debit: '',
                profitLoss: 0,
                roi: 0,
                parentTradeId: tradeToClose.originalIndex, // Reference to parent
                isRolledPosition: true
            };

            // Calculate profit/loss and ROI for the new position
            const { profitLoss: newProfitLoss, roi: newRoi } = calculateProfitLossAndROI(rolledPosition);
            rolledPosition.profitLoss = newProfitLoss;
            rolledPosition.roi = newRoi;

            // Add child reference to the closed trade
            updatedTrade.childTradeId = 'pending'; // Will be updated with actual index
            updatedTrade.isRolledFrom = true;

            // Pass both the updated trade and the new rolled position
            onCloseTrade(updatedTrade, rolledPosition);
        } else {
            // Regular close (not rolled)
            onCloseTrade(updatedTrade);
        }

        setShowCloseTradeModal(false);
        setCloseData({ status: 'Closed', closeDate: '', debit: '' });
        setNewPosition({
            openDate: '',
            type: '',
            ticker: '',
            qty: '',
            strike: '',
            expDate: '',
            credit: ''
        });
    };

    const getMinDate = () => {
        return tradeToClose.openDate;
    };

    const getMaxDate = () => {
        return tradeToClose.expDate;
    };

    const getMinNewPositionDate = () => {
        return closeData.closeDate || getCurrentDate();
    };

    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Close Trade</h3>
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <p><strong>Ticker:</strong> {tradeToClose.ticker}</p>
                    <p><strong>Type:</strong> {tradeToClose.type}</p>
                    <p><strong>Strike:</strong> ${tradeToClose.strike}</p>
                    <p><strong>Credit:</strong> ${tradeToClose.credit}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Close Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={closeData.status}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="Closed">Closed</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Rolled">Rolled</option>
                                <option value="Expired">Expired</option>
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
                                className={`w-full border p-2 rounded ${closeData.status === 'Expired' ? 'bg-gray-100 cursor-not-allowed' : ''
                                    }`}
                                readOnly={closeData.status === 'Expired'}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {closeData.status === 'Expired'
                                    ? 'Set to expiration date'
                                    : `Between ${tradeToClose.openDate} and ${tradeToClose.expDate}`
                                }
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Debit ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={closeData.debit}
                                onChange={(e) => handleChange('debit', e.target.value)}
                                className={`w-full border p-2 rounded ${closeData.status === 'Expired' ? 'bg-gray-100 cursor-not-allowed' : ''
                                    }`}
                                readOnly={closeData.status === 'Expired'}
                                required
                                placeholder="0.00"
                            />
                            {closeData.status === 'Expired' && (
                                <p className="text-xs text-gray-500 mt-1">Set to 0 for expired options</p>
                            )}
                        </div>
                    </div>

                    {/* New Position Details (only show if rolled) */}
                    {closeData.status === 'Rolled' && (
                        <div className="border-t pt-4">
                            <h4 className="text-md font-semibold mb-3">New Position Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Open Date</label>
                                    <input
                                        type="date"
                                        value={newPosition.openDate}
                                        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                                        readOnly
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Same as close date</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <input
                                        type="text"
                                        value={newPosition.type}
                                        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                                        readOnly
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Same as original position</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Ticker</label>
                                    <input
                                        type="text"
                                        value={newPosition.ticker}
                                        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                                        readOnly
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Same as original position</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        value={newPosition.qty}
                                        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                                        readOnly
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Same as original position</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Strike Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newPosition.strike}
                                        onChange={(e) => handleNewPositionChange('strike', e.target.value)}
                                        className="w-full border p-2 rounded"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Expiration Date</label>
                                    <input
                                        type="date"
                                        value={newPosition.expDate}
                                        min={getMinNewPositionDate()}
                                        onChange={(e) => handleNewPositionChange('expDate', e.target.value)}
                                        className="w-full border p-2 rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Credit ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newPosition.credit}
                                        onChange={(e) => handleNewPositionChange('credit', e.target.value)}
                                        className="w-full border p-2 rounded"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

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
                            {closeData.status === 'Rolled' ? 'Close & Create New Position' : 'Close Trade'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CloseTradeModal; 