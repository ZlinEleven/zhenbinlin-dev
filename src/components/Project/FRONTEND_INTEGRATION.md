# Frontend-Backend Integration

This document explains how the React frontend integrates with the Express.js backend for the trades management system.

## 🚀 Quick Setup

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 2. Frontend Setup
```bash
# In the root directory
npm start
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔧 API Integration Features

### **Automatic Data Persistence**
- ✅ Trades are automatically saved to MongoDB when created
- ✅ Trade updates are persisted to the database
- ✅ Trade deletions are synchronized with the backend
- ✅ Rolled positions create new trades in the database

### **Real-time Data Loading**
- ✅ Trades load from database on component mount
- ✅ Refresh button to reload data from server
- ✅ Loading states during API calls
- ✅ Error handling with user-friendly messages

### **Data Transformation**
The API service handles data transformation between frontend and backend formats:

**Frontend Format:**
```javascript
{
  openDate: "2024-01-15",
  type: "CALL",
  ticker: "AAPL",
  qty: 1,
  strike: 150.00,
  expDate: "2024-01-19",
  credit: 2.50,
  status: "Open",
  // ... other fields
}
```

**Backend Format:**
```javascript
{
  ticker: "AAPL",
  strategy: "Covered Call",
  status: "Open",
  entryDate: "2024-01-15T00:00:00.000Z",
  entryPrice: 2.50,
  quantity: 1,
  strikePrice: 150.00,
  expirationDate: "2024-01-19T00:00:00.000Z",
  // ... other fields
}
```

## 📊 API Service Methods

### **Trade Operations**
```javascript
import apiService from '../services/api';

// Get all trades
const trades = await apiService.getTrades();

// Create new trade
const newTrade = await apiService.createTrade(tradeData);

// Update trade
const updatedTrade = await apiService.updateTrade(id, tradeData);

// Delete trade
await apiService.deleteTrade(id);

// Close trade
const closedTrade = await apiService.closeTrade(id, { exitPrice, exitDate });

// Get statistics
const stats = await apiService.getTradeStats();
```

### **Filtering and Sorting**
```javascript
// Get trades with filters
const filteredTrades = await apiService.getTrades({
  status: 'Open',
  ticker: 'AAPL',
  sortBy: 'entryDate',
  sortOrder: 'desc',
  limit: 10
});
```

## 🎯 Key Features

### **1. Loading States**
- Loading spinner when fetching trades
- Saving overlay during API operations
- Disabled buttons during operations

### **2. Error Handling**
- User-friendly error messages
- Automatic error clearing
- Graceful fallbacks

### **3. Data Synchronization**
- Automatic refresh after operations
- Optimistic UI updates
- Conflict resolution

### **4. Visual Feedback**
- Closed/Assigned/Rolled/Expired trades are grayed out
- Profit/Loss colors (green/red)
- Modern card-based design

## 🔄 Data Flow

### **Creating a Trade**
1. User fills form in `NewTradeModal`
2. `addTrade` function called
3. Data transformed to backend format
4. API call to `POST /api/trades`
5. Response transformed to frontend format
6. Trade added to local state
7. UI updated

### **Closing a Trade**
1. User clicks "Close Trade" button
2. `CloseTradeModal` opens
3. User enters close details
4. `onCloseTrade` function called
5. Trade updated in backend via `PUT /api/trades/:id`
6. If rolled, new trade created via `POST /api/trades`
7. Local state updated
8. UI reflects changes

### **Loading Trades**
1. Component mounts
2. `loadTrades` function called
3. API call to `GET /api/trades`
4. Backend data transformed to frontend format
5. Trades stored in local state
6. UI renders with data

## 🛠️ Development

### **Adding New API Endpoints**
1. Add method to `apiService` in `src/services/api.js`
2. Update backend routes if needed
3. Use in components as needed

### **Modifying Data Transformation**
- Update `transformTradeToBackend()` for frontend → backend
- Update `transformTradeToFrontend()` for backend → frontend
- Update mapping functions as needed

### **Error Handling**
- All API calls wrapped in try-catch
- User-friendly error messages displayed
- Loading states prevent multiple requests

## 🧪 Testing

### **Manual Testing**
1. Start backend: `cd server && npm run dev`
2. Start frontend: `npm start`
3. Create a trade and verify it appears in MongoDB
4. Close a trade and verify status updates
5. Roll a trade and verify new position is created
6. Delete a trade and verify it's removed from database

### **API Testing**
```bash
# Test backend directly
curl http://localhost:5000/api/trades
curl http://localhost:5000/api/trades/stats/summary
```

## 🚨 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   - Ensure backend CORS is configured for `http://localhost:3000`
   - Check `server/server.js` CORS settings

2. **API Connection Errors**
   - Verify backend is running on port 5000
   - Check `.env` file has correct `REACT_APP_API_URL`

3. **Data Transformation Issues**
   - Check console for transformation errors
   - Verify field mappings in `apiService`

4. **MongoDB Connection**
   - Ensure MongoDB is running
   - Check `server/config.env` for correct connection string

### **Debug Mode**
Enable detailed logging by adding to `src/services/api.js`:
```javascript
console.log('API Request:', url, config);
console.log('API Response:', response);
```

## 📈 Performance Considerations

- **Lazy Loading**: Trades loaded only when needed
- **Optimistic Updates**: UI updates immediately, syncs with backend
- **Error Recovery**: Failed operations can be retried
- **Caching**: Consider implementing client-side caching for better performance

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live updates
- **Offline Support**: Service worker for offline functionality
- **Bulk Operations**: Batch create/update/delete trades
- **Advanced Filtering**: Date ranges, profit/loss ranges
- **Export Features**: CSV/PDF export of trade data 