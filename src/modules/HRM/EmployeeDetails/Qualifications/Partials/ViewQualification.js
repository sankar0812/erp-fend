import { Col } from 'antd'
import React, { useState } from 'react'
import { CustomRow } from '../../../../../components/CustomRow'
import { StyledID, StyledQualificationCards, StyledQualificationCards1, StyledQualificationCards2, StyledQualificationCards3 } from '../style'
import profile from "../../../../../Images/avatar.png"
import styled from 'styled-components'
import pro from '../../../../../Images/google_logo.jpg'
import Button from '../../../../../components/Form/CustomButton'
import { TbEdit } from 'react-icons/tb'
import Flex from '../../../../../components/Flex'

export const ViewQualification = () => {

    const [aadhar, setAadhar] = useState(false)
    const [pan, setPan] = useState(false)
    const [degree, setDegree] = useState(false)
    const [bank, setBank] = useState(false)
    const [resume, setResume] = useState(false)

    const ImageProfile = styled.div`
    text-align: center;
    & img {
        width: 60%;
        margin:auto;
        border-radius: 20%;
    }
`
    const ViewAadhar = () => {
        setAadhar(!aadhar)
    }

    const ViewPan = () => {
        setPan(!pan)
    }
    const ViewDegree = () => {
        setDegree(!degree)
    }
    const ViewBank = () => {
        setBank(!bank)
    }
    const ViewResume = () => {
        setResume(!resume)
    }

    return (
        <div>
            <CustomRow space={[12, 12]}>
                <Col span={24} md={6} >
                    <StyledQualificationCards>
                        <ImageProfile>
                            <img src={profile} alt="Profile" />
                        </ImageProfile>
                        <StyledID>
                            {/* <Flex gap={'true'}> */}
                                <h2>Jai </h2>
                                {/* <Button.Yellow icon={<TbEdit />} />
                            </Flex> */}
                            <h1 >Employee ID</h1>
                            <h2>1010296547</h2>
                        </StyledID>
                    </StyledQualificationCards>
                </Col>

                <Col span={24} md={6} >
                    <StyledQualificationCards1>
                        <h1 onClick={ViewAadhar}>Aadhar Card</h1>
                        <h1 onClick={ViewPan}>Pan Card</h1>
                        <h1 onClick={ViewDegree}>Degree</h1>
                        <h1 onClick={ViewBank}>Bank Book</h1>
                        <h1 onClick={ViewResume}>Resume</h1>
                    </StyledQualificationCards1>
                </Col>
                <Col span={24} md={12} >
                    <StyledQualificationCards2>
                        <h1>[View Resume Here]</h1>
                        {
                            resume && (
                                <div>resumeeeeeeeee</div>
                            )
                        }
                    </StyledQualificationCards2>
                </Col>

                <Col span={24} md={6} >
                    <StyledQualificationCards3>
                        <h1>[View Aadhar Here]</h1>
                        {
                            aadhar && (
                                <div>adhaaarddddddd</div>
                            )
                        }
                    </StyledQualificationCards3>
                </Col>

                <Col span={24} md={6} >
                    <StyledQualificationCards3>
                        <h1>[View Pan Card Here]</h1>
                        {
                            pan && (
                                <div>pannnnnn</div>
                            )
                        }
                    </StyledQualificationCards3>
                </Col>
                <Col span={24} md={6} >
                    <StyledQualificationCards3>
                        <h1>[View Degree Here]</h1>
                        {
                            degree && (
                                <div>
                                    <img src={pro} alt='lll' width={200} />
                                </div>
                            )
                        }
                    </StyledQualificationCards3>
                </Col>
                <Col span={24} md={6} >
                    <StyledQualificationCards3>
                        <h1>[View Bank Book Here]</h1>
                        {
                            bank && (
                                <div>bankkkkkkkkkk</div>
                            )
                        }
                    </StyledQualificationCards3>
                </Col>
            </CustomRow>

        </div>
    )
}
