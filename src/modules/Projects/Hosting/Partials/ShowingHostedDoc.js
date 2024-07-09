import React, { useEffect, useState } from 'react'
import { TableIconHolder } from '../../../../components/CommonStyled';
import Flex from '../../../../components/Flex';
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
import styled from 'styled-components';
import { AllHostingDocuments, getAllHostingDocuments } from '../../AfterResearchDevelopment/AfterRandDSlice';
import ViewHostedPDF from './ViewHostedPDF';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import { selectCurrentRole } from '../../../Auth/authSlice';
import request from '../../../../utils/request';


const ShowingHostedDoc = () => {
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
        dispatch(getAllHostingDocuments())
    }, [])

    const allHostedDoc = useSelector(AllHostingDocuments);

    useEffect(() => {
        setViewData(allHostedDoc)
    }, [allHostedDoc, viewData])

    const CurrentRole = useSelector(selectCurrentRole)

    console.log(allHostedDoc, 'allHostedDoc');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(getAllHostingDocuments())
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        dispatch(getAllHostingDocuments())
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
        setTrigger(trigger + 1)
        setModalTitle("Research PDF");
        setModalContent(
            <ViewHostedPDF researchRecord={doc} FormExternalClose={FormExternalClose} showresearchtrigger={trigger} />
        );
        showModal();
    };

    const PromoteToNextStep = (doc) => {
        const newValues = {
            projectStatus: 'approved'
        }
        request.put(`${RANDDURLS.PUT_APPROVED_HOSTED_DOC}${doc?.hostingDocumentationId}`, newValues)
            .then(resp => {
                toast.success("Project Approved")
                dispatch(getAllHostingDocuments())
            })
            .catch(error => console.log(error, 'error'))
    }

    const dummycancel = () => {
    }

    return (
        <div>
            <CustomPageTitle Heading={"View All Hosted Documents"} />

            <CustomRow space={[24, 24]} style={{ marginTop: '30px' }}>
                {
                    viewData?.map((doc) => (
                        <Col span={24} md={8} key={doc.id}>
                            {doc.projectStatus === "approved" || doc.projectStatus === "rejected" ? (
                                <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                    <Flex center={"true"} gap={'20px'}>
                                        <h1>{doc.projectName}</h1>
                                        <Tooltip title={'View PDF'}>
                                            <TableIconHolder color={doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
                                                <FaFilePdf />
                                            </TableIconHolder>
                                        </Tooltip>
                                    </Flex>
                                </Card>
                            ) : (
                                !viewedDoc && CurrentRole === USER_ROLES.PROJECTMANAGER ? (
                                    <CustomPopconfirm
                                        title="Are you sure?"
                                        description="About promoting this Document ?"
                                        okText="APPROVE"
                                        cancelText="CANCEL"
                                        confirm={() => PromoteToNextStep(doc)}
                                        cancel={() => dummycancel()}
                                    >
                                        <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                            <Flex center={"true"} gap={'20px'}>
                                                <h1>{doc.projectName}</h1>
                                                <Tooltip title={'View PDF'}>
                                                    <TableIconHolder color={doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
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
                                                    <TableIconHolder color={doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewResearchedDoc(doc)}>
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

export default ShowingHostedDoc