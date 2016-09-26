import twilio from 'twilio';

var accountSid = 'AC20ed3edddfd8db5319dfd06772ecab91';
var authToken = '{{ auth_token }}';

var twilioClient = new twilio.RestClient(accountSid, authToken);
export {twilioClient as twilio};

