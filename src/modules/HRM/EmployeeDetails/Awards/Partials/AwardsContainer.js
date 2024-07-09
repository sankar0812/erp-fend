import React, { Fragment } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { AddAwards } from './AddAwards'

const AwardsContainer = () => {
    return (
        <Fragment>
            <CustomPageTitle Heading={'Add Awards'} />
            <CustomCardView>
                <AddAwards />
            </CustomCardView>
        </Fragment>

    )
}

export default AwardsContainer