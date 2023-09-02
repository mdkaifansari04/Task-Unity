import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import LoginNavbar from '../../../components/layout/Navbar/LoginNavbar';
import AuthContext from '../../../global/context/authContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Login() {

    const [credentials, setCredentials] = useState({})
    const [disable, setDisable] = useState(true)

    const context = useContext(AuthContext)
    const { login } = context

    const location = useLocation()

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("taskUnityAuthToken") !== null) navigate('/')
    }, [])

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials);
        setDisable(false)
    }

    const handleLogin = async () => {
        const data = credentials
        if (location.pathname === '/admin/login') data.userType = "admin"
        else data.userType = "user"

        console.log(data);
        const response = await login(data)
        if (response) navigate('/')
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
                <div className="login-container mx-auto flex justify-center lg:w-1/2" >
                    <div className="login-card px-3 ">
                        <Card className='p-2 md: blur-card md:p-7' color="transparent" shadow={false}>
                            <div className="heading p-4">
                                <Typography variant="h4" color="blue-gray">
                                    Login
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Enter your details to sign in.
                                </Typography>
                            </div>
                            <form className="mt-8 mb-2 p-4 w-80 max-w-screen-lg sm:w-96">
                                <div className="mb-4 flex flex-col gap-6">
                                    <Input className="dark:text-white" onChange={handleChange} id='email' name='email' value={credentials.email} size="lg" label="Email" required />
                                    <Input className="dark:text-white" onChange={handleChange} id='password' name='password' value={credentials.password} type="password" size="lg" label="Password" autoComplete='false' required min={8} />
                                </div>
                                <Button disabled={disable} onClick={handleLogin} className="mt-6 bg-[#6973E3]" fullWidth>
                                    Sign in
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </section>
    )
}

export default Login
