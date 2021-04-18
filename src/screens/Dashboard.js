import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Calendar } from 'react-native-big-calendar'
import BackButton from '../components/BackButton'
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {events} from './events'

  const app_name = "eventree-calendar-test";
  function buildPath(route) 
  {
      if (process.env.NODE_ENV === "production") {
          return "https://" + app_name + ".herokuapp.com/" + route;
      } else {
          return "https://" + app_name + ".herokuapp.com/" + route;
      }
  }


// const events = [
//   {
//     "_id": "6078e5eed7b4710015315416",
//     "title": "Meeting!",
//     "description": "Big ballers only!!!! Strict!",
//     "location": "My moms place",
//     "start": "2021-04-12T13:14:00.000Z",
//     "end": "2021-04-19T01:15:44.975Z",
//     "createdAt": "2021-04-14T01:18:38.325Z",
//     "updatedAt": "2021-04-16T01:18:38.325Z"
//   },
//   {
//     "_id": "6078e5eed7b4710015315416",
//     "title": "Spring Break!!!",
//     "description": "Big ballers only!!!! Strict!",
//     "location": "My moms place",
//     "start": "2021-04-11T13:16:00.000Z",
//     "end": "2021-04-19T01:16:44.975Z",
//     "createdAt": "2021-04-16T01:18:38.325Z",
//     "updatedAt": "2021-04-16T01:18:38.325Z"
// }
// ]

// Make request to server
// Make add event functionality

export default function Dashboard({ navigation }) {
  return (
    
      
  <><>
    
        <Calendar style={styles.calendar}
        height={Dimensions.get('window').height}
        events={events}
        mode="3days" />
      <TouchableOpacity
        style={styles.roundButton2}
      >
        <TouchableOpacity style={styles.roundButton1}>
          <Image source={require("../assets/plus3.png")} mode='center' />
          
        </TouchableOpacity>
      </TouchableOpacity>
    </>

      <Button
        mode="contain"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })}
      >
        Logout
      </Button>

  </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton2: {
    width: 50,
    right: -300,
    bottom: -20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#157DEC',
  },
  container: {
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
});
