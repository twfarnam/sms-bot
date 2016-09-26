import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import mongo from 'then-mongo';

var mongo = require('then-mongo');
var db = mongo('connection-string', ['collectionA', 'collectionB']);


let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('dude');
})

app.post('/twilio', (req, res) => {
  res.send('ok');
});

// catch 404 
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

let port = 3000;
app.listen(port, () => console.log(`listening port ${port}`));




function sendSMS({body, to = '+12025279686'}) {

  client.messages.create({body, to, from: '+9172424207'})
  .then(message => {
    console.log(message);

  })
  .catch(err => {
    console.error(err);
  });
}
