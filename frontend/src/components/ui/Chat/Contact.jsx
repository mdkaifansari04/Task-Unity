import React from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Card,
    Typography,
    Avatar
} from "@material-tailwind/react";

function Contact(props) {
    const {name, message} = props
    return (
        <>
            <Card className="w-full border-none  rounded-none shadow-none dark:bg-[#0F172A]">
                <List>
                    <ListItem className='p-0 md:p-3 dark:hover:bg-[#1b2536e7] focus-within:dark:bg-[#1b2536e7]'>
                        <ListItemPrefix>
                            <Avatar className="p-0.5 w-10 h-10"  src={`https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg`} />
                        </ListItemPrefix>
                        <div >
                            <Typography className="text-[#717172] font-semibold dark:text-white "  variant="h6" color="blue-gray">
                                {props.name}
                            </Typography> 
                            <Typography className="font-normal text-[#949697] dark:text-white" variant="small" color="gray">
                                {props.message}
                            </Typography>
                        </div>
                    </ListItem>
                </List>
            </Card>
        </>
    )
}

export default Contact
