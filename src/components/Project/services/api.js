import { useAuth } from '../context/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Always send cookies
            ...options,
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // GET all trades with optional filtering
    async getTrades(filters = {}) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value);
            }
        });

        const endpoint = `/trades${params.toString() ? `?${params.toString()}` : ''}`;
        return this.request(endpoint);
    }

    // GET single trade by ID
    async getTrade(id) {
        return this.request(`/trades/${id}`);
    }

    // POST create new trade
    async createTrade(tradeData) {
        // Transform frontend trade data to backend format
        const backendTradeData = this.transformTradeToBackend(tradeData);
        return this.request('/trades', {
            method: 'POST',
            body: JSON.stringify(backendTradeData),
        });
    }

    // PUT update trade
    async updateTrade(id, tradeData) {
        const backendTradeData = this.transformTradeToBackend(tradeData);
        return this.request(`/trades/${id}`, {
            method: 'PUT',
            body: JSON.stringify(backendTradeData),
        });
    }

    // DELETE trade
    async deleteTrade(id) {
        return this.request(`/trades/${id}`, {
            method: 'DELETE',
        });
    }

    // PATCH close trade
    async closeTrade(id, closeData) {
        return this.request(`/trades/${id}/close`, {
            method: 'PATCH',
            body: JSON.stringify(closeData),
        });
    }

    // GET trade statistics
    async getTradeStats() {
        return this.request('/trades/stats/summary');
    }

    // GET trades by status
    async getTradesByStatus(status) {
        return this.request(`/trades/status/${status}`);
    }

    // GET trades by ticker
    async getTradesByTicker(ticker) {
        return this.request(`/trades/ticker/${ticker}`);
    }

    // Transform frontend trade data to backend format
    transformTradeToBackend(frontendTrade) {
        return {
            ticker: frontendTrade.ticker,
            strategy: this.mapTradeTypeToStrategy(frontendTrade.type),
            status: frontendTrade.status || 'Open',
            entryDate: frontendTrade.openDate ? new Date(frontendTrade.openDate) : new Date(),
            exitDate: frontendTrade.closeDate ? new Date(frontendTrade.closeDate) : null,
            entryPrice: parseFloat(frontendTrade.credit) || 0,
            exitPrice: parseFloat(frontendTrade.debit) || null,
            quantity: parseInt(frontendTrade.qty) || 1,
            profitLoss: parseFloat(frontendTrade.profitLoss) || 0,
            notes: frontendTrade.notes || '',
            riskLevel: this.calculateRiskLevel(frontendTrade),
            expirationDate: frontendTrade.expDate ? new Date(frontendTrade.expDate) : null,
            strikePrice: parseFloat(frontendTrade.strike) || null,
            optionType: this.mapTradeTypeToOptionType(frontendTrade.type),
            tags: frontendTrade.tags || [],
            // Preserve frontend-specific fields for reference
            frontendId: frontendTrade.originalIndex,
            parentTradeId: frontendTrade.parentTradeId,
            childTradeId: frontendTrade.childTradeId,
            isChild: frontendTrade.isChild,
            isRolledFrom: frontendTrade.isRolledFrom,
            roi: parseFloat(frontendTrade.roi) || 0
        };
    }

    // Transform backend trade data to frontend format
    transformTradeToFrontend(backendTrade) {
        return {
            openDate: backendTrade.entryDate ? new Date(backendTrade.entryDate).toISOString().split('T')[0] : '',
            type: this.mapStrategyToTradeType(backendTrade.strategy),
            ticker: backendTrade.ticker,
            qty: backendTrade.quantity,
            strike: backendTrade.strikePrice,
            expDate: backendTrade.expirationDate ? new Date(backendTrade.expirationDate).toISOString().split('T')[0] : '',
            credit: backendTrade.entryPrice,
            status: backendTrade.status,
            closeDate: backendTrade.exitDate ? new Date(backendTrade.exitDate).toISOString().split('T')[0] : '',
            debit: backendTrade.exitPrice,
            profitLoss: backendTrade.profitLoss,
            roi: backendTrade.roi || 0,
            notes: backendTrade.notes,
            riskLevel: backendTrade.riskLevel,
            optionType: backendTrade.optionType,
            tags: backendTrade.tags,
            // Preserve backend ID
            _id: backendTrade._id,
            // Preserve frontend-specific fields
            originalIndex: backendTrade.frontendId,
            parentTradeId: backendTrade.parentTradeId,
            childTradeId: backendTrade.childTradeId,
            isChild: backendTrade.isChild,
            isRolledFrom: backendTrade.isRolledFrom,
            createdAt: backendTrade.createdAt,
            updatedAt: backendTrade.updatedAt
        };
    }

    // Helper methods for data transformation
    mapTradeTypeToStrategy(type) {
        const strategyMap = {
            'CALL': 'Covered Call',
            'PUT': 'Cash Secured Put',
            'IRON_CONDOR': 'Iron Condor',
            'BUTTERFLY': 'Butterfly',
            'STRADDLE': 'Straddle',
            'STRANGLE': 'Strangle'
        };
        return strategyMap[type] || 'Other';
    }

    mapStrategyToTradeType(strategy) {
        const typeMap = {
            'Covered Call': 'CALL',
            'Cash Secured Put': 'PUT',
            'Iron Condor': 'IRON_CONDOR',
            'Butterfly': 'BUTTERFLY',
            'Straddle': 'STRADDLE',
            'Strangle': 'STRANGLE'
        };
        return typeMap[strategy] || 'CALL';
    }

    mapTradeTypeToOptionType(type) {
        const optionTypeMap = {
            'CALL': 'Call',
            'PUT': 'Put',
            'IRON_CONDOR': 'Other',
            'BUTTERFLY': 'Other',
            'STRADDLE': 'Other',
            'STRANGLE': 'Other'
        };
        return optionTypeMap[type] || 'Other';
    }

    calculateRiskLevel(trade) {
        // Simple risk calculation based on strike price and quantity
        const strike = parseFloat(trade.strike) || 0;
        const qty = parseFloat(trade.qty) || 0;
        const capitalAtRisk = strike * qty;

        if (capitalAtRisk > 10000) return 'High';
        if (capitalAtRisk > 5000) return 'Medium';
        return 'Low';
    }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 