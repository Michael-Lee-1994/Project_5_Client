import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import deviceStorage from './redux/deviceStorage'
import Icon from 'react-native-vector-icons/Ionicons';

//Screens
import Auth from './screens/Auth'
import MainTab from './screens/Main'
import DrawerContent from './screens/DrawerContent'
import Profile from './screens/Profile'
// import Settings from './screens/Settings'

//Token
//an async iife lol
// (async () => {
//     let temp = await deviceStorage.loadJWT().then((res) => {
//         return res
//     })
//     return me = temp
// })()

//Helpers
const Drawer = createDrawerNavigator()

//Actions
import { isLoading, checkIsLoggedIn } from "./redux/actions";
import { authReducer } from './redux/reducers/authReducer';

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    loading: state.authReducer.isLoading,
    logged: state.authReducer.isLoggedIn
})

//Functions

const _NewApp = ({ loading, navigation, isLoading, logged, checkIsLoggedIn }) => {

    useEffect(() => {
        setTimeout(async () => {
            await isLoading(false)
            checkIsLoggedIn()
        }, 2500)
    }, []);
    
    if( loading ) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large"/>
            </View>
        )
    } 
    return (
        <NavigationContainer >
            { logged ? (
                <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
                    <Drawer.Screen name="HomeDrawer" component={MainTab}/>
                    <Drawer.Screen name="ProfileDrawer" component={Profile}/>
                    {/* <Drawer.Screen name="Settings" component={Settings}/> */}
                </Drawer.Navigator> 
            ) : 
                <Auth/> 
            }
        </NavigationContainer>
    );

}

const NewApp = connect(mapStateToProps,{ isLoading, checkIsLoggedIn })(_NewApp)

export default NewApp;

const styles = StyleSheet.create({
    loading: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      }
})





// class _NewApp extends Component  {

    // componentDidMount() {
    //     // deviceStorage.loadJWT()
    //     // .then((res) => {
    //     //     if(token === undefined) {
    //     //         token = null
    //     //     } else {
    //     //         token = res
    //     //     }
    //     // })
    // }