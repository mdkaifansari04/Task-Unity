import React, { useEffect, useContext, useState } from 'react'
import Heading from '../../ui/Heading/Heading'
import { Table } from '../../ui/Table/Table'
import HomeContext from '../../../global/context/homeContext/HomeContext';
import SkeletonLoading from '../../ui/Animation/SkeletonLoading';

function AddUser() {


    const tableHeaderArray = ["User", "Type", "Total Completed Task", "Total Pending Task", "Permanent Address", "Corresponding Address", "Occupation", "DOB", "Qualification", "Action"];
    const context = useContext(HomeContext)
    const { user, getDashboardData } = context

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (user === undefined || !user) await getDashboardData()
            setLoading(false)
        })()
    }, [])

    return (
        <>
            <div className="user-container single-page m-2">
                <Heading heading={"Users"} />
                {loading ? <SkeletonLoading /> :
                    <div className="user-data overflow-x-auto bg-[#ffff]" style={{ maxWidth: "99%", margin: "1rem auto" }}>
                        <Table title={"User details"} description={"All the members and associates are mentioned "} buttonContent={"Add User"} tableHeaderArray={tableHeaderArray} data={user} />
                    </div>}
            </div>
        </>
    )
}

export default AddUser
