import React from 'react';
import ThreadList from './thread_list';
import MessageList from './message_list';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {loading: true};
  }


  componentDidMount() {
    this.loadThreads();
  }


  loadThreads() {
    fetch('/api/threads')
    .then(response => response.json())
    .then(data => this.setState({loading: false, threads: data}))
    .catch(err => console.error(err));
  }


  setActiveThread(id) {
    console.log(id);
    fetch(`/api/threads/${id}`)
    .then(response => response.json())
    .then(data => {
      //this.setState....
      this.setState({activeThread: data})
    })
    .catch(err => console.error(err));
  }

// from websocket?
//   addMessage() {
//     this.setState(this.state.concat([
//       {id:2,name:"Another Name"}
//     ]))
//   }


  render() {

    if (this.state.loading) {
      return (
        <h1 className="loading">Loading...</h1>
      );
    }

    return (
      <main>
        <ThreadList threads={this.state.threads} />
        <MessageList messages={this.state.activeThread} />
        </main>
    );
  }

};
