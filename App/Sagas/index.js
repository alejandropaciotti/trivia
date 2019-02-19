import { takeLatest } from 'redux-saga/effects'
import { QuestionsTypes } from 'App/Stores/Trivia/Actions'
import { fetchQuestions, moveNext, restart } from './TriviaSaga'

export default function* root() {
  yield [
    takeLatest(QuestionsTypes.FETCH_QUESTIONS, fetchQuestions),
    takeLatest(QuestionsTypes.QUESTION_ANSWERED, moveNext),
    takeLatest(QuestionsTypes.RESTART, restart)
  ]
}
