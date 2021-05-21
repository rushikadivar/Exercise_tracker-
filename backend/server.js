const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// mongoose use to connect to the MongoDB database  

// This configure, so we can have a environment variable in the .mv file 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// express.json() allow us to parse JSON because server use the data by JSON 

const uri = process.env.ATLAS_URI;
// uri is our database uri which will get us in mongoDB atlas dashboard 
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})


.catch(e => {
    console.log(e);
});

// mongoose.connect use for connect uri that's were our database is stored 
// to someof the update of the mongoDB use => useNewUrlParser for update the connection string while change 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});