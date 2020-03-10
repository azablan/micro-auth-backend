const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const initializeDb = require('./db');
const User = require('./user');
const { verifyToken } = require('./auth-token');

const EXPRESS_PORT = 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'hello!' });
});

app.post('/api/signup', async (req, res) => {
  try {
    await User.createAuthenticated(req.body);
    res.status(200)
      .json({ message: `new user '${req.body.username}' created` });
  } catch (err) {
    res.status(500)
      .json({ message: err.message });
  }
});

app.post('/api/signin', async (req, res) => {
  const authenticatedUser = await User.getAuthenticated(req.body);
  if (authenticatedUser) {
    res.status(200)
      .cookie('token', authenticatedUser.token)
      .json({ message: `authentication as '${authenticatedUser.username}' successful` });
  } else {
    res.status(400).json({ message: 'invalid email or password' });
  }
});

app.get('/api/shhh', async (req, res) => {
  const { token } = req.cookies;
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.userId)
    res
      .status(200)
      .json({ message: `Hello, ${user.username}. You must be authenticated :) woooo` });
  } catch (error) {
    res
      .status(401)
      .clearCookie('token')
      .json({ message: "authentication error" });
  }
});

app.listen(EXPRESS_PORT, () => console.log(`Express running on ${EXPRESS_PORT}!`));

initializeDb();