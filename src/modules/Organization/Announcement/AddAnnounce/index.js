import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { AddAnnounceForm } from './Partials/AddAnnounceForm'

const AddAnnounce = () => {
    return (
        <div>
            <CustomPageTitle Heading={'Add Announcement'} />
            <CustomCardView width={'900px'} >
                <AddAnnounceForm />
            </CustomCardView>

        </div>
    )
}

export default AddAnnounce