import React from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native'
import Color from 'color'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicon from '@expo/vector-icons/Ionicons'

const WIDTH = Dimensions.get('window').width

export interface Props {
  rowBackgroundColor: string
  rowHeight: number
  numberOfIcons: number
  circleColor: string
  icons: [string]
}

export interface State {
  circlesOpen: boolean
}

export const CIRCLE_SIZE = 40
export const MARGIN = 10

export default class SettingsRow extends React.Component<Props, State> {
  animatedValues: any
  animatedBGValue: any
  constructor(props: Props) {
    super(props)
    this.state = {
      circlesOpen: false
    }
    this.openCircles = this.openCircles.bind(this)
    this.animatedValues = this.generateAnimatedValues(this.props.numberOfIcons)
    this.animatedBGValue = new Animated.Value(0)
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
      <TouchableOpacity
        key={index}
        style={{
          position: 'absolute',
          left: MARGIN + (index * (CIRCLE_SIZE + MARGIN)),
          alignSelf: 'center',
        }}
        onPress={() => alert(`Circle number ${index + 1} pressed`)}>
        <Animated.View style={{
          backgroundColor: Color(color).darken(1.0 / this.props.numberOfIcons * index),
          borderRadius: CIRCLE_SIZE / 2,
          width: CIRCLE_SIZE,
          justifyContent: 'center',
          alignItems: 'center',
          height: CIRCLE_SIZE,
          transform: [
            {
              scale: this.animatedValues && this.animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }
          ]
        }} >
          <Icon size={25} name={this.props.icons[index]} style={{ color: 'white' }} />
        </Animated.View>
      </TouchableOpacity>
    )
  }

  animations = (value: number) => {
    const response = []
    for (let i = 0; i < this.props.numberOfIcons; i++) {
      response.push(
        Animated.spring(this.animatedValues[i], {
          toValue: value,
          bounciness: value ? 15 : 0,
          useNativeDriver: true
        })
      )
    }
    return response
  }

  openCircles() {
    this.setState({ circlesOpen: true })
    Animated.parallel([
      Animated.timing(this.animatedBGValue, {
        toValue: 1,
        duration: 300
      }),
      Animated.sequence([
        Animated.stagger(50, this.animations(1))
      ])
    ]).start()
  }

  closeCircles() {
    this.setState({ circlesOpen: false })
    Animated.parallel([
      Animated.timing(this.animatedBGValue, {
        toValue: 0,
        duration: 300
      }),
      Animated.sequence([
        Animated.stagger(50, this.animations(0).reverse())
      ])
    ]).start()
  }

  Circles = () => {
    const response = []
    for (let i = 0; i < this.props.numberOfIcons; i++) {
      response.push(this.Circle(i, this.props.circleColor))
    }
    return response
  }

  ToggleButton = () => {
    return (
      <TouchableOpacity style={{
        position: 'absolute',
        right: 0,
        backgroundColor: 'transparent',
        marginHorizontal: 10
      }}
        onPress={() => this.state.circlesOpen ? this.closeCircles() : this.openCircles()}
      >
        {this.state.circlesOpen ?
          <Icon size={30} name="close-circle-outline" style={{ color: 'rgb(188, 188, 188)' }} /> :
          <Icon size={30} name="dots-horizontal" style={{ color: 'rgb(73, 73, 73)' }} />
        }
      </TouchableOpacity>
    )
  }

  RenderChildren() {
    return (
      <Animated.View

        style={{
          width: .7 * WIDTH,
          transform: [
            {
              scale: this.animatedValues && this.animatedValues[0].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
              })
            }
          ]
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }

  render() {
    const { rowHeight, rowBackgroundColor } = this.props
    return <Animated.View style={{
      width: WIDTH,
      height: rowHeight,
      marginVertical: 10,
      justifyContent: 'center',
      backgroundColor: this.animatedBGValue.interpolate({
        inputRange: [0, 1],
        outputRange: [rowBackgroundColor, Color(rowBackgroundColor).darken(.5)]
      })
    }} >
      {this.Circles()}
      {this.ToggleButton()}
      {this.RenderChildren()}
    </Animated.View>
  }
}
