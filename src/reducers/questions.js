import { RECEIVE_QUESTIONS, ADD_VOTES, ADD_NEW_QUESTION } from '../actions/questions'

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
    case ADD_NEW_QUESTION :
      const { id, timestamp, author, optionOne, optionTwo } = action
      return {
        ...state,
        [id] : {
          id,
          timestamp,
          author,
          optionOne,
          optionTwo,
        }
      }
    default :
      return state
  }
}