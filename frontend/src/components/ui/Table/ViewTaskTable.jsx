import React, { useContext, useState } from 'react'

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Checkbox,
    Spinner,
} from "@material-tailwind/react";
import NoDataFoundAnimation from '../Animation/NoDataFoundAnimation';
import TaskContext from '../../../global/context/taskContext/TaskContext';
import HomeContext from '../../../global/context/homeContext/HomeContext';
import CompletedButton from '../Button/CompletedButton';

function TaskTable(props) {
    const { title, description, tableHeaderArray, data } = props
    const context = useContext(TaskContext)
    const { setCompletedTask } = context

    const homeContext = useContext(HomeContext)
    const { getDashboardData } = homeContext
    

    const refresh = async () => {
        await getDashboardData()
    }


    return (
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
                            {data === undefined || data.length <=0  ? <NoDataFoundAnimation /> :
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
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        className='text-center '
                                                        value={task.priorityLevel <= 4 ? (task.priorityLevel <= 2 ? "High" : "Normal") : "Low"}
                                                        color={task.priorityLevel <= 4 ? (task.priorityLevel <= 2 ? "red" : "yellow") : "green"}
                                                    />
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
                                                            {task.description}
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
                                                            {task.estimateTime}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Checkbox name='status' className='focus:border-none active:outline-none' color="green" disabled={task.status === "completed" ? true : false} defaultChecked={task.status === "completed" ? true : false} />
                                                    </div>
                                                </td>
                                                <td  className={classes}>
                                                    <CompletedButton task ={task}/>
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
                        <Button onClick={refresh} className="button--submit rounded-sm green-btn" variant="outlined" size="sm">
                            Refresh
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default TaskTable
