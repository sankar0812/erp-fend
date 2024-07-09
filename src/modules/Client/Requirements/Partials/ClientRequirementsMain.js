import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { AddClientRequirements } from './AddClientRequirements'

const ClientRequirementsMain = () => {
    return (
        <div>
            <CustomCardView>
                <CustomPageTitle Heading={'Client Requirements'} />
                <AddClientRequirements />
            </CustomCardView>

        </div>
    )
}

export default ClientRequirementsMain