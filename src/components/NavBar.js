import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAuthedUser } from '../actions/authedUser'

class NavBar extends Component {
  logoutUser = () => {
    this.props.dispatch(removeAuthedUser())
  }
  render(){
    const { userFirstName, userImg, authedUser } = this.props
    return(
      <nav>
        <div className="nav-wrapper cyan darken-4">
          {authedUser === null ? <a className="brand-logo center">Would You Rather</a>
            :
            <Fragment>
              <Link to='/'className="brand-logo left" style={{paddingLeft:'1%'}} >Would You Rather</Link>
              <ul id="nav-mobile" className="right">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/add'>New Question</Link></li>
                <li><Link to='/leaderboard'>Leaderboard</Link></li>
                <li style={{padding:'2% 5px 0 5px'}} ><img src={userImg} className="circle responsive-img" alt="user-img" style={{height:'35px',width:'35px'}} /></li>
                <li style={{padding:'0 5px 0 5px'}} ><span>Hi, {userFirstName}</span></li>
                <li><Link to='/' onClick={() => this.logoutUser()} >Logout</Link></li>
              </ul>
            </Fragment>
          }
        </div>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}){
  let userFirstName = ''
  let userImg = ''
  if(users[authedUser]){
    userFirstName = users[authedUser].name.split(" ",1)
    userImg = users[authedUser].avatarURL
  }
  return{
    userFirstName : !userFirstName ? []
      : userFirstName,
    userImg : !userImg ? []
      : userImg,
    authedUser,
  }
}

export default connect(mapStateToProps)(NavBar)