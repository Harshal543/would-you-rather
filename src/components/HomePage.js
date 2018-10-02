import React, { Component } from 'react'
import QuestionList from './QuestionList'
import { ANS_QUES, UNANS_QUES } from '../utils/helper'

class HomePage extends Component{
  state = {
    QuestionType : UNANS_QUES,
  }

  toggleQuestionList = (questionToggle) =>{ // change state to toggle question list
    this.setState(() => ({
      QuestionType : questionToggle,
    }))
  }

  render(){
    const questionList = this.state.QuestionType
    return(
      <div>
        <div className="container">
          <ul className="pagination center"
            onClick = {(event) => onHandleToggle(event.target,this.state.questionList,this.toggleQuestionList)} >
            <li className="waves-effect active" style={{border:'1px solid #000'}}><a>{UNANS_QUES}</a></li>
            <li className="waves-effect" style={{border:'1px solid #000'}}><a>{ANS_QUES}</a></li>
          </ul>

          <div className="row">
            <QuestionList QuestionType = {questionList} />
          </div>
        </div>
      </div>
    )
  }
}

const onHandleToggle = (target,state,toggleFunc) =>{ //handling toggle
  const value = target.innerHTML
  const UL = target.parentElement.parentElement
  const parentLi = target.parentElement
  const CLASS_ACTIVE = "waves-effect active"
  const CLASS = "waves-effect"

  if(value !== state){
    UL.firstChild.className = CLASS
    UL.lastChild.className = CLASS
    parentLi.className = CLASS_ACTIVE
    toggleFunc(value)
  }
}

export default HomePage;