import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'

export const ViewDescription = ({ viewdesrec }) => {

    return (
        <div>
            <CustomCardView>
                <p style={{color:"#0d6efd"}}>
                {viewdesrec}
                </p>
            </CustomCardView>
        </div>
    )
}
