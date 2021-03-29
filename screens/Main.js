import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

//Actions
import { onUserLogin, onSignUp } from "../redux/actions";

//Helpers
const HomeStack = createStackNavigator()
const AnimeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const SearchStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()
const DetailsStack = createStackNavigator()

//Screens
import Home from "./Home"
import Anime from "./Anime"
import Search from "./Search"
import Profile from "./Profile"
import Details from "./Details"
import MyShow from "./MyShow"

//Functions
const mapStateToProps = (state) => ({
  authReducer: state.authReducer
})

const HomeStackScreen = ({navigation, props}) => {
  // console.log("my props",onUserLogin)
    return(
      <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "#c259ff"
        },
        headerTintColor: "#fff",
        headerTitleStyle:{
          fontWeight: "bold"
        }
      }}>
        <HomeStack.Screen name="Home" component={Home} options={
          {
            title:"HOME", 
            headerLeft: () => (
              <Icon.Button name="menu" size={25} backgroundColor="#c259ff" onPress={() => {navigation.openDrawer()}}></Icon.Button>
            )
          }}/>
        <HomeStack.Screen name="MyShow" component={MyShow} options={{title:"MyShow"}}/>
      </HomeStack.Navigator>
    )
}
  
const AnimeStackScreen = ({navigation}) => {
  return (
    <AnimeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#e3cf17"
      },
      headerTintColor: "#fff",
      headerTitleStyle:{
        fontWeight: "bold"
      }
    }}>
      <AnimeStack.Screen name="Anime" component={Anime} options={{
        title:"Anime",
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#e3cf17" onPress={() => {navigation.openDrawer()}}></Icon.Button>
        )
      }}/>
    </AnimeStack.Navigator>
  )
}

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#ffa6b9"
      },
      headerTintColor: "#fff",
      headerTitleStyle:{
        fontWeight: "bold"
      }
    }}>
      <ProfileStack.Screen name="Profile" component={Profile} options={{
        title:"Profile",
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#ffa6b9" onPress={() => {navigation.openDrawer()}}></Icon.Button>
        )
      }}/>
    </ProfileStack.Navigator>
  )
}

const SearchStackScreen = ({navigation}) => {
  return (
    <SearchStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#210eed"
      },
      headerTintColor: "#fff",
      headerTitleStyle:{
        fontWeight: "bold"
      }
    }}>
      <SearchStack.Screen name="Search" component={Search} options={{
        title:"Search",
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#210eed" onPress={() => {navigation.openDrawer()}}></Icon.Button>
        )
      }}/>
      <SearchStack.Screen name="Details" component={Details} options={{title:"Details"}}/>
    </SearchStack.Navigator>
  )
}

const _Main = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#e91e63',
    }}
  >
  <Tab.Screen
    name="Home"
    component={HomeStackScreen}
    options={{
      tabBarLabel: 'Home',
      tabBarColor: '#c259ff',
      tabBarIcon: ({ color, size= 25 }) => (
        <Icon name="ios-home" color={color} size={size} />
        ),
      }}
  />
   <Tab.Screen
    name="Search"
    component={SearchStackScreen}
    options={{
      tabBarLabel: 'Search',
      tabBarColor: '#210eed',
      tabBarIcon: ({ color, size= 25 }) => (
        <Icon name="ios-search" color={color} size={size} />
      ),
    }}
  />
  <Tab.Screen
    name="Anime"
    component={AnimeStackScreen}
    options={{
      tabBarLabel: 'Anime',
      tabBarColor: '#e3cf17',
      tabBarIcon: ({ color, size= 25 }) => (
        <Icon name="ios-library" color={color} size={size} />
      ),
      tabBarBadge: 3
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileStackScreen}
    options={{
      tabBarLabel: 'Profile',
      tabBarColor: '#ffa6b9',
      tabBarIcon: ({ color, size= 25 }) => (
        <Icon name="ios-person" color={color} size={size} />
      ),
    }}
  />
</Tab.Navigator>
)

const Main = connect(mapStateToProps, {onSignUp, onUserLogin})(_Main)
export default Main;