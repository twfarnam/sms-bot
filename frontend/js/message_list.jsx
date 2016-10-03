import React from 'react';
import Message from './message';
import MessageForm from './message_form';

export default class MessageList extends React.Component {

  constructor() {
    super();
    this.state = {data: []};
  }

  render() {
    let messages = this.props.messages.map(m => {
      return <Message key={m._id} {...m} />;
    });
    return (
      <div>
        {messages}
        <MessageForm />
      </div>
    );
  }

}
