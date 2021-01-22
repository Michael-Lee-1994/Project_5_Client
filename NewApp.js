import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import deviceStorage from './redux/deviceStorage'
import Icon from 'react-native-vector-icons/Ionicons';

//Screens
import Auth from './screens/Auth'
import MainTab from './screens/Main'
import { DrawerContent } from './screens/DrawerContent'
import Profile from './screens/Profile'

//Context
import { AuthContext } from './components/context'

//Token

//Helpers
const Drawer = createDrawerNavigator()

//Actions
import { onUserLogin, onSignUp } from "./redux/actions";
import { authReducer } from './redux/reducers/authReducer';

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    loading: state.authReducer.isLoading
})

//Functions

const _NewApp = ({ navigation }) => {
    //setting state initially
    const [loading, setIsLoading] = React.useState(true)
    const [token, setToken] = React.useState(null)

    const authContext = React.useMemo(() => ({
        login: () => {
            setToken(deviceStorage.loadJWT().then((res) => {return res}))
            setIsLoading(false)
        },
        logout: () => {
            deviceStorage.deleteJWT()
            setToken(null)
            setIsLoading(false)
        },
        signUp: () => {
            setToken(deviceStorage.loadJWT().then((res) => {return res}))
            setIsLoading(false)
        }
    }))
       
        // useEffect(() => {
        //     setTimeout(() => {
        //       setToken(deviceStorage.loadJWT().then((res) => {return res}))
        //       console.log("in set",token)
        //     }, 1000)
        // }, []);

        useEffect(() => {
            setTimeout(() => {
              setIsLoading(false)
              console.log(loading)
            }, 2000)
        }, []);

        if( loading ) {
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        } else {
            return (
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                {null == null ?
                    <Auth/> : 
                    (
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                            <Drawer.Screen name="HomeDrawer" component={MainTab}/>
                            <Drawer.Screen name="Profile" component={Profile}/>
                        </Drawer.Navigator> 
                    )
                }
                </NavigationContainer>
            </AuthContext.Provider>
            );
        }
}

const NewApp = connect(mapStateToProps)(_NewApp)

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