import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, addVote } from './questions'
import { receiveUsers, addAnswer } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'johndoe'

export function handleInitialData(){
  return (dispatch) =>{
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveAnswer(qid,optionSelected){
  return (dispatch, getState) =>{
    const { authedUser } = getState()
    const params ={
      authedUser,
      qid,
      answer: optionSelected,
    }
    dispatch(showLoading())

    return saveQuestionAnswer(params)
      .then(()=>{
        dispatch(addAnswer(params))
        dispatch(addVote(params))
        dispatch(hideLoading())
      })
  }
}