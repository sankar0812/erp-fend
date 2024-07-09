import React, { useState } from 'react'
import LeaveContainer from './LeaveContainer'
import { ViewEmployee } from './ViewEmployee'

const EmployeeLeave = () => {
    const [call, setCall] = useState(0)
    return (
        <div>
            <LeaveContainer setCall={setCall} /><br></br>
            <ViewEmployee call={call}/>
        </div>
    )
}

export default EmployeeLeave