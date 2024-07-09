import React, { useEffect, useState } from "react";
import { CustomPageFormSubTitle, CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import { StyledCardDash } from "../style";
import { Col, Flex } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentId, selectCurrentRoleId, selectCurrentRoleName } from "../../../Auth/authSlice";
import { HighPriorityTask, LeavePLTable, MultipleDataChart, WorkingProjectsMembers } from "./ChartList";
import { getAnnouncement, getHolidays, selectAllAnnouncement, selectAllDashHolidays } from "../../ManagerDashBoard/Partials/ManagerDashboardSlice";
import { StyledCardAnnouncement, StyledCardManagerDash } from "../../AdminDashboard/style";
import { USER_ROLES } from "../../../../utils/UserRoles/UserRole";
import { LeaveApproval, WeeklyBarChart } from "../../EmployeesDashboard/Partials/ViewCharts";
import { CustomCardView } from "../../../../components/CustomCardView";
import { SvgIcons } from "../../../../Images";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomModal } from "../../../../components/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import AttachmentFile from "../../AttachmentFIle";
import { Counterss } from "../../Counterss";

export const ViewPLDashboard = () => {

  const [dataSource, setDataSource] = useState([]);

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    getProjectLeaves();
  }, []);

  const getProjectLeaves = () => {
    request
      .get(`${APIURLS.GETPLCARD}${RoleId}/${EmployeeId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const employeedata = [
    {
      key: "1",
        rate: dataSource?.researchProjectCount ? dataSource?.researchProjectCount : 0,
      // rate: "ghjgh",
      icon: SvgIcons.Employee,
      p: "Total Projects",
      backgroundColor:
        "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
    {
      key: "2",
        rate: dataSource?.onprocessCount ? dataSource?.onprocessCount : 0,
      // rate: "xcvbcvb",
      icon: SvgIcons.Present,
      p: "OnProcess Projects",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
    {
      key: "3",
        rate: dataSource?.completedProjectCount ? dataSource?.completedProjectCount : 0,
      // rate: "bxcvbxc",
      icon: SvgIcons.Absent,
      p: "Completed Projects",
      backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  const AllHolidays = useSelector(selectAllDashHolidays);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  const AllAnnouncement = useSelector(selectAllAnnouncement);
  const CurrentRole = useSelector(selectCurrentRoleName)

  const handleFile = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item}/>);
    setModalTitle("Attachment File");
    showModal();
  }

  return (
    <div>
      {
        CurrentRole === USER_ROLES.PROJECHEAD ? (<><CustomPageTitle Heading={"PROJECT LEAD DASHBOARD"} /></>)
          :
          (<><CustomPageTitle Heading={"PROJECT MANAGER DASHBOARD"} /></>)
      }
      <CustomRow space={[24, 24]}>
        {employeedata.map((item, i) => (
          <Col span={24} md={8} key={i}>
            <StyledCardDash backgroundcolor={item?.backgroundColor}>
              <h1>{item?.p} </h1>
              <Flex>
                <img src={item?.icon} alt="" />
              </Flex>
              {/* <h2>{item?.rate}</h2> */}
              <Counterss target={item?.rate}/>
            </StyledCardDash>
          </Col>
        ))}

        <Col span={24} md={10}>
          <CustomCardView style={{height:"100%"}}>
            <WeeklyBarChart />
          </CustomCardView>
        </Col> 

        <Col span={24} md={14}>
          <CustomCardView style={{height:"100%"}}>
            <CustomPageFormSubTitle Heading={"High Priority Task"} />
            <HighPriorityTask />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <CustomPageFormSubTitle Heading={"Project Working Members"} />
            <WorkingProjectsMembers/>
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <MultipleDataChart />
          </CustomCardView>
        </Col> 

        {/* <Col span={24} md={12}>
          <Collapse
            style={{ background: "#607274", marginTop: "10px" }}
            items={LeaveItems}
          />
        </Col> */}

        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <CustomPageFormSubTitle Heading={"Project Employee Leave"} />
            <LeavePLTable/>
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <CustomPageFormSubTitle Heading={"Leave List"} />
            <LeaveApproval/>
          </CustomCardView>
        </Col>

        {AllHolidays?.length > 0 &&
          AllHolidays.map((item, i) => (
            <Col span={24} md={12} lg={6} key={i}>
              <StyledCardManagerDash style={{ padding: "20px 20px" }}>
                <h2>Holyday </h2>
                <h1>{item?.date} </h1>
                <h2>{item?.eventName}</h2>
                <p>{item?.message}</p>
              </StyledCardManagerDash>
            </Col>
          ))}

        {AllAnnouncement?.length > 0 &&
          AllAnnouncement.map((item, i) => (
            <Col span={24} md={12} lg={6} key={i}>
              <StyledCardAnnouncement style={{ padding: "20px 20px" }}>
                <h2>Announcement </h2>
                <h2>{item?.title}</h2>
                <h1>{item?.informed_by}</h1>
                <p>
                  {item?.from_date}&nbsp; To &nbsp;{item?.to_date}
                </p>
                <div style={{position:"absolute",right:"15px",top:"15px"}} onClick={() => handleFile(item?.attachment)}><BsInfoCircle size={20} style={{color:"#fff"}}/></div>
              </StyledCardAnnouncement>
            </Col>
          ))}

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
  );
};

