import React from 'react'
import SideMenu from '../../ui/SideMenu/SideMenu'
import { Drawer } from "@material-tailwind/react";

export default function DrawerComponent(props) {

    const { open, closeDrawer } = props
    return (
        <>
            <Drawer className='bg-[#313A46] ' open={open} onClose={closeDrawer}>
                <SideMenu />
            </Drawer>
        </>
    )
}