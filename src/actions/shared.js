import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveQuestions, addVote, addNewQuestion } from './questions'
import { receiveUsers, addAnswer, addQuestion } from './users'
import { startLoading, stopLoading } from './loading'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData(){
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(startLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(stopLoading())
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
        alert('Error in submitting answer. Try again')
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
    dispatch(showLoading())

    return saveQuestion(params)
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addNewQuestion(question))
        dispatch(hideLoading())
      })
      .catch((e) => {
        alert('Error! try again')
      })
  }
}