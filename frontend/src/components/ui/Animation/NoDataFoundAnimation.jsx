import React from 'react'

function NoDataFoundAnimation() {
    return (
        <div className="flex justify-center align-middle bg-none w-full mx-14">
            <div className="animation bg-none ">
                <lottie-player src="https://lottie.host/8a86d315-d4b2-401b-b8cb-99e44a395628/J0j5EThEyP.json" background="#fff" speed="1" style={{maxWidth: "500px",maxHeight: "500px"}} loop autoplay direction="1" mode="normal"></lottie-player>
            </div>
        </div>
    )
}

export default NoDataFoundAnimation
