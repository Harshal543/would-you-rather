import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import HomePage from './HomePage'
import NavBar from './NavBar'
import NewQuestion from './NewQuestion'
import Question from './Question'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import PageNotFound from './PageNotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <LoadingBar />
          <div className="App">
            {this.props.loading === true ? null
              : this.props.authedUser === null ? <Login /> //checking if user is set
                  :<Switch>{/*match for only one route*/}
                    <Route exact path='/' component={HomePage} />
                    <Route path='/questions/:id' component={Question} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route component={PageNotFound} />{/*no routes match*/}
                  </Switch>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ loading, authedUser }) {
  return {
    loading,
    authedUser,
  }
}

export default connect(mapStateToProps)(App);
