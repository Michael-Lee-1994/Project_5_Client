import AsyncStorage from '@react-native-async-storage/async-storage'

const deviceStorage = {
    async saveKey(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log('AsynceStorage Error:' + error.message)
        }
    },

    async loadJWT() {
        try {
            const value = await AsyncStorage.getItem('id_token')
            if(value !== null) {
                return value
            } else {
                return null
            } 
        } catch (error) {
            console.log('AsyncStorage Error:' + error.message)
        }
    },

    async deleteJWT() {
        try{
            await AsyncStorage.removeItem('id_token')
        } catch (error) {
            console.log('AsyncStorage Error:' + error.message)
        }
    }
}


export default deviceStorage