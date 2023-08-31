import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

function MyCard(props) {

    const { title, details } = props
    return (
        <div>
            <div className="single-card m-3">
                <Card className="md:w-[11rem]  shadow-none rounded-none" style={{ borderRadius: "4px" }}>
                    <CardBody>
                        <Typography  variant="h6" color="blue-gray" className="mb-2 font-light text-[#828687] text-xl">
                            {title}
                        </Typography>
                        <Typography className="font-semibold text-3xl py-1 text-[#6C757D]">
                            {details}
                        </Typography>
                        <Typography className="text-green-400 my-1 font-thin text-xl">
                            {12}%
                        </Typography>
                        <Typography className="text-base font-extralight">
                            Since Last Month
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default MyCard
