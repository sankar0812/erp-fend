import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col } from 'antd'
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
import { AllApprovedProjectsForTesting, AllApprovedRandDProjects, AllProjectsForTesting, allApprovedProjectForTestingError, allApprovedProjectForTestingStatus, allProjectForTestingError, allProjectForTestingStatus, approvedRandDProjectError, approvedRandDProjectStatus, getAllProjectsForTesting, getApprovedRandDProjects, getApprovedTestingProjects } from '../AfterRandDSlice'
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm'
import { BsClipboardCheck, BsThreeDots } from 'react-icons/bs'
import { AssigningDeptAndPLForDev, AssigningDeptForTesting, AssigningPLforTesting } from './AssigningDeptAndPL'

export const ViewAllApprovedProjectForTesting = () => {

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
        dispatch(getApprovedTestingProjects())
    }, [])

    const AllApprovedProjectsForTestingDetails = useSelector(AllApprovedProjectsForTesting);
    const AllApprovedProjectForTestingStatus = useSelector(allApprovedProjectForTestingStatus);
    const AllApprovedProjectForTesingError = useSelector(allApprovedProjectForTestingError);

    useEffect(() => {
        setDataSource(AllApprovedProjectsForTestingDetails)
    }, [AllApprovedProjectsForTestingDetails])

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
        setModalTitle('Assign Dept');
        setModalContent(<AssigningDeptForTesting devrecord={record} FormExternalClose={FormExternalClose} devtrigger={trigger} />);
        showModal()
    }

    const handleRandDConfirm = (record) => {

        const newValue = {
            projectStatus: 'approved',
        }

        request.put(`${RANDDURLS.PUT_APPROVE_TO_TESTING}${record.testingId}`, newValue)
            .then(resp => {
                toast.success("Project Approved to Testing")
                dispatch(getApprovedTestingProjects())
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
                        {record.projectStatus === "pending" && record.departmentId === 0 ? (
                            <>
                                <TableIconHolder color='blue'>
                                    <FaEdit onClick={() => AssignDeptandPLModal(record)} />
                                </TableIconHolder>
                            </>
                        ) : record.projectStatus === "pending" && record.departmentId !== 0 ? (
                            <CustomPopconfirm
                                record={record}
                                confirm={() => handleRandDConfirm(record)}
                                cancel={dummycancel}
                                title="Confirm Project"
                                okText="Confirm"
                                description="Are you sure to confirm this Project?"
                            >
                                <TableIconHolder color='green'>
                                    <BsClipboardCheck color={THEME.green} />
                                </TableIconHolder>
                            </CustomPopconfirm>
                        ) : (
                            <BsThreeDots />
                        )}
                    </Flex>
                );
            }
        }
    ]

    let content;

    if (AllApprovedProjectForTestingStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllApprovedProjectForTestingStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.projectAssigningId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllApprovedProjectForTestingStatus === 'failed') {
        content = <h2>
            {AllApprovedProjectForTesingError}
        </h2>
    }

    const rowKey = (dataSource) => dataSource.quotation_id;
    return (
        <div>
            <CustomPageTitle Heading={"All Approved Projects For Testing"} />
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


