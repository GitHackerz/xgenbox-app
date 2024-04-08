//import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//import utils
const { connectToDB } = require('./src/utils/db');

//import routes
const userRoute = require('./src/routes/UserRoute');

const { PORT } = process.env || 7080;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('XGenBox App!');
});

//use routes
app.use('/api/user', userRoute);

app.listen(PORT, async() => {
    await connectToDB();
    console.log(`XGenBox app listening at http://localhost:${PORT}`);
});