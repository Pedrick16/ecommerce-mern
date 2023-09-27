const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const { mongoose } = require('mongoose')
const cookieParser = require('cookie-parser');


const app = express();

try {
    mongoose.connect('mongodb+srv://pedrickk:GrVXtukaaPjKD3iY@cluster0.anxqt2k.mongodb.net/?retryWrites=true&w=majority')
    console.log("Database Connected")
} catch (error) {
    console.log(error)
}



//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.use('/', require('./routes/allRoutes'))

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
