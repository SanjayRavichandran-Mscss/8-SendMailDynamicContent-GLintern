const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();;
const offerRoutes = require('./routes/offerRoutes');
const db = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use('/api', offerRoutes);

// Start Server
db.query("SELECT 1")
  .then(() => {
      console.log("MySQL connected!");
      app.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err.message));
