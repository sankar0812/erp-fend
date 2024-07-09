import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import InvoicePayForm from './Partials/InvoicePayForm'


const InvoicePay = () => {
  return (
    <Fragment>
        <CustomPageTitle Heading={'PaymentIn / Receipts'}/>
        <InvoicePayForm/>
    </Fragment>
  )
}

export default InvoicePay