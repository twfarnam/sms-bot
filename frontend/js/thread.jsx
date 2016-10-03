import React from 'react';

export default class Thread extends React.Component {

  render() {
    return (
      <div className="thread" onClick={this.showMessages.bind(this)} >
        { this.props.contact }
      </div>
    );
  }

  showMessages() {
    console.log(this);
  }

};
