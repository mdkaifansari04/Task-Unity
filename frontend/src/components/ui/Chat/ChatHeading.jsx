import { Typography } from '@material-tailwind/react'
import React from 'react'
import Contact from './Contact'

function ChatHeading(props) {
    return (
        <>
            <Typography variant="h5" className="font-thin">
                {props.title}
                <hr className='style-two my-3'/>
            </Typography>
        </>
    )
}

export default ChatHeading
