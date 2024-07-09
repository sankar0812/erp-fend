import { Col } from 'antd'
import React from 'react'
import { ViewLabel, ViewLabelData } from '../../../components/CommonStyled'
import { CustomRow } from '../../../components/CustomRow'

export const ExampleViewCompayData = () => {
    return (
        <CustomRow space={[12, 12]}>
            <Col span={24} md={10}>
                <ViewLabel>Product Name</ViewLabel>
            </Col>

            <Col span={24} md={14}>
                <ViewLabelData>&nbsp;:&nbsp;Pokey Mon</ViewLabelData>
            </Col>
        </CustomRow>
    )
}
