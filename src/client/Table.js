import React, { Component } from 'react';
import './table.css';

export default class Table extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      records: null
    }
  }

  componentDidMount() {
    fetch( '/api/getCategories' )
      .then( response => response.json() )
      .then( result => {
        console.log( result );
        //this.setState({ table: result });
      });
  }

  render() {
    return (
      <div>
        {this.state.records ? (
          <table className='Table'>
          </table>
        ) : (
          <h1>Loading Table component.. please wait!</h1>
        )}
      </div>
    );
  }
}
