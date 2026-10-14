const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

const { createApp } = require('../backend/dist/app');

const app = createApp();

module.exports = app;
