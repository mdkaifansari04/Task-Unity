import React from 'react'
import SideMenu from '../../ui/SideMenu/SideMenu';
import { Outlet } from 'react-router-dom';


export function Sidebar() {
    return (
        <>
            <div className="sidebar bg-[#313A46">
                <SideMenu />
            </div>
        </>

    );
}