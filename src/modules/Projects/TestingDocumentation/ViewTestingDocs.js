import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../components/Flex';
import { TableIconHolder } from '../../../components/CommonStyled';
import { THEME } from '../../../theme';
import { FiEdit } from 'react-icons/fi';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomRow } from '../../../components/CustomRow';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../components/CustomModal';
import { Col, Tooltip } from 'antd';
import { TestingDocsForm } from './TestingDocsForm';
import { useDispatch } from 'react-redux';
import { AllApprovedTestingDocuments, AllTestingDocuments, allApprovedTestingDocumentError, allApprovedTestingDocumentStatus, allTestingDocumentError, allTestingDocumentStatus, getAllApprovedTestingDocuments, getAllTestingDocuments } from '../AfterResearchDevelopment/AfterRandDSlice';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../components/CommonLoading';
import { CustomTag } from '../../../components/Form/CustomTag';
import { CustomPopconfirm } from '../../../components/CustomPopConfirm';
import { BsClipboardCheck, BsThreeDots } from 'react-icons/bs';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { RANDDURLS } from '../../../utils/ApiUrls/RandD';
import TestingPDF from './TestingPDF';
import { FaFilePdf } from 'react-icons/fa';

export const ViewTestingDocs = () => {

    const dispatch = useDispatch()

    const [searchTexts, setSearchTexts] = useState('');
    const [dataSource, setDataSource] = useState([])

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
        dispatch(getAllApprovedTestingDocuments())
    }, [])

    const AllApprovedTestingDocumentsDetails = useSelector(AllApprovedTestingDocuments)
    const AllApprovedTestingDocumentsStatus = useSelector(allApprovedTestingDocumentStatus)
    const AllApprovedTestingError = useSelector(allApprovedTestingDocumentError)

    console.log(AllApprovedTestingDocumentsDetails, 'AllApprovedTestingDocumentsDetails');

    useEffect(() => {
        setDataSource(AllApprovedTestingDocumentsDetails)
    }, [AllApprovedTestingDocumentsDetails])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
        FormRest();
    };

    const handleSearchs = (value) => {
        setSearchTexts(value)
    };
    
    const UpdatingTesting = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Assigning For Hosting");
        setModalContent(
            <TestingDocsForm testrec={record} formname={"TestDoc"} FormExternalCloseee={FormExternalClose} trigger={trigger} />
        );
        showModal();
    };

    const ViewTestingPDF = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Testing PDF");
        setModalContent(
            <TestingPDF testrec={record} formname={"TestingPDF"} FormExternalCloseee={FormExternalClose} trigger={trigger} />
        );
        showModal();
    };

    const handleRandDConfirm = (record) => {

        const newValue = {
            projectStatus: 'approved',
        }

        request.put(`${RANDDURLS.PUT_APPROVING_TO_TESTING}${record.testingDocumentationId}`, newValue)
            .then(resp => {
                toast.success("Project Approved")
                dispatch(getAllTestingDocuments())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    const dummycancel = () => {

    }

    const TableColumn = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.projectName).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.projectName).includes(value.toUpperCase())
                );
            },
        },
        // {
        //     title: 'Project Status',
        //     render: (value, record) => {
        //         return (
        //             <Fragment>
        //                 <Flex center={true}>
        //                     {
        //                         record?.projectStatus === 'pending' ? (<>
        //                             <CustomTag color={'blue'} bordered={'true'} title={'PENDING'} />
        //                         </>) :
        //                             record?.projectStatus === 'approved' ? (<>
        //                                 <CustomTag color={'green'} bordered={'true'} title={'APPROVED'} /></>) :

        //                                 record?.projectStatus === 'rejected' ? (<>
        //                                     <CustomTag color={'red'} bordered={'true'} title={'REJECTED'} /></>) : null
        //                     }
        //                 </Flex>
        //             </Fragment>
        //         );
        //     },
        // },
        {
            title: "Action",
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={"10px"}>
                        {/* {
                            record.projectStatus === "pending" ?
                                (
                                    <><CustomPopconfirm
                                        record={record}
                                        confirm={() => handleRandDConfirm(record)}
                                        cancel={dummycancel}
                                        title={"Confirm Project"}
                                        okText={'Confirm'}
                                        description={"Are you sure to confirm this Project?"}>
                                        <TableIconHolder color='green'>
                                            <BsClipboardCheck color={THEME.green} />
                                        </TableIconHolder>
                                    </CustomPopconfirm>
                                        <TableIconHolder color='blue'>
                                            <FiEdit onClick={() => UpdatingTesting(record)} />
                                        </TableIconHolder>
                                    </>
                                ) :

                                (<BsThreeDots />)

                        } */}
                        {/* )} */}
                        <TableIconHolder color='blue' >
                            <FiEdit onClick={() => UpdatingTesting(record)} />
                        </TableIconHolder>
                        <Tooltip title={'View PDF'}>
                        <TableIconHolder color='red'>
                            <FaFilePdf  onClick={() => ViewTestingPDF(record)} />
                        </TableIconHolder>
                        </Tooltip>
                    </Flex>
                );
            },
        },
    ];


    let content;

    if (AllApprovedTestingDocumentsStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllApprovedTestingDocumentsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.testingDocumentationId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllApprovedTestingDocumentsStatus === 'failed') {
        content = <h2>
            {AllApprovedTestingError}
        </h2>
    }

    return (
        <div>
            <CustomPageTitle Heading={"Approved Testing Documentation"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "12px" }}
            >
                <Col span={24} md={10}>
                    <CustomInputSearch
                        placeholder={"search ..."}
                        // onsearch={()=>console.log('sike')}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>

            </CustomRow>
            {/* <CustomStandardTable columns={TableColumn} data={[{}]} /> */}

            {content}

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
