'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twilio = undefined;

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSid = 'AC20ed3edddfd8db5319dfd06772ecab91';
var authToken = '{{ auth_token }}';

var twilioClient = new _twilio2.default.RestClient(accountSid, authToken);
exports.twilio = twilioClient;