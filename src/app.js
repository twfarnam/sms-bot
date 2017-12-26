import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import multer from 'multer';
import {MailParser} from 'mailparser';

import * as config from './config';

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/twilio', (req, res) => {
  config.db.twilio_incoming.insert(req.body);

  let text = req.body.Body;
  let html = req.body.Body;
  if (req.body.MediaUrl0) {
    text += '\n\n' + req.body.MediaUrl0;
  }
  html += `<br><br> <pre>${ JSON.stringify(req.body, null, 2) }</pre>`;

  sendEmail({subject: req.body.From, from: req.body.From, text, html});

  res.send('<Response></Response>');
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
      let i = mail.to[0].address.indexOf('@');
      let to = mail.to[0].address.slice(0,i);
      sendSMS({to, body: mail.text.split('\n\n')[0].replace('\n','')});
    }
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
    from: `"${from}" <${from}@sms.squids.online>`,
    to: 'twfarnam@gmail.com',
  };

  config.mailer.sendMail(mailOptions)
  .then(info => {
    //console.log('Message sent',info);
  })
  .catch(error => console.error(error));

}


