import React from 'react';
import { PropTypes } from 'prop-types'
import { View, Button } from 'react-native'
// import { sanitize } from 'App/Theme/Utils'
import styles from './styles';

const Answers = ({ answers, onChooseOne }) => {
  if (!answers) return null
  return (
    <View >
      {answers.map((question, i) => (
        <View
          style={styles.buttonContainer}
          key={i}
        >
          <Button
            onPress={() => onChooseOne(question)}
            title={question}
          />
        </View>
      ))}
    </View>
  );
};

Answers.propsTypes = {
  answers: PropTypes.array,
  onChooseOne: PropTypes.func,
}

export default Answers;