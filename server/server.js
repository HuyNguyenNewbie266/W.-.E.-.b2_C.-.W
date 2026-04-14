// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 150, 
  message: { message: "You have exceeded the allowed number of accesses. Please try again in 15 minutes!" },
  standardHeaders: true, 
  legacyHeaders: false, 
});


// Import models
require('./api/models/ticketModel');
require('./api/models/responseModel');
require('./api/models/messageModel');
require('./api/models/userModel');

// Connect to MongoDB 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://userid:huy123@cluster0.9jdtkaq.mongodb.net/helpdesk')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(globalLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require('./api/routes/ticketRoutes')(app);
require('./api/routes/responseRoutes')(app);
require('./api/routes/messageRoutes')(app);
require('./api/routes/userRoutes')(app);
require('./api/routes/universalRoutes')(app);


app.use((req, res) => {
  res.status(404).json({ message: 'URL not found' });
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});