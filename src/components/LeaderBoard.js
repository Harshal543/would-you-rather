import React , { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component{
  render(){
    const { userIds, userDetails, authedUser } = this.props
    return(
      <div className="container">
        <div className="row">
          <h4 className="center-align red-text text-accent-3">Leaderboard</h4>
            {userIds.map((user,rank) => (// Showing only top three Leaders
              <div key={user} className="card-panel col m6 offset-m3">
                <div className="row">
                  <div className="col s3">
                    <h4 className="rank-no center-align" style={{color:'#fff',background:'#ffd600'}}>#{rank+1}</h4>
                    <div className="avatar col s11">
                      <br />
                      <img src={userDetails[user].avatarURL}
                        alt={`img of ${userDetails[user].name}`}
                        className="circle responsive-img"/>
                    </div>
                  </div>
                  <div className="details col 9 section">
                    <div className="user-details">
                      <h5 className="title" style={{marginBottom:'-10%'}}>{userDetails[user].name}</h5>
                      <p>@{user}</p>
                    </div>
                    <div className="divider col s12"></div>
                    <div className="score-details section">
                      <h6>Score: {userDetails[user].score}</h6>
                      <h6>Answered Questions: {userDetails[user].answeredQuestion}</h6>
                      <h6>Questions Asked: {userDetails[user].questionsAsked}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!userIds.includes(authedUser) && ( // if user is not in top three
              <div className="card-panel col m6 offset-m3">
                <h5 className="center-align red-text text-accent-3">You</h5>
                <div className="row">
                  <div className="col s3">
                    <div className="avatar col s11">
                      <br />
                      <img src={userDetails[authedUser].avatarURL}
                        alt={`img of ${userDetails[authedUser].name}`}
                        className="circle responsive-img"/>
                    </div>
                  </div>
                  <div className="details col 9 section">
                    <div className="user-details">
                      <h5 className="title" style={{marginBottom:'-10%'}}>{userDetails[authedUser].name}</h5>
                      <p>@{authedUser}</p>
                    </div>
                    <div className="divider col s12"></div>
                    <div className="score-details section">
                      <h6>Score: {userDetails[authedUser].score}</h6>
                      <h6>Answered Questions: {userDetails[authedUser].answeredQuestion}</h6>
                      <h6>Questions Asked: {userDetails[authedUser].questionsAsked}</h6>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    )
  }
}

function getUserDetails(userIds,users,authedUser){// creating user details object
  const userDetails = {}
  !userIds.includes(authedUser) && userIds.push(authedUser) // pushing authorized user if notin top three
  userIds.map((user) =>(
    userDetails[user] = {
      id: user,
      name : users[user].name,
      avatarURL : users[user].avatarURL,
      answeredQuestion : Object.keys(users[user].answers).length,
      questionsAsked : users[user].questions.length,
      score : Object.keys(users[user].answers).length + users[user].questions.length
    }
  ))
  return userDetails
}

function mapStateToProps({users,authedUser}){
  const userIds = Object.keys(users)
  let topThreeUserIds = []
  const score = {}
  users &&
    userIds.map((user) =>(
      score[user] = Object.keys(users[user].answers).length + users[user].questions.length
    ))
  topThreeUserIds = userIds.sort((a,b) => score[b] - score[a]).slice(0,3)
  const userDetails = getUserDetails(topThreeUserIds,users,authedUser)
  return {
    authedUser,
    userIds : topThreeUserIds,
    userDetails,
  }
}

export default connect(mapStateToProps)(LeaderBoard)