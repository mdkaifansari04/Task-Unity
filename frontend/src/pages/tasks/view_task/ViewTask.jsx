import React, { useContext, useEffect } from 'react'
import Heading from '../../../components/ui/Heading/Heading'
import TaskTable from '../../../components/ui/Table/ViewTaskTable';
import HomeContext from '../../../global/context/homeContext/HomeContext';

function ViewTask() {
    const tableHeaderArray = ["#", "Priority", "Title", "Description", "Time Remaining", "Mark", "Status"];
    const context = useContext(HomeContext)
    const { myTask } = context


    return (
        <div>
            <div className="user-task-container">
                <Heading heading={"Task"} />
                <div className="task-data my-2 overflow-x-auto bg-[#ffff]" style={{ maxWidth: "99%", margin: "1rem auto" }}>
                    <TaskTable title={"Task Assigned"} description={"Complete task according to the priority"} tableHeaderArray={tableHeaderArray} data={myTask} />
                </div>
            </div>
        </div>
    )
}

export default ViewTask
