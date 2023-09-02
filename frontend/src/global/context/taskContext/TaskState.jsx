import React, { useContext } from 'react'
import TaskContext from './TaskContext'
import { createServerRequest, createUserRequest } from '../../../module/createRequest'
import HomeContext from '../homeContext/HomeContext'
import AlertContext from '../alertContext/AlertContext'

function TaskState(props) {
    const context = useContext(HomeContext)
    const { task, setTask, dashboard,setDashboard } = context

    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext


    const createTask = async (data) => {
        console.log(data);
        const response = await createUserRequest("POST", `/api/v1/admin/task/create-task`, data)
        console.log(response);
        if (response.success) {
            const newTask = response.task
            setTask([...task, newTask])
            showAlert("success", response.message)
        } else {
            showAlert("error", response.message)
        }
    }

    const updateTask = async (data) => {
        console.log(data);
        const response = await createUserRequest("PUT", `/api/v1/admin/task/update-task/${data._id}`, data)
        console.log(response);
        if (response.success) {
            const responseTask = response.task

            const updatedTask = task.filter((task) => {
                return responseTask._id !== task._id
            })
            if (responseTask.status === 'completed') {
                const data = dashboard
                data.completedTasks += 1
                setDashboard(data)
            }
            setTask([...updatedTask, responseTask])
            showAlert("info", response.message)
        } else {
            showAlert("error", response.message)
        }
    }

    const deleteTask = async (data) => {
        console.log(data);
        const response = await createUserRequest("DELETE", `/api/v1/admin/task/delete-task/${data._id}`)

        if (response.success) {
            const deletedTask = response.task
            showAlert("success", response.message)
            const newTask = task.filter((task) => {
                return task._id !== deletedTask._id
            })
            setTask(newTask)
        } else {
            showAlert("error", response.message)
        }
    }

    const setCompletedTask = async (taskData,setBtnLoading) => {
        setBtnLoading(true)
        console.log(taskData)
        const response = await createUserRequest("PUT", `/api/v1/user/task/submit-task/${taskData._id}`, taskData)

        console.log(response.message)
        if (response.success) {
            const responseTask = response.task
            const updatedTask = task.filter((task) => {
                return responseTask._id !== task._id
            })
            setBtnLoading(false)
            setTask([...updatedTask, responseTask])
            showAlert("info", response.message)
        } else {
            setBtnLoading(false)
            showAlert("error", response.message)
        }
    }

    return (
        <TaskContext.Provider value={{ createTask, updateTask, deleteTask, setCompletedTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState
