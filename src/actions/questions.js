export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_VOTES = 'ADD_VOTES'

export function receiveQuestions(questions){
  return{
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addVote(info){
  return{
    type: ADD_VOTES,
    info,
  }
}