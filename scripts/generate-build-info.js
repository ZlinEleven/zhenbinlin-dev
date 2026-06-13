import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildTimestamp = new Date().toISOString();
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const timestampData = {
  buildTimestamp,
  lastUpdated: new Date(buildTimestamp).toISOString().split('T')[0],
};

fs.writeFileSync(
  path.join(publicDir, 'build-info.json'),
  JSON.stringify(timestampData, null, 2)
);

console.log('Build timestamp generated:', buildTimestamp);
