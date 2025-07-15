import React from 'react';
import { defaultColumnConfig, compactColumnConfig, premiumColumnConfig } from '../utils/tableConfig';

const TableStyleSelector = ({ onStyleChange, currentStyle = 'default' }) => {
    const styles = [
        { key: 'default', name: 'Default', config: defaultColumnConfig },
        { key: 'compact', name: 'Compact', config: compactColumnConfig },
        { key: 'premium', name: 'Premium', config: premiumColumnConfig }
    ];

    return (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Table Style:</h3>
            <div className="flex space-x-2">
                {styles.map((style) => (
                    <button
                        key={style.key}
                        onClick={() => onStyleChange(style.config)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${currentStyle === style.key
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {style.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TableStyleSelector; 