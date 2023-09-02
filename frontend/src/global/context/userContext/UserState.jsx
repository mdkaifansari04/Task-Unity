import UserContext from "./UserContext";
import { createUserRequest } from "../../../module/createRequest";
import { useContext } from "react";
import HomeContext from "../homeContext/HomeContext";
import AlertContext from "../alertContext/AlertContext";


const UserState = (props) => {

    const context = useContext(HomeContext)
    const { user, setUser, setMyState, dashboard, setDashboard } = context

    const Alert = useContext(AlertContext)
    const { showAlert } = Alert

    const userType = localStorage.getItem("taskUnityUserType")


    //*=========================================== FUNCTIONS OF ADMIN =============================================


    //* Create User by Admin


    const createUser = async (userData) => {
        const response = await createUserRequest('POST', "/api/v1/admin/user/register-user", userData)
        const message = response.message

        if (response.success) {
            const data = dashboard
            data.user = data.user + 1
            setDashboard(data)
            setUser([...user, userData])
            showAlert("success", message)
        } else {
            showAlert("error", message)
        }
    }


    //* Update User by Admin

    const updateUser = async (userData) => {
        const response = await createUserRequest('PUT', `/api/v1/admin/user/update-user/${userData._id}`, userData)
        const message = response.message

        console.log(response);
        if (response.success) {
            const responseUser = response.user

            const updatedUser = user.filter((user) => {
                return responseUser._id !== user._id
            })

            setUser([...updatedUser, responseUser])
            if(userType === 'user') setMyState(responseUser)
            localStorage.removeItem("taskUnityUserName")
            localStorage.setItem("taskUnityUserName" , response.user.name)
            showAlert("info", message)
        } else {
            showAlert("error", message)
        }
    }


    //* Delete User by Admin

    const deleteUser = async (userData) => {
        const response = await createUserRequest('DELETE', `/api/v1/admin/user/delete-user/${userData._id}`)
        const message = response.message

        if (response.success) {
            const deletedUser = response.user
            const newUser = user.filter((u) => {
                return u._id !== deletedUser._id
            })
            const data = dashboard
            data.user = data.user - 1
            setDashboard(data)
            setUser(newUser)
            showAlert("success", "User Deleted Successfully")
        } else {
            showAlert("error", message)
        }
    }


    //*=========================================== FUNCTIONS OF USER =============================================

    const updateAccount = async (userData) => {
        const response = await createUserRequest('PUT', `/api/v1/admin/update`, userData)
        const message = response.message
        console.log(response)

        if (response.success) {
            const newAdmin = response.admin
            console.log(newAdmin.name)
            localStorage.removeItem("taskUnityUserName")
            localStorage.setItem("taskUnityUserName" , newAdmin.name)
            setMyState(newAdmin)
            showAlert("success", response.message)
        } else {
            showAlert("error", message)
        }
    }


    return (
        <UserContext.Provider value={{ createUser, updateUser, deleteUser, updateAccount }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState