import React from 'react'
import { Text, View, Button } from 'react-native'

import Style from './MainScreenStyle'

const MainScreen = ({ navigation }) => (
  <View style={Style.container}>

    <Text style={Style.title}>Crowdbotics challenge</Text>
    <Text style={Style.text}>A Trivia quiz app</Text>
    <Button
      onPress={() => navigation.navigate('TriviaScreen')}
      title='START QUIZ'
    />
  </View>
)

export default MainScreen
