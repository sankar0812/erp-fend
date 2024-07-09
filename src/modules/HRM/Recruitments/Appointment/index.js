import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { AppointmentContainer } from './Partials/AppointmentContainer'

export const Appointments = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Appointment'}/>
      <AppointmentContainer />
    </Fragment>
  )
}
