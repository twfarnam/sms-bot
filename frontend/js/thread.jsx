import React from 'react';
import app from './index';

export default class Thread extends React.Component {

  render() {
    return (
      <div className="thread" onClick={this.showMessages.bind(this)} >
        { this.props.contact }
      </div>
    );
  }

  showMessages() {
    app.setActiveThread(this.props.id);
  }

};
