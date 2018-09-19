import React, { Component } from 'react'
import { connect } from 'react-redux'

class UnansweredQuestions extends Component{
  render(){
  const { users, question } = this.props
    return(
      <div className="card">
        <div className="card-content">
          <span className="card-title">{users[question.author].name}</span>
          <p>{`@${question.author}`}</p>
        </div>
        <div className="card-action">
          <div className="row">
            <button className="btn col s6">{question.optionOne.text}</button>
            <button className="btn col s6">{question.optionTwo.text}</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser },{ id }){
  const question = questions[id]
  return (
    {
      question,
      users,
    }
  )
}

/*function hasAnsweredQuestion(id,answerId){
  let quesIdlen = answerId.length
  let newquesIdlen = answerId.filter((quesId) => quesId !== id).length
  if (quesIdlen === newquesIdlen){
    return false
  }
  return true
}*/

export default connect(mapStateToProps)(UnansweredQuestions);