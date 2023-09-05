import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    DialogFooter,
    Spinner 
} from "@material-tailwind/react";
import UserContext from '../../../global/context/userContext/UserContext';


function EditUser(props) {
    const { handleOpen, user, open } = props
    const [userData, setUserData] = useState({})

    const [btnLoading, setBtnLoading] = useState(false)

    const context = useContext(UserContext)
    const { updateAccount } = context


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        console.log(userData);
    }

    useEffect(() => {
        setUserData(user)
        return () => {
            setUserData({})
        }
    }, [])


    const handleSubmit = async () => {
        setBtnLoading(true)
        await updateAccount(userData)
        setBtnLoading(false)
        handleOpen()
    }


    return (
        <div>
            <>
                <Dialog open={open} handler={handleOpen} size={"xxl"}>
                    <div className="flex items-center justify-between py-3">
                        <DialogHeader>Edit User</DialogHeader>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5 cursor-pointer"
                            onClick={handleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody className="h-[40rem] overflow-scroll" divider>
                        <div className="grid gap-6 py-3 lg:px-32 ">
                            <Input name="name" onChange={handleChange} value={userData.name} className="py-2 text-lg" variant="static" required placeholder="Name" />
                            <Input name="email" onChange={handleChange} value={userData.email} className="py-2 text-lg" variant="static" required placeholder="Email" />
                            <Input name="phoneNo" onChange={handleChange} value={userData.phoneNo} className="py-2 text-lg" variant="static" required placeholder="Phone No" />
                            <Input name="password" onChange={handleChange} value={userData.password} className="py-2 text-lg" variant="static" required placeholder="Password" />
                            <Input name="address" onChange={handleChange} value={userData.address} className="py-2 text-lg" variant="static" required placeholder="Address" />
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="outlined" size='md' className="rounded-sm" color="red" onClick={handleOpen}>
                            close
                        </Button>
                        <Button className="green-btn rounded-sm btn-green-shadow" onClick={handleSubmit}>
                        {btnLoading ? <Spinner className="h-3 w-3" /> : "Edit"}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        </div>
    )
}

export default EditUser
