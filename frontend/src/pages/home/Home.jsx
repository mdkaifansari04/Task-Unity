import React, { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import DrawerComponent from '../../components/layout/Drawer/Drawer';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useLocation
import MainNavbar from '../../components/layout/Navbar/MainNavbar';
import HomeContext from '../../global/context/homeContext/HomeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const context = useContext(HomeContext)
    const { getDashboardData, getUserDashboard, getAdmin,setLoading } = context

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [desktopOption, setDesktopOption] = useState(true);

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("taskUnityAuthToken") === null) navigate('/login')
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setDesktopOption(window.innerWidth > 640);
        };

        handleResize(); // Initial setup
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true)
            await getDashboardData()
            setLoading(false)
        })()
    }, [])

    const userType = localStorage.getItem("taskUnityUserType")

    useEffect(() => {
        (async () => {
            if(userType !== 'admin' ){
                setLoading(true)
                await getUserDashboard() 
                setLoading(false)
                return
            }
                await getAdmin() 
        })()
    }, [])


    return (
        <>
            <section className="layout">
                {desktopOption ? <div className="sidebar"><Sidebar /></div> : <div className="sidebar"><DrawerComponent open={open} closeDrawer={closeDrawer} /></div>}
                <div className="body">
                    <MainNavbar desktopOption={desktopOption} openDrawer={openDrawer} closeDrawer={closeDrawer} />
                    <ToastContainer />
                    <Outlet />
                </div>
            </section>
        </>
    );
}

export default Home;
