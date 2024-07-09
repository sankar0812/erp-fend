import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../components/Flex';
import { TableIconHolder } from '../../../components/CommonStyled';
import { FiEdit } from 'react-icons/fi';
import { THEME } from '../../../theme';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomRow } from '../../../components/CustomRow';
import { Col } from 'antd';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../components/CustomModal';
import { AssiginingTask } from './AssiginingTask';
import { useDispatch } from 'react-redux';
import { allProjectDetails, getProjectDetails, projectDetailsError, projectDetailsStatus } from '../ProjectSlice';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
import { CommonLoading } from '../../../components/CommonLoading';
import { useNavigate } from 'react-router-dom';
import { APIURLS } from '../../../utils/ApiUrls/Hrm';
import { selectCurrentId, selectCurrentRoleId, selectCurrentRoleName } from '../../Auth/authSlice';
import { USER_ROLES } from '../../../utils/UserRoles/UserRole';
import { CustomLableBack } from '../../../components/CustomLableBack';
import { CustomTabs } from '../../../components/CustomTabs';
import { CustomTag } from '../../../components/Form/CustomTag';

export const ViewAssiginigTask = () => {

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
  const [filteredProjectType, setFilteredProjectType] = useState("Research")
  const [researchcount, setResearchCount] = useState(0);
  const [developmentcount, setDevelopmentCount] = useState(0);
  const [projectcount, setProjectCount] = useState(0);
  const [testingcount, setTestingCount] = useState(0);
  const [hosingcount, setHostingCount] = useState(0);
  const [enteredRole, setEnteredRole] = useState('')

  const navigate = useNavigate()

  // useEffect(() => {

  // }, [filteredProjectType]);

  useEffect(() => {
    dispatch(getProjectDetails())
  }, [])

  const EnteringId = useSelector(selectCurrentId)
  const EnteringRoleId = useSelector(selectCurrentRoleId)
  const CurrentRole = useSelector(selectCurrentRoleName)

  const AllProjectDetails = useSelector(allProjectDetails)
  const projectStatus = useSelector(projectDetailsStatus)
  const projectError = useSelector(projectDetailsError)

  // const employeeOption = findObject?.departmentDetails?.map((value) => ({
  //   label: value.userName,
  //   value: value.employeeId,
  // }));

  // useEffect(() => {
  //   let enteredRoleValue;
  //   if (CurrentRole === USER_ROLES.PROJECTMANAGER) {
  //     enteredRoleValue = 'proDetailsbyRole';
  //   } else if (
  //     CurrentRole === USER_ROLES.EMPLOYEE ||
  //     CurrentRole === USER_ROLES.TRAINEE ||
  //     CurrentRole === USER_ROLES.TEAMLEADER
  //   ) {
  //     enteredRoleValue = 'proDetailsbyEmp';
  //   } else {
  //     enteredRoleValue = 'dataSource';
  //   }
  //   setEnteredRole(enteredRoleValue);
  // }, [CurrentRole]);
  // console.log(enteredRole, 'enteredRole');


  useEffect(() => {
    TakeCount()
  }, [proDetailsbyRole,proDetailsbyEmp,dataSource])

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

  const EditProjectDetails = (record) => {
    setModalTitle("Assign Task");
    setModalContent(
      <AssiginingTask projectRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalCloseee={FormExternalClose} />
    );
    showModal();
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
      title: "Project Status",
      render: (value, record) => {
        // let notCompletedCount = 0; // Initialize the count variable

        // record.forEach(record => {
        //   console.log('came');
        //     if (record?.projectStatus !== 'completed') {
        //       console.log('fffffffffffff');
        //         notCompletedCount++;
        //     }
        //     console.log(notCompletedCount,'count');
        // });
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
  ];

  const ToProjectStatusChange = (record) => {
    navigate(`/view_project_status/${record?.taskId}`)
  }

  const rowKeyy = (proDetailsbyRole) => proDetailsbyRole.projectId;

  let content;

  if (projectStatus === "loading") {
    content = <CommonLoading />;
  } else if (projectStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.projectId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({
          onClick: () => ToProjectStatusChange(record),
        })}
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

        <CustomPageTitle Heading={"Task Assigining"} />
      </Flex>

      <CustomTabs tabs={items} onChange={handleTab} defaultActiveKey={1} />

      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        {/* <CustomInputSearch
            placeholder={"Search By Project Name ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)
            }
          /> */}
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
                data={proDetailsbyRole}
                rowKey={rowKeyy}
                onRow={(record) => ({
                  onClick: () => ToProjectStatusChange(record),
                })}
              />
            </>) :
          CurrentRole === USER_ROLES.EMPLOYEE || CurrentRole === USER_ROLES.TRAINEE || CurrentRole === USER_ROLES.TEAMLEADER ?
            (
              <>
                <CustomStandardTable
                  columns={TableColumn}
                  data={proDetailsbyEmp}
                  rowKey={rowKeyy}
                  onRow={(record) => ({
                    onClick: () => ToProjectStatusChange(record),
                  })}
                />
              </>) :
            content
      }

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={1000}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  )
}
