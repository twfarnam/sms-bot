import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressWs from 'express-ws';

import multer from 'multer';
import {MailParser} from 'mailparser';

import * as config from './config';
import api from './api';

let app = express();
let ws = expressWs(app);

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);

// html
app.get('/', (req, res) => {
  res.render('index');
});


app.post('/twilio', (req, res) => {
  config.db.twilio_incoming.insert(req.body);

  sendEmail({
    subject: req.body.From,
    from: req.body.From,
    text: req.body.Body,
    html: `<b>${req.body.Body}</b>`,
  });

  res.send('ok');
});


var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.post('/sendgrid', upload.array(), (req, res) => {
  res.send('ok');

  let mailparser = new MailParser();
  mailparser.write(req.body.email);
  mailparser.end();
  mailparser.on('end', mail => {
    config.db.email_incoming.insert(mail);
    if (mail.from[0].address == 'twfarnam@gmail.com') {
      sendSMS({
        to: mail.headers.to.name,
        body: mail.text.split('\n')[0],
      });
    }
  });

});


app.ws('/updates', (ws, req) => {

  ws.on('message', (msg) => { ws.send(msg); });

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


//sendSMS({body: 'moonbase to apollo'});

function sendSMS({body, to}) {

  // console.log(arguments[0]);

  config.twilio.messages.create({body, to, from: config.number})
  .then(message => {
    //console.log(message);
    config.db.twilio_outgoing.insert(message);
  })
  .catch(err => {
    console.error(err);
  });
}

// sendEmail({
//   subject: 'Hello ✔',
//   from: '+12025279686',
//   text: 'Hello world 🐴',
//   html: '<b>Hello world 🐴</b>'
// });

function sendEmail({subject, from, text, html}) {

  // setup e-mail data with unicode symbols
  var mailOptions = {
    subject, text, html,
    from: `"${from}" <${from}@squids.online>`,
    to: 'twfarnam@gmail.com',
  };

  config.mailer.sendMail(mailOptions)
  .then(info => {
    //console.log('Message sent',info);
  })
  .catch(error => console.error(error));

}


