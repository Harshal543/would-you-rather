import { RECEIVE_QUESTIONS, ADD_VOTES } from '../actions/questions'

function votes(state = {}, action) {
  switch(action.type){
    case ADD_VOTES :
      const { authedUser } = action
      return{
        ...state,
        votes : state.votes.concat([authedUser])
      }
      default :
        return state
  }
}

function question(state = {}, action){
  switch(action.type){
    case ADD_VOTES :
      const { answer } = action
      return{
        ...state,
        [answer] : votes(state[answer],action)
      }
    default :
      return state
  }
}

export default function questions(state = {} ,action){
  switch(action.type){
    case RECEIVE_QUESTIONS :
      return{
        ...state,
        ...action.questions,
      }
    case ADD_VOTES :
      const { qid } = action
      return{
        ...state,
        [qid] : question(state[qid],action)

      }
    default :
      return state
  }
}