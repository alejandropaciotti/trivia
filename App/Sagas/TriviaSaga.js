import { put, call } from 'redux-saga/effects'
import { TOTAL_QUESTIONS } from 'App/Config'
import TriviaActions from 'App/Stores/Trivia/Actions'
import { triviaService } from 'App/Services/TriviaService'

export function* fetchQuestions() {
  yield put(TriviaActions.fetchQuestionsLoading())

  const questions = yield call(triviaService.fetchQuestions)
  if (questions) {
    yield put(TriviaActions.fetchQuestionsSuccess(questions))
    yield put(TriviaActions.start())
  } else {
    yield put(
      TriviaActions.fetchQuestionsFailure('There was an error while fetching questions informations.')
    )
  }
}

export function* moveNext({ payload: { currentQuestionId } }) {
  if (currentQuestionId === (TOTAL_QUESTIONS-1)) {
    yield put(TriviaActions.finished())
  } else {
    yield put(TriviaActions.moveNext())
  }
}

export function* restart() {
  yield put(TriviaActions.fetchQuestions())
}