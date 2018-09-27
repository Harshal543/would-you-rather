import { RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION } from '../actions/users'

function answers(state = {}, action){
  switch(action.type){
    case ADD_ANSWER:
      const { qid, answer } = action
      return{
        ...state,
        [qid] : answer,
      }
    default :
      return state
  }
}

function user(state = {}, action) {
  switch(action.type){
    case ADD_ANSWER:
      return{
        ...state,
        answers : answers(state.answers,action),
      }
    case ADD_QUESTION :
      const { id } = action
      return{
        ...state,
        questions : state.questions.concat([id])
      }
    default :
      return state
  }
}

export default function users(state = {}, action){
  switch(action.type){
    case RECEIVE_USERS :
      return{
        ...state,
        ...action.users
      }
    case ADD_ANSWER :
      const { authedUser } = action
      return{
        ...state,
        [authedUser] : user(state[authedUser],action),
      }
    case ADD_QUESTION :
      const { author } = action
      return{
        ...state,
        [author] : user(state[author],action)
      }
    default :
      return state
  }
}