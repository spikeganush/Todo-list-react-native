import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

const Item = (props) => {
  return (
    <View style={styles.container}>
      <Text style={props.status ? styles.textDone : styles.text}>
        {props.text}
      </Text>

      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => props.done(props.id)}
        >
          <Text style={styles.doneText}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => props.delete(props.id)}
        >
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'lightblue',
    width: 380,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: '#5D67C7',
    borderWidth: 1.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    color: 'black',
  },
  textDone: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteBtn: {
    backgroundColor: '#192494',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  doneBtn: {
    backgroundColor: '#5D67C7',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  doneText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
