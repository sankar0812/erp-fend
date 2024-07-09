import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CandidateContainer } from './Partials/CandidateContainer'

export const Recruitment = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Recruitment'} />
      <CandidateContainer />
    </Fragment>
  )
}
