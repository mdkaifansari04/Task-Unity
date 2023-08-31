import HomeContext from "./HomeContext";
import { createServerRequest } from "../../../module/createRequest";
import { useContext, useState } from "react";
import AlertContext from "../alertContext/AlertContext";

const HomeState = (props) => {
    const [dashboard, setDashboard] = useState({})
    const [user, setUser] = useState(undefined)
    const [task, setTask] = useState(undefined)
    const [loading, setLoading] = useState(false)


    const [myState, setMyState] = useState({})
    const [myTask, setMyTask] = useState([])


    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext


    const getDashboardData = async () => {
        setLoading(true)
        const response = await createServerRequest('GET', "/api/v1/admin/dashboard")
        setLoading(false)

        if (response.success) {
            const data = response.data
            const users = response.users
            const tasks = response.tasks

            setDashboard(data)
            setUser(users)
            setTask(tasks)
            return user
        } else {
            showAlert("error", response.message)
        }
    }


    const getUserDashboard = async () => {
        setLoading(true)
        const response = await createServerRequest("GET", `/api/v1/user/dashboard`)
        setLoading(false)
        if (response === undefined) return showAlert("error", "Server Error , please try after some time")

        console.log(response);
        if (response.success) {
            setMyState(response.user)
            setMyTask(response.tasks)
            return
        } else {
            showAlert("error", response.message)
        }
    }

    const getAdmin = async () => {
        setLoading(true)
        const response = await createServerRequest("GET", `/api/v1/admin`)
        setLoading(false)
        console.log(response);
        if (response !== undefined) {
            if (response.success) {
                setMyState(response.admin)
            } else {
                showAlert("error", response.message)
            }
        }
    }


    return (
        <HomeContext.Provider value={{ getUserDashboard, getDashboardData, setLoading, setDashboard, setUser, setTask, getAdmin, setMyState, myState, myTask, dashboard, user, task, loading }}>
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeState