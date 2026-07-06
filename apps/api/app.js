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
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Atlas Studio API', version: 'v1' });
});

// Load all models in correct order
require('./src/models/user');
require('./src/models/job');
require('./src/models/bubble');
require('./src/models/page');
require('./src/models/project');

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
