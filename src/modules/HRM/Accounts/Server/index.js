import React from 'react'
import { ViewServer } from './Partials/ViewServer'
import { CustomTabs } from '../../../../components/CustomTabs';
import ServerTypeTable from './Partials/ServerTypeTable';

export const Server = () => {
  const tabs = [
    {
      key: "1",
      label: "Add Server",
      children: <ViewServer/>,
    },
    {
      key: "2",
      label: "Add Server Type",
      children: <ServerTypeTable/>,
    },
  ];

  const onChangeTabs =()=>{

  }
  return (
    <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
    // <ViewServer/>
  )
}
