import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/shared'
import { OPTION_ONE, OPTION_TWO } from '../utils/helper'

class UnansweredQuestion extends Component{
  onHandleSubmit = (qid,optionSelected) => {
    this.props.dispatch(handleSaveAnswer(qid,optionSelected))
  }
  render(){
    const { id, users, question } = this.props
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
              <div className="row center">
                <h5 className="col s12">Would you rather..</h5>
                <button className="btn col m6 offset-m3"
                  onClick = {(e) => this.onHandleSubmit(id,OPTION_ONE)}>{question.optionOne.text}</button>
                <p className="col s12">OR</p>
                <button className="btn col m6 offset-m3"
                  onClick = {(e) => this.onHandleSubmit(id,OPTION_TWO)}>{question.optionTwo.text}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }){
  const question = questions[id]
  return{
      id,
      question: !question
        ? {}
        : question,
      users: !users
        ? {}
        : users,
    }
}

export default connect(mapStateToProps)(UnansweredQuestion);