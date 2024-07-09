import React from 'react'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { AddQuotation } from './Partials/AddQuotation'

const QuotaionContainer = () => {
  return (
    <div>
        <CustomPageTitle Heading={'Add Quotation'} />
        <AddQuotation />
    </div>
  )
}

export default QuotaionContainer