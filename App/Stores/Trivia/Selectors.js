import { List } from 'immutable'

export const anyQuestionAnswered = (state) => {
  const anyQuestionAnswered = state.trivia.get('currentQuestionId') !== null
  return anyQuestionAnswered
}

export const getCurrentQuestion = (state) => {
  if (state.trivia.get('questions').isEmpty()) return List()
  const currentQuestionId = state.trivia.get('currentQuestionId')
  return state.trivia.getIn(['questions', currentQuestionId])
}

const swap = (a, i, j) => (
  a.map((x, y) => {
    if (y === i) return a[j]
    if (y === j) return a[i]
    return x
  })
)

export const answers = (state) => {
  if (state.trivia.get('questions').isEmpty()) return null
  const currentQuestionId = state.trivia.get('currentQuestionId')
  let answers = [
    state.trivia.getIn(['questions', currentQuestionId, 'correct_answer']),
    ...state.trivia.getIn(['questions', currentQuestionId, 'incorrect_answers'])
  ]
  randomIncorrect = parseInt(Math.random() * (answers.length - 1) - 0)
  unorderedAnswers = swap(answers, 0, randomIncorrect)
  return unorderedAnswers
}

export const score = (state) => {
  if (state.trivia.get('questions').isEmpty()) return null
  return questions = state.trivia.get('questions').toJS().filter((e) => e.correct).length
}