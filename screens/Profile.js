import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { onUpdate, onDelete } from "../redux/actions";

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  currentUser: state.authReducer.currentUser
})

const Profile = ({navigation, currentUser, onUpdate, onDelete }) => {  

  let [data, setData] = React.useState({
    username: currentUser.username,
    password: "",
    password_confirmation: "",
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    img_url: currentUser.img_url,
    secureTextEntry: true,
    secureTextEntryConfirmation: true
  })

const update = async () => {
  const {username, password, password_confirmation, first_name, last_name, email, img_url} = data

  onUpdate(username, password, password_confirmation, first_name, last_name, email, img_url, currentUser.id)
}

const del = async () => {
  onDelete(currentUser.id)
}

const userInputChange = (username) => {
  setData({
    ...data,
    username: username
  })
}

const passwordInputChange = (password) => {
  setData({
    ...data,
    password: password
  })
}

const firstNameInputChange = (first_name) => {
  setData({
    ...data,
    first_name: first_name
  })
}

const lastNameInputChange = (last_name) => {
  setData({
    ...data,
    last_name: last_name
  })
}

const emailInputChange = (email) => {
  setData({
    ...data,
    email: email
  })
}

const img_urlInputChange = (img_url) => {
  setData({
      ...data,
      img_url: img_url
  })
}

const passwordConfirmationInputChange = (password_confirmation) => {
  setData({
    ...data,
    password_confirmation: password_confirmation
  })
}

const updateSecureTextEntry = () => {
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry
  });
}

const updateSecureConfirmationTextEntry = () => {
  setData({
    ...data,
    secureTextEntryConfirmation: !data.secureTextEntryConfirmation
  });
}

  return (
    <View style={styles.container}>
      <Text style={styles.text_footer}>Username:</Text>
      <View style={styles.action}>
        <FontAwesome
          name="user-o"
          color="#05375a"
          size={25}
        />
        <TextInput
          value={data.username}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(username) => {
            // console.log(currentUser)
            userInputChange(username)
            }}
          />
          {data.username.length > 0 ?
          <Animatable.View
            animation="tada"
          >
          <Feather
            name="check-circle"
            color="green"
            size={20}
          /> 
          </Animatable.View> : null
          }
      </View>

      <Text style={[styles.text_footer, { marginTop: 20 }]}>
        Password:
      </Text>
      <View style={styles.action}>
        <FontAwesome
          name="lock"
          color="#05375a"
          size={25}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry ? true : false}
          onChangeText={(password) => {
            passwordInputChange(password)
          }}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? 
            <Feather
              name="eye-off"
              color="grey"
              size={20}
            /> :
            <Feather
              name="eye"
              color="grey"
              size={20}
            />
          }
        </TouchableOpacity>
      </View>

      <Text style={[styles.text_footer, { marginTop: 20 }]}>
        Password Confirmation:
      </Text>
      <View style={styles.action}>
        <FontAwesome
          name="lock"
          color="#05375a"
          size={25}
        />
        <TextInput
          placeholder="Password Confirmation"
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntryConfirmation ? true : false}
          onChangeText={(password_confirmation) => {
            passwordConfirmationInputChange(password_confirmation)
          }}
        />
        <TouchableOpacity onPress={updateSecureConfirmationTextEntry}>
          {data.secureTextEntryConfirmation ? 
            <Feather
              name="eye-off"
              color="grey"
              size={20}
            /> :
            <Feather
              name="eye"
              color="grey"
              size={20}
            />
          }
        </TouchableOpacity>
      </View>

      {data.password !== data.password_confirmation ? 
        <Text style={[styles.text_password_error, { marginTop: 5 }]}>
          Passwords do not match
        </Text> : null
      }

      <Text style={[styles.text_footer, { marginTop: 20 }]}>
        First Name:
      </Text>
      <View style={styles.action}>
        <FontAwesome
          name="id-card-o"
          color="#05375a"
          size={25}
        />
        <TextInput
          value={data.first_name}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(first_name) => firstNameInputChange(first_name)}
        />
        {data.first_name.length > 0 ?
        <Animatable.View
          animation="tada"
        >
          <Feather
            name="check-circle"
            color="green"
            size={20}
          /> 
        </Animatable.View> : null
        }
      </View>

      <Text style={[styles.text_footer, { marginTop: 20 }]}>
        Last Name:
      </Text>
      <View style={styles.action}>
        <FontAwesome
          name="id-card-o"
          color="#05375a"
          size={25}
        />
        <TextInput
          value={data.last_name}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(last_name) => lastNameInputChange(last_name)}
        />
        {data.last_name.length > 0 ?
        <Animatable.View
            animation="tada"
        >
          <Feather
            name="check-circle"
            color="green"
            size={20}
          /> 
        </Animatable.View> : null
        }
      </View>

      <Text style={[styles.text_footer, { marginTop: 20 }]}>
        Email:
      </Text>
      <View style={styles.action}>
        <FontAwesome
          name="envelope-o"
          color="#05375a"
          size={25}
        />
        <TextInput
          value={data.email}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(email) => emailInputChange(email)}
        />
        {data.email.length > 0 ?
        <Animatable.View
            animation="tada"
        >
          <Feather
            name="check-circle"
            color="green"
            size={20}
          /> 
        </Animatable.View> : null
        }
      </View>

      <Text style={[styles.text_footer, {
          marginTop: 20
      }]}>Profile Picture:
      </Text>
      <View style={styles.action}>
          <FontAwesome
              name="picture-o"
              color="#05375a"
              size={25}
          />
          <TextInput
              value={data.img_url}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(img_url) => img_urlInputChange(img_url)}
          />
          {data.img_url.length > 0 ?
          <Animatable.View
              animation="tada"
          >
              <Feather
                  name="check-circle"
                  color="green"
                  size={20}
              /> 
          </Animatable.View> : null
          }
      </View>

      <TouchableOpacity onPress={()=>{update()}}>
        <View style={styles.button}>
            <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.btn}
            >
              <Animatable.Text 
              style={styles.textSign}
              animation="jello"
              delay={1500}
              >
                Edit
              </Animatable.Text>
            </LinearGradient>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{del()}}>
        <View style={styles.button}>
            <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.btn}
            >
              <Animatable.Text 
              style={styles.textSign}
              animation="jello"
              delay={1500}
              >
                Delete User
              </Animatable.Text>
            </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default connect(mapStateToProps, { onUpdate , onDelete })(Profile)
  
const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  text_password_error: {
    color: 'red'
  },
  button: {
    paddingTop: 10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  btn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});