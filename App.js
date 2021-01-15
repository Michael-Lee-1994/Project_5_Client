import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
//screens
import Home from "./screens/Home"
import Diff from "./screens/Diff"

//Helpers
const HomeStack = createStackNavigator()
const DiffStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createMaterialBottomTabNavigator()

//Functions
const HomeStackScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#921ee6"
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
            <Icon.Button name="menu" size={25} backgroundColor="#921ee6" onPress={() => {navigation.openDrawer()}}></Icon.Button>
          )
        }}/>
    </HomeStack.Navigator>
  )
}

const DiffStackScreen = ({navigation}) => {
  return (
    <DiffStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#921ee6"
      },
      headerTintColor: "#fff",
      headerTitleStyle:{
        fontWeight: "bold"
      }
    }}>
      <DiffStack.Screen name="Diff" component={Diff} options={{
        title:"Diff",
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="#921ee6" onPress={() => {navigation.openDrawer()}}></Icon.Button>
        )
      }}/>
    </DiffStack.Navigator>
  )
}

const MainTabScreen = () => (
  <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen}/>
        <Drawer.Screen name="Diff" component={DiffStackScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
