import React, { Component } from 'react'
import UnansweredQuestions from './UnansweredQuestions'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

class HomePage extends Component{
  render(){
    const { QuestionIds, AnswerIds } = this.props
    return(
      <div>
        <nav>
          <div className="nav-wrapper cyan darken-4">
            <a href="home" className="brand-logo left">Would You Rather</a>
            <ul id="nav-mobile" className="right">
              {/*<li><Link >Unanswered</Link></li>
                          <li><Link >Answered</Link></li>
                          <li><Link >Leaderboard</Link></li>
                          <li><Link >Logout</Link></li>*/}
              <li><a >Unanswered</a></li>
              <li><a >Answered</a></li>
              <li><a >Leaderboard</a></li>
              <li><a >Logout</a></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            {QuestionIds.map((id) => (
              hasAnsweredQuestion(id,AnswerIds) &&
              <div key={id} className="col m6 offset-m3">
                <UnansweredQuestions id={id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function hasAnsweredQuestion(id,answerId){
  let quesIdlen = answerId.length
  let newquesIdlen = answerId.filter((quesId) => quesId !== id).length
  if (quesIdlen === newquesIdlen){
    return false
  }
  return true
}

function mapStateToProps ({ questions, users, authedUser }){
  let quesAns = []
  if(users[authedUser]){
    quesAns = Object.keys(users[authedUser].answers)
  }
  return {
    QuestionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    AnswerIds: quesAns,
  }
}

export default connect(mapStateToProps)(HomePage);