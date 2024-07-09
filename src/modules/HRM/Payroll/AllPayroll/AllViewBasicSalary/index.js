import React from 'react'
import { CustomTabs } from '../../../../../components/CustomTabs';
import ViewBasicSalary from '../../ViewBasicSalary/Partials/ViewBasicSalary';
import { TraineeViewBasicSalary } from '../../TrainingPayRoll/TraineeViewSalary/TraineeViewSalary';

export const ViewAllBasicSalary = () => {
    const tabs = [
        { key:"1", label: 'Employee View Basic Salary', children: <ViewBasicSalary />},
        { key:"2", label: 'Trainee View Basic Salary', children: <TraineeViewBasicSalary />},
      ];
    
      const onChangeTabs =()=>{
    
      }
      return (
        <div>
          <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
        </div>
      )
}
