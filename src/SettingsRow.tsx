import React from 'react'
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native'
import Color from 'color'

const WIDTH = Dimensions.get('window').width

export interface Props {
  rowBackgroundColor: string
  rowHeight: number
  numberOfIcons: number
  circleColor: string
}

export interface State {
}

export const CIRCLE_SIZE = 40
export const MARGIN = 10

export default class SettingsRow extends React.Component<Props, State> {
  animatedValues: any
  constructor(props: Props) {
    super(props)
    this.animatedValues = this.generateAnimatedValues(this.props.numberOfIcons)
  }
  generateAnimatedValues = (quantity: number) => {

    const response = []
    for (let i = 0; i < quantity; i++) {
      response.push(new Animated.Value(0))
    }
    return response
  }
  Circle(index: number, color: string) {
    return (
      <Animated.View key={index} style={{
        backgroundColor: Color(color).darken(1.0 / this.props.numberOfIcons * index),
        position: 'absolute',
        left: (index * (CIRCLE_SIZE + MARGIN)),
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        alignSelf: 'center',
        borderRadius: CIRCLE_SIZE / 2,
        transform: [
          {
            scale: this.animatedValues && this.animatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]
      }} />
    )
  }

  animations = () => {
    const response = []
    for (let i = 0; i < this.props.numberOfIcons; i++) {
      response.push(
        Animated.spring(this.animatedValues[i], {
          toValue: 1,
          bounciness: 16,
          useNativeDriver: true
        })
      )
    }
    return response
  }

  componentDidMount() {
    Animated.sequence([
      Animated.delay(300),
      Animated.stagger(50, this.animations())
      // Animated.stagger(50, [
      //   Animated.spring(this.animatedValues[0], {
      //     toValue: 1,
      //     bounciness: 16,
      //     useNativeDriver: true
      //   }),
      //   Animated.spring(this.animatedValues[1], {
      //     toValue: 1,
      //     bounciness: 16,
      //     useNativeDriver: true
      //   }),
      //   Animated.spring(this.animatedValues[2], {
      //     toValue: 1,
      //     bounciness: 16,
      //     useNativeDriver: true
      //   }),
      //   Animated.spring(this.animatedValues[3], {
      //     toValue: 1,
      //     bounciness: 16,
      //     useNativeDriver: true
      //   }),
      // ])
    ]).start()
  }

  Circles = () => {
    const response = []
    for (let i = 0; i < this.props.numberOfIcons; i++) {
      response.push(this.Circle(i, this.props.circleColor))
    }
    return response
  }

  render() {
    const { rowHeight, rowBackgroundColor } = this.props
    return <View style={{
      width: WIDTH,
      height: rowHeight,
      justifyContent: 'center',
      backgroundColor: rowBackgroundColor
    }} >
      {this.Circles()}
    </View>
  }
}
