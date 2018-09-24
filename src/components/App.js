import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import HomePage from './HomePage'
import NavBar from './NavBar'
import Question from './Question'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <div className="App">
            <NavBar />
            <LoadingBar />
            {this.props.loading === true ? <h4>Loading..</h4>
              : <div>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/questions/:id' component={Question} />
                </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
