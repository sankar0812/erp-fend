import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Tag, Tooltip } from 'antd'
import CustomInputSearch from '../../../../components/Form/CustomInputSearch'
import { FiEye } from 'react-icons/fi'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { CommonLoading } from '../../../../components/CommonLoading'
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { THEME } from '../../../../theme'
import { AiOutlineFileExcel } from 'react-icons/ai';
import { BsClipboardCheck, BsFileEarmarkPdfFill, BsThreeDots } from 'react-icons/bs'
import { APIURLS } from '../../../../utils/ApiUrls/Client'
import { CustomTag } from '../../../../components/Form/CustomTag'
import { TableIconHolder } from '../../../../components/CommonStyled'
import { AllApprovedProjects, AllDevCompletedProjects, approvedProjectError, approvedProjectStatus, devCompletedProjectError, devCompletedProjectStatus, getApprovedProjects, getDevCompletedProjects } from '../DevelopmentSlice'
import Button from '../../../../components/Form/CustomButton'
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD'
import { FaEdit } from "react-icons/fa";
import { DevAssigneeModal } from './DevAssigneeModal'

export const DevCompletedList = () => {

    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);
    const [quotationDetails, setQuotationDetails] = useState([])
    const [trigger, setTrigger] = useState([])

    const dispatch = useDispatch()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        dispatch(getDevCompletedProjects())
    }, [])

    const AllDevCompletedDocs = useSelector(AllDevCompletedProjects);
    const AllDevCompletedStatus = useSelector(devCompletedProjectStatus);
    const AllDevCompletedError = useSelector(devCompletedProjectError);
    
    useEffect(() => {
        setDataSource(AllDevCompletedDocs)
    }, [AllDevCompletedDocs])

    // ===== Modal Functions Start =====
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };
    // ===== Modal Functions ends =====


    // ===== Other Functions=====
    const FormRest = () => {
        setFormReset(formReset + 1);
    };
    const FormExternalClose = () => {
        handleOk();
    };
    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const dummycancel = () => {

    }

    const viewQuotation = (values) => {
        // setModalTitle('View Quotation');
        // setModalContent(<AddClientQuotation businessProfile={businessProfile} handleOk={handleOk} FormExternalClose={FormExternalClose} formname={'editQuotation'} formReset={formReset} quotationrecord={values} />);
        // showModal()
    }

    const DevAssignee = (record) => {
        setModalTitle('Select Reportee');
        setModalContent(<DevAssigneeModal devrec={record} FormExternalClose={FormExternalClose} />);
        showModal()
    }

    const ViewReseachedPDFModal = (record) => {
        // setTrigger(trigger + 1)
        // setModalTitle('View Research PDF');
        // setModalContent(<ViewClientResearchPDF clientViewRecord={record} FormExternalClose={FormExternalClose} researchtrigger={trigger} />);
        // showModal()
    }

    const handleQuotationConfirm = (record) => {

        const newValue = {
            projectStatus: 'managerApproved',
        }

        request.put(`${RANDDURLS.PUT_APPROVEDPROJECT_STATUSCHANGE}${record.quotation_id}`, newValue)
            .then(resp => {
                toast.success("Project Moved To Project Manager")
                dispatch(getApprovedProjects())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    // const TakeRejectedReason = (record) => {
    //     setModalTitle('View Quotation');
    //     // setModalContent(<RejectedReasonModal quoterecord={record} FormExternalClose={FormExternalClose} GetClientQuotation={GetClientQuotation} />);
    //     showModal()
    // }

    // const handleQuotationCancel = (record) => {

    //     const newValue = {
    //         projectStatus: 'managerRejected',
    //         // roleName: CurrentRoleName
    //     }
    //     request.put(`${RANDDURLS.PUT_APPROVEDPROJECT_STATUSCHANGE}${record.quotation_id}`, newValue)
    //         .then(resp => {
    //             toast.success("Quotation Cancelled")

    //         })
    //         .catch(error => { console.log(error, 'erorr') })
    // }

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        // {
        //     title: "Quotation ID",
        //     dataIndex: "quotationId",
        // },
        // {
        //     title: "Client Name",
        //     dataIndex: "clientName",
        // },
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
                    String(record.projectName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.projectName).includes(value.toUpperCase())
                );
            },

        },
        {
            title: 'Project Status',
            render: (value, record) => {
                return (
                    <Fragment>
                        <Flex center={"true"}>
                            {
                                record?.projectStatus === 'pending' ? (<>
                                    <CustomTag color={'blue'} bordered={'true'} title={'PENDING'} />
                                </>) :
                                    record?.projectStatus === 'approved' ? (<>
                                        <CustomTag color={'green'} bordered={'true'} title={'APPROVED'} /></>) :

                                        record?.projectStatus === 'rejected' ? (<>
                                            <CustomTag color={'red'} bordered={'true'} title={'REJECTED'} /></>) : null
                            }
                        </Flex>
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center={"true"} gap={'20px'}>
                        {/* <Tooltip title={'View Quotation'}>
                            <TableIconHolder color='blue'>
                                <FiEye onClick={() => viewQuotation(record)} color='blue' />
                            </TableIconHolder>
                        </Tooltip> */}

                        {/* {
                            record.projectStatus === "pending" ?
                                (<CustomPopconfirm
                                    record={record}
                                    confirm={() => handleQuotationConfirm(record)}
                                    cancel={dummycancel}
                                    title={"Confirm Project"}
                                    okText={'Confirm'}
                                    description={"Are you sure to confirm this Project?"}>
                                    <TableIconHolder color='green'>
                                        <BsClipboardCheck color={THEME.green} />
                                    </TableIconHolder>
                                </CustomPopconfirm>) : (
                                    <BsThreeDots />
                                )

                        } */}

                        {/* <CustomPopconfirm
                                    record={record}
                                    confirm={() => TakeRejectedReason(record)}
                                    cancel={dummycancel}
                                    title={"Cancel Quotation"}
                                    okText={'Confirm'}
                                    description={"Are you sure to cancel this Quotation?"}>
                                    <TableIconHolder color='green'>
                                        <AiOutlineFileExcel color={THEME.red} />
                                    </TableIconHolder>
                                </CustomPopconfirm> */}
                        {
                            record.projectStatus === "pending" ?
                                (<>
                                    <TableIconHolder color='blue' >
                                        <FaEdit color={THEME.blue} size={22} onClick={() => { DevAssignee(record) }} />
                                    </TableIconHolder>
                                </>) : (<><BsThreeDots /></>)
                        }

                        {/* 
                        <Tooltip title={'View PDF'}>
                            <TableIconHolder color='red'>
                                <BsFileEarmarkPdfFill color='red' onClick={() => ViewReseachedPDFModal(record)} />
                            </TableIconHolder>
                        </Tooltip> */}
                    </Flex >
                );
            },
        },
    ]

    let content;

    if (AllDevCompletedStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllDevCompletedStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.quotationId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllDevCompletedStatus === 'failed') {
        content = <h2>
            {AllDevCompletedError}
        </h2>
    }

    const rowKey = (dataSource) => dataSource.quotation_id;
    return (
        <div>
            <CustomPageTitle Heading={"Development Completed List"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <CustomPageFormTitle Heading={"Projects"} />
                    <CustomInputSearch
                        placeholder={"search by project name..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>
            </CustomRow>

            {content}

            {/* <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} /> */}

            {/* <Button.Primary text={'Temporary'} onClick={AssignApprovedTask} /> */}
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={500}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}


