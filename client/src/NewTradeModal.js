import React, { useState, useEffect } from 'react';
import { fallbackTickers } from './data/fallbackTickers';

const statusOptions = ['Open', 'Closed', 'Assigned', 'Rolled', 'Expired'];

const NewTradeModal = ({
    showNewTradeModal,
    setShowNewTradeModal,
    newTrade,
    setNewTrade,
    addTrade,
    saving = false,
    isEditMode = false
}) => {
    // Ticker autocomplete state
    const [tickerSuggestions, setTickerSuggestions] = useState([]);
    const [showTickerDropdown, setShowTickerDropdown] = useState(false);
    const [allTickers, setAllTickers] = useState(fallbackTickers);
    const [isLoadingTickers, setIsLoadingTickers] = useState(false);
    const [selectedTickerIndex, setSelectedTickerIndex] = useState(-1);

    const fetchTickers = async () => {
        setIsLoadingTickers(true);
        try {
            // Using Alpha Vantage API for stock symbols
            // You can get a free API key from https://www.alphavantage.co/support/#api-key
            const response = await fetch('https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=U7Y9TRCA9Q1GTFKS');
            const csvText = await response.text();

            // Parse CSV data
            const lines = csvText.split('\n');
            const tickers = [];

            // Skip header row and process each line
            for (let i = 1; i < lines.length && tickers.length < 1001; i++) {
                if (lines[i].trim()) {
                    const values = lines[i].split(',');
                    // console.log(values);
                    const symbol = values[0]?.replace(/"/g, ''); // Remove quotes
                    // console.log(symbol);
                    const status = values[4]?.replace(/"/g, ''); // Status is in 5th column
                    const assetType = values[3]?.replace(/"/g, ''); // Asset type is in 4th
                    const exchange = values[2]?.replace(/"/g, ''); // Exchange is in 3rd column

                    // console.log(symbol, status, assetType, exchange);
                    if (symbol && status === 'Active' && assetType === 'Stock' && ['NASDAQ', 'NYSE', 'AMEX', 'OTC', 'BATS'].includes(exchange)) {
                        tickers.push(symbol);
                    }
                }
            }

            if (tickers.length > 0) {
                setAllTickers(tickers);
                console.log(`Loaded ${tickers.length} tickers from API`);
            } else {
                // If no tickers found, use fallback
                console.log('No tickers found, using fallback');
                setAllTickers(fallbackTickers);
            }
        } catch (error) {
            console.error('Error fetching tickers:', error);
            // Use fallback tickers on error
            setAllTickers(fallbackTickers);
        } finally {
            setIsLoadingTickers(false);
        }
    };

    // Fetch tickers from API on component mount
    useEffect(() => {
        fetchTickers();
    }, []);

    // Reset selected index when suggestions change
    useEffect(() => {
        setSelectedTickerIndex(-1);
    }, [tickerSuggestions]);

    if (!showNewTradeModal) return null;


    const handleChange = (field, value) => {
        setNewTrade({ ...newTrade, [field]: value });

        // Handle ticker autocomplete
        if (field === 'ticker') {
            const filtered = allTickers.filter(ticker =>
                ticker.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5);
            setTickerSuggestions(filtered);
            setShowTickerDropdown(true);
        }
    }

    const selectTicker = (ticker) => {
        setNewTrade({ ...newTrade, ticker });
        setShowTickerDropdown(false);
        setSelectedTickerIndex(-1);
    }

    const handleKeyDown = (e) => {
        if (!showTickerDropdown || tickerSuggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedTickerIndex(prev =>
                    prev < tickerSuggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedTickerIndex(prev =>
                    prev > 0 ? prev - 1 : tickerSuggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedTickerIndex >= 0) {
                    selectTicker(tickerSuggestions[selectedTickerIndex]);
                }
                break;
            case 'Escape':
                setShowTickerDropdown(false);
                setSelectedTickerIndex(-1);
                break;
            default:
                break;
        }
    }

    // Helper function to get minimum date for expiration and close dates
    const getMinDate = (field) => {
        if (field === 'expDate' || field === 'closeDate') {
            return newTrade.openDate || new Date().toISOString().split('T')[0];
        }
        return undefined;
    }

    // Helper function to check if a field should be disabled
    const isFieldDisabled = (field) => {
        if (field === 'expDate' || field === 'closeDate') {
            return !newTrade.openDate;
        }
        return false;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
                <h3 className="text-lg font-semibold mb-4">
                    {isEditMode ? 'Edit Trade' : 'Add New Trade'}
                </h3>
                <form onSubmit={addTrade} className="grid grid-cols-2 gap-4">
                    {[
                        { name: 'openDate', label: 'Open Date', type: 'date' },
                        { name: 'type', label: 'Type', type: 'select', options: ['CALL', 'PUT'] },
                        { name: 'ticker', label: 'Ticker', type: 'autocomplete' },
                        { name: 'qty', label: 'Quantity', type: 'number' },
                        { name: 'strike', label: 'Strike Price', type: 'number' },
                        { name: 'expDate', label: 'Expiration Date', type: 'date' },
                        { name: 'credit', label: 'Credit ($)', type: 'number' },
                    ].map(({ name, label, type, options }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium mb-1">{label}</label>
                            {type === 'select' ? (
                                <select
                                    value={newTrade[name]}
                                    onChange={(e) => handleChange(name, e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">Select {label.toLowerCase()}</option>
                                    {options.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : type === 'autocomplete' ? (
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={newTrade[name]}
                                        onChange={(e) => handleChange(name, e.target.value.toUpperCase())}
                                        onKeyDown={handleKeyDown}
                                        className="w-full border p-2 rounded"
                                        required
                                    />
                                    {showTickerDropdown && tickerSuggestions.length > 0 && (
                                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-hidden" style={{ maxHeight: '200px' }}>
                                            {isLoadingTickers ? (
                                                <div className="px-3 py-2 text-gray-500">Loading tickers...</div>
                                            ) : (
                                                tickerSuggestions.map((ticker, index) => (
                                                    <div
                                                        key={index}
                                                        className={`px-3 py-2 cursor-pointer ${index === selectedTickerIndex
                                                            ? 'bg-blue-100 text-blue-900'
                                                            : 'hover:bg-gray-100'
                                                            }`}
                                                        onClick={() => selectTicker(ticker)}
                                                    >
                                                        {ticker}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <input
                                    type={type}
                                    value={newTrade[name]}
                                    min={getMinDate(name)}
                                    max={name === 'openDate' ? new Date().toISOString().split('T')[0] : undefined}
                                    disabled={isFieldDisabled(name)}
                                    onChange={(e) => handleChange(name, e.target.value)}
                                    className={`w-full border p-2 rounded ${isFieldDisabled(name) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    required={name !== 'closeDate'}
                                    placeholder={isFieldDisabled(name) ? 'Select open date first' : undefined}
                                />
                            )}
                        </div>
                    ))}

                    {/* Edit mode only fields */}
                    {isEditMode && newTrade.status !== 'Open' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={newTrade.status || 'Open'}
                                    onChange={e => setNewTrade({ ...newTrade, status: e.target.value })}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Close Date</label>
                                <input
                                    type="date"
                                    value={newTrade.closeDate || ''}
                                    onChange={e => setNewTrade({ ...newTrade, closeDate: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Debit ($)</label>
                                <input
                                    type="number"
                                    value={newTrade.debit || ''}
                                    onChange={e => setNewTrade({ ...newTrade, debit: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </>
                    )}

                    <div className="col-span-2 flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowNewTradeModal(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={saving}
                        >
                            {saving ? (isEditMode ? 'Saving...' : 'Adding...') : (isEditMode ? 'Save Changes' : 'Add Trade')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTradeModal; 