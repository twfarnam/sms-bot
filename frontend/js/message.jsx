import React from 'react';

export default class Message extends React.Component {

  render() {
    return (
      <div>
        {this.props.From}: {this.props.Body}
      </div>
    );
  }

}
