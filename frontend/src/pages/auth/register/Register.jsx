import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import LoginNavbar from '../../../components/layout/Navbar/LoginNavbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthContext from '../../../global/context/authContext/AuthContext';

function Register() {

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("taskUnity") !== null) navigate('/')
    }, [])

    const [credentials, setCredentials] = useState({})
    const [disable, setDisable] = useState(true)

    const context = useContext(AuthContext)
    const { registerAdmin } = context
    

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials);
        setDisable(false)
    }
    const handleSubmit = async() => {
        await registerAdmin(credentials)
    }

    return (
        <section>
            <div className="navbar">
                <LoginNavbar title={"Task Unity"} />
            </div>
            <div className="hero-section flex w-100 h-100">
                <div className=" hidden sm:hidden lg:block animation mx-auto  w-1/2 h-full">
                    <img src="https://cdn.dribbble.com/userupload/9289255/file/original-6ca1881421ca94cca82e8a5f506ac546.png?resize=1504x1128" alt="Login" />
                </div>
                <div className="login-container mx-auto w-full flex justify-center lg:w-1/2" >
                    <div className="login-card">
                        <Card className='p-2 md: blur-card md:p-7' color="transparent" shadow={false}>
                            <div className="heading p-4">
                                <Typography variant="h4" color="blue-gray">
                                    Register admin
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Enter your details to sign Up.
                                </Typography>
                            </div>
                            <form className="mt-8 mb-2 p-4 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input name='name' id='name' onChange={handleChange} size="lg" label="Name" />
                                    <Input name='phoneNo' id='phoneNo' onChange={handleChange} size="lg" label="Phone" />
                                    <Input name='email' id='email' onChange={handleChange} size="lg" label="Email" />
                                    <Input name='address' id='address' onChange={handleChange} size="lg" label="Address" />
                                    <Input name='password' id='password' onChange={handleChange} type="password" size="lg" label="Password" />
                                </div>
                                <Button onClick={handleSubmit} className="mt-6 bg-[#6973E3]" fullWidth>
                                    Sign in
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Register
