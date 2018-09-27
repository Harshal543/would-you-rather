import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OPTION_ONE, OPTION_TWO } from '../utils/helper'
import { handleAddQuestion } from '../actions/shared'


class NewQuestion extends Component{
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  onHandleSubmit = () =>{
    let { optionOneText, optionTwoText } = this.state
    optionOneText = optionOneText.trim()
    optionTwoText = optionTwoText.trim()
    optionOneText !== '' && optionTwoText !== '' &&
      this.props.dispatch(handleAddQuestion(optionOneText,optionTwoText))
  }

  onHandleChange = (optionText,inputBox) =>{
    inputBox === OPTION_ONE ?
      this.setState(() => ({
        optionOneText: optionText
      }))
      : (
        inputBox === OPTION_TWO &&
          this.setState(() => ({
            optionTwoText: optionText
          }))
      )
  }

  render(){

    return(
      <div className="container">
        <h4 className="center-align red-text text-accent-3">Ask New Question</h4>
        <div className="row">
          <div className="box row z-depth-1 center"  style={{background:'#fff'}}>
            <h5><b>Would you rather?</b></h5>
            <div className="input-field col m6 offset-m3">
              <input id="option_one" type="text"
                value={this.state.optionOneText}
                onChange={(e) => this.onHandleChange(e.target.value,OPTION_ONE)}/>
              <label htmlFor="option_one">Option 1</label>
            </div>
            <h6 className="col s12">Or</h6>
            <div className="input-field col m6 offset-m3">
              <input id="option_two" type="text"
                value={this.state.optionTwoText}
                onChange={(e) => this.onHandleChange(e.target.value,OPTION_TWO)}/>
              <label htmlFor="option_two">Option 2</label>
            </div>
          </div>
        </div>
        <button className="btn right" onClick={(e) => this.onHandleSubmit()}>Add</button>
      </div>
    )
  }
}

export default connect()(NewQuestion)