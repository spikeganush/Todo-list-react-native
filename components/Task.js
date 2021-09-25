import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Task = (props) => {
  let [click, setClick] = useState(false)

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={{
            backgroundColor: click ? '#55BCF6' : '#eb4034',
            width: 32,
            height: 32,
            opacity: 0.4,
            borderRadius: 10,
            marginRight: 15,
          }}
        ></TouchableOpacity>
        <Text
          style={{
            textDecorationLine: click ? 'line-through' : 'none',
            maxWidth: '80%',
            textDecorationColor: 'red',
          }}
        >
          {props.text}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          borderColor: click ? '#55BCF6' : '#eb4034',
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: click ? '#55BCF6' : 'transparent',
        }}
        onPress={() => setClick(!click)}
      ></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

export default Task
