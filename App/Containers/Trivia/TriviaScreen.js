import React from 'react'
import { Text, View, Alert, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { TOTAL_QUESTIONS } from 'App/Config'
import Answers from 'App/Components/Answers/Answers'
import QuestionActions from 'App/Stores/Trivia/Actions'
import { getCurrentQuestion, answers, score } from 'App/Stores/Trivia/Selectors'
import Style from './TriviaScreenStyle'
import Reactotron from 'reactotron-react-native'

class TriviaScreen extends React.Component {
  componentDidMount() {
    this.props.fetchQuestions()
  }

  componentWillReceiveProps({ finished, endTime, startTime }) {
    if (finished && !this.props.finished) {
      const timeSpent = moment.utc(moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(moment(startTime, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
      const message = `GAME OVER. Your score is: ${this.props.score} . Time elapsed: ${timeSpent} `
      Alert.alert(
        message,
        'Play again ?',
        [
          {
            text: 'YES',
            onPress: () => this.props.restart()
          },
          {
            text: 'NO',
            onPress: () => { BackHandler.exitApp(); this.props.restart(); }
          },
        ],
        { cancelable: false },
      )
    }
    else return null;
  }
  questionAnswered(answer) {
    const { currentQuestion, score } = this.props
    const correct_answer = currentQuestion.get('correct_answer')

    if (!this.props.finished) {
      Alert.alert(
        answer === correct_answer ? 'Correct !' : 'Incorrect.',
        `The correct answers is: ${correct_answer}`,
        [
          {
            text: 'NEXT',
            onPress: () => {
              this.props.questionAnswered({ answer, currentQuestionId: this.props.currentQuestionId });
            }
          },
        ],
        { cancelable: false },
      )
    }
  }


  render() {
    let { questionsIsLoading, error, currentQuestion } = this.props
    let question = currentQuestion.get('question')
    Reactotron.log(questionsIsLoading)

    return (
      <View style={Style.container}>
        <Text style={Style.title}>Trivia Page</Text>
        <Text style={Style.text}>{`Question ${this.props.currentQuestionId + 1} of ${TOTAL_QUESTIONS}`}</Text>
        {questionsIsLoading & !error ? <Text style={Style.title}>Data are loading...</Text> :
          <View>
            <View style={Style.answerContainer}>
              <Text style={Style.title}>{question}</Text>
              <Answers
                answers={this.props.answers}
                onChooseOne={(answer) => this.questionAnswered(answer)}
              />
            </View>
            {this.props.score !== null ? (
              <View>
                <Text style={Style.text}>
                  {`Your score is  ${this.props.score}.`}
                </Text>
              </View>
            ) : null}
          </View>
        }
      </View>
    )
  }
}

TriviaScreen.propsTypes = {
  questions: PropTypes.array,
  questionsIsLoading: PropTypes.bool,
  questionsErrorMessage: PropTypes.string,
  currentQuestion: PropTypes.object,
  currentQuestionId: PropTypes.number,
  answers: PropTypes.array,
  score: PropTypes.number,
  finished: PropTypes.bool,
  fetchQuestions: PropTypes.func,
  questionAnswered: PropTypes.func,
  moveNext: PropTypes.func,
  restart: PropTypes.func,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
}

const mapStateToProps = (state) => ({
  questions: state.trivia.get('questions').toJS(),
  questionsIsLoading: state.trivia.get('questionsIsLoading'),
  questionsErrorMessage: state.trivia.get('questionsErrorMessage'),
  currentQuestion: getCurrentQuestion(state),
  currentQuestionId: state.trivia.get('currentQuestionId'),
  answers: answers(state),
  score: score(state),
  finished: state.trivia.get('finished'),
  startTime: state.trivia.get('startTime'),
  endTime: state.trivia.get('endTime'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(QuestionActions.fetchQuestions()),
  questionAnswered: (item) => dispatch(QuestionActions.questionAnswered(item)),
  moveNext: () => dispatch(QuestionActions.moveNext()),
  restart: () => dispatch(QuestionActions.restart()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TriviaScreen)
