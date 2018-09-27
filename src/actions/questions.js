export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_VOTES = 'ADD_VOTES'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addNewQuestion({id, timestamp, author, optionOne, optionTwo}){
  return{
    type: ADD_NEW_QUESTION,
    id,
    timestamp,
    author,
    optionOne,
    optionTwo,
  }
}

export function addVote({authedUser, qid, answer}){
  return{
    type: ADD_VOTES,
    authedUser,
    qid,
    answer,
  }
}