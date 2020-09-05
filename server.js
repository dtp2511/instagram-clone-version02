const express = require('express');
const connectDB = require('./config/db');
const app = express();
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
// require('dotenv').config();
// connect MongoDB
connectDB();
//
// middleWares
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoute);
app.use('/api', postsRoute);
app.use('/api', usersRoute);
app.use('/uploads', express.static('uploads'));
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
