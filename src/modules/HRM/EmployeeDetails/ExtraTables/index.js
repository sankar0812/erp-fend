import React from 'react'
import { Col } from 'antd'
import ViewDesignations from '../ViewDesignations/Partials/ViewDesignations'
import ViewDepartments from '../ViewDepartments/Partials/ViewDepartments'
import { ViewShift } from './Partials/ViewShift'
import { CustomTabs } from '../../../../components/CustomTabs'

export const ExtraTables = () => {
  const tabs = [
    { key:"1", label: 'Designations', children: <ViewDesignations /> },
    { key:"2", label: 'Departments', children:     <ViewDepartments />},
    // { key:"3", label: 'Shifts', children:  <ViewShift /> },
  ];

  const onChangeTabs =()=>{

  }
  
  return (
    <div>
      {/* <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <ViewDesignations />
        </Col>
        <Col span={24} md={12}>
          <ViewDepartments />
        </Col>
        <Col span={24} md={12}>
          <ViewShift />
        </Col>
      </CustomRow> */} 
        <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
    </div>
  )
}
