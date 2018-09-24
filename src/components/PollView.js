import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PollView extends Component{
  render(){
    const { users, question, id } = this.props
    return(
      <div className="card">
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
            <li className="col m3 offset-m3">{question.optionOne.text}</li>
            <li className="col m3">{question.optionTwo.text}</li>
          </div>
        </div>
        <div className="card-action">
          <div className="row">
            <Link to={`/questions/${id}`} >
              <button className="btn col m6 offset-m3">View Poll</button>
            </Link>
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
      id,
      question,
      users,
    }
  )
}


export default connect(mapStateToProps)(PollView)