import React, { useContext } from 'react'
import ProfileSection from './ProfileSection'
import HomeContext from '../../global/context/homeContext/HomeContext'

function UserProfile() {
    const context = useContext(HomeContext)
    const { myState } = context
    return (
        <div className='user-profile mx-auto single-card m-5 lg:w-3/5'>
            <ProfileSection user={myState} type="userProfile" />
        </div>
    )
}

export default UserProfile
