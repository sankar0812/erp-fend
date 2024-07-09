import React from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import ViewClientForm from './Partials/ViewClientForm'

const ClientRequireForm = () => {
  return (
    <div>
        <CustomPageTitle Heading={'Requirements Form'}/>
        <ViewClientForm/>
    </div>
  )
}

export default ClientRequireForm