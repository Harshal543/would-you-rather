export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveUsers(users){
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addQuestion ({id, author}){
  return{
    type: ADD_QUESTION,
    id,
    author,
  }
}


export function addAnswer({authedUser, qid, answer}){
  return{
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}