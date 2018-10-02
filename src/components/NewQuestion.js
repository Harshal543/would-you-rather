import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { OPTION_ONE, OPTION_TWO } from '../utils/helper'
import { handleAddQuestion } from '../actions/shared'


class NewQuestion extends Component{
  state = {
    optionOneText : '',
    optionTwoText : '',
    submitStatus : false,
  }

  handleSubmit = (btn) =>{
    btn.disabled = true // prevent multiple submissions
    let { optionOneText, optionTwoText } = this.state
    optionOneText = optionOneText.trim()
    optionTwoText = optionTwoText.trim()
    optionOneText !== '' && optionTwoText !== '' &&
      this.props.dispatch(handleAddQuestion(optionOneText,optionTwoText))

    this.setState(() => ({
      submitStatus : true
    }))

    setTimeout(() => {
      btn.disabled = false
    },1000)
  }

  handleChange = (optionText,inputBox) => {
    (inputBox === OPTION_ONE) ?
      this.setState(() => ({
        optionOneText : optionText
      }))
      : (
        inputBox === OPTION_TWO &&
          this.setState(() => ({
            optionTwoText : optionText
          }))
      )
  }

  handleClear = () => {
    this.setState(() => ({
      optionOneText : '',
      optionTwoText : '',
    }))
  }

  render(){
    return(
      <div className="container">
        {/*If submitted question redirect to home*/}
        {this.state.submitStatus && <Redirect to='/' />}
        <h4 className="center-align red-text text-accent-3">Ask New Question</h4>
        <div className="row">
          <div className="card-panel row z-depth-1 center col m8 offset-m2"
            style={{border:'1px solid #ee6e73',borderRadius:'10px',paddingBottom:'2%'}}>
            <h5><b>Would you rather?</b></h5>
            <div className="input-field col m10 offset-m1">
              <input id="option_one" type="text"
                value={this.state.optionOneText}
                onChange={(e) => this.handleChange(e.target.value,OPTION_ONE)}/>
              <label htmlFor="option_one">Option 1</label>
            </div>
            <h6 className="col s12">Or</h6>
            <div className="input-field col m10 offset-m1">
              <input id="option_two" type="text"
                value={this.state.optionTwoText}
                onChange={(e) => this.handleChange(e.target.value,OPTION_TWO)}/>
              <label htmlFor="option_two">Option 2</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m8 offset-m2">
            <button className="btn left" onClick={() => this.handleClear()}>Clear</button>
            <button className="btn right" onClick={(e) => this.handleSubmit(e.target)}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(NewQuestion)