import React from 'react'
import { ViewAssets } from './Partials/ViewAssets'
import { CustomTabs } from '../../../../components/CustomTabs'
import { ViewBrands } from './BrandDetails/ViewBrands';
import { ViewAccessories } from './AssesoriesDetails/ViewAccessories';

export const CompanyAssets = () => {

  const tabs = [
    { key:"1", label: 'Add Company Assets', children: <ViewAssets /> },
    { key:"2", label: 'Add Brands', children: <ViewBrands />},
    { key:"3", label: 'Add Assesories', children: <ViewAccessories />},
  ];
  const onChangeTabs =()=>{}
  return (
    <div>
        <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={onChangeTabs}/>
    </div>
  )
  
}
