import React from 'react'

function SkeletonLoading() {
    return (
        <div className="flex justify-center align-middle bg-none">
            <div className="animation bg-none">
            <lottie-player src="https://lottie.host/7dc9bc2a-2937-4434-94bb-dbc915a3879a/ydJBoB26ft.json" background="Transparent" style={{maxWidth: "900px", maxHeight: "400px"}} direction="1" mode="normal" autoplay></lottie-player>
            </div>
        </div>
    )
}

export default SkeletonLoading
