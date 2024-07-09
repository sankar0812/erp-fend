import React from 'react'
import { Tabs } from 'antd'

export const CustomTabs = ({ tabs, defaultActiveKey,activeKey,onChange,tabPosition }) => {

    const handleChange =(e)=>{
        onChange(e)
    }

    return (
        <Tabs tabPosition={tabPosition} activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={handleChange} items={tabs} />
         
    )
}
