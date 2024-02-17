import React, { createContext, useContext, useEffect, useState } from 'react'
import Heading from '../../components/ui/Heading/Heading'
import { Cards } from '../../components/layout/Cards/Cards'
import Chart from '../../components/layout/ChartContainer/ChartContainer'
import HomeContext from '../../global/context/homeContext/HomeContext'

function Dashboard() {
    const context = useContext(HomeContext)
    const { user } = context

    let userName, completedTask, pendingTask, totalMember = 0, totalAssociate = 0
    if (user !== undefined) {
        userName = user.map((user) => user.name)
        completedTask = user.map((user) => user.completedTask)
        pendingTask = user.map((user) => user.pendingTask)

        user.forEach(user => {
            if (user.type === 'member') totalMember += 1
            if (user.type === 'associate') totalAssociate += 1
        });
    }

    const graphParameter = ['Member', "Associate"]

    return (
        <>
            <div className="dashboard">
                <Heading heading={"Dashboard"} />
                <div className="hero-section h-fit sm:block flex-shrink-0 md:flex ">
                    <Cards />
                    <Chart heading="User Performance" graphParameter={userName} graphData={completedTask} chartType={"bar"} label={'Total completed Task'} />
                </div>

                <div className="big-chart hero-section  sm:block flex-shrink-0 md:flex mx-auto">
                    <div className="lineChart my-2" style={{ minWidth: "69%", maxWidth: "99%" }}>
                        <Chart heading="Awaiting Task" graphParameter={userName} graphData={pendingTask} chartType={'line'} label={"Pending Task of Users"} />
                    </div>

                    <div className="pieChart my-2" style={{ minWidth: "29%", maxWidth: "90%" }}>
                        <Chart heading="Type Of Users" graphParameter={graphParameter} graphData={[totalMember, totalAssociate]} chartType={'doughnut'} label={"Types of users"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
