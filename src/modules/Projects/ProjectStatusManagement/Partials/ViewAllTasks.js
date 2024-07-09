import React, { Fragment, useEffect, useState } from 'react'
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import request from '../../../../utils/request';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import Flex from '../../../../components/Flex';
import { Card, Col, Drawer } from 'antd';
import { CustomTag } from '../../../../components/Form/CustomTag';
import { CustomModal } from '../../../../components/CustomModal';
import { ChangeStatusModal } from './ReasonModal';
import Button from '../../../../components/Form/CustomButton';
import { StyledMoreDetails } from '../style';
import { CustomRow } from '../../../../components/CustomRow';
import { AiTwotoneEdit } from "react-icons/ai";
import { EditTaskDetails } from './EditTaskDetails';
import { AssiginingTask } from '../../ProjectAssigningTask/AssiginingTask';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { selectCurrentRoleName } from '../../../Auth/authSlice';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';

const ViewAllTasks = ({ id }) => {

    const [taskDetails, setTaskDetails] = useState([])
    const [projectDetails, setProjectDetails] = useState([])
    const [drawerDetail, setDrawerDetail] = useState([])
    const [searchTexts, setSearchTexts] = useState('');

    const [open, setOpen] = useState(false);
    const [trigger, setTrigger] = useState(0)
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modelwith, setModelwith] = useState(0);

    const [modalTitle, setModalTitle] = useState();

    const [modalContent, setModalContent] = useState(null);

    const CurrentRole = useSelector(selectCurrentRoleName)

    const onClose = () => {
        setOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        handleOk();
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        GetTaskDetails()
        setIsModalOpen(false);
    };

    const showDrawer = (record) => {
        setDrawerDetail(record)
        setOpen(true);
    };

    const clickme = (record) => {
        // setModelwith(600)
        // setTrigger(trigger + 1)
        // setModalTitle("Change Status");
        // setModalContent(<ChangeStatusModal record={record} close={close} GetTaskDetails={GetTaskDetails} trigger={trigger} />);
        // showModal();
    }

    const EditTask = (record) => {

        setModelwith(800)
        setTrigger(trigger + 1)
        setModalTitle("Update Task");
        setModalContent(<EditTaskDetails taskrecord={record} close={close} GetTaskDetails={GetTaskDetails} trigger={trigger} />);
        showModal();
    }

    const AddAssigningTask = (record) => {

        setModelwith(800)
        setTrigger(trigger + 1)
        setModalTitle("Assigning Task");
        setModalContent(<AssiginingTask />);
        showModal();
    }

    useEffect(() => {
        GetTaskDetails()
    }, [])

    const GetTaskDetails = () => {
        request.get(`${APIURLS.GET_TASKDETAILS}${id}`)
            .then(function (response) {
                setTaskDetails(response?.data?.taskList)
                setProjectDetails(response?.data)
            })
            .catch(function (error) {
            })
    }
    console.log(projectDetails, 'projectDetailsprojectDetails');

    const handleSearchs = (value) => {
        setSearchTexts(value)
    };

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Department",
            dataIndex: "departmentName",
        },
        {
            title: "Reporter Name",
            dataIndex: "employeeReportName",
        },
        {
            title: "Employee Name",
            dataIndex: "employeeName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.employeeName).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.employeeName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Priority",
            dataIndex: "priority",
        },
        {
            title: "Project Key",
            dataIndex: "projectKey",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
        },
        {
            title: "Updated Date",
            dataIndex: "updated",
        },
        {
            title: "For More Details",
            render: (value, record) => {
                return (
                    <>
                        <Flex center={'true'}>
                            <StyledMoreDetails>
                                <Button.PrimaryNow text={'Click'} onClick={() => { showDrawer(record) }} />
                            </StyledMoreDetails>
                        </Flex>

                    </>
                )
            }
        },
        CurrentRole === USER_ROLES.PROJECHEAD ?
            {
                title: "Update",
                render: (value, record) => {
                    return (
                        <>{
                            record?.projectStatus !== "completed" ?
                                (<Flex center={'true'}>
                                    <CustomTag color={'blue'} bordered={'true'} title={<AiTwotoneEdit />} onClick={() => EditTask(record)} />
                                </Flex>) :
                                (<><CustomTag color={"#2f6973"} title={"Can't Update"} bordered={"true"} />
                                </>)
                        }

                        </>
                    )
                }
            } : null,
        {
            title: "Project Status",
            render: (value, record) => {
                return (
                    <Fragment>
                        <Flex center={"true"}>
                            <>
                                {record.projectStatus === 'pending' ? (
                                    <CustomTag color={'yellow'} bordered={'true'} title={'Pending'} onClick={() => { clickme(record) }} />
                                ) : record.projectStatus === 'todo' ? (
                                    <CustomTag color={'grey'} bordered={'true'} title={'Todo'} onClick={() => { clickme(record) }} />
                                ) : record.projectStatus === 'onprocess' ? (
                                    <CustomTag color={'blue'} bordered={'true'} title={'On Process'} onClick={() => { clickme(record) }} />
                                ) : record.projectStatus === 'completed' ? (
                                    <CustomTag color={'green'} bordered={'true'} title={'Completed'} />
                                ) : record.projectStatus === 'hold' ? (
                                    <CustomTag color={'orange'} bordered={'true'} title={'On Hold'} onClick={() => { clickme(record) }} />
                                ) : record.projectStatus === 'cancelled' ? (
                                    <CustomTag color={'red'} bordered={'true'} title={'Cancelled'} onClick={() => { clickme(record) }} />
                                ) : null}
                            </>
                        </Flex>
                    </Fragment>
                );
            },
        },
    ].filter((column) => column !== null);

    return (
        <div>
            <CustomRow>
                <Col span={24} md={12}>
                    <h1 ><span style={{ color: "#800020", fontSize: '30px' }}>{projectDetails?.projectName}</span>[ {projectDetails?.typeOfProject} ]</h1>
                </Col>
                <Col span={24} md={12}>
                    <Flex spacebetween="true">
                        {/* <h1>Type Of Project : {projectDetails?.typeOfProject}</h1> */}
                        {/* <Button.Primary text={'Add'} onClick={AddAssigningTask} /> */}
                    </Flex>
                </Col>
            </CustomRow>
            {/*drawer color #060642 */}
            {/*drawer color #d0d1c2 */}
            {/*drawer color #d0d1c2 */}
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "12px" }}
            >
                <Col span={24} md={10}>
                    <CustomInputSearch
                        placeholder={"Search by Employee ..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>

            </CustomRow>
            <Drawer open={open} onClose={onClose} style={{ background: '#d0d1c2', overflowY: 'scroll' }}>
                <Card style={{ background: "#5e81b8", textAlign: "center", color: "whitesmoke", borderRadius: "0%" }}>
                    <h1 style={{ fontSize: "20px" }}>{drawerDetail?.employeeName}</h1>
                </Card>
                <Card style={{ background: "#ccd8eb", borderRadius: "0%" }}>
                    <h1>SUMMARY : <span>{drawerDetail?.summary}</span></h1>
                </Card>
                <Card style={{ background: "#e4e9f2", borderRadius: "0%" }}>
                    <h1>COMMENTS : <span>{drawerDetail?.comments}</span></h1>
                </Card>
                <Card style={{ background: "#ccd8eb", borderRadius: "0%" }}>
                    <h1>LABEL : <span>{drawerDetail?.label}</span></h1>
                </Card>
                <Card style={{ background: "#e4e9f2", borderRadius: "0%" }}>
                    <h1>TYPE : <span>{drawerDetail?.type}</span></h1>
                </Card>
                {
                    drawerDetail && drawerDetail.completedDate ? (
                        <Card style={{ background: "#3e7d62", borderRadius: "0%" }}>
                            <h1 style={{ color: 'whitesmoke' }}>COMPLETED DATE : <span>{drawerDetail?.completedDate}</span></h1>
                        </Card>
                    ) : null
                }
                {
                    drawerDetail && drawerDetail.holdReason ? (
                        <Card style={{ background: "#878a6e", borderRadius: "0%" }}>
                            <h1 style={{ color: "whitesmoke" }}>HOLD REASON : <span>{drawerDetail?.holdReason}</span></h1>
                        </Card>
                    ) : null
                }
                {
                    drawerDetail && drawerDetail.cancellationReason ? (
                        <Card style={{ background: "#bd2d32", borderRadius: "0%" }}>
                            <h1 style={{ color: 'whitesmoke' }}>CANCELLATION REASON : <span>{drawerDetail?.cancellationReason}</span></h1>
                        </Card>
                    ) : null
                }
            </Drawer>
            <CustomStandardTable columns={columns} data={taskDetails} />
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default ViewAllTasks