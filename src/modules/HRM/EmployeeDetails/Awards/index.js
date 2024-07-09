import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { Viewawardstable } from './Partials/ViewawardsTable'

const Awards = () => {
    return (
        <>
            <CustomPageTitle Heading={'Awards'} />
            <CustomCardView>
                <Viewawardstable />
            </CustomCardView>
        </>


    )
}

export default Awards