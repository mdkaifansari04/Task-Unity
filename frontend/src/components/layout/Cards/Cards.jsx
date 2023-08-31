import React, { useContext } from "react";
import MyCard from "./Card";
import HomeContext from "../../../global/context/homeContext/HomeContext";

export function Cards() {
    const context = useContext(HomeContext)
    const { dashboard } = context

    return (
        <>
            <div className="cards w-full">
                <div className="w-full mx-auto gap-6 md:flex flex-wrap  justify-center align-middle py-6">
                    <MyCard details={dashboard.completedTasks} title={"Completed Task"} />
                    <MyCard details={dashboard.totalTasks} title={"Total Task"} />
                    <MyCard details={dashboard.pendingTasks} title={"Pending Task"}  />
                    <MyCard details={dashboard.user} title={"Total Members"} />
                </div>
            </div>
        </>
    );
}