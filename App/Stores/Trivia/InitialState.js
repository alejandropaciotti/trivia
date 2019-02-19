import { Map, List } from 'immutable'
import moment from 'moment'

export const INITIAL_STATE = Map({
  questions: List(),
  questionsIsLoading: false,
  questionsErrorMessage: null,
  currentQuestionId: null,
  finished: false,
  startTime: null,
  endTime: null,
})
