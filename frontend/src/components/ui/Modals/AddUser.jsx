import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    DialogFooter,
    Spinner
} from "@material-tailwind/react";
import UserContext from "../../../global/context/userContext/UserContext";


export function AddUserModal(props) {
    const context = useContext(UserContext)
    const { createUser, updateUser,updateAccount } = context
    const closeRef = useRef(null)

    const { handleOpen, open, user, option, userType } = props
    const [userData, setUserData] = useState({})
    const [disabledOption, setdisableOption] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        console.log(user);
        setUserData(user)
        return () => {
            setUserData({})
        }
    }, [user]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        console.log(user)
        setdisableOption(false)
    }

    const handleSubmit = async () => {
        setBtnLoading(true)
        if (option === "Create") {
            await createUser(userData)
        } else {
            await updateUser(userData)
        }
        setBtnLoading(false)
        handleOpen()
    }

    const typeOfUser = localStorage.getItem("taskUnityUserType")


    return (
        <>
            <form>
                <Dialog open={open} handler={handleOpen} size={"xxl"}>
                    <div className="flex items-center justify-between py-3">
                        <DialogHeader>{option === "Create" ? "Add" : "Edit"} User</DialogHeader>
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
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.name} name="name" id="name" required placeholder="Name" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.email} name="email" id="email" required placeholder="Email" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.password} name="password" id="password" required placeholder="Password" min={8} />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.occupation} name="occupation" id="occupation" required placeholder="Occupation" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.role} name="role" id="role" required placeholder="Role" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.phoneNo} name="phoneNo" id="phoneNo" required placeholder="Phone Number" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.skills} name="skills" id="skills" required placeholder="Skills" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.qualification} name="qualification" id="qualification" required placeholder="Qualification" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.correspondingAddress} name="correspondingAddress" id="correspondingAddress" required placeholder="Corresponding Address" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.permanentAddress} name="permanentAddress" id="permanentAddress" required placeholder="Permanent Address" />
                            <Input onChange={handleChange} className="py-2 text-lg" variant="static" value={userData.languages} name="languages" id="languages" required placeholder="Language" />
                            <Input onChange={handleChange} className="rounded-none" variant="static" value={userData.dob} name="dob" id="dob" text-black type="date" />
                            {typeOfUser === 'admin' && <select value={userData.userType} onChange={handleChange} id="type" name='type' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-gray-50 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={"member"}>Choose User Type</option>
                                <option value={"member"}>Member</option>
                                <option value={"associate"}>Associate</option>
                            </select>}
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <Button variant="outlined" className="rounded-md" color="red" onClick={handleOpen}>
                            close
                        </Button>
                        <Button type="submit" disabled={disabledOption} onClick={handleSubmit} className="green-btn rounded-md btn-green-shadow">
                        {btnLoading ? <Spinner className="h-3 w-3" /> : option}
                        </Button>
                    </DialogFooter>
                </Dialog>
            </form>
        </>
    );
}


AddUserModal.defaultProps = {
    user: {}
}