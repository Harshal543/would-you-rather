import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import HomePage from './HomePage'
// import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        <div className="App">
          <HomePage />
        </div>
    );
  }
}

export default connect()(App);
