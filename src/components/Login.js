import React , { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component{
  handleChange = (e,value) => {
    this.props.dispatch(setAuthedUser(value))
  }
  render(){
    const { userName } = this.props
    const userIds = Object.keys(userName)
    return(
      <div className="container">
        <div className="row">
          <div className="card col m8 offset-m2" style={{height:'100px'}} >
              <h5 className="center-align">Please LogIn to continue..</h5>
              <select className="browser-default" value='' onChange={(e) => this.handleChange(e,e.target.value)} >
                <option value="" disabled>Choose your option</option>
                {userIds.map((user) =>
                  <option key={user} value={user}>{userName[user]}</option>
                  )
                }
              </select>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users}){
  const userIds = Object.keys(users)
  const userName = {}
  userIds.length !== 0 && userIds.map((user) =>
    userName[user] = users[user].name
  )
  return {
    userName,
  }
}

export default connect(mapStateToProps)(Login);