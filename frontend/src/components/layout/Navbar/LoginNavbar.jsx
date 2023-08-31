import React from 'react'
import {
    Navbar,
    Typography,
} from "@material-tailwind/react";
;
function LoginNavbar(props) {
    const {title} = props
    return (
        <section>
            <div className="mx-auto max-w-screen-xl py-8 px-5 my-1 mb-8">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/login"
                        variant="h6"
                        className="mr-3 cursor-pointer py-1.5 text-xl"
                    >
                        <div className="logo w-48">
                        <img src="https://res.cloudinary.com/dngfmzv2g/image/upload/v1692080305/task-unity-high-resolution-logo-color-on-transparent-background_vv6xp0.png" alt="Task Unity" />
                        </div>
                    </Typography>
                    </div>
            </div>
        </section>
    );
}

export default LoginNavbar
