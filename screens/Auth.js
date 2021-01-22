import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'

//Helpers
const AuthStack = createStackNavigator();

//Screens
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';

//Actions
import { onSignUp } from "../redux/actions";

// const mapStateToProps = (state) => ({
//     authReducer: state.authReducer
// })

// class _Auth extends Component {
const _Auth = ({ navigation }) => {
    // constructor(props) {
    //     super(props);
    // }
    // componentDidMount() {
    //     // console.log("state: ",this.state)
    //     console.log("props in auth:", this.props)
    // }
    
    // render() {
        return (
            <AuthStack.Navigator headerMode="none">
                <AuthStack.Screen name="LandingScreen" component={Landing}/>
                <AuthStack.Screen name="LoginScreen" component={Login}/>
                <AuthStack.Screen name="SignUpScreen" component={SignUp}/>
            </AuthStack.Navigator>
        )
    // }
}

// const Auth = connect(mapStateToProps)(_Auth)
// const Auth = connect(mapStateToProps, {onSignUp})(_Auth)

export default _Auth;




