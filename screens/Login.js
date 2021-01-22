import React from 'react';
import { Text, View, Button, StyleSheet, Platform, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient }  from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';

//Context
import { AuthContext } from '../components/context'
// import { TextInput } from 'react-native-paper';

// class Login extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         username: "",
    //         password: "",
    //         hiddenPassword: true
    //     }
    // }
    // componentDidMount() {
    //     this.setState({
    //         username:"",
    //         password: "",
    //         hiddenPassword: true
    //     })
    // }
    // render() {
    // }

const Login = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: "",
        password: "",
        secureTextEntry: true
    })

    const { login } = React.useContext(AuthContext);

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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Login</Text>
            </View>
            <View style={styles.footer}>
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
                    marginTop: 35
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
                    
                <Button title="Login" onPress={() => navigation.navigate("HomeDrawer")}></Button>
                <Button title="Sign Up" onPress={() => navigation.navigate("SignUpScreen")}></Button>
            </View>
        </View>
    )
};

export default Login;

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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
});