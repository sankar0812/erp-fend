import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'

const ViewDescriptionPromotion = ({ promotionrecord }) => {
    return (
        <div>
            <h1 style={{color : '#0d6efd'}}>
                {promotionrecord?.description}
            </h1>
        </div>
    )
}

export default ViewDescriptionPromotion