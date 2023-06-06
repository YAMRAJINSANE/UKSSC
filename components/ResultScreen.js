import { View, Text } from 'react-native'
import React from 'react'

const ResultScreen = ({route}) => {
 const {userAnswers}  = route.params
    console.log(userAnswers,"from ")
  return (
    <View>
      <Text>ResultScreen</Text>
    </View>
  )
}

export default ResultScreen