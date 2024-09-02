const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/database');
const router = require('./routes/routes');
const session = require('express-session');

const app = express();
const port = 3000;


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors());

app.use(express.json());

connectToDatabase();

app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
