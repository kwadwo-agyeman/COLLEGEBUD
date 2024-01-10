require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const {errLogger} = require('./middleware/errEvents');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');



const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));

app.use(credentials)

app.use(logger);

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cookieParser())
app.use('/', express.static(path.join(__dirname,'/public')));
app.use('/register',require('./routes/registerUser'));
app.use('/auth',require('./routes/authorization'));
app.use('/getUserData',require('./routes/getUserData'));
app.use('/updateProfile',require('./routes/updateProfile'));
app.use('/uploadFiles',require('./routes/fileUploader'));
app.use('/getProfilePic', require('./routes/getProfileImg'));
app.use('/uploadCertsAndAwards', require('./routes/certsAndAwards'));
app.use('/getCertsNAwards', require('./routes/getCertsAndAwards'));
app.use('/updateActivities', require('./routes/updateActivityCards'));
app.use('/getActivitiesDetails', require('./routes/getActivityDetails'))
app.use(verifyJWT)

// app.use('/')



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    }
    else {
        res.type('txt').send('404 Not Found')
    }
});

app.use(errLogger);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
