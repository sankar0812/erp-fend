import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { SheduleContainer } from './Partials/IntScheduleContainer'

export const InterviewSheduleContain = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'InterviewSchedule'}/>
      <SheduleContainer />
    </Fragment>
  )
}