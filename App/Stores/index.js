import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as TriviaReducer } from './Trivia/Reducers'

export default () => {
  const rootReducer = combineReducers({
    trivia: TriviaReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
