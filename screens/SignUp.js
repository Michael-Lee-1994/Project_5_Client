import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

//Actions
import { authReducer } from '../redux/reducers/authReducer';
import { onSignUp } from "../redux/actions";

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
})

const _SignUp = ({ navigation, onSignUp }) => {

    const [data, setData] = React.useState({
        username: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        email: "",
        img_url: "",
        secureTextEntry: true,
        secureTextEntryConfirmation: true
    })

    const signUp = async () => {
        const {username, password, password_confirmation, first_name, last_name, email, img_url} = data

        // console.log("props",authReducer)
        // console.log("object", state)
        // console.log("this.props",this.props)
        //fix this later if never hits fail/ if it works redirect otherwise dont
        // console.log("huh",huh)
       onSignUp(username, password, password_confirmation, first_name, last_name, email, img_url)
        .then((data)=> {
            if(data.user) {
                navigation.navigate("LoginScreen")
            }
        })
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
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign Up</Text>
            </View>

            <Animatable.View 
            style={styles.footer}
            animation="bounceInDown"
            >
            <Text style={styles.text_footer}>Username:</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput
                        placeholder="Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(username) => {
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

                <Text style={[styles.text_footer, {
                    marginTop: 20
                }]}>Password:</Text>
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

                <Text style={[styles.text_footer, {
                    marginTop: 20
                }]}>Password Confirmation:</Text>
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
                    <Text style={[styles.text_password_error, {
                        marginTop: 5
                    }]}>Passwords do not match</Text> : null
                }

                <Text style={[styles.text_footer, {
                    marginTop: 20
                }]}>First Name:</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="id-card-o"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput
                        placeholder="First Name"
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

                <Text style={[styles.text_footer, {
                    marginTop: 20
                }]}>Last Name:</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="id-card-o"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput
                        placeholder="Last Name"
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

                <Text style={[styles.text_footer, {
                    marginTop: 20
                }]}>Email:
                </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="envelope-o"
                        color="#05375a"
                        size={25}
                    />
                    <TextInput
                        placeholder="Email"
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
                        placeholder="Picture URL"
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

                <TouchableOpacity onPress={()=>{signUp()}}>
                    <View style={styles.button}>
                        <LinearGradient
                            colors={['#c259ff', '#59ffca']}
                            style={styles.signIn}
                        >
                            <Animatable.Text 
                            style={styles.textSign}
                            animation="jello"
                            delay={1500}
                            >
                                Sign Up
                            </Animatable.Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const SignUp = connect(mapStateToProps, {onSignUp} )(_SignUp)

export default SignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#c259ff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#59ffca',
        fontFamily: "EuphemiaUCAS-Italic",
        fontWeight: 'bold',
        fontSize: 40
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white"
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    text_password_error: {
        color: 'red'
    }
});
