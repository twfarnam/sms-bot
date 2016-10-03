import mongo from 'then-mongo';
import twilio from 'twilio';


let accountSid = process.env.TWILIO_ACCOUNT_SID;
let authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioClient = new twilio.RestClient(accountSid, authToken);
export {twilioClient as twilio};

export var db = mongo(
  process.env.MONGO_CONNECTION_STRING,
  ['messages','email_incoming','twilio_incoming','twilio_outgoing']
);


import nodemailer from 'nodemailer';
import nodemailerSG from 'nodemailer-sendgrid-transport';

var options = {auth: {api_key: process.env.SENDGRID_API_KEY}};
var transport = nodemailer.createTransport(nodemailerSG(options));
export {transport as mailer};

