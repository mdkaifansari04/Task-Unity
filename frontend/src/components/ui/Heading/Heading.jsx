import React from 'react'

function Heading(props) {
    const {heading} = props
    return (
            <section>
                <div className="heading m-6 font-semibold text-[#39393f] text-xl">
                    {heading}
                </div>
            </section>
    )
}

export default Heading
