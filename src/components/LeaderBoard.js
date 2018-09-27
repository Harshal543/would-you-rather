import React , { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component{
  render(){
    return(
      <p>leaderboard</p>
    )
  }
}

function mapStateToProps({users}){
  const userIds = Object.keys(users)
  const score = {}
  users &&
    userIds.map((user) =>(
        score[user] = /*Object.key(users[user].answers).length +*/ users[user].questions.length
    ))
  console.log(score)
  return score
}

export default connect(mapStateToProps)(LeaderBoard)