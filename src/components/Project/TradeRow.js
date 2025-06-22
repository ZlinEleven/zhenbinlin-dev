import React from 'react';

const TradeRow = ({ trade, index, onCloseTrade }) => {
    const handleCloseClick = () => {
        onCloseTrade(trade, index);
    };

    return (
        <tr key={index}>
            {[
                'openDate', 'type', 'ticker', 'qty', 'strike', 'expDate',
                'credit', 'status', 'closeDate', 'debit'
            ].map((field) => (
                <td key={field} className="border p-2">
                    {field === 'status' && typeof trade[field] === 'object' ? (
                        <div className="w-full p-1 border rounded">
                            Open (<button
                                className='bg-gray-700 text-white rounded-md p-2'
                                onClick={handleCloseClick}
                            >
                                Close trade
                            </button>)
                        </div>
                    ) : (
                        <div className="w-full p-1 border rounded">{trade[field]}</div>
                    )}
                </td>
            ))}
            <td className="border p-2 text-green-600">{trade.profitLoss}</td>
            <td className="border p-2 text-blue-600">{trade.roi}%</td>
        </tr>
    );
};

export default TradeRow; 