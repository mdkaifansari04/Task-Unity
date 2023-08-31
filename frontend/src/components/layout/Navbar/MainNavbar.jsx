import React, { useContext, useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    Input,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    PowerIcon,
    MoonIcon,
    Bars3BottomLeftIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Search from "../../ui/Search/Search";
import { Link, useNavigate } from "react-router-dom";
import HomeContext from "../../../global/context/homeContext/HomeContext";


export default function MainNavbar(props) {

    const { openDrawer, desktopOption } = props
    const navigate = useNavigate()

    const [openNav, setOpenNav] = useState(false);
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("taskUnityUserType")
        localStorage.removeItem("taskUnityAuthToken")
        navigate('/login')
    }


    function ProfileMenu() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const closeMenu = () => setIsMenuOpen(false);

        const context = useContext(HomeContext)
        const { myState } = context

        return (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" className="dark:bg-[#1d3455c1]">
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center rounded-none active:bg-none gap-2 p-3 lg:ml-auto "
                    >
                        <Avatar
                            variant="rounded"
                            size="sm"
                            alt="Profile"
                            className="p-0.5 w-10 h-10"
                            src={`https://api.multiavatar.com/${localStorage.getItem("taskUnityUserName")}.png`}
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="h6" className="font-normal">
                            {myState.name}<br />
                        </Typography>
                    </Button>
                </MenuHandler>
                <MenuList className="dark:bg-[#1d3455c1] border-none">
                    <Link className=":hover border-none outline-none" to="/profile">
                        <MenuItem className="flex items-center gap-2 hover:dark:bg-[#274a7bc1] dark:text-white">
                            <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                            <Typography variant="small" className="font-normal">
                                My Profile
                            </Typography>
                        </MenuItem>
                    </Link>
                    <hr className="my-2 border-blue-gray-50" />
                    <MenuItem onClick={handleLogout} className="flex items-center gap-2 hover:dark:bg-[#274a7bc1]">
                        <PowerIcon color="red" strokeWidth={2} className="h-4 w-4" />
                        <Typography color="red" variant="small" className="font-normal" >
                            Sign Out
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }
    return (
        <>
            <Navbar className="navbar sticky top-0 z-10 max-w-full h-max rounded-none py-2 px-4 lg:px-8 lg:py-3" style={{ boxShadow: "none", opacity: "1", width: "100%" }}>
                <div className="flex items-center justify-between text-blue-gray-900">
                    {desktopOption ?
                        <div className="p-2">
                            <Search />
                        </div> :
                        <Typography className="mr-4 flex align-middle justify-center cursor-pointer py-1.5 font-medium">
                            <div className="logo-icon-container flex mr-5">
                                <div className="logo w-10 mr-2">
                                    <img src="https://res.cloudinary.com/dngfmzv2g/image/upload/v1692106739/task-unity-website-favicon-color_rjmi4c.png" alt="" />
                                </div>
                                <Bars3BottomLeftIcon onClick={openDrawer} strokeWidth={2} className="h-7 w-7 m-1" />
                            </div>
                        </Typography>}
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">
                            <MoonIcon className="h-6 w-6" />
                        </div>
                        <div className="flex justify-end gap-4">
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
            </Navbar>
        </>
    );
}
