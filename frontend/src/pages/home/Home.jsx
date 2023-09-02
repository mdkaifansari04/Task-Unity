import React, { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import DrawerComponent from '../../components/layout/Drawer/Drawer';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useLocation
import MainNavbar from '../../components/layout/Navbar/MainNavbar';
import HomeContext from '../../global/context/homeContext/HomeContext';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertContext from '../../global/context/alertContext/AlertContext';

function Home() {
    const context = useContext(HomeContext)
    const { getDashboardData, getUserDashboard, getAdmin } = context

    const alertContext = useContext(AlertContext)
    const {showAlert} = alertContext


    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [desktopOption, setDesktopOption] = useState(true);

    const navigate = useNavigate()

    const userType = localStorage.getItem("taskUnityUserType")

    useEffect(() => {
        if(navigator.onLine){
            if (localStorage.getItem("taskUnityAuthToken") === null) navigate('/login')
            if (localStorage.getItem("taskUnityAuthToken")) {
                (async () => {
                    await getDashboardData()
                    if (userType !== 'admin') {
                        await getUserDashboard()
                        return
                    }
                    await getAdmin()
                })()
            }
        }else{
            showAlert("error", "No Internet Connection")
        }

        const handleResize = () => {
            setDesktopOption(window.innerWidth > 640);
        };

        handleResize(); // Initial setup
        window.addEventListener('resize', handleResize);
        console.log("done ");
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
