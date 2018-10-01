import React , { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component{
  state ={
    userName : '',
    password : '',
    error : false,
  }

  handleChange = (value,target) => {
    target.id === 'user_name' ?
      this.setState(() => ({
        userName : value.trim(),
      }))
      : (target.id === 'password' &&
        this.setState(() => ({
          password : value,
        })))
  }

  handleError = () => {
    this.setState(() => ({
      error: true,
    }))
  }

  handleLogIn = () => {
    const { userName, password } = this.state
    const { userInfo } = this.props
    const userNames = Object.keys(userInfo)
    if(!userNames.includes(userName)){
      this.handleError()
      return 0
    }
    if(userInfo[userName].userPwd !== password){
      this.handleError()
      return 0
    }
    this.props.dispatch(setAuthedUser(userName))
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="card-panel row col m6 offset-m3" style={{padding:'7px 0 2% 0'}} >
            <div style={{color:'#fff',background:'#ee6e73',padding:'1% 0 1% 0',border:'1px solid #000'}}>
              <h5 className="center-align">Please Log In to continue..</h5>
            </div>
            <div>
              {this.state.error &&
                <span className="col s12 center-align" style={{color:'red'}} >Invalid Username or password</span>}
              <div className="input-field col m8 offset-m2">
                <input id="user_name" type="text"
                  value={this.state.userName}
                  onChange={(e) => this.handleChange(e.target.value,e.target)}/>
                <label htmlFor="user_name">User Name</label>
              </div>
              <div className="input-field col m8 offset-m2">
                <input id="password" type="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e.target.value,e.target)}/>
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn col m2 offset-m5" onClick = {() => this.handleLogIn()}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users}){
  const userIds = Object.keys(users)
  const userInfo = {}
  userIds.length !== 0 && userIds.map((user) =>
    userInfo[user] = {
      userName : users[user].name,
      userPwd : users[user].password,
  })
  return {
    userInfo: userInfo,
  }
}

export default connect(mapStateToProps)(Login);