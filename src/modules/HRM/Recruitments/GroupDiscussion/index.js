import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { GdContainer } from './Partials/GdContainer'

export const InterviewGroupDiscussion = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'GroupDiscussion'}/>
      <GdContainer />
    </Fragment>
  )
}