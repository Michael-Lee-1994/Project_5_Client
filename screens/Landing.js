import React from 'react';
import { Text, View, Button, StyleSheet, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Landing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                animation="bounceInDown"
                delay={1000}
                // iterationCount="infinite"
                source={require('../assets/g.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
                <Animatable.Text animation="swing" delay={1000} style={styles.header_text}> Glister </Animatable.Text>

            </View>
            <Animatable.View 
            style={styles.footer}
            animation="zoomIn"
            delay={1000}
            >
                <Text style={styles.title}> Welcome to the glorified lister app! </Text>
                <Text style={styles.text}> Sign in/up with an new account! </Text>

                <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
                    <View style={styles.button}>
                        <LinearGradient
                            colors={['#c259ff', '#59ffca']}
                            style={styles.signIn}
                        >
                            <Animatable.Text 
                            style={styles.textSign}
                            animation="jello"
                            delay={2000}
                            >
                                Get Started
                            </Animatable.Text>
                            <MaterialIcons 
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
};

export default Landing;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#c259ff',
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  header_text: {
    marginTop: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 60,
    fontWeight: "bold",
    color: '#59ffca',
    fontFamily: "EuphemiaUCAS-Italic"
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      fontFamily: "EuphemiaUCAS-Bold",
      color: '#47d1a5',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      fontFamily: "EuphemiaUCAS",
      color: '#47d1a5',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 10
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
    //   position: 'absolute',
    //   top: 50,
    //   left: 200,
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
      
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});