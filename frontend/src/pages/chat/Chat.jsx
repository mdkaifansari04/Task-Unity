import React, { useContext } from 'react'
import Heading from '../../components/ui/Heading/Heading'
import ChatContainer from '../../components/layout/Chat/ChatContainer'
import ProfileSection from '../users/ProfileSection'
import ChatHeading from '../../components/ui/Chat/ChatHeading'
import MessageContainer from '../../components/layout/Chat/MessageContainer'
import HomeContext from '../../global/context/homeContext/HomeContext'

function Chat() {
    const context = useContext(HomeContext)
    const { myState } = context
    return (
        <>
            <section>
                <Heading heading={"Chat"} />
                <div className="hero-section flex flex-w gap-5 h-auto">
                    <div className="chat-section p-6 m-3 bg-[#ffff] w-auto md:w-1/2 " style={{ height: "90%" }}>
                        <ChatHeading title="All" />
                        <ChatContainer />
                    </div>

                    <div className="profile-section p-6 m-3 bg-[#ffff] w-auto md:w-1/2" style={{ height: "90%" }}>
                        <ProfileSection user={myState} />
                    </div>
                </div>
                <div className="message m-3 bg-[#ffff]">
                    <MessageContainer />
                </div>
            </section>
        </>
    )
}

export default Chat
