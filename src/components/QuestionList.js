import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ANS_QUES, UNANS_QUES, hasAnsweredQuestion } from '../utils/helper'
import PollView from './PollView'

class QuestionList extends Component{
  render(){
    const { QuestionIds, AnswerIds, QuestionType } = this.props
    return(
      <div>
        {/*<h4 className="center" >{QuestionType}</h4>*/}
        { QuestionType === UNANS_QUES && (
            QuestionIds.map((id) => (
              !hasAnsweredQuestion(id,AnswerIds) &&
              <div key={id} className="col m8 offset-m2">
                <PollView id={id} />
              </div>
            )))
        }
        { QuestionType === ANS_QUES && (
            QuestionIds.map((id) => (
              hasAnsweredQuestion(id,AnswerIds) &&
              <div key={id} className="col m8 offset-m2 ">
                <PollView id={id} />
              </div>
            )))
        }
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser },{QuestionType}){
  let quesAns = []
  if(users[authedUser]){
    quesAns = Object.keys(users[authedUser].answers)
  }
  return {
    QuestionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    AnswerIds: quesAns,
    QuestionType,
  }
}

export default connect(mapStateToProps)(QuestionList);