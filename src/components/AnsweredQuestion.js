import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OPTION_ONE, OPTION_TWO } from '../utils/helper'
import '../css/answedques.css'

class AnsweredQuestion extends Component{
  render(){
    const { users, question, authedUser } = this.props
    const authedUserResponse = users[authedUser].answers[question.id]
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercent = round(optionOneVotes,totalVotes)
    const optionTwoPercent = round(optionTwoVotes,totalVotes)
    return(
      <div className="container">
        <div className="row">
          <div className="card col m8 offset-m2">
            <div className="card-content">
              <div className="row">
                <div className="col s2">
                  <img src={users[question.author].avatarURL}
                    alt={`img of ${users[question.author].name}`}
                    className="circle responsive-img"
                  />
                </div>
                <div className="col s10">
                  <span className="card-title">{users[question.author].name} asks...</span>
                  <p>{`@${question.author}`}</p>
                </div>
              </div>
              <hr />
              <div className="container">
              <div className="row center">
                <h5 className="left-align">Result:</h5>
                <div className="box row z-depth-1">
                  { authedUserResponse === OPTION_ONE &&
                      <p style={{color : '#ee6e73'}}><b>Your response</b></p>}
                  <div className="col s12">
                    <h5 className="opt-text"><b>Would you rather {question.optionOne.text} ..?</b></h5>
                    <h5>{optionOnePercent}%</h5>
                  </div>
                  <div className="progress col s10 offset-s1">
                      <div className="determinate" style={{width:`${optionOnePercent}%`}}></div>
                  </div>
                  <div className="col s12">
                    <p>{optionOneVotes} out of {totalVotes} votes</p>
                  </div>
                </div>
                <div className="box row z-depth-1">
                  { authedUserResponse === OPTION_TWO &&
                      <p style={{color : '#ee6e73'}}><b>Your response</b></p>}
                  <div className="col s12">
                    <h5 className="opt-text"><b>Would you rather {question.optionTwo.text} ..?</b></h5>
                    <h5>{optionTwoPercent}%</h5>
                  </div>
                  <div className="progress col s10 offset-s1">
                      <div className="determinate" style={{width:`${optionTwoPercent}%`}}></div>
                  </div>
                  <div className="col s12">
                    <p>{optionTwoVotes} out of {totalVotes} votes</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function round(optionVotes,totalVotes){
  return Math.round(((optionVotes*100/totalVotes) + 0.00001) * 100) / 100
}

function mapStateToProps({ questions, users, authedUser }, { id }){
  const question = questions[id]
  return{
      question: !question
        ? {}
        : question,
      users: !users
        ? {}
        : users,
      authedUser,
    }
}


export default connect(mapStateToProps)(AnsweredQuestion)