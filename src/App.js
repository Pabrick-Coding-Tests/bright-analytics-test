import React, { Component } from 'react';
import './App.css';
import { Branch } from './class/Branch';

class App extends Component {

  state = {
    tree: {},
    rows: [],
    colums: []
  };

  componentWillMount() {
    const data = require('./data/tree.json');
    const tree = new Branch(data);
    this.setState({ tree: tree });
  }


  render() {
    console.log(this.state.tree.extractValueFromTree(["PPC - Brand", "2016-10-10 (Mon)"], 141));

    const columnsTitles = this.state.tree.getColumns().map( (column, i) => {
      return (<td key={column + i}>{column}</td>);
    } );

    const columns = (row) => {
      return this.state.tree.getColumns().map( (column, i) => {
        return (<td key={column + i}>{ this.state.tree.extractValueFromTree([row, column], 141) }</td>);
      } );
    };

    const rows = this.state.tree.getRows().map( (row, i) => {
      return (
        <tr>
          <td key={row + i}>{ row }</td>
          { columns(row) }
          <td>?</td>
        </tr>
      );
    } );

    return (
      <div className="App">
        <table border="1">
          <thead>
            <tr>
              <td></td>
              { columnsTitles }
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>

      </div>
      );
  }
}

export default App;
