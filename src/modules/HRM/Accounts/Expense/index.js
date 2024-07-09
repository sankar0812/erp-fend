import React from 'react'
import { ExpenseTable } from './Partials/ExpenseTable'
import { CustomTabs } from '../../../../components/CustomTabs';
import ExpenseTypeTable from './Partials/ExpenseTypeTable';

export const Expense = () => {

  const tabs = [
    {
      key: "1",
      label: "Add Expense",
      children: <ExpenseTable/>,
    },
    {
      key: "2",
      label: "Add ExpenseType",
      children: <ExpenseTypeTable/>,
    },
  ];

  const onChangeTabs =()=>{

  }

  return (
    <div>
      <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
        {/* <ExpenseTable/> */}
    </div>
  )
}
