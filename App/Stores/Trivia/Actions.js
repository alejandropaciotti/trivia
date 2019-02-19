import { createActions } from 'reduxsauce'
import Reactotron from 'reactotron-react-native'

const { Types, Creators } = createActions({
  fetchQuestions: null,
  fetchQuestionsLoading: null,
  fetchQuestionsSuccess: ['questions'],
  fetchQuestionsFailure: ['errorMessage'],
  start: null,
  questionAnswered: (payload) => ({ type: 'QUESTION_ANSWERED', payload }),
  moveNext: null,
  finished: null,
  restart: null,
})

export const QuestionsTypes = Types
export default Creators
