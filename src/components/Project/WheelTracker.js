import React, { useState, useEffect } from 'react'
import TradeRow from './TradeRow'
import NewTradeModal from './NewTradeModal'
import CloseTradeModal from './CloseTradeModal'
import StatsDashboard from './StatsDashboard'
import { CustomTable } from './CustomTable'
import apiService from './services/api'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthForm from './AuthForm'

const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

// const initialTrade = {
//     openDate: getCurrentDate(),
//     type: '',
//     ticker: '',
//     qty: '',
//     strike: '',
//     expDate: '',
//     credit: '',
//     status: '',
//     closeDate: '',
//     debit: '',
//     profitLoss: 0,
//     roi: 0
// }

// Test trade
const initialTrade = {
    openDate: getCurrentDate(),
    type: 'PUT',
    ticker: 'AAPL',
    qty: '1',
    strike: '150',
    expDate: '2025-07-19',
    credit: '10',
    status: 'Open',
    closeDate: '',
    debit: '',
    profitLoss: 0,
    roi: 0
};

function WheelTrackerInner() {
    const { isAuthenticated, user, logout } = useAuth();
    const [trades, setTrades] = useState([]);
    const [showNewTradeModal, setShowNewTradeModal] = useState(false);
    const [showCloseTradeModal, setShowCloseTradeModal] = useState(false);
    const [showDashboard, setShowDashboard] = useState(true);
    const [newTrade, setNewTrade] = useState(initialTrade);
    const [tradeToClose, setTradeToClose] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    // Edit state
    const [editTrade, setEditTrade] = useState(null);
    const [showEditTradeModal, setShowEditTradeModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    // Load trades from backend after login
    useEffect(() => {
        if (isAuthenticated) {
            loadTrades();
        }
    }, [isAuthenticated]);

    const loadTrades = async () => {
        try {
            setLoading(true);
            setError(null);
            const backendTrades = await apiService.getTrades();

            // Transform backend data to frontend format
            const frontendTrades = backendTrades.map((trade, index) => {
                const transformedTrade = apiService.transformTradeToFrontend(trade);
                return {
                    ...transformedTrade,
                    originalIndex: index // Use array index for frontend
                };
            });

            setTrades(frontendTrades);
        } catch (err) {
            console.error('Error loading trades:', err);
            setError('Failed to load trades. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addTrade = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError(null);

            // Calculate profit/loss and ROI for the new trade
            const { profitLoss, roi } = calculateProfitLossAndROI(newTrade);
            const completeTrade = {
                ...newTrade,
                profitLoss: parseFloat(profitLoss),
                roi: parseFloat(roi),
                status: 'Open'
            };

            // Save to backend
            const savedTrade = await apiService.createTrade(completeTrade);

            // Transform backend response to frontend format
            const frontendTrade = apiService.transformTradeToFrontend(savedTrade);
            frontendTrade.originalIndex = trades.length; // Set the index for the new trade

            // Add to local state
            setTrades(prevTrades => [...prevTrades, frontendTrade]);

            // Reset form
            setNewTrade(initialTrade);
            setShowNewTradeModal(false);
        } catch (err) {
            console.error('Error creating trade:', err);
            setError('Failed to create trade. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCloseTrade = (trade, index) => {
        setTradeToClose({ ...trade, originalIndex: index });
        setShowCloseTradeModal(true);
    };

    const onCloseTrade = async (updatedTrade, rolledPosition = null) => {
        try {
            setSaving(true);
            setError(null);

            const newTrades = [...trades];

            // Update the original trade in backend
            if (updatedTrade._id) {
                await apiService.updateTrade(updatedTrade._id, updatedTrade);
            }

            // Update local state
            newTrades[updatedTrade.originalIndex] = updatedTrade;

            // If this was a roll, create the new position
            if (rolledPosition) {
                try {
                    // Save new rolled position to backend
                    const savedRolledTrade = await apiService.createTrade(rolledPosition);
                    const frontendRolledTrade = apiService.transformTradeToFrontend(savedRolledTrade);
                    frontendRolledTrade.originalIndex = newTrades.length;

                    // Update the parent trade with the child reference
                    newTrades[updatedTrade.originalIndex].childTradeId = newTrades.length;

                    // Add the new rolled position
                    newTrades.push({
                        ...frontendRolledTrade,
                        parentTradeId: updatedTrade.originalIndex
                    });
                } catch (err) {
                    console.error('Error creating rolled position:', err);
                    setError('Failed to create rolled position. Please try again.');
                    return;
                }
            }

            setTrades(newTrades);
            setShowCloseTradeModal(false);
        } catch (err) {
            console.error('Error updating trade:', err);
            setError('Failed to update trade. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const deleteTrade = async (tradeId) => {
        try {
            setSaving(true);
            setError(null);

            await apiService.deleteTrade(tradeId);

            // Remove from local state
            setTrades(prevTrades => prevTrades.filter(trade => trade._id !== tradeId));
        } catch (err) {
            console.error('Error deleting trade:', err);
            setError('Failed to delete trade. Please try again.');
        } finally {
            setSaving(false);
        }
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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="mb-4 flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded ${showLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${!showLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setShowLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>
                <AuthForm mode={showLogin ? 'login' : 'signup'} />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading trades...</p>
                </div>
            </div>
        );
    }

    // Edit trade handler
    const handleEditTrade = (trade, index) => {
        setEditTrade({ ...trade, originalIndex: index });
        setShowEditTradeModal(true);
    };

    // Update trade handler
    const updateTrade = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            const { profitLoss, roi } = calculateProfitLossAndROI(editTrade);
            const updatedTrade = {
                ...editTrade,
                profitLoss,
                roi
            };
            // Update in backend
            const savedTrade = await apiService.updateTrade(updatedTrade._id, updatedTrade);
            const frontendTrade = apiService.transformTradeToFrontend(savedTrade);
            frontendTrade.originalIndex = updatedTrade.originalIndex;
            // Update in local state
            setTrades(prevTrades => prevTrades.map((t, i) => i === updatedTrade.originalIndex ? frontendTrade : t));
            setShowEditTradeModal(false);
            setEditTrade(null);
        } catch (err) {
            console.error('Error updating trade:', err);
            setError('Failed to update trade. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Wheel Strategy Options Tracker</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600 text-sm">{user?.email}</span>
                    <button
                        onClick={logout}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {saving && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600">Saving...</p>
                    </div>
                </div>
            )}

            {/* Stats Dashboard */}
            {showDashboard && <StatsDashboard trades={trades} />}

            {/* Modal trigger */}
            <button
                onClick={() => setShowNewTradeModal(true)}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={saving}
            >
                + New Trade
            </button>

            {/* Trade Table */}
            <CustomTable
                headers={[
                    'Open Date', 'Type', 'Ticker', 'QTY', 'Strike', 'Exp. Date', 'Credit ($)',
                    'Status', 'Close Date', 'Debit ($)', 'Profit/Loss ($)', 'ROI', '' // Empty for actions
                ]}
            >
                {organizedTrades.map((trade, displayIndex) => (
                    <TradeRow
                        key={trade._id || trade.originalIndex}
                        trade={trade}
                        index={trade.originalIndex}
                        onCloseTrade={handleCloseTrade}
                        onDeleteTrade={deleteTrade}
                        isChild={trade.isChild}
                        parentIndex={trade.parentIndex}
                        onEditTrade={handleEditTrade}
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
                saving={saving}
            />

            {/* Edit Trade Modal (reuse NewTradeModal) */}
            <NewTradeModal
                showNewTradeModal={showEditTradeModal}
                setShowNewTradeModal={setShowEditTradeModal}
                newTrade={editTrade}
                setNewTrade={setEditTrade}
                addTrade={updateTrade}
                saving={saving}
                isEditMode={true}
            />

            {/* Close Trade Modal */}
            <CloseTradeModal
                showCloseTradeModal={showCloseTradeModal}
                setShowCloseTradeModal={setShowCloseTradeModal}
                tradeToClose={tradeToClose}
                onCloseTrade={onCloseTrade}
                calculateProfitLossAndROI={calculateProfitLossAndROI}
                saving={saving}
            />
        </div>
    );
}

export default function WheelTracker() {
    return (
        <AuthProvider>
            <WheelTrackerInner />
        </AuthProvider>
    );
}