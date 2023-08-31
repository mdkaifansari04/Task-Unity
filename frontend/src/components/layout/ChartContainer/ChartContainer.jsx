import React from 'react'
import { Typography, Card, CardBody } from '@material-tailwind/react'
import MyChart from '../../ui/Chart/Chart'

function Chart(props) {

    const { chartType, label, graphParameter, graphData, heading } = props

    return (
        <section className='chart-container rounded-none w-full'>
            <Card className="mt-8 w-96 mx-auto md:w-full h-auto p-1 shadow-none rounded-none " style={{ borderRadius: "4px", width: "95%" }}>
                <CardBody>
                    <Typography className="text-xl font-normal text-[#6C757D]">
                        {heading}
                    </Typography>
                    <MyChart chartType={chartType} label={label} graphParameter={graphParameter} graphData={graphData} />
                </CardBody>
            </Card>
        </section>
    )
}

export default Chart
