import React from 'react'
import { CustomTabs } from '../../../../../components/CustomTabs';
import ViewPayroll from '../../ViewPayroll/Partials/ViewPayroll';
import { TraineeViewPayroll } from '../../TrainingPayRoll/TraineeViewPayrol/TraineeViewPayroll';

export const AllViewPayroll = () => {
    const tabs = [
        { key:"1", label: 'Employee View Payroll', children: <ViewPayroll />},
        { key:"2", label: 'Trainee View Payroll', children: <TraineeViewPayroll />},
      ];
    
      const onChangeTabs =()=>{
    
      }
      return (
        <div>
          <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
        </div>
      )
}
