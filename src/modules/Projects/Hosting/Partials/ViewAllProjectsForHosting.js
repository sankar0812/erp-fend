import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Tooltip } from 'antd'
import CustomInputSearch from '../../../../components/Form/CustomInputSearch'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { CommonLoading } from '../../../../components/CommonLoading'
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { THEME } from '../../../../theme'
import { CustomTag } from '../../../../components/Form/CustomTag'
import { TableIconHolder } from '../../../../components/CommonStyled'
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD'
import { FaEdit } from "react-icons/fa";
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm'
import { BsClipboardCheck, BsThreeDots } from 'react-icons/bs'
import { AllProjectsForHosting, allProjectsForHostingError, allProjectsForHostingStatus, getAllProjectsForHosting } from '../../AfterResearchDevelopment/AfterRandDSlice'
import { AssigningDeptForTesting } from './AssignPLandDeptForHosting'
import { FaPersonDotsFromLine } from 'react-icons/fa6'


export const ViewAllProjectForHosting = () => {

    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState([])

    const dispatch = useDispatch()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        dispatch(getAllProjectsForHosting())
    }, [])

    const AllProjectsForHostingDetails = useSelector(AllProjectsForHosting);
    const AllProjectForHostingStatus = useSelector(allProjectsForHostingStatus);
    const AllProjectForHostingError = useSelector(allProjectsForHostingError);

    useEffect(() => {
        setDataSource(AllProjectsForHostingDetails)
    }, [AllProjectsForHostingDetails])

    console.log(AllProjectsForHostingDetails,'allhost');

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

    const AssignDeptandPLModal = (record) => {
        setTrigger(trigger + 1)
        setModalTitle('Assign PL And Department');
        setModalContent(<AssigningDeptForTesting devrecord={record} FormExternalClose={FormExternalClose} devtrigger={trigger} />);
        showModal()
    }

    const handleRandDConfirm = (record) => {

        const newValue = {
            projectStatus: 'approved',
        }

        request.put(`${RANDDURLS.PUT_APPROVE_HOSTING}${record.hostingId}`, newValue)
            .then(resp => {
                toast.success("Project Approved to Hosting")
                dispatch(getAllProjectsForHosting())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    const TableColumn = [
        {
            title: 'SI No',
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
                                record?.projectStatus === "pending" ? (<>
                                    <CustomTag color={'blue'} bordered={'true'} title={'PENDING'} />
                                </>) :
                                    record?.projectStatus === 'approved' ? (<>
                                        <CustomTag color={'green'} bordered={'true'} title={'APPROVED'} /></>) :

                                        record?.projectStatus === 'managerRejected' ? (<>
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
                        {
                            record?.projectStatus === "pending" && record?.departmentId === 0 ?
                                (
                                    <Tooltip title={"Assign PL and Department"}>
                                        <TableIconHolder color='blue' >
                                            <FaPersonDotsFromLine  onClick={() => AssignDeptandPLModal(record)} />
                                        </TableIconHolder>
                                    </Tooltip>

                                ) : record?.projectStatus === "pending" && record?.departmentId !== 0 ?
                                    (
                                        <><CustomPopconfirm
                                            record={record}
                                            confirm={() => handleRandDConfirm(record)}
                                            cancel={dummycancel}
                                            title={"Confirm Project"}
                                            okText={'Confirm'}
                                            description={"Are you sure to confirm this Project?"}>
                                            <TableIconHolder color='green' >
                                                <BsClipboardCheck color={THEME.green} />
                                            </TableIconHolder>
                                        </CustomPopconfirm>
                                        </>
                                    ) :

                                    (<BsThreeDots />)

                        }
                    </Flex >
                );
            },
        },
    ]

    let content;

    if (AllProjectForHostingStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllProjectForHostingStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.projectAssigningId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllProjectForHostingStatus === 'failed') {
        content = <h2>
            {AllProjectForHostingError}
        </h2>
    }

    const rowKey = (dataSource) => dataSource.quotation_id;
    return (
        <div>
            <CustomPageTitle Heading={"All Projects For Hosting"} />
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


