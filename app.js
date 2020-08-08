const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const photoRoutes = require('./api/photos');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization,WWW-Authenticate, Accept-Charset, Content-Type, Cache-Control, Origin, X-Requested-With');

  if('OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST GET DELETE PATCH');
  }

  next();
})

mongoose.connect(`mongodb+srv://jazzy:${process.env.PASSWORD}@journal.26ukp.mongodb.net/photo-uploader?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use('/photos', photoRoutes);

app.use('/', (req, res, next) => {
  const error = new Error('Not Found');

  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// "PASSWORD": "Chato225%24%23%40"


module.exports = app;
