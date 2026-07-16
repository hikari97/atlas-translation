const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Atlas Studio API', version: 'v1' });
});

// Authentication is the only persisted application domain.
require('./src/models/user');

const routes = require('./src/routes');
app.use('/', routes);

const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/atlas-studio')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Atlas API running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
