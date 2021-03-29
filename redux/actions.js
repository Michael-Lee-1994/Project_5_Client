import axios from 'axios'
import deviceStorage from './deviceStorage'
import { OMDB_API_KEY } from '../variables'

export const onUserLogin = (username, password) => {
    console.log("from redux actions",username, password)
    return async (dispatch) => {

        try {
            const response = await axios.post('http://localhost:3000/login', {username, password})
            console.log("prior if",response.data)
            if(response.data.token) {
                deviceStorage.saveKey("id_token", response.data.token)
                dispatch({ type: "LOGIN", payload: response.data})
            } else {
                console.log(response.data.error)
            }
            return {
                user: response.data
            }
        } catch (error) {
            dispatch({ type: "ERROR", payload: error })
        }
    }
}

export const onSignUp = (username, password, password_confirmation, first_name, last_name, email, img_url) => {
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
                            email,
                            img_url
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

export const onUpdate = (username, password, password_confirmation, first_name, last_name, email, img_url, id) => {
    return async (dispatch) => {
        if(password === "" || password_confirmation === "" ) {
            console.log("in if")
            try {
                const response = await axios({
                    method: 'patch',
                    url: 'http://localhost:3000/users/' + id,
                    data: {
                        user: {
                            username,
                            first_name,
                            last_name,
                            email,
                            img_url
                        }
                    },
                    withCredentials: true
                })
                // console.log("in not error", response)
                // deviceStorage.saveKey("id_token", response.data.token)
                if(response.data) {      
                    dispatch({type: "UPDATE", payload: response.data})
                }
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
        } else if(password !== "" && password === password_confirmation) {
            console.log("in else if")
            try {
                const response = await axios({
                    method: 'patch',
                    url: 'http://localhost:3000/users/' +id,
                    data: {
                        user: {
                            username,
                            password,
                            password_confirmation,
                            first_name,
                            last_name,
                            email,
                            img_url
                        }
                    },
                    withCredentials: true
                })
                console.log("in not error", response)
                // deviceStorage.saveKey("id_token", response.data.token)
                dispatch({type: "UPDATE", payload: response.data})
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

export const onDelete = (id) => {
    return async dispatch => {
        try {
            deviceStorage.deleteJWT()
            await axios.delete(`http://localhost:3000/users/${id}`)
            let currentJWT = await deviceStorage.loadJWT().then((res) => {
                console.log("in await",res)
                return res
            })
            console.log("in delete", currentJWT)
            dispatch({type: "DELETE" })
        } catch (error) {
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}

export const isLoading = (value) => {
    return dispatch=>{
        dispatch({type: "LOADING", payload: value})
    }
}

export const logout = () => {
    return async dispatch=> {
        deviceStorage.deleteJWT()
        let currentJWT = await deviceStorage.loadJWT().then((res) => {
            console.log("in await",res)
            return res
        })
        console.log("in logout", currentJWT)
        dispatch({type: "LOGOUT"})
    }
}

export const search = (value, page, type) => {
    let convertedValue = value.split(" ").join("+")
    let APIKEY = OMDB_API_KEY()
    let thing;
    // const APIKEY = process.env.EXPO_OMDB_API_KEY
    return async dispatch => {
        try {
            if(type) {
                thing = "movie"
            } else {
                thing = "series"
            }
            let response = await axios.get('http://www.omdbapi.com?apikey=' + APIKEY + `&s=${convertedValue}`+ `&page=${page}`+ `&type=${thing}`)
            dispatch({type: "SEARCHRESULTS", payload: response.data})
            // pageCap = parseInt(res.totalResults/10)+1)
            // .then((data) => {
            //     console.log("data",data)
            // })
            // const response = await axios({
            //     method: 'get',
            //     url: 'http://www.omdbapi.com?apikey=' + APIKEY + `&t=${convertedValue}`,
            //     data: {
            //         search: 
            //     },
            //     withCredentials: true
            // })
            // console.log("in not error", response)
            // deviceStorage.saveKey("id_token", response.data.token)
            // dispatch({type: "SIGNUP", payload: response.data})
            // return {
            //     user: response.data
            // }
           
        } catch (error) {
            console.log("in error?", error)
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}

export const singleSearch = (value) => {
    let APIKEY = OMDB_API_KEY()
    return async dispatch => {
        try {
            let response = await axios.get('http://www.omdbapi.com?apikey=' + APIKEY + `&i=${value}`)
            dispatch({type: "SINGLESEARCHRESULTS", payload: response.data})    
        } catch (error) {
            console.log("in error?", error)
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}

export const updatePage = () => {
    return async dispatch => {
        try {
        
            dispatch({type: "UPDATEPAGE"})

        } catch (error) {
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }

    }
}

export const clearSearch = () => {
    return async dispatch => {
        try {
            console.log("IN CLEAR")
            dispatch({type: "CLEARSEARCH"})
        } catch (error) {
            console.log("in error?", error)
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}

const getToken = async () => {
    try {
      let token = await deviceStorage.loadJWT();
      return token;
    } catch (e) {
      console.log(e);
    }
};

export const checkIsLoggedIn = () => {
    return async (dispatch) => {
        let token = await getToken()
        if(token) {
            try {
                const response = await axios({
                    method: 'get',
                    url: "http://localhost:3000/getuser",
                    headers: {
                        Authorization: `Bearer: ${token}`
                    }
                })
                dispatch({type: "LOGIN", payload: response.data})
                return {
                    user: response.data
                }
            } catch (error) {
                console.log("in error?????", error)
                dispatch({ type: "ERROR", payload: error })
                return {
                    errors: error
                }
            }
        }
    }
}

export const addToWatchList = (id,type, title, genre, plot, poster, length) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/newshow',
                data: {
                    user: {
                        id    
                    },
                    show: {
                        type,
                        title,
                        genre,
                        plot,
                        poster,
                        length
                    }
                }
            })
            // console.log("res", response)
            dispatch({type: "ADDTOWATCHLIST", payload: response.data})
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

export const updateFavorite = (id, favorite) => {
    return async (dispatch) => {
        console.log("id", id)
        try {
            const response = await axios({
                method: 'patch',
                url: 'http://localhost:3000/user_shows/' + id,
                data: {
                    user_show: {
                        favorite: !favorite
                    }
                }
            })
            dispatch({type: "UPDATEFAVORITE", payload: response.data})
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

export const updateWatch = (id, watch) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: 'patch',
                url: 'http://localhost:3000/user_shows/' + id,
                data: {
                    user_show: {
                        currently_watching: !watch
                    }
                }
            })
            dispatch({type: "UPDATEWATCH", payload: response.data})
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

export const searchAnime = (value, page) => {
    let convertedValue = value.split(" ").join("+")
    return async dispatch => {
         console.log("page",page)
        try {
            if(page) {
                console.log("on next page")
                let response = await axios.get(page)
                dispatch({type: "SEARCHRESULTSANIME", payload: response.data})
            } else {
                let response = await axios.get('https://kitsu.io/api/edge/anime?filter%5Btext%5D=' + `${convertedValue}` + '&page%5Blimit%5D=10&page%5Boffset%5D=0')
                dispatch({type: "SEARCHRESULTSANIME", payload: response.data})
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

export const singleSearchAnime = (value) => {
    return async dispatch => {
        try {
            let response = await axios.get('https://kitsu.io/api/edge/anime?filter%5Bid%5D=' + value)
            dispatch({type: "SINGLESEARCHRESULTSANIME", payload: response.data})    
        } catch (error) {
            console.log("in error?", error)
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}

export const updatePageAnime = (currentSearchLink) => {
    return async dispatch => {
        try {
        
            dispatch({type: "UPDATEPAGEANIME"})

        } catch (error) {
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }

    }
}

export const clearSearchAnime = () => {
    return async dispatch => {
        try {
            console.log("IN CLEAR")
            dispatch({type: "CLEARSEARCHANIME"})
        } catch (error) {
            console.log("in error?", error)
            dispatch({ type: "ERROR", payload: error })
            return {
                errors: error
            }
        }
    }
}