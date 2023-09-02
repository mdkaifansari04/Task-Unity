import axios from "axios";

let host = process.env.REACT_APP_HOST
const token = localStorage.getItem("taskUnityAuthToken")

export const createServerRequest = async (method, url) => {
    try {
        const api = `${host}${url}`
        const response = await axios({
            method: method,
            url: api,
            headers: {
                "Content-Type": "application/json",
                "Authorization" :`Bearer ${token}`
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
        const e = {
            success : false,
            message :  error.message
        }
        return e
    }
}

export const createUserRequest = async (method, url, data) => {
    try {
        console.log(data)
        const api = `${host}${url}`
        const response = await axios({
            method: method,
            url: api,
            headers: {
                "Content-Type": "application/json",
                "Authorization" :`Bearer ${token}`
            },
            data: JSON.stringify(data)
        })
        return response.data
    } catch (error) {
        console.log(error);
        const e = {
            success : false,
            message :  error.message
        }
        return e
    }
}


export const createAuthRequest = async (method, url, data) => {
    try {
        console.log(data)
        const api = `${host}${url}`
        const response = await axios({
            method: method,
            url: api,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data)
        })
        return response.data
    } catch (error) {
        console.log(error);
        const e = {
            success : false,
            message :  error.response.data.message
        }
        return e
    }
}