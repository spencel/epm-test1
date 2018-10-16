import React, { Component } from 'react';
import './app.css';
import Table from './Table';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch('/api/test')
      .then( response => {
        var responseJson = response.json();
        return responseJson;

      })
      .then( responseJson => {
        console.log( responseJson );
        this.setState(
          { username: responseJson.username }
        );
      });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <div>
            <h1>Hello {this.state.username}</h1>
          </div>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
