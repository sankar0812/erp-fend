import React, { useEffect, useState } from 'react'

import { Card, Col, Tooltip } from 'antd';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AllApprovedRandDProjects, AllProjectsForTesting, getAllProjectsForTesting, getApprovedRandDProjects } from '../AfterRandDSlice';
import Flex from '../../../../components/Flex';
import { CustomRow } from '../../../../components/CustomRow';
import { CustomModal } from '../../../../components/CustomModal';
import { CustomPageTitle } from '../../../../components/CustomPageTitle';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { selectCurrentRole } from '../../../Auth/authSlice';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import request from '../../../../utils/request';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD';
import ViewProjectPDF from './ViewProjectPDF';

const ShowingProjectDoc = () => {
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
        dispatch(getAllProjectsForTesting())
    }, [])

    const AllProjectsForTestingDetails = useSelector(AllProjectsForTesting);

    useEffect(() => {
        setViewData(AllProjectsForTestingDetails)
    }, [AllProjectsForTestingDetails, viewData])

    const CurrentRole = useSelector(selectCurrentRole)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        dispatch(getAllProjectsForTesting())
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        dispatch(getAllProjectsForTesting())
        setViewedDoc(false)
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
    };

    const ViewProjectDoc = (doc) => {
        setViewedDoc(true)
        setFormReset(setTrigger + 1);
        setTrigger(trigger + 1)
        setModalTitle("Project PDF");
        setModalContent(
            <ViewProjectPDF projectRecord={doc} FormExternalClose={FormExternalClose} showresearchtrigger={trigger} />
        );
        showModal();
    };

    const PromoteToNextStep = (record) => {
        const newValue = {
            projectStatus: 'approved',
        }

        request.put(`${RANDDURLS.PUT_APPROVING_TO_TESTING}${record.testingDocumentationId}`, newValue)
            .then(resp => {
                toast.success("Project Approved")
                dispatch(getAllProjectsForTesting())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    const NotToPromote = (doc) => {
        const newValues = {
            projectStatus: 'rejected'
        }
        request.put(`${RANDDURLS.PUT_PROMOTE_RESEARCH}${doc?.researchQuotationId}`, newValues)
            .then(resp => {
                toast.error("Project Rejected")
                dispatch(getApprovedRandDProjects())
            })
            .catch(error => console.log(error, 'error'))
    }

    return (
        <div>
            <CustomPageTitle Heading={"View Research Documents & Approve or Reject Research"} />

            <CustomRow space={[24, 24]} style={{ marginTop: '30px' }}>
                {
                    viewData?.map((doc) => (
                        <Col span={24} md={8} key={doc.projectDocumentationId}>
                                <Card style={{ background: doc.projectStatus === "approved" ? 'green' : (doc.projectStatus === "rejected" ? 'red' : '#6b5da6'), color: 'white' }}>
                                    <Flex center={"true"} gap={'20px'}>
                                        <h1>{doc.projectName}</h1>
                                        <Tooltip title={'View PDF'}>
                                            <TableIconHolder color={doc.projectStatus === "rejected" ? 'yellow' : 'red'} size={"22px"} onClick={() => ViewProjectDoc(doc)}>
                                                <FaFilePdf />
                                            </TableIconHolder>
                                        </Tooltip>
                                    </Flex>
                                </Card>
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

export default ShowingProjectDoc