import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { TOTAL_QUESTIONS } from 'App/Config'
import { QuestionsTypes } from './Actions'
import { List } from 'immutable'
import { sanitize } from 'App/Theme/Utils'
import moment from 'moment';

export const fetchQuestionsLoading = (state) =>
  state.merge({
    questionsIsLoading: true,
    questionsErrorMessage: null,
  })

export const fetchQuestionsSuccess = (state, { questions: { results } }) =>
  state.merge({
    questions: results.map((e, id) => ({ answered: false, id, ...e, question: sanitize(e.question), correct: false })),
    questionsIsLoading: false,
    questionsErrorMessage: null,
    currentQuestionId: 0,
  })

export const fetchQuestionsFailure = (state, { errorMessage }) =>
  state.merge({
    questions: List(),
    questionsIsLoading: false,
    questionsErrorMessage: errorMessage,
    currentQuestionId: null,
  })

export const start = (state) => state.merge({ startTime: moment()})

export const questionAnswered = (state, { payload: { answer} }) =>
  state.merge({
    questions: state
      .get('questions').toJS()
      .map((e, i) => i === state.get('currentQuestionId') ?
        { ...e, answered: true, correct: e.correct_answer === answer }
        :
        { ...e })
  })

export const moveNext = (state) =>
  state.merge({
    currentQuestionId: (TOTAL_QUESTIONS-1) <= state
      .get('currentQuestionId') ? (TOTAL_QUESTIONS - 1) : state.get('currentQuestionId') + 1,
  })

export const finished = (state) =>
  state.merge({
    finished: true,
    endTime: moment(new Date()),
  })

export const restart = (state) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [QuestionsTypes.FETCH_QUESTIONS_LOADING]: fetchQuestionsLoading,
  [QuestionsTypes.FETCH_QUESTIONS_SUCCESS]: fetchQuestionsSuccess,
  [QuestionsTypes.FETCH_QUESTIONS_FAILURE]: fetchQuestionsFailure,
  [QuestionsTypes.START]: start,
  [QuestionsTypes.QUESTION_ANSWERED]: questionAnswered,
  [QuestionsTypes.MOVE_NEXT]: moveNext,
  [QuestionsTypes.FINISHED]: finished,
  [QuestionsTypes.RESTART]: restart,
})
