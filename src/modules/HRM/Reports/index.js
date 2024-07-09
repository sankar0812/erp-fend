import React from 'react'
import AllReports from './AllReports/Partials/AllReports'
import { CustomTabs } from '../../../components/CustomTabs'
import { TraineeReports } from './AllReports/Partials/TraineeReports';
import { CompanyReports } from './AllReports/Partials/CompanyReports';
import Reports from './AllReports/Partials/AccountReports';

export const AllReportsIndex = () => {
  const tabs = [
    { key:"1",label: 'Company Reports', children: <CompanyReports />},
    { key:"2",label: 'Accounts Reports', children: <Reports />},
    { key:"3",label: 'Employee Reports', children: <AllReports />},
    { key:"4",label: 'Trainee Reports', children: <TraineeReports />},
  ];

  const onChangeTabs =()=>{}

  return (
    <div>
      <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
    </div>
  )
}
