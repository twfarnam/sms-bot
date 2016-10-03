import React from 'react';
import Thread from './thread';

export default class App extends React.Component {

  render() {
    return (
      <div>
        { this.props.threads.map(t => <Thread key={t.id} {...t} />) }
      </div>
    );
  }

};