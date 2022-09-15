const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5500;
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(
  cors({
    origin: (origin, cb) => {
      if (true) {
        cb(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// sdfsdfsfsdfdfdfdfd
