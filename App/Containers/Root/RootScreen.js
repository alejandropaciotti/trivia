import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import MainScreen from 'App/Containers/MainScreen/MainScreen'
import TriviaScreen from 'App/Containers/Trivia/TriviaScreen'

const AppNav = createStackNavigator(
  {
    MainScreen: MainScreen,
    TriviaScreen: TriviaScreen,
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  }
)

class RootScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNav
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

export default RootScreen
