import React from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import AddServerMainForm from './Partials/AddServerMainForm'

const AddServerMaintenance = () => {
  return (
    <div>
        <CustomPageTitle Heading={'Add Server Maintenance'}/>
        <CustomCardView>
            <AddServerMainForm/>
        </CustomCardView>
    </div>
  )
}

export default AddServerMaintenance