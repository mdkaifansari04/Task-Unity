import React, { useContext, useState } from 'react'

import { Spinner,Button } from '@material-tailwind/react'
import TaskContext from '../../../global/context/taskContext/TaskContext'

function CompletedButton(props) {
    
    const [btnLoading, setBtnLoading] = useState(false)
    const context = useContext(TaskContext)
    const {setCompletedTask} = context

    const {task} = props

    const handleSubmit = async (data,setBtnLoading) => {

        if (data.status !== "completed") {
            const task = data
            task.status = "completed"
            console.log(task)
            await setCompletedTask(task,setBtnLoading)
        }
    }


    return (
        <>
            {btnLoading ? <Spinner color="green" className='w-4 h-4 mx-8' /> : <Button onClick={()=> handleSubmit(task,setBtnLoading)} disabled={task.status === "completed" ? true : false} variant="text" size='sm' className='text-[#14a57c] rounded-sm'>complete</Button>}
        </>
    )
}

export default CompletedButton
