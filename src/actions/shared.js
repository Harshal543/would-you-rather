import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveQuestions, addVote, addNewQuestion } from './questions'
import { receiveUsers, addAnswer, addQuestion } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'johndoe'

export function handleInitialData(){
  return (dispatch) => {
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
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const params = {
      authedUser,
      qid,
      answer: optionSelected,
    }
    dispatch(showLoading())

    return saveQuestionAnswer(params)
      .then(() => {
        dispatch(addAnswer(params))
        dispatch(addVote(params))
        dispatch(hideLoading())
      })
      .catch((e) => {
        alert('error')
      })
  }
}

export function handleAddQuestion(optionOneText,optionTwoText){
  return (dispatch,getState) => {
    const { authedUser } = getState()
    const params = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    }

    return saveQuestion(params)
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addNewQuestion(question))
        dispatch(hideLoading())
      })
  }
}