import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native'
import Task from './components/Task'
import Item from './components/Item'

import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  const [data, setData] = useState('')
  const [validInput, setValidInput] = useState(false)
  const [input, setInput] = useState()

  const onTextChange = (value) => {
    // Disable the button if the input text is less than 2 characters
    setValidInput(value.length >= 3)
    setInput(value)
  }

  const addData = () => {
    const id = new Date().getTime().toString()
    const item = { id: id, name: input }
    setData([...data, item])
    setInput(null)
  }

  const deleteData = (id) => {
    let items = [...data]
    let newData = items.filter((item) => {
      if (item.id !== id) {
        return item
      }
    })
    setData(newData)
  }

  const storeData = async () => {
    try {
      const stringified = JSON.stringify(data)
      await AsyncStorage.setItem('listData', stringified)
    } catch (e) {
      consol.log(e)
    }
  }

  const getData = async () => {
    try {
      const stringified = await AsyncStorage.getItem('listData')
      setData(stringified !== null ? JSON.parse(stringified) : [])
    } catch (e) {
      consol.log(e)
    }
  }

  const changeStatus = (id) => {
    let items = [...data]
    items.forEach((item) => {
      if (item.id === id) {
        if (item.status === true) {
          item.status = false
        } else {
          item.status = true
        }
      }
    })
    console.log(items)

    addData(items)
  }

  useEffect(() => {
    if (!data) {
      getData()
    } else {
      storeData()
    }
  }, [data])

  const Renderer = ({ item }) => (
    <Item
      text={item.name}
      delete={deleteData}
      id={item.id}
      status={item.status}
      done={changeStatus}
    />
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      {/* Today's Tasks */}
      {/* <View style={styles.tasksWrapper}>
        
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
      {/* {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                  <Task text={item} deleteTask={deleteTask} />
                </TouchableOpacity>
              )
            })}
          </View> */}
      {/*</View> */}
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={Renderer}
        keyExtractor={(item) => item.id}
      />

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Min 3 characters'}
          value={input}
          onChangeText={onTextChange}
        />
        <TouchableOpacity
          style={validInput ? styles.button : styles.buttonDisabled}
          disabled={validInput ? false : true}
          onPress={addData}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.btnText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#8ed1fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  flatList: {
    height: 500,
    flexGrow: 0,
    marginBottom: 90,
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#5D67C7',
    borderWidth: 2,
    padding: 5,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#5D67C7',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5D67C7',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonDisabled: {
    color: '#9e9d9d',
    width: 60,
    height: 60,
    backgroundColor: '#9e9d9d',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9e9d9d',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  btnText: {
    color: '#FFF',
    fontSize: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 290,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addWrapper: {},
})
