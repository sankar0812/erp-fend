import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Tag, Tooltip } from 'antd'
import CustomInputSearch from '../../../../components/Form/CustomInputSearch'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { CommonLoading } from '../../../../components/CommonLoading'
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { THEME } from '../../../../theme'
import { BsClipboardCheck, BsThreeDots } from 'react-icons/bs'
import { CustomTag } from '../../../../components/Form/CustomTag'
import { TableIconHolder } from '../../../../components/CommonStyled'
import { AllManagementApprovedProjects, approvedManagementProjectError, approvedManagementProjectStatus, getManagementApprovedProjects } from '../DevelopmentSlice'
import Button from '../../../../components/Form/CustomButton'
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD'
import { AssigningProjects } from './AssigningProjects'
import { FaPersonDotsFromLine } from 'react-icons/fa6'

export const ApprovedbyManagementProjectList = () => {

    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);

    const dispatch = useDispatch()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        dispatch(getManagementApprovedProjects())
    }, [])

    const AllManagementApprovedProjectsDetails = useSelector(AllManagementApprovedProjects)
    const AllManagementApprovedProjectsStatus = useSelector(approvedManagementProjectStatus)
    const AllManagementApprovedProjectsError = useSelector(approvedManagementProjectError)
    
    useEffect(() => {
        setDataSource(AllManagementApprovedProjectsDetails)
    }, [AllManagementApprovedProjectsDetails])

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

    const SelectDeptAndProHead = (record) => {
        setModalTitle('Assign Project');
        setModalContent(<AssigningProjects researchRecord={record} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal()
    }

    // const AssignApprovedTask = (record) => {
    //     setFormReset(formReset + 1)
    //     setModalTitle('View Quotation');
    //     setModalContent(<AssiginingTaskDev />);
    //     showModal()
    // }

    const handleAssigningProStatusConfirm = (record) => {

        const newValue = {
            projectStatus: 'approved',
        }

        request.put(`${RANDDURLS.PUT_CHANGE_ASSIGNPROJECT_STATUS}${record.researchDevelopmentId}`, newValue)
            .then(resp => {
                toast.success("Project Moved To Project Manager")
                dispatch(getManagementApprovedProjects())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: "Type Of Project",
            dataIndex: "typeOfProject",
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

                        {
                            record.projectStatus === "pending" && record.departmentName === null ? (
                                <Tooltip title={'Assign'}>
                                    <TableIconHolder color='red' size={"22px"}>
                                        <FaPersonDotsFromLine color='blue' onClick={() => SelectDeptAndProHead(record)} />
                                    </TableIconHolder>
                                </Tooltip>
                            ) : record.projectStatus === "pending" && record.departmentName !== null ? (
                                <CustomPopconfirm
                                    record={record}
                                    confirm={() => handleAssigningProStatusConfirm(record)}
                                    cancel={dummycancel}
                                    title={"Confirm Assigned Project"}
                                    okText={'Confirm'}
                                    description={"Are you sure to confirm this Project?"}>
                                    <TableIconHolder color='green' size={"22px"}>
                                        <Tooltip title={'Status Approval'}>
                                            <BsClipboardCheck color={THEME.green} />
                                        </Tooltip>
                                    </TableIconHolder>
                                </CustomPopconfirm>
                            ) : (
                                <BsThreeDots />
                            )
                        }
                    </Flex >
                );
            },
        },
    ]

    let content;

    if (AllManagementApprovedProjectsStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllManagementApprovedProjectsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.quotationId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllManagementApprovedProjectsStatus === 'failed') {
        content = <h2>
            {AllManagementApprovedProjectsError}
        </h2>
    }

    const rowKey = (dataSource) => dataSource.quotation_id;
    return (
        <div>
            <CustomPageTitle Heading={"Management Approved Projects"} />
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
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}
