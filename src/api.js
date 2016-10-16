import express from 'express';

import * as config from './config';

let router = express.Router();
export {router as default}

router.route('/threads')
.get((req, res) => {

  config.db.twilio_incoming.distinct('From')
  .then(data => {
    res.json(data.map(n => ({id: n, contact: n, count: 10, unread: 3})));
  });

});


router.route('/threads/:contact')
.get((req, res) => {
  console.log(req.params);

  config.db.messages.find({To: req.params.contact})
  .then(data => {
    console.log(data);
    res.json(data);
  });

});


// router.route('/messages')
// .get((req, res) => {

//   config.db.messages.find()
//   .then(data => {
//     res.json(data);
//   });
//   //res.render('index', {title: 'dude'});
// });



