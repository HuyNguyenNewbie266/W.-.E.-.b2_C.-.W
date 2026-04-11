require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT;
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 150, // Giới hạn mỗi IP tối đa 150 request trong 15 phút
  message: { message: "Bạn đã vượt quá số lần truy cập cho phép. Vui lòng thử lại sau 15 phút!" },
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
mongoose.connect(process.env.MONGO_URI)
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