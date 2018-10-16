import React, { Component } from 'react';
import './app.css';
import WaterPipeBrowser from './WaterPipeBrowser';

export default class App extends Component {
  constructor( props ) {
    super( props );
    this.state = { username: null };
  }

  componentDidMount() {
    fetch( '/api/test' )
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
      <div className='App'>
        <WaterPipeBrowser />
      </div>
    );
  }
}
