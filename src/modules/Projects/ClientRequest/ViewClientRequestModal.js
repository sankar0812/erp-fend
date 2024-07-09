import React from 'react'
import { CustomRow } from '../../../components/CustomRow'
import { Col } from 'antd'
import styled from 'styled-components'
import Flex from '../../../components/Flex'


const StyledClientModal = styled.div`
    
.BluStyle {
    color : #0d6efd;
}

& h1{
    padding: 5px;
}
`
const ViewClientRequestModal = ({ ClientReqRecord }) => {


    console.log(ClientReqRecord, 'ClientReqRecord');
    return (
        <StyledClientModal>
            <CustomRow >
                <Col span={24} md={24}>
                    <Flex flexend={'true'}>
                        <h1 style={{color : 'red'}}>{ClientReqRecord?.date}</h1>
                    </Flex>
                </Col>

                <Col span={24} md={12}>
                    <h1>Client Name </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.clientName}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h1>Project Name  </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.projectName}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h1>Billing Type  </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.projectType}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h1>Duration </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.duration}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h1>Features  </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.features}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h1>Skills And Description </h1>
                </Col>

                <Col span={24} md={12}>
                    <h1 className='BluStyle'>{ClientReqRecord?.skillsAndDescription}</h1>
                </Col>
            </CustomRow>
        </StyledClientModal>
    )
}

export default ViewClientRequestModal