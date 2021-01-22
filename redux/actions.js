import axios from 'axios'
import deviceStorage from './deviceStorage'

export const onUserLogin = (username, password) => {
    console.log("from redux actions",username, password)
    // return async (dispatch) => {

    //     try {
    //         const response = await axios.post('url', {username, password})
    //         dispatch({ type: "LOGIN", payload: response.data})
    //     } catch (error) {
    //         dispatch({ type: "ERROR", payload: error })
    //     }
    // }
}

export const onSignUp = (username, password, password_confirmation, first_name, last_name, email) => {
    // console.log("from redux actions",username, password, password_confirmation)
    return async (dispatch) => {
        if(password === password_confirmation) {
         
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3000/users',
                    data: {
                        user: {
                            username,
                            password,
                            password_confirmation,
                            first_name,
                            last_name,
                            email
                        }
                    },
                    withCredentials: true
                })
                console.log("in not error", response)
                deviceStorage.saveKey("id_token", response.data.token)
                dispatch({type: "SIGNUP", payload: response.data})
                return {
                    user: response.data
                }
               
            } catch (error) {
                console.log("in error?", error)
                dispatch({ type: "ERROR", payload: error })
                return {
                    errors: error
                }
            }
        }

    }
}