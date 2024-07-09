import React, { Fragment } from 'react'
import { OfferContainer } from './Partials/OfferContainer'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'

export const Offers = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'Offer'}/>
      <OfferContainer />
    </Fragment>
  )
}
