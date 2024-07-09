import React from 'react'
import { InActiveTable } from './Partials/InActiveTable'
import { CustomTabs } from '../../../../components/CustomTabs';
import { UserInActiveTable } from './Partials/UserInActiveTable';

export const ViewInActiveEmployee = () => {
  const tabs = [
    { key:"1", label: 'Inactive User', children: <UserInActiveTable /> },
    { key:"2", label: 'Inactive Employee', children: <InActiveTable />},


  ];
  const onChangeTabs =()=>{}
  return (
    <div>
        <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
    </div>
  )
}
