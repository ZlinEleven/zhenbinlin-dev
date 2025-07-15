import React from 'react';
import { TableRow, TableCell } from './CustomTable';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { defaultColumnConfig, getWidths, getColumnClassNames } from './utils/tableConfig'

const TradeRow = ({ trade, index, onCloseTrade, onDeleteTrade, isChild = false, parentIndex = null, onEditTrade }) => {
    const columnConfig = defaultColumnConfig;
    const columnClassNames = getColumnClassNames(columnConfig);
    const widths = getWidths(columnConfig);

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
            <TableCell className={textSize + columnClassNames[0]} width={widths[0] || "flex-1"}>{trade.openDate}</TableCell>
            <TableCell className={textSize + columnClassNames[1]} width={widths[1] || "flex-1"}>{trade.type}</TableCell>
            <TableCell className={textSize + columnClassNames[2]} width={widths[2] || "flex-1"}>{trade.ticker}</TableCell>
            <TableCell className={textSize + columnClassNames[3]} width={widths[3] || "flex-1"}>{trade.qty}</TableCell>
            <TableCell className={textSize + columnClassNames[4]} width={widths[4] || "flex-1"}>${trade.strike}</TableCell>
            <TableCell className={textSize + columnClassNames[5]} width={widths[5] || "flex-1"}>{trade.expDate}</TableCell>
            <TableCell className={textSize + columnClassNames[6]} width={widths[6] || "flex-1"}>${trade.credit}</TableCell>
            <TableCell className={textSize + columnClassNames[7]} width={widths[7] || "flex-1"}>{getStatusDisplay()}</TableCell>
            <TableCell className={textSize + columnClassNames[8]} width={widths[8] || "flex-1"}>{trade.closeDate || '-'}</TableCell>
            <TableCell className={textSize + columnClassNames[9]} width={widths[9] || "flex-1"}>${trade.debit || '-'}</TableCell>
            <TableCell className={`${textSize} ${columnClassNames[10]} ${parseFloat(trade.profitLoss) >= 0 ? 'text-green-600' : 'text-red-600'}`} width={widths[10] || "flex-1"}>
                ${trade.profitLoss}
            </TableCell>
            <TableCell className={`${textSize} ${columnClassNames[11]} ${parseFloat(trade.roi) >= 0 ? 'text-green-600' : 'text-red-600'}`} width={widths[11] || "flex-1"}>
                {trade.roi}%
            </TableCell>
            <TableCell className={textSize + columnClassNames[12] + ' flex gap-2 items-center justify-end min-w-[60px]'} width={widths[12] || "w-20"}>
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