import React from 'react';
import { TableRow, TableCell } from './CustomTable';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TradeRow = ({ trade, index, onCloseTrade, onDeleteTrade, isChild = false, parentIndex = null, onEditTrade }) => {
    const handleCloseClick = () => {
        onCloseTrade(trade, index);
    };

    const handleDeleteClick = () => {
        if (trade._id && window.confirm('Are you sure you want to delete this trade?')) {
            onDeleteTrade(trade._id);
        }
    };

    const handleEditClick = () => {
        if (onEditTrade) {
            onEditTrade(trade, index);
        }
    };

    const getStatusDisplay = () => {
        if (typeof trade.status === 'string') {
            if (trade.status === 'Open') {
                return (
                    <div className="w-full p-1 border rounded">
                        <button
                            className='bg-gray-700 text-white rounded-md p-2 w-full transition-all duration-200 hover:bg-red-600 group'
                            onClick={handleCloseClick}
                        >
                            <span className="group-hover:hidden">Open</span>
                            <span className="hidden group-hover:inline">Close Trade</span>
                        </button>
                    </div>
                );
            }
            return <div className="w-full p-1 border rounded">{trade.status}</div>;
        }
        return trade.status;
    };

    const textSize = isChild ? "text-sm" : "text-base";

    return (
        <TableRow
            status={trade.status}
            isChild={isChild}
            className={`group ${isChild ? "ml-8" : ""}`}
        >
            <TableCell className={textSize}>{trade.openDate}</TableCell>
            <TableCell className={textSize}>{trade.type}</TableCell>
            <TableCell className={textSize}>{trade.ticker}</TableCell>
            <TableCell className={textSize}>{trade.qty}</TableCell>
            <TableCell className={textSize}>${trade.strike}</TableCell>
            <TableCell className={textSize}>{trade.expDate}</TableCell>
            <TableCell className={textSize}>${trade.credit}</TableCell>
            <TableCell className={textSize}>{getStatusDisplay()}</TableCell>
            <TableCell className={textSize}>{trade.closeDate || '-'}</TableCell>
            <TableCell className={textSize}>${trade.debit || '-'}</TableCell>
            <TableCell className={`${textSize} ${parseFloat(trade.profitLoss) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${trade.profitLoss}
            </TableCell>
            <TableCell className={`${textSize} ${parseFloat(trade.roi) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trade.roi}%
            </TableCell>
            <TableCell className={textSize + ' flex gap-2 items-center justify-end min-w-[60px]'}>
                {trade._id && (
                    <>
                        <button
                            onClick={handleEditClick}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100 border border-gray-300 text-gray-500 hover:text-blue-600"
                            title="Edit trade"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100 border border-gray-300 text-gray-500 hover:text-red-600"
                            title="Delete trade"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};

export default TradeRow; 