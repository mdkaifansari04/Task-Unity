import React, { useContext } from 'react'
import AuthContext from './AuthContext'
import { createAuthRequest } from '../../../module/createRequest'
import AlertContext from '../alertContext/AlertContext'

function AuthState(props) {
    const context = useContext(AlertContext)
    const { showAlert } = context

    const login = async (data) => {
        const response = await createAuthRequest('POST', "/api/v1/login", data)
        console.log(response);

        if (response.success) {
            console.log(response);
            localStorage.setItem("taskUnityAuthToken" , response.token)
            localStorage.setItem("taskUnityUserType" , response.user.role)
            localStorage.setItem("taskUnityUserName" , response.user.name)

            showAlert("success", "Logged in successfully")
            return true
        } else {
            showAlert("error", response.message)
            return false
        }
    }

    const registerAdmin = async (data) => {
        const response = await createAuthRequest('POST', "/api/v1/admin/register", data)
        console.log(response);

        if (response.success) {
            console.log(response);
            localStorage.setItem("taskUnityAuthToken" , response.token)
            localStorage.setItem("taskUnityUserType" , response.admin.role)
            localStorage.setItem("taskUnityUserName" , response.admin.userName)
        
            showAlert("success", "Logged in successfully")
            return true
        } else {
            showAlert("error", response.message)
            return false
        }
    }
    return (
        <AuthContext.Provider value={{ login,registerAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
