const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//Routes
const bookRoute = require('./routes/BookRoute');
const userRoute = require('./routes/UserRoute');
const transcationRoute = require('./routes/TranscationRoute');

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transcations', transcationRoute);


//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

