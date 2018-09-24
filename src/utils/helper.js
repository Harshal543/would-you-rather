export const UNANS_QUES = 'Unanswered Questions'
export const ANS_QUES = 'Answered Questions'

export function hasAnsweredQuestion(id,answerId){
  const quesIdlen = answerId.length
  const newquesIdlen = answerId.filter((quesId) => quesId !== id).length
  if (quesIdlen === newquesIdlen){
    return false
  }
  return true
}
