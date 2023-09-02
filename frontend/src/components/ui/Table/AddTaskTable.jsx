import React, { useContext, useState } from 'react'
import { ClipboardDocumentListIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    IconButton,
    CardFooter,
    Tooltip,
} from "@material-tailwind/react";
import AddTaskModal from '../Modals/AddTask';
import NoDataFoundAnimation from '../Animation/NoDataFoundAnimation';
import TaskContext from '../../../global/context/taskContext/TaskContext';
function AddTaskTable(props) {
    const { title, description, tableHeaderArray, buttonContent, data } = props

    const [openTask, setOpenTask] = useState(false);
    const [option, setOption] = useState("Create")
    const [editTask, setEditTask] = useState({})

    const context = useContext(TaskContext)
    const { deleteTask } = context


    const handleEdit = (task) => {
        console.log(task)
        setOption("Update")
        setEditTask(task)
        setOpenTask(!openTask)
    }

    const openAddTask = () => {
        setOption("Create")
        setEditTask({})
        setOpenTask(!openTask);
    }

    const handleDelete = async (task) => {
        await deleteTask(task)
    }

    return (
        <>
            <div className="table-inner h-full mx-auto max-w-screen rounded-none">
                <Card className="h-full mx-auto">
                    <CardHeader floated={false} shadow={false} className="rounded-none h-fit mt-0 my-3">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    {title}
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    {description}
                                </Typography>
                                <Button onClick={openAddTask} className="flex items-center green-btn gap-3 my-4 rounded-sm" size="sm">
                                    {buttonContent === 'Add User' ? <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> : <ClipboardDocumentListIcon strokeWidth={2} className="h-4 w-4" />} {buttonContent}
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <div className="table-body">
                        <CardBody className="px-0 overflow-x-auto">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {tableHeaderArray.map((head) => (
                                            <th
                                                key={head}
                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                {data === undefined ? <NoDataFoundAnimation /> :
                                    <tbody>
                                        {data.map((task, index) => {
                                            const isLast = index === tableHeaderArray.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {index + 1}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {task.userName}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {task.createdAt ? task.createdAt.split("T")[0] : ""}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {task.title}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {task.estimateTime} Days
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Chip
                                                                variant="ghost"
                                                                size="sm"
                                                                className='text-center '
                                                                value={task.status === "completed" ? "Completed" : task.status === 'pending' ? "Pending" : "Active"}
                                                                color={task.status === "completed" ? "green" : task.status === 'pending' ? "red" : "blue"}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Tooltip content="Edit Task" className="bg-[#0ABF8C]">
                                                                <IconButton onClick={() => handleEdit(task)} className="items-center" variant="text">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip content="Delete Task " className="bg-[#0ABF8C]">
                                                                <IconButton onClick={() => handleDelete(task)} className="items-center" variant="text">
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                        )}
                                    </tbody>
                                }
                            </table>
                        </CardBody>
                    </div>

                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button className="button--submit rounded-sm green-btn" variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Button className="button--submit rounded-sm green-btn" variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Modal of Add task   */}
            <AddTaskModal option={option} task={editTask} title={buttonContent} open={openTask} handleOpen={openAddTask} />
        </>
    )
}

export default AddTaskTable
