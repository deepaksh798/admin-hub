import Cookies from "js-cookie"
import {COOKIES} from "./constants"

export const setToken = (token: any) => {
    return Cookies.set(COOKIES.ACCESS_TOKEN,token,{expires:60})
}

export const removeToken = () => {
    return Cookies.remove( COOKIES.ACCESS_TOKEN)
}

export const getToken = () => {
    return Cookies.get(COOKIES.ACCESS_TOKEN)
}