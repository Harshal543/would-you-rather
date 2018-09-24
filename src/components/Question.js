import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hasAnsweredQuestion } from '../utils/helper'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'

class Question extends Component{
  render(){
    const { id, AnswerIds, questions } = this.props
    return(
      questions[id] ?
        (hasAnsweredQuestion(id,AnswerIds) ? <AnsweredQuestion id={id} />
          : <UnansweredQuestion id={id}/>)
        :<h5 className="center-align" >Question not found</h5>
    )
  }
}

function mapStateToProps({users, authedUser, questions},props){
  const { id } = props.match.params
  const quesAns = Object.keys(users[authedUser].answers)
  return{
    id,
    questions,
    AnswerIds: quesAns,
  }
}

export default connect(mapStateToProps)(Question)