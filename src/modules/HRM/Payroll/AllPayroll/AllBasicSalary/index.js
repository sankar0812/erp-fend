import React from 'react'
import { CustomTabs } from '../../../../../components/CustomTabs';
import Demo from '../../Demo';
import { TraineeBasicSalary } from '../../TrainingPayRoll/TraineeBasicSalary/TraineeBasicSalary';

export const AllBasicSalary = () => {
    const tabs = [
        { key:"1", label: 'Employee Basic Salary', children: <Demo />},
        { key:"2", label: 'Trainee Basic Salary', children: <TraineeBasicSalary />},
      ];
    
      const onChangeTabs =()=>{
    
      }
      return (
        <div>
          <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
        </div>
      )
}
