import { RECEIVE_USERS, ADD_ANSWER } from '../actions/users'

function answers(state = {}, action){
  switch(action.type){
    case ADD_ANSWER:
      const { qid, answer } = action
      return{
        ...state,
        [qid]: answer,
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
        answers: answers(state[answers],action),
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
    case ADD_ANSWER:
      const { authedUser } = action
      return{
        ...state,
        [authedUser]: user(state[authedUser],action),
      }
    default :
      return state
  }
}