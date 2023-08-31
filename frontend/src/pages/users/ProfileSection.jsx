import { Avatar, Button, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import EditUser from '../../components/ui/Modals/EditUser';
import { AddUserModal } from '../../components/ui/Modals/AddUser';

function ProfileSection(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openEditAccount, setOpenEditAccount] = useState(false)
    const userType = localStorage.getItem('taskUnityUserType')
    const handleModal = () => {
        if (userType === "admin") setOpenModal(!openModal)
        else setOpenEditAccount(!openEditAccount)
    }
    const { type, user } = props

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            <div className="main-profile-section text-[#767676]" style={{ maxWidth: "98%" }}>
                <div className="profile flex flex-col justify-center align-middle">
                    <div className="profile-image text-center">
                        <Avatar className="p-0.5 w-20 h-20" src={`https://api.multiavatar.com/${user.name}.png`} />
                    </div>
                    <div className="details justify-center align-middle text-center">
                        <Typography variant="h5" className="text-center my-1 font-normal text-[#788087]">
                            {capitalizeFirstLetter(user.name)}
                        </Typography>
                        <Button onClick={type === "userProfile" ? handleModal : ""} size="sm" className='green-btn btn-green-shadow  my-3 mx-auto justify-center font-normal shadow-none border-none rounded-sm flex items-center'>
                            {type === "userProfile" ? <i className="fa-solid fa-pen mr-2"></i> : <i className="fa-regular fa-envelope mr-2" style={{ color: "#ffffff" }}></i>} {type === "userProfile" ? "Edit" : "Send Email"}
                        </Button>
                    </div>
                    <hr className='font-bold my-4 style-two' />

                    <div className="all-details">
                        <div className="p-4">
                            <p className="font-normal">Email:</p>
                            <strong>{user.email}</strong>
                        </div>

                        <div className="p-4">
                            <p className="font-normal">Phone Number:</p>
                            <strong>{user.phoneNo}</strong>
                        </div>

                        {user.role === 'admin' && <> <div className="p-4">
                            <p className="font-normal">Address:</p>
                            <strong>{user.address}</strong>
                        </div>
                            <div className="p-4">
                                <p className="font-normal">Role:</p>
                                <strong>@ {user.role}</strong>
                            </div></>
                        }

                        {user.type &&
                            <><div className="p-4">
                                <p className="font-normal">User Type:</p>
                                <strong> ❄️{capitalizeFirstLetter(user.type)}</strong>
                            </div>
                                <div className="p-4">
                                    <p className="font-normal">Address:</p>
                                    <strong>{user.correspondingAddress}</strong>
                                </div></>
                        }
                    </div>
                </div>
            </div>
            <EditUser user={user} open={openModal} handleOpen={handleModal} />
            <AddUserModal userType={userType} handleOpen={handleModal} open={openEditAccount} option={"Update"} user={user} />
        </>
    )
}

ProfileSection.defaultProps = {
    type: false
}

export default ProfileSection
