import React from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { AddEmpLeaveForm } from './EmployeeLeave'

const LeaveContainer = ({setCall}) => {
    return (
        <div>
            <CustomPageTitle Heading={'Add Leave'}/>
            <CustomCardView width={'700px'}>
                <AddEmpLeaveForm setCall={setCall}/>

            </CustomCardView>
        </div>
    )
}

export default LeaveContainer