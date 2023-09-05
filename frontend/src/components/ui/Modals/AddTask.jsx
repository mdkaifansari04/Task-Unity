import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    DialogFooter,
    Textarea,
    Spinner
} from "@material-tailwind/react";

import HomeContext from '../../../global/context/homeContext/HomeContext';
import TaskContext from '../../../global/context/taskContext/TaskContext';

function AddTaskModal(props) {
    const context = useContext(HomeContext)
    const { user } = context

    const taskContext = useContext(TaskContext)
    const { createTask,updateTask } = taskContext

    const { open, handleOpen, task, option } = props


    const [taskData, setTaskData] = useState({})
    const [disabledOption, setdisableOption] = useState(true)

    const [btnLoading, setBtnLoading] = useState(false)

    const handleChange = (e) => {
        setdisableOption(false)
        setTaskData({ ...taskData, [e.target.name]: e.target.value })
        console.log(taskData);
    }
    
    const handleSubmit = async () => {
        setBtnLoading(true)
        if (option === "Create") {
            await createTask(taskData)
        }else{
            await updateTask(taskData)
        }
        setBtnLoading(false)
        handleOpen()
    }

    useEffect(() => {
        console.log(task);
        setTaskData(task)
        return () => {
            setTaskData({})
        }
    }, [task]);

    return (
        <>
            <Dialog open={open} handler={handleOpen} size={"xxl"}>
                <div className="flex items-center justify-between py-3">
                    <DialogHeader>{option === "Create" ? "Add" : "Edit"} Task</DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody className="h-[50rem] overflow-scroll" divider>
                    <div className="grid gap-6 py-3 lg:px-32 ">
                        <Input  value={taskData.title} onChange={handleChange} name='title' id='name' className="py-2 text-lg" variant="static" required placeholder="Title" min={3} />
                        <Textarea  value={taskData.description}onChange={handleChange} name='description' id='description' className="py-2 text-lg" variant="static" required placeholder="Description" />
                        <Input value={taskData.estimateTime} onChange={handleChange} name='estimateTime' id='estimateTime' className="py-2 text-lg" variant="static" required placeholder="Estimate Time (Number in days)" />
                        <label for="userName" className="block text-sm font-thin text-gray-900 dark:text-white">User</label>
                        <select value={taskData.userId} onChange={handleChange} id="userId" name='userId' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-gray-50 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={false}>Choose User</option>
                            {user.map((user) => {
                                return <option value={user._id}>{user.name}</option>
                            })}
                        </select>

                        <label for="priorityLevel" className="block text-sm font-thin text-gray-900 dark:text-white">Priority</label>
                        <select value={taskData.priorityLevel} onChange={handleChange} id="priorityLevel" name='priorityLevel' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-gray-50 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={false}>Set Priority</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" className="rounded-md" color="red" onClick={handleOpen}>
                        close
                    </Button>
                    <Button disabled={disabledOption} onClick={handleSubmit} className="green-btn rounded-md btn-green-shadow">
                        {btnLoading ? <Spinner className='w-3 h-3'/> : option}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default AddTaskModal
