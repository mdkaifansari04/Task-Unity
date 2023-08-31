import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ClipboardDocumentListIcon
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';

function SideMenu() {
    const userType = localStorage.getItem('taskUnityUserType')
    return (
        <div>
            <Card className="h-[calc(100vh)] max-w-[15rem] p-4 bg-[#313A46] rounded-none text-white shadow-xl shadow-blue-gray-900/5">
                <div className="mb-5 p-4">
                    <Typography variant="h5" color="blue-gray">
                        <div className="logo w-auto h-5">
                            <img src="https://res.cloudinary.com/dngfmzv2g/image/upload/v1692292160/task-unity-high-resolution-logo-color-on-transparent-background_1_c1rgiv.png" alt="Task Unity" />
                        </div>
                    </Typography>
                </div>
                <List className='text-white'>
                    <Link className='flex flex-row' to="/">
                        <ListItem className='py-4'>
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>
                    {userType === 'admin' && <><Link className='flex flex-row py-1' to="/add-user">
                        <ListItem className='py-4'>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            User
                        </ListItem>
                    </Link>
                        <Link className='flex flex-row py-1' to="/add-task">
                            <ListItem className='py-4'>
                                <ListItemPrefix>
                                    <ClipboardDocumentListIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Task
                            </ListItem>
                        </Link></>}
                    <Link className='flex flex-row py-1' to="/chat">
                        <ListItem className='py-4'>
                            <ListItemPrefix>
                                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Chat
                            <ListItemSuffix>
                                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                            </ListItemSuffix>
                        </ListItem>
                    </Link>
                    {userType === "user" && <Link className='flex flex-row py-1' to="/view-task">
                        <ListItem className='py-4'>
                            <ListItemPrefix>
                                <ClipboardDocumentListIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            View Task
                        </ListItem>
                    </Link>}
                </List>
            </Card>
        </div>
    )
}

export default SideMenu
