import React, { Fragment, useEffect, useState } from 'react'
import { allProjectDetails, getProjectDetails, projectDetailsError, projectDetailsStatus } from '../../ProjectSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import { CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../components/CustomRow';
import { Col, Tooltip } from 'antd';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { THEME } from '../../../../theme';
import { CustomTag } from '../../../../components/Form/CustomTag';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import Button from '../../../../components/Form/CustomButton';
import { AssiginingTask } from '../../ProjectAssigningTask/AssiginingTask';
import { BsCheck2All } from 'react-icons/bs';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { BiSolidLike } from 'react-icons/bi';
import { selectCurrentId, selectCurrentRoleId, selectCurrentRoleName } from '../../../Auth/authSlice';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import PromotingProjectModal from './PromotingProjectModal';
import { CustomLableBack } from '../../../../components/CustomLableBack';
import { AssiginingTaskDev } from '../../AfterResearchDevelopment/Partials/AssignTaskDev';
import { CustomTabs } from '../../../../components/CustomTabs';


export const ProjectManagement = () => {

    const dispatch = useDispatch()

    const [searchTexts, setSearchTexts] = useState('');
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [formReset, setFormReset] = useState(0);
    const [proDetailsbyRole, setProDetailsbyRole] = useState([])
    const [proDetailsbyEmp, setProDetailsbyEmp] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [widthModal, setWidthModal] = useState("")
    const [filteredProjectType, setFilteredProjectType] = useState("Research")
    const [researchcount, setResearchCount] = useState(0);
    const [developmentcount, setDevelopmentCount] = useState(0);
    const [projectcount, setProjectCount] = useState(0);
    const [testingcount, setTestingCount] = useState(0);
    const [hosingcount, setHostingCount] = useState(0);

    useEffect(() => {
        dispatch(getProjectDetails())
    }, [])

    const AllProjectDetails = useSelector(allProjectDetails)

    const projectStatus = useSelector(projectDetailsStatus)
    const projectError = useSelector(projectDetailsError)

    const EnteringId = useSelector(selectCurrentId)
    const EnteringRoleId = useSelector(selectCurrentRoleId)
    const CurrentRole = useSelector(selectCurrentRoleName)

    const rowKeyy = (proDetailsbyRole) => proDetailsbyRole.employeeId;
    useEffect(() => {
        setDataSource(AllProjectDetails)
    }, [AllProjectDetails])

    useEffect(() => {
        GetTaskDetailsByRole()
    }, [])

    const GetTaskDetailsByRole = () => {
        request.get(`${APIURLS.GET_TASK_BY_ROLE}${EnteringId}/${EnteringRoleId}`)
            .then(function (response) {
                setProDetailsbyRole(response?.data?.project)
            })
            .catch(function (error) {
            })
    }

    useEffect(() => {
        GetTaskDetailsByEmployee()
    }, [])

    const GetTaskDetailsByEmployee = () => {
        request.get(`${APIURLS.GET_TASK_BY_EMP}${EnteringId}/${EnteringRoleId}`)
            .then(function (response) {
                setProDetailsbyEmp(response?.data?.project)
            })
            .catch(function (error) {
            })
    }

    useEffect(() => {
        TakeCount() 
    }, [proDetailsbyRole, proDetailsbyEmp, dataSource])

    console.log(proDetailsbyRole,'proDetailsbyRole');
    console.log(proDetailsbyEmp,'proDetailsbyEmp');
    console.log(dataSource,'dataSource');

    const TakeCount = () => {
        if (proDetailsbyRole && proDetailsbyRole.length > 0) {
            const ResearchCount = proDetailsbyRole.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'research').length;
            const DevelopmentCount = proDetailsbyRole.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'development').length;
            const ProjectCount = proDetailsbyRole.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'project').length;
            const TestingCount = proDetailsbyRole.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'testing').length;
            const HostingCount = proDetailsbyRole.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'hosting').length;
            setResearchCount(ResearchCount);
            setDevelopmentCount(DevelopmentCount);
            setProjectCount(ProjectCount);
            setTestingCount(TestingCount)
            setHostingCount(HostingCount)
        }
        else if (proDetailsbyEmp && proDetailsbyEmp.length > 0) {
            const ResearchCount = proDetailsbyEmp.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'research').length;
            const DevelopmentCount = proDetailsbyEmp.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'development').length;
            const ProjectCount = proDetailsbyEmp.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'project').length;
            const TestingCount = proDetailsbyEmp.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'testing').length;
            const HostingCount = proDetailsbyEmp.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'hosting').length;
            setResearchCount(ResearchCount);
            setDevelopmentCount(DevelopmentCount);
            setProjectCount(ProjectCount);
            setTestingCount(TestingCount)
            setHostingCount(HostingCount)
        }
        else if (dataSource && dataSource.length > 0) {
            const ResearchCount = dataSource.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'research').length;
            const DevelopmentCount = dataSource.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'development').length;
            const ProjectCount = dataSource.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'project').length;
            const TestingCount = dataSource.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'testing').length;
            const HostingCount = dataSource.filter(item => item.projectStatus !== "completed" && item.typeOfProject === 'hosting').length;
            setResearchCount(ResearchCount);
            setDevelopmentCount(DevelopmentCount);
            setProjectCount(ProjectCount);
            setTestingCount(TestingCount)
            setHostingCount(HostingCount)
        }
        else {
            setResearchCount(0);
            setDevelopmentCount(0);
            setProjectCount(0);
            setTestingCount(0);
            setHostingCount(0);
        }
    };

    const ResearchCountVal = researchcount
    const DevelopmentVal = developmentcount
    const ProjectVal = projectcount
    const TestingVal = testingcount
    const HostingVal = hosingcount

    const items = [
        { key: '1', label: `Research (${ResearchCountVal})` },
        { key: '2', label: `Development (${DevelopmentVal})` },
        { key: '3', label: `Project (${ProjectVal})` },
        { key: '4', label: `Testing (${TestingVal})` },
        { key: '5', label: `Hosting (${HostingVal})` },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const Close = () => {
        handleOk()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearchs = (value) => {
        setSearchTexts(value)
    };

    const AddTaskFurther = (record, index) => {

        setFormReset(formReset + 1)
        setWidthModal(800)
        setModalTitle("Update Project Details");
        setModalContent(
            <AssiginingTask projectRecord={record} formname={"EditProjectDetails"} Close={Close} formReset={formReset} GetTaskDetailsByRole={GetTaskDetailsByRole} index={index} />
        );
        showModal();
    };

    const ProjectStatusToCompleted = (record) => {

        // const value = {
        //     projectStatus: "completed",
        //     typeOfProject: record?.typeOfProject,
        // };

        // request
        //     .put(`${APIURLS.PUT_OVERALL_PROJECTSTATUS_CHANGE}${record?.taskId}`, value)
        //     .then(function (response) {
        //         toast.success("Project Status Changed Successfully");
        //         dispatch(getProjectDetails())
        //     })
        //     .catch(function (error) {
        //         console.error(error, "check");
        //     });
        setFormReset(formReset + 1)
        setWidthModal(500)
        setModalTitle("Promoting the Project");
        setModalContent(
            <PromotingProjectModal projectRecord={record} formname={"StatusChangeandFileUpload"} Close={Close} formReset={formReset} GetTaskDetailsByRole={GetTaskDetailsByRole} GetTaskDetailsByEmployee={GetTaskDetailsByEmployee} />
        );
        showModal();
    };

    const AddTaskFurtherForDev = (record, index) => {
        setWidthModal(800)
        setModalTitle('Assign Task For Developers');
        setModalContent(<AssiginingTaskDev projectRecord={record} formname={"TaskAssignForDevelopers"} Close={Close} formReset={formReset} GetTaskDetailsByRole={GetTaskDetailsByRole} index={index} />);
        showModal()
    }

    const dummycancel = () => {

    };

    const TableColumn = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
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
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Type of Project",
            dataIndex: "typeOfProject",
            filteredValue: filteredProjectType ? [filteredProjectType] : null, // Use filteredProjectType state for filtering
            onFilter: (value, record) => {
                return record.typeOfProject.toLowerCase() === value.toLowerCase(); // Filter based on typeOfProject
            },
        },
        {
            title: "Total Task Count",
            render: (record, i) => {

                return (

                    <Flex center={"true"} gap={"10px"}>
                        {record?.taskList?.length}
                    </Flex>
                );
            },
        },
        {
            title: "Completed Tasks",
            render: (record, i) => {

                return (

                    <Flex center={"true"} gap={"10px"}>
                        {record?.taskList.filter((prostatus) => prostatus?.projectStatus === 'completed')?.length}
                    </Flex>
                );
            },
        },
        CurrentRole === USER_ROLES.PROJECHEAD ?
            {
                title: "Action",
                render: (record, i) => {

                    return (
                        <Flex center={"true"} gap="10px">
                            {record?.projectStatus === 'completed' ? (
                                <TableIconHolder color={THEME.red} size="22px">
                                    <BiSolidLike />
                                </TableIconHolder>
                            ) :
                                record?.projectStatus === "pending" && record?.taskList.filter((prostatus) => prostatus?.projectStatus === 'completed')?.length === record?.taskList?.length ? (
                                    <CustomPopconfirm
                                        title="Are you sure"
                                        description="About changing the status into Completed?"
                                        okText="Ok"
                                        cancelText="Cancel"
                                        confirm={() => ProjectStatusToCompleted(record)}
                                        cancel={dummycancel}
                                    >
                                        <Tooltip title={'Promote to Next Stage'} >
                                            <TableIconHolder color="#3242a8" size="22px" >
                                                <BsCheck2All />
                                            </TableIconHolder>
                                        </Tooltip>
                                    </CustomPopconfirm>
                                )
                                    : (<><CustomTag title={'On Process'} color={'gold'} /></>)
                            }
                        </Flex>
                    );
                },
            } : null,
        CurrentRole === USER_ROLES.PROJECHEAD

            ? {
                title: "Task",
                render: (value, record, index) => {

                    return (
                        <Fragment>
                            <Flex center={"true"}>
                                {record?.projectStatus === "completed" ? (
                                    <h1>Finished</h1>
                                ) : (
                                    record?.typeOfProject === "project" ? (
                                        <Button.PrimaryNow
                                            text={"Assign Task"}
                                            onClick={() => AddTaskFurtherForDev(record, index)}
                                        />
                                    ) : (
                                        <Button.PrimaryNow
                                            text={"Assign Task"}
                                            onClick={() => AddTaskFurther(record, index)}
                                        />
                                    )
                                )}
                            </Flex>
                        </Fragment>
                    );
                },
            }
            : null,
        {
            title: "Project Status",
            render: (value, record) => {
                return (
                    <Fragment>
                        <Flex center={"true"}>
                            {
                                record?.projectStatus === 'completed' ? (<>
                                    <CustomTag color={'blue'} bordered={'true'} title={'COMPLETED'} />
                                </>) : (<>
                                    <CustomTag color={'red'} bordered={'true'} title={'NOT COMPLETED'} /></>)
                            }
                        </Flex>
                    </Fragment>
                );
            },
        },

    ].filter((column) => column !== null);

    let content;

    if (projectStatus === "loading") {
        content = <CommonLoading />;
    } else if (projectStatus === "succeeded") {
        const rowKey = (dataSource) => dataSource.taskId;
        content = (
            <CustomStandardTable
                columns={TableColumn}
                data={dataSource}
                rowKey={rowKey}
            />
        );
    } else if (projectStatus === "failed") {
        content = <h2>{projectError}</h2>;
    }
    const handleTab = (tab) => {

        if (tab === '1') {
            setFilteredProjectType("research")
        }
        else if (tab === "2") {
            setFilteredProjectType("development")
        }
        else if (tab === "3") {
            setFilteredProjectType("project")
        }
        else if (tab === "4") {
            setFilteredProjectType("testing")
        }
        else if (tab === "5") {
            setFilteredProjectType("hosting")
        }
    }

    return (
        <div>
            <Flex>
                <CustomLableBack />
                {CurrentRole === USER_ROLES.PROJECHEAD ? (<><CustomPageTitle Heading={"Project Status & Assigning Tasks"} /></>)
                    : (<><CustomPageTitle Heading={"Project Status"} /></>)}
            </Flex>

            <CustomTabs tabs={items} onChange={handleTab} defaultActiveKey={1} />

            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "12px" }}
            >
                <Col span={24} md={10}>
                    <CustomInputSearch
                        placeholder={"Search By Project Name ..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>

            </CustomRow>

            {
                CurrentRole === USER_ROLES.PROJECHEAD ?
                    (
                        <>
                            <CustomStandardTable
                                columns={TableColumn}
                                data={proDetailsbyRole || []}
                                rowKey={rowKeyy}
                            />
                        </>) :
                    CurrentRole === USER_ROLES.EMPLOYEE || CurrentRole === USER_ROLES.TRAINEE || CurrentRole === USER_ROLES.TEAMLEADER ?
                        (
                            <>
                                <CustomStandardTable
                                    columns={TableColumn}
                                    data={proDetailsbyEmp || []}
                                    rowKey={rowKeyy}
                                />
                            </>) :
                        content
            }

            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={widthModal}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}
