import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { ViewMaintainInvoice } from './Partials/ViewMaintainInvoice'

export const MaindenanceInvoice = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Maintenance Invoice View'} />
      <ViewMaintainInvoice />
    </Fragment>
  )
}
