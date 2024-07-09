import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { HiringContainer } from './Partials/HiringContainer'

export const Hiring = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Job Search'}/>
      <HiringContainer />
    </Fragment>
  )
}
