import React, { Fragment } from 'react'
import { ExampleContainer } from './Partials/ExampleContainer'
import { CustomPageTitle } from '../../components/CustomPageTitle'
import { Receipt } from './Partials/Receipt'

export const Example = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Company'} /> 
       <ExampleContainer />
      {/* <Receipt/> */}
    </Fragment>
  )
}
