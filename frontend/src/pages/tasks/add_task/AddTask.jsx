import React, { useContext } from 'react'
import Heading from '../../../components/ui/Heading/Heading'
import AddTaskTable from '../../../components/ui/Table/AddTaskTable';
import HomeContext from '../../../global/context/homeContext/HomeContext';


function AddTask() {
    const context = useContext(HomeContext)
    const { task } = context
    const tableHeaderArray = ["#", "User", "Assigned Date", "Task", "Estimate Time", "Status", "Action"];


    return (
        <div>
            <div className="task-container single-page m-2">
                <Heading heading={"Task"} />
                <div className="user-data overflow-x-auto bg-[#ffff]" style={{ maxWidth: "99%", margin: "1rem auto" }}>
                    <AddTaskTable title={"Alloted Task"} description={"Task can be distributed and modified"} buttonContent={"Add Task"} tableHeaderArray={tableHeaderArray} data={task} />
                </div>
            </div>
        </div>
    )
}

export default AddTask
