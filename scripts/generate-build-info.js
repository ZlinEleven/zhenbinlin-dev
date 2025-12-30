const fs = require('fs');
const path = require('path');

// Generate build timestamp
const buildTimestamp = new Date().toISOString();

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Write timestamp to a JSON file in public directory
const timestampData = {
    buildTimestamp: buildTimestamp,
    lastUpdated: new Date(buildTimestamp).toISOString().split('T')[0] // YYYY-MM-DD format
};

fs.writeFileSync(
    path.join(publicDir, 'build-info.json'),
    JSON.stringify(timestampData, null, 2)
);

console.log('Build timestamp generated:', buildTimestamp);