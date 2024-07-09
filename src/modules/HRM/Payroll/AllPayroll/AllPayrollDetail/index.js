import React from 'react'
import { CustomTabs } from '../../../../../components/CustomTabs';
import Payroll from '../../Partials';
import { TraineePayroll } from '../../TrainingPayRoll/TraineePayroll/TraineePayroll';

export const AllPayrollDetail = () => {
    const tabs = [
        { key:"1", label: 'Employee Payroll', children: <Payroll />},
        { key:"2", label: 'Trainee Payroll', children: <TraineePayroll />},
      ];
    
      const onChangeTabs =()=>{
    
      }
      return (
        <div>
          <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
        </div>
      )
}
