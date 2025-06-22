import React from 'react';
import { TableRow, TableCell } from './CustomTable';

const TradeRow = ({ trade, index, onCloseTrade, isChild = false, parentIndex = null }) => {
    const handleCloseClick = () => {
        onCloseTrade(trade, index);
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
        <TableRow isChild={isChild} className={textSize}>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.openDate}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.type}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.ticker}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.qty}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.strike}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.expDate}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.credit}</div>
            </TableCell>
            <TableCell>
                {getStatusDisplay()}
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.closeDate}</div>
            </TableCell>
            <TableCell>
                <div className="w-full p-1 border rounded">{trade.debit}</div>
            </TableCell>
            <TableCell className="text-green-600">
                <div className="w-full p-1 border rounded">{trade.profitLoss}</div>
            </TableCell>
            <TableCell className="text-blue-600">
                <div className="w-full p-1 border rounded">{trade.roi}%</div>
            </TableCell>
        </TableRow>
    );
};

export default TradeRow; 