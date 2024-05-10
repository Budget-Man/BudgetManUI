// @ts-ignore
import { useStore  } from 'vuex'

const store = useStore ({
    state:{
        appName:"Vue3 vuex",
        isLogged : false,
        isNewUser : false,
    },

    getters: {
        appName (state : any) {
            return state.appName
        },
        isLogged(state : any) {
            return state.isLogged
        },
    },
    mutations: {
        setLogged (state : any) {
            state.isLogged = true
        },
        setLogOut (state : any) {
            state.isLogged = false
        },
        setIsNewUser(state : any, value: boolean) {
            
            console.log(value);
            state.isNewUser = value
            
            console.log(state);
        },
      }
})

export default store