# Trades Backend API

A RESTful Express.js API for managing trading data with MongoDB database.

## Features

- ✅ CRUD operations for trades
- ✅ Advanced filtering and sorting
- ✅ Trade statistics and analytics
- ✅ Status management (Open, Closed, Assigned, Rolled, Expired)
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Error handling and validation
- ✅ MongoDB with Mongoose ODM

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `config.env` and update the MongoDB URI
   - For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/trades_db`
   - For MongoDB Atlas: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trades_db`

4. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL: `http://localhost:5000/api/trades`

### GET `/api/trades`
Get all trades with optional filtering

**Query Parameters:**
- `status` - Filter by status (Open, Closed, Assigned, Rolled, Expired)
- `ticker` - Filter by ticker symbol
- `strategy` - Filter by strategy type
- `sortBy` - Sort field (default: entryDate)
- `sortOrder` - Sort order: desc/asc (default: desc)
- `limit` - Limit number of results

**Example:**
```bash
GET /api/trades?status=Open&sortBy=entryDate&sortOrder=desc&limit=10
```

### GET `/api/trades/:id`
Get a specific trade by ID

### POST `/api/trades`
Create a new trade

**Request Body:**
```json
{
  "ticker": "AAPL",
  "strategy": "Iron Condor",
  "entryPrice": 150.50,
  "quantity": 1,
  "notes": "Weekly iron condor",
  "riskLevel": "Medium",
  "expirationDate": "2024-01-19",
  "strikePrice": 150,
  "optionType": "Call"
}
```

### PUT `/api/trades/:id`
Update an existing trade

### DELETE `/api/trades/:id`
Delete a trade

### PATCH `/api/trades/:id/close`
Close a trade with exit price

**Request Body:**
```json
{
  "exitPrice": 155.00,
  "exitDate": "2024-01-15"
}
```

### GET `/api/trades/stats/summary`
Get trade statistics

**Response:**
```json
{
  "totalTrades": 25,
  "openTrades": 8,
  "closedTrades": 17,
  "totalProfitLoss": 1250.50,
  "avgProfitLoss": 73.56
}
```

### GET `/api/trades/status/:status`
Get trades by status

### GET `/api/trades/ticker/:ticker`
Get trades by ticker symbol

## Trade Schema

```javascript
{
  ticker: String (required, uppercase),
  strategy: String (required, enum),
  status: String (Open/Closed/Assigned/Rolled/Expired),
  entryDate: Date (default: now),
  exitDate: Date,
  entryPrice: Number (required),
  exitPrice: Number,
  quantity: Number (required, min: 1),
  profitLoss: Number (default: 0),
  notes: String (max: 1000),
  tags: [String],
  riskLevel: String (Low/Medium/High),
  expirationDate: Date,
  strikePrice: Number,
  optionType: String (Call/Put/Stock/Other),
  createdAt: Date,
  updatedAt: Date
}
```

## Strategies

- Iron Condor
- Butterfly
- Straddle
- Strangle
- Covered Call
- Cash Secured Put
- Other

## Status Types

- Open
- Closed
- Assigned
- Rolled
- Expired

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a message and details:

```json
{
  "message": "Validation Error",
  "error": "Ticker is required"
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error middleware

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses nodemon for auto-restart on file changes.

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trades_db
NODE_ENV=development
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Update CORS origins in `server.js`
3. Use a production MongoDB instance
4. Set up proper environment variables
5. Use a process manager like PM2

## Testing the API

You can test the API using tools like:

- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)

### Example cURL Commands

```bash
# Get all trades
curl http://localhost:5000/api/trades

# Create a new trade
curl -X POST http://localhost:5000/api/trades \
  -H "Content-Type: application/json" \
  -d '{"ticker":"AAPL","strategy":"Iron Condor","entryPrice":150.50,"quantity":1}'

# Get trade statistics
curl http://localhost:5000/api/trades/stats/summary
``` 

## Accessing the Database

The API uses MongoDB as its database, managed via Mongoose ODM. By default, it connects to the URI specified in your environment variables (`MONGODB_URI`). 

### Local MongoDB

To use a local MongoDB instance, ensure MongoDB is running on your machine and set in your `.env` or `config.env`:
