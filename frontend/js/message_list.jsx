import React from 'react';
import Message from './message';
import MessageForm from './message_form';

export default class MessageList extends React.Component {

  constructor() {
    super();
    this.state = {data: []};
  }

  render() {
    if (!this.props.messages) {
      return (
        <div className="message-list">
          <h1 className="loading">Select a thread</h1>
        </div>
      );
    }
    else {
      return (
        <div className="message-list">
          {this.props.messages.map(m => <Message key={m._id} {...m} />)}
          <MessageForm />
        </div>
      );
    }
  }

}
