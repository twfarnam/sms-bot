import 'core-js/es6';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import MessageList from './message_list';

var app;
export {app as default};

window.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <App ref={ref => app = ref} />, 
    document.getElementById('react')
  );

});

