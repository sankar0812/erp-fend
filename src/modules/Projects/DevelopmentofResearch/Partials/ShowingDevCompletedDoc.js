import React, { useEffect, useState } from 'react'
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../components/CustomRow';
import { Card, Col, Tooltip } from 'antd';
import { CustomModal } from '../../../../components/CustomModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaFilePdf } from 'react-icons/fa';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD';
import { toast } from 'react-toastify';
import request from '../../../../utils/request';
import { AllDevCompletedProjects, getDevCompletedProjects } from '../DevelopmentSlice';
import ViewDevPDF from './ViewDevPDF';
import { selectCurrentRole } from '../../../Auth/authSlice';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import styled from 'styled-components';


export const ShowingDevCompletedDoc = () => {
    const dispatch = useDispatch()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0)
    const [viewedDoc, setViewedDoc] = useState(false);
    const [viewData, setViewData] = useState([])

    const StyledPending = styled.div`
    width: 80px;
    border: 3px solid black;
    color: white;
    text-align: center;
    padding: 5px;
    background-color: #6b5da6 ;
    margin: 20px;
      `
    const StyledApproved = styled.div`
    width: 80px;
    border: 3px solid black;
    text-align: center;
    color: white;
    padding: 5px;
    background-color: green;
    margin: 20px;
      `
    const StyledRejected = styled.div`
  width: 80px;
  border: 3px solid black;
  text-align: center;
  padding: 5px;
  color: white;
  background-color: red;
  margin: 20px;
  `
    useEffect(() => {
        dispatch(getDevCompletedProjects())
    }, [])

    const AllDevCompletedDocs = useSelector(AllDevCompletedProjects);

    const CurrentRole = useSelector(selectCurrentRole)

    useEffect(() => {
        setViewData(AllDevCompletedDocs)
    }, [AllDevCompletedDocs,viewData])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(getDevCompletedProjects())
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        dispatch(getDevCompletedProjects())
        setViewedDoc(false)
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
    };

    const ViewResearchedDoc = (doc) => {
        setViewedDoc(true)
        // setFormReset(setTrigger + 1);
        setTrigger(trigger+1)
        setModalTitle("R & D  PDF");
        setModalContent(
            <ViewDevPDF researchRecord={doc} FormExternalClose={FormExternalClose} showdevtrigger={trigger} />
        );
        showModal();
    };

    const PromoteToNextStep = (doc) => {
        const newValues = {
            projectStatus: 'approved'
        }
        request.put(`${RANDDURLS.PUT_DEV_STATUS_CHANGE}${doc?.researchDevelopmentFileId}`, newValues)
            .then(resp => {
                toast.success("Project Approved")
                dispatch(getDevCompletedProjects())
            })
            .catch(error => console.log(error, 'error'))
    }


    const dummycancel =()=>{

    }
    // const handleReject = (value) => {
    //     const newValues = {
    //         projectStatus: 'rejected'
    //     }
    //     request.put(`research/details/edit/${value.researchId}`, newValues)
    //         .then(resp => {
    //             toast.success("Project Rejected")
    //             // dispatch(getResearchAndDev())
    //         })
    //         .catch(error => console.log(error, 'error'))
    // }

    return (
        <div>
            <CustomPageTitle Heading={"View Dev Completed Report and Approval"} />

            <CustomRow space={[24, 24]} style={{ marginTop: '30px' }}>
            {
                    viewData?.map((doc) => (
                        <Col span={24} md={8} key={doc.researchDevelopmentFileId}>
                            {doc.projectStatus === "approved" || doc.projectStatus === "rejected" ? (
                                <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                    <Flex center={"true"} gap={'20px'}>
                                        <h1>{doc.projectName}</h1>
                                        <Tooltip title={'View PDF'}>
                                            <TableIconHolder color={ doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
                                                <FaFilePdf />
                                            </TableIconHolder>
                                        </Tooltip>
                                    </Flex>
                                </Card>
                            ) : (
                                !viewedDoc && CurrentRole === USER_ROLES.PROJECTMANAGER ? (
                                    <CustomPopconfirm
                                        title="Are you sure?"
                                        description="About promoting this project?"
                                        okText="APPROVE"
                                        cancelText="CANCEL"
                                        confirm={() => PromoteToNextStep(doc)}
                                        cancel={dummycancel}
                                    >
                                        <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                            <Flex center={"true"} gap={'20px'}>
                                                <h1>{doc.projectName}</h1>
                                                <Tooltip title={'View PDF'}>
                                                    <TableIconHolder color={ doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
                                                        <FaFilePdf />
                                                    </TableIconHolder>
                                                </Tooltip>
                                            </Flex>
                                        </Card>
                                    </CustomPopconfirm>
                                ) : (
                                    !viewedDoc && (
                                        <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                            <Flex center={"true"} gap={'20px'}>
                                                <h1>{doc.projectName}</h1>
                                                <Tooltip title={'View PDF'}>
                                                    <TableIconHolder color={ doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
                                                        <FaFilePdf />
                                                    </TableIconHolder>
                                                </Tooltip>
                                            </Flex>
                                        </Card>
                                    )
                                )
                            )}
                        </Col>
                    ))
                }

            </CustomRow>
            <CustomRow>
                <Col span={24} md={24}>
                    <Flex flexend={'true'}>
                        <StyledPending>
                            <h1>Pending</h1>
                        </StyledPending>
                        <StyledApproved>
                            <h1>Approved</h1>
                        </StyledApproved>
                        <StyledRejected>
                            <h1>Rejected</h1>
                        </StyledRejected>
                    </Flex>
                </Col>
            </CustomRow>
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}

