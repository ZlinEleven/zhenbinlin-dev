// Table configuration utilities

export const createColumnConfig = (columns) => {
    return columns.map(col => ({
        header: col.header,
        width: col.width || 'flex-1',
        key: col.key || col.header.toLowerCase().replace(/\s+/g, '_'),
        className: col.className || ''
    }));
};

export const getHeaders = (columnConfig) => {
    return columnConfig.map(col => col.header);
};

export const getWidths = (columnConfig) => {
    return columnConfig.map(col => col.width);
};

export const getColumnByKey = (columnConfig, key) => {
    return columnConfig.find(col => col.key === key);
};

export const getColumnByIndex = (columnConfig, index) => {
    return columnConfig[index];
};

export const getColumnClassNames = (columnConfig) => {
    return columnConfig.map(col => col.className);
};

// Default column configuration for the wheel options tracker
// Column widths are chosen based on typical content length for each column.
export const defaultColumnConfig = [
    { header: 'Open Date', width: 'w-32', key: 'open_date', className: 'text-gray-700' },        // e.g. 2024-06-01
    { header: 'Type', width: 'w-16', key: 'type', className: 'text-gray-700 font-medium' },             // e.g. PUT/CALL
    { header: 'Ticker', width: 'w-20', key: 'ticker', className: 'text-gray-700 font-semibold' },           // e.g. AAPL
    { header: 'QTY', width: 'w-12', key: 'qty', className: 'text-gray-700 text-center' },              // e.g. 1, 10
    { header: 'Strike', width: 'w-20', key: 'strike', className: 'text-gray-700' },           // e.g. 150
    { header: 'Exp. Date', width: 'w-32', key: 'exp_date', className: 'text-gray-700' },         // e.g. 2025-07-19
    { header: 'Credit ($)', width: 'w-24', key: 'credit', className: 'text-gray-700' },           // e.g. 10.00
    { header: 'Status', width: 'w-40', key: 'status', className: 'text-gray-700' },           // e.g. Open/Closed/Assigned
    { header: 'Close Date', width: 'w-32', key: 'close_date', className: 'text-gray-700' },       // e.g. 2024-07-01
    { header: 'Debit ($)', width: 'w-24', key: 'debit', className: 'text-gray-700' },            // e.g. 5.00
    { header: 'Profit/Loss ($)', width: 'w-32', key: 'profit_loss', className: 'text-gray-700 font-medium' },      // e.g. 5.00
    { header: 'ROI', width: 'w-20', key: 'roi', className: 'text-gray-700 font-medium' },              // e.g. 50%
    { header: '', width: 'flex-1', key: 'actions', className: 'text-right' }           // Action buttons
];

// Example custom configurations with different styling
export const compactColumnConfig = createColumnConfig([
    { header: 'Open Date', width: 'w-20', key: 'open_date', className: 'text-xs text-gray-600' },
    { header: 'Type', width: 'w-12', key: 'type', className: 'text-xs font-bold text-blue-600' },
    { header: 'Ticker', width: 'w-16', key: 'ticker', className: 'text-xs font-semibold text-gray-800' },
    { header: 'QTY', width: 'w-8', key: 'qty', className: 'text-xs text-gray-600' },
    { header: 'Strike', width: 'w-16', key: 'strike', className: 'text-xs text-gray-600' },
    { header: 'Exp. Date', width: 'w-20', key: 'exp_date', className: 'text-xs text-gray-600' },
    { header: 'Credit ($)', width: 'w-16', key: 'credit', className: 'text-xs text-green-600 font-medium' },
    { header: 'Status', width: 'w-24', key: 'status', className: 'text-xs text-gray-600' },
    { header: 'Close Date', width: 'w-20', key: 'close_date', className: 'text-xs text-gray-600' },
    { header: 'Debit ($)', width: 'w-16', key: 'debit', className: 'text-xs text-red-600 font-medium' },
    { header: 'Profit/Loss ($)', width: 'w-20', key: 'profit_loss', className: 'text-xs font-bold' },
    { header: 'ROI', width: 'w-12', key: 'roi', className: 'text-xs font-bold' },
    { header: '', width: 'w-12', key: 'actions', className: 'text-center' }
]);

export const premiumColumnConfig = createColumnConfig([
    { header: 'Open Date', width: 'w-32', key: 'open_date', className: 'text-gray-700 font-medium' },
    { header: 'Type', width: 'w-20', key: 'type', className: 'text-blue-600 font-bold uppercase tracking-wide' },
    { header: 'Ticker', width: 'w-24', key: 'ticker', className: 'text-gray-900 font-bold text-lg' },
    { header: 'QTY', width: 'w-16', key: 'qty', className: 'text-gray-700 text-center font-medium' },
    { header: 'Strike', width: 'w-24', key: 'strike', className: 'text-gray-700 font-medium' },
    { header: 'Exp. Date', width: 'w-32', key: 'exp_date', className: 'text-gray-700 font-medium' },
    { header: 'Credit ($)', width: 'w-28', key: 'credit', className: 'text-green-600 font-bold' },
    { header: 'Status', width: 'w-48', key: 'status', className: 'text-gray-700 font-medium' },
    { header: 'Close Date', width: 'w-32', key: 'close_date', className: 'text-gray-700 font-medium' },
    { header: 'Debit ($)', width: 'w-28', key: 'debit', className: 'text-red-600 font-bold' },
    { header: 'Profit/Loss ($)', width: 'w-36', key: 'profit_loss', className: 'text-lg font-bold' },
    { header: 'ROI', width: 'w-24', key: 'roi', className: 'text-lg font-bold' },
    { header: '', width: 'w-24', key: 'actions', className: 'text-center' }
]);