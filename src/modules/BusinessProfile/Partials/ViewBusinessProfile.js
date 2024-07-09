import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow'
import { Col, Tooltip } from 'antd'
import { CustomCardView } from '../../../components/CustomCardView'
import { GrEdit } from 'react-icons/gr'
import { getBusinessProfile, selectAllBusinessProfile } from '../BusinessSlice'
import { useDispatch, useSelector } from 'react-redux'
import { base } from '../../../utils/request'
import { CustomModal } from '../../../components/CustomModal'
import { BusinessProfile } from './BusinessProfile'
import { Details, EmpDetails } from '../../HRM/EmployeeDetails/Style'
import Flex from '../../../components/Flex'
import { IoPinSharp } from 'react-icons/io5'
import { FaDotCircle } from 'react-icons/fa'
import { StyledSignature } from '../style'

export const ViewBusinessProfile = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBusinessProfile())
    }, [])

    const profdetails = useSelector(selectAllBusinessProfile)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [formReset, setFormReset] = useState(0);

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
        FormRest()
    }

    const BusinessProfileView = () => {
        setFormReset(formReset + 1)
        setModalTitle('Business Profile');
        setModalContent(<BusinessProfile FormExternalClosee={FormExternalClose} formname={'AddBusinessProfile'} updatetrigger={formReset} />);
        showModal()
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    }

    return (
        <CustomRow>
            <Col span={24} md={24}>
                <CustomCardView>
                    <CustomRow space={[12, 12]}>
                        <Col span={24} md={10}>
                            <EmpDetails>
                                <img
                                    src={`${base}${profdetails?.url}`}
                                    alt="img"
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: "25%", objectFit:"cover" }}
                                />
                                <div style={{ marginLeft: "20px" }}>
                                    <p
                                        style={{
                                            fontWeight: "900",
                                            fontSize: "25px",
                                            color: "#000",
                                        }}
                                    >
                                        {/* {detailget?.userName} */}
                                    </p>
                                    {/* <p>{detailget?.departmentName}</p> */}
                                    <br />
                                    <p></p>
                                    <br />
                                    <h1 style={{ color: "#000", fontSize: '30px' }}>
                                        {profdetails?.companyName}
                                    </h1>
                                    {/* <p>Date of Join : {detailget?.date}</p> */}
                                </div>

                            </EmpDetails>
                        </Col>
                        <Col span={24} md={14}>
                            <Details>
                                <CustomRow
                                    style={{ position: "relative" }}
                                    space={[12, 12]}
                                >
                                    <Col span={24} md={23} sm={23}>
                                        <CustomRow space={[12, 12]}>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="para">Phone :</p>
                                            </Col>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="paraBlue">
                                                    {profdetails?.phoneNumber1}
                                                </p>
                                            </Col>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="para">Alterative Number :</p>
                                            </Col>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="paraBlue">
                                                    {profdetails?.phoneNumber2}
                                                </p>
                                            </Col>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="para">Email:</p>
                                            </Col>
                                            <Col span={24} md={12} sm={12}>
                                                <p className="paraBlue">
                                                    {profdetails?.email}
                                                </p>
                                            </Col>
                                            <Col span={24} md={13} sm={13}>
                                                <p className="para">Location</p>
                                            </Col>
                                            <Col span={24} md={11} sm={11}>
                                                <p className="para">{profdetails?.location}</p>
                                            </Col>
                                            <Col span={24} md={13} sm={13}>
                                                <p className="para">Address:</p>
                                            </Col>
                                            <Col span={24} md={11} sm={11}>
                                                <p className="para"> {profdetails?.address}</p>
                                            </Col>
                                            <Col span={24} md={13} sm={13}>
                                                <p className="para">Country :</p>
                                            </Col>
                                            <Col span={24} md={11} sm={11}>
                                                <p className="para">{profdetails?.country}</p>
                                            </Col>
                                            <Col span={24} md={13} sm={13}>
                                                <p className="para">State :</p>
                                            </Col>
                                            <Col span={24} md={11} sm={11}>
                                                <p className="para">{profdetails?.state}</p>
                                            </Col>
                                            <Col span={24} md={13} sm={13}>
                                                <p className="para">Pincode :</p>
                                            </Col>
                                            <Col span={24} md={11} sm={11}>
                                                <p className="para">{profdetails?.pincode}</p>
                                            </Col>
                                        </CustomRow>
                                    </Col>

                                </CustomRow>
                            </Details>
                        </Col>
                    </CustomRow>
                </CustomCardView>
            </Col>

            <Col span={24} md={12} style={{ marginTop: '25px' }}>
                <CustomCardView>
                    <CustomRow space={[12, 12]}>
                        <Col span={24} md={21} sm={21}>
                            <p className="cardheading">Bank Details :</p>
                        </Col>
                        <Col span={24} md={3} sm={3}>
                            <div className="icon-places">
                                {/* <FiPlus className="Add-icon" /> */}
                                <GrEdit
                                    className="icon"
                                    onClick={() => {
                                        BusinessProfileView();
                                    }}
                                />
                            </div>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">Account Holder Name</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.holderName}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">Bank Name</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.bankName}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">Branch Name</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.branchName}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">Account Number</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.accountNo}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">GST No</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.gstNo}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">Tax No</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.taxNo}</p>
                        </Col>

                        <Col span={24} md={11} sm={11}>
                            <p className="para">IFSC Code</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                            <p>{profdetails?.ifscCode}</p>
                        </Col>
                    </CustomRow>
                </CustomCardView>
            </Col>
            <Col span={24} md={12} style={{ marginTop: '25px' }}>
                <Tooltip title={'Signature'}>
                    <StyledSignature>
                        <Flex end={'true'} >
                            <CustomCardView>
                                <Flex center={"true"}>
                                    <FaDotCircle style={{ marginTop: "-23px", color: 'red' }} />
                                </Flex>
                                <img
                                    src={`${base}${profdetails?.signature}`}
                                    alt="img"
                                    width={100}
                                    // height={100}
                                    style={{ objectFit: "cover" }}
                                />
                            </CustomCardView>
                        </Flex>
                    </StyledSignature>
                </Tooltip>
            </Col>
            <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomRow>

    )
}
