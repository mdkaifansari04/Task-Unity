
import { PencilIcon, UserPlusIcon, TrashIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { AddUserModal } from "../Modals/AddUser";
import UserContext from "../../../global/context/userContext/UserContext";
import NoDataFoundAnimation from "../Animation/NoDataFoundAnimation";




export function Table(props) {
    const [openUser, setOpenUser] = useState(false);
    const [option, setOption] = useState("Create")
    const [editable, setEditable] = useState({})

    const context = useContext(UserContext)
    const { deleteUser } = context

    const openAddUser = () => {
        setOption("Create")
        setEditable({})
        setOpenUser(!openUser)
    }

    const handleEdit = (user) => {
        console.log(user)
        setOption("Update")
        setEditable(user)
        setOpenUser(!openUser)
    }

    const handleDelete = async (user) => {
        await deleteUser(user);
    }


    const { title, description, buttonContent, tableHeaderArray, data } = props

    return (
        <div className="table h-full mx-auto max-w-screen rounded-none">
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
                            <Button onClick={openAddUser} className="flex items-center green-btn gap-3 my-4 rounded-sm" size="sm">
                                {buttonContent === 'Add User' ? <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> : <ClipboardDocumentListIcon strokeWidth={2} className="h-4 w-4" />} {buttonContent}
                            </Button>
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
                            {data === undefined || data.length <=0? <NoDataFoundAnimation /> :
                                <tbody>
                                    {data.map(
                                        (user, index) => {
                                            const isLast = index === tableHeaderArray.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={index}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar src={`https://api.multiavatar.com/${user.name}.png`} alt={user.name} size="sm" />
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {user.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal opacity-70"
                                                                >
                                                                    {user.email}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Chip
                                                                variant="ghost"
                                                                size="sm"
                                                                value={user.type === 'member' ? "Member" : "Associate"}
                                                                color={user.type === 'member' ? "green" : "blue-gray"}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.completedTask}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.pendingTask}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.permanentAddress}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.correspondingAddress}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.occupation}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.dob ? (user.dob).split('T')[0] : ""}
                                                        </Typography>
                                                    </td>

                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.qualification}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Tooltip content="Edit User" className="bg-[#0ABF8C]">
                                                            <IconButton onClick={() => handleEdit(user)} className="items-center" variant="text">
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip content="Delete User " className="bg-[#0ABF8C]">
                                                            <IconButton onClick={() => handleDelete(user)} className="items-center" variant="text">
                                                                <TrashIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
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
                        <Button className="button--submit rounded-sm green-btn" variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button className="button--submit rounded-sm green-btn" variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* Modal of Add User */}
            <AddUserModal option={option} user={editable} title={buttonContent} open={openUser} handleOpen={openAddUser} />
        </div>
    )
}