import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  StatusBar,
} from 'react-native'
import Item from './components/Item'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
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
    setValidInput(false)
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
      let stringified = await AsyncStorage.getItem('listData')
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
    setData(items)
  }

  useEffect(() => {
    if (!data) {
      getData()
    } else {
      // Descending sorting
      data.sort((a, b) => a.id < b.id)
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
      <StatusBar backgroundColor="#464D94" />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.flatListView}>
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={Renderer}
          keyExtractor={(item) => item.id}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Min 3 characters'}
          value={input}
          onChangeText={onTextChange}
          placeholderTextColor="#A0A5D0"
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
    height: '100%',
    backgroundColor: '#464D94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  flatListView: {
    height: '80%',
    marginBottom: 95,
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
    borderColor: '#5D67C7',
    borderWidth: 1.5,
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
