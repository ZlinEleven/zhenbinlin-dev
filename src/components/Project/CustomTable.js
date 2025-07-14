import React from 'react';

const CustomTable = ({ headers, children, className = "" }) => {
    return (
        <div className={`w-full bg-white border border-gray-200 rounded-lg overflow-x-auto ${className}`}>
            {/* Table Header */}
            <div className="w-full">
                <div className="flex w-full border-b border-gray-200 bg-gray-50">
                    {headers.map((header, index) => (
                        <div
                            key={header}
                            className="py-3 px-4 font-semibold text-gray-700 text-xs uppercase tracking-wider flex-1 text-left whitespace-nowrap"
                            style={{ minWidth: 100 }}
                        >
                            {header}
                        </div>
                    ))}
                </div>
            </div>
            {/* Table Body */}
            <div className="divide-y divide-gray-100">
                {children}
            </div>
        </div>
    );
};

const TableRow = ({ children, className = "", onClick, isChild = false, status = "open" }) => {
    const isClosed = status === "Closed" || status === "Assigned" || status === "Rolled" || status === "Expired";
    const baseClasses = "flex w-full items-center bg-white hover:bg-gray-50 transition-colors border-0";
    const childClasses = isChild ? "bg-blue-50 border-blue-200 ml-8 my-2" : "";
    const closedClasses = isClosed ? "opacity-60 bg-gray-50 text-gray-400" : "";
    const combinedClasses = `${baseClasses} ${childClasses} ${closedClasses} ${className}`;
    return (
        <div className={combinedClasses} onClick={onClick} style={{ minHeight: 48 }}>
            {children}
        </div>
    );
};

const TableCell = ({ children, className = "", colSpan = 1, minWidth = 100 }) => {
    const baseClasses = "py-3 px-4 flex-1 text-left text-sm text-gray-700 items-center whitespace-nowrap";
    const combinedClasses = `${baseClasses} ${className}`;
    return (
        <div className={combinedClasses} style={{ minWidth, gridColumn: `span ${colSpan}` }}>
            {children}
        </div>
    );
};

export { CustomTable, TableRow, TableCell }; 