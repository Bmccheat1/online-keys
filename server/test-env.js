const dotenv = require('dotenv');
const path = require('path');

const result = dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Parsed keys:', Object.keys(result.parsed || {}).join(', '));
console.log('MONGODB_URI:', result.parsed?.MONGODB_URI);
console.log('JWT_SECRET:', result.parsed?.JWT_SECRET ? 'Loaded' : 'Missing');
