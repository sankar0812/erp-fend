import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { HrInterviewContainer } from './Partials/HrInterviewContainer'

export const HrInterview = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'HR Interview'}/>
      <HrInterviewContainer />
    </Fragment>
  )
}
