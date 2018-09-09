import React, { Component } from 'react';
import { getInitialData } from '../utils/api'

class App extends Component {
  componentDidMount(){
    getInitialData()
      .then(({users,questions}) => {
        console.log("Users:", users)
        console.log("questions:", questions)
      })
  }
  render() {
    return (
      <div className="App">
        APPPPPPPP
      </div>
    );
  }
}

export default App;
