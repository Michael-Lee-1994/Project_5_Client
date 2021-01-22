import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

//Actions
import { onSignUp } from "../redux/actions";

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
})

class _SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password_confirmation: "",
            first_name: "",
            last_name: "",
            email: "",
            hiddenPassword: true,
            hiddenPasswordConfirmation: true
        };

        this.signUp = this.signUp.bind(this)
    }

    componentDidMount() {
        this.setState({
            username:"",
            password: "",
            password_confirmation: "",
            first_name: "",
            last_name: "",
            email: "",
            hiddenPassword: true,
            hiddenPasswordConfirmation: true
        })
    }

    async signUp() {
        const {username, password, password_confirmation, first_name, last_name, email} = this.state

        //fix this later if never hits fail/ if it works redirect otherwise dont
        this.props.onSignUp(username, password, password_confirmation, first_name, last_name, email)
        .then((data)=> {
            if(data.user) {
                this.props.navigation.navigate("LoginScreen")
            }
        })

    }

    render() {
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
                                this.setState({ username })
                            }}
                        />
                       {this.state.username.length > 0 ?
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
                        {this.state.hiddenPassword ? 
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(password) => {
                                this.setState({ password })
                            }}
                        /> : 
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={false}
                            onChangeText={(password) => {
                                this.setState({ password })
                            }}
                        />
                        }
                        {this.state.hiddenPassword ? 
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                            onPress={() => {
                                this.setState({ hiddenPassword: false})
                            }}
                        /> : 
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                            onPress={() => {
                                this.setState({ hiddenPassword: true})
                            }}
                        />
                        }
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
                         {this.state.hiddenPasswordConfirmation ? 
                        <TextInput
                            placeholder="Password Confirmation"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(password_confirmation) => {
                                this.setState({ password_confirmation })
                            }}
                        /> : 
                        <TextInput
                            placeholder="Password Confirmation"
                            style={styles.textInput}
                            autoCapitalize="none"
                            secureTextEntry={false}
                            onChangeText={(password_confirmation) => {
                                this.setState({ password_confirmation })
                            }}
                        />
                        }
                        {this.state.hiddenPasswordConfirmation ? 
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                            onPress={() => {
                                this.setState({ hiddenPasswordConfirmation: false})
                            }}
                        /> : 
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                            onPress={() => {
                                this.setState({ hiddenPasswordConfirmation: true})
                            }}
                        />
                        }
                    </View>
                    {this.state.password !== this.state.password_confirmation ? 
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
                            onChangeText={(first_name) => this.setState({ first_name })}
                        />
                       {this.state.first_name.length > 0 ?
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
                            onChangeText={(last_name) => this.setState({ last_name })}
                        />
                        {this.state.last_name.length > 0 ?
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
                    }]}>Email:</Text>
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
                            onChangeText={(email) => this.setState({ email })}
                        />
                        {this.state.email.length > 0 ?
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

                    <TouchableOpacity onPress={()=>this.signUp()}>
                        <View style={styles.button}>
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
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
}

const SignUp = connect(mapStateToProps, {onSignUp})(_SignUp)

export default SignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        marginTop: 50
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
        fontWeight: 'bold'
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
