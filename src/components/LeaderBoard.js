import React , { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component{
  render(){
    const { userIds, userDetails } = this.props
    return(
      <div className="container">
        <div className="row">
          <h4 className="center-align red-text text-accent-3">Leaderboard</h4>
          <div className="card-panel col m8 offset-m2">
            <ul className="collection">
              {userIds.map((user,i) => (
                <li key={user} className="collection-item">
                  <div className="row">
                    <h4 className="col s2" style={{color:'#ffd600'}}>#{i+1}</h4>
                    <div className="avatar col s1">
                      <h5></h5>
                      <img src={userDetails[user].avatarURL}
                        alt={`img of ${userDetails[user].name}`}
                        className="circle responsive-img"
                      />
                    </div>
                    <div className="details col 8">
                      <h5 className="title">{userDetails[user].name}</h5>
                      <p>@{user}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function getUserDetails(userIds,users){
  const topThreeUserDetails = {}
  userIds.map((user) =>(
    topThreeUserDetails[user] = {
      id: user,
      name : users[user].name,
      avatarURL : users[user].avatarURL,
      answeredQuestion : Object.keys(users[user].answers).length,
      questionsAsked : users[user].questions.length,
      score : Object.keys(users[user].answers).length + users[user].questions.length
    }
  ))
  return topThreeUserDetails
}

function mapStateToProps({users}){
  const userIds = Object.keys(users)
  let topThreeUserIds = []
  const score = {}
  users &&
    userIds.map((user) =>(
      score[user] = Object.keys(users[user].answers).length + users[user].questions.length
    ))
  topThreeUserIds = userIds.sort((a,b) => score[b] - score[a]).slice(0,3)
  const userDetails = getUserDetails(topThreeUserIds,users)
  return {
    userIds: topThreeUserIds,
    userDetails,
  }
}

export default connect(mapStateToProps)(LeaderBoard)