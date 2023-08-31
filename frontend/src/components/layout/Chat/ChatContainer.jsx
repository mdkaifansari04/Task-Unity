import React, { useContext } from 'react'
import Contact from '../../ui/Chat/Contact'
import HomeContext from '../../../global/context/homeContext/HomeContext'

function ChatContainer() {
    const homeContext = useContext(HomeContext)
    const {user} = homeContext
    return (
        <>
            <div className="contact-section overflow-y-auto h-96 ">
            <Contact name={"Md Kaif Ansari"} message={"Hello?"}/>
            <Contact name={"Md Wasim Ansari"} message={"Hello?"}/>
            <Contact name={"Md Jasim Ansari"} message={"Hello?"}/>
            <Contact name={"Md Kasif Ansari"} message={"Hello?"}/>
            <Contact name={"Md Asif Ansari"} message={"Hello?"}/>
            <Contact name={"Md Asif Ansari"} message={"Hello?"}/>
            <Contact name={"Md Asif Ansari"} message={"Hello?"}/>
            <Contact name={"Md Asif Ansari"} message={"Hello?"}/>
            </div>
        </>
    )
}

export default ChatContainer
