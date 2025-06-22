import React from 'react';

const CustomTable = ({ headers, children, className = "" }) => {
    return (
        <div className={`w-full border border-collapse ${className}`}>
            {/* Table Header */}
            <div className="bg-gray-100 border-b">
                <div className="grid grid-cols-12 gap-0">
                    {headers.map((header, index) => (
                        <div key={header} className="border-r p-2 font-semibold text-gray-700">
                            {header}
                        </div>
                    ))}
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {children}
            </div>
        </div>
    );
};

const TableRow = ({ children, className = "", onClick, isChild = false }) => {
    const baseClasses = "grid grid-cols-12 gap-0 border-b hover:bg-gray-50 transition-colors";
    const childClasses = isChild ? "bg-gray-50 border-l-4 border-blue-300 ml-8 my-2" : "";
    const combinedClasses = `${baseClasses} ${childClasses} ${className}`;

    return (
        <div className={combinedClasses} onClick={onClick}>
            {children}
        </div>
    );
};

const TableCell = ({ children, className = "", colSpan = 1 }) => {
    const baseClasses = "border-r p-2 flex items-center";
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <div className={combinedClasses} style={{ gridColumn: `span ${colSpan}` }}>
            {children}
        </div>
    );
};

export { CustomTable, TableRow, TableCell }; 