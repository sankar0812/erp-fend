import { Col, Collapse, message } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CustomCardView } from "../../../../components/CustomCardView";
import {
  CustomPageFormSubTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import Flex from "../../../../components/Flex";
import {
  DeadlineTaskDetails,
  LeaveApproval,
  LeaveList,
  MyTask,
  MyTeams,
  ProjectAssigned,
  WeeklyBarChart,
  WorkingProjects,
} from "./ViewCharts";
import {
  getAnnouncement,
  getHolidays,
  selectAllAnnouncement,
  selectAllDashHolidays,
} from "../../ManagerDashBoard/Partials/ManagerDashboardSlice";
import { useSelector } from "react-redux";
import {
  StyledCardAnnouncement,
  StyledCardManagerDash,
} from "../../AdminDashboard/style";
import { useDispatch } from "react-redux";
import { StyledCardDash } from "../../PLDashboard/style";
import { SvgIcons } from "../../../../Images";
import { selectCurrentId, selectCurrentRoleId } from "../../../Auth/authSlice";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { AllEmployeeLeaveData } from "../../DashboardSlice";
import { YearlyTask } from "../../TLDashboard/Partials/TLTableList";
import { CustomModal } from "../../../../components/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import AttachmentFile from "../../AttachmentFIle";
import { Counterss } from "../../Counterss";

export const BoxCard = styled.div`
  border-radius: 1rem !important;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  background: white;
  padding: 30px 20px;
  height: 100%;
  position: relative;

  & h2 {
    color: #545454;
    font-size: 35px !important;
    padding-top: 10px;
  }

  & h1 {
    font-size: 18px !important;
    /* color: #52c41a !important; */
    color: #545454 !important;
  }
`;
const ViewEmployeeDashboard = () => {
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);
  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);
  const EmployeeLeave = useSelector(AllEmployeeLeaveData);

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

  useEffect(() => {
    GetCardData();
  }, []);

  const GetCardData = () => {
    request
      .get(`${APIURLS.GETEMPLOYEEDASHCARD}${EmployeeId}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const employeeCarddata = [
    {
      key: "1",
      rate: dataSource?.onProcessCount ? dataSource?.onProcessCount : 0,
      icon: SvgIcons.Employee,
      p: "Task OnProcess",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
    {
      key: "2",
      rate: dataSource?.pendingCount ? dataSource?.pendingCount : 0,
      icon: SvgIcons.Absent,
      p: "Task Pending",
      backgroundColor:
        "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
    {
      key: "3",
      rate: dataSource?.completedCount ? dataSource?.completedCount : 0,
      icon: SvgIcons.Present,
      p: "Task Completed",
      backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
    },
  ];

  const LeaveItems = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Leave List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {EmployeeLeave?.length}
            </p>
          </div>
        </div>
      ),
      children: <LeaveApproval />,
    },
  ];

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  const AllHolidays = useSelector(selectAllDashHolidays);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  const AllAnnouncement = useSelector(selectAllAnnouncement);

  const handleFile = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item} />);
    setModalTitle("Attachment File");
    showModal();
  };

  return (
    <div>
      <CustomPageTitle Heading={"EMPLOYEE DASHBOARD"} />
      <CustomRow space={[24, 24]}>
        {employeeCarddata.map((item, i) => (
          <Col span={24} md={12} key={i} lg={8}>
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
        {/* <Col span={24} md={12} lg={6} sm={12}>
          <BoxCard>
            <h1>Project Asigned</h1>
            <Flex>
              <h2>20</h2>
              <ProjectAssigned />
            </Flex>
          </BoxCard>
        </Col>
        <Col span={24} md={12} lg={6} sm={12}>
          <BoxCard>
            <h1>Available Leaves</h1>
            <Flex>
              <h2>10</h2>
              <ProjectAssigned />
            </Flex>
          </BoxCard>
        </Col>
        <Col span={24} md={12} lg={6} sm={12}>
          <BoxCard>
            <h1>Performance Per</h1>
            <Flex>
              <h2>
                80<span style={{ color: "#e56390", fontSize: "20px" }}>%</span>
              </h2>
              <ProjectAssigned />
            </Flex>
          </BoxCard>
        </Col>
        <Col span={24} md={12} lg={6} sm={12}>
          <BoxCard>
            <h1>total Awards</h1>
            <Flex>
              <h2>45</h2>
              <ProjectAssigned />
            </Flex>
          </BoxCard>
        </Col> */}
      </CustomRow>
      <br />
      <CustomRow space={[24, 24]}>
        <Col span={24} md={12} lg={12} sm={12}>
          <CustomCardView>
            <WeeklyBarChart />
          </CustomCardView>
        </Col>
        <Col span={24} md={12} lg={12} sm={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"My Task Status"} />
            <MyTask />
          </CustomCardView>
        </Col>
        {/* <Col span={24} md={12} sm={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"My Team"} />
            <MyTeams />
          </CustomCardView>
        </Col> */}

        <Col span={24} md={12} lg={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Working Projects"} />
            <WorkingProjects />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{ height: "100%" }}>
            <YearlyTask />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Leave List"} />
            <LeaveApproval />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView style={{ height: "100%" }}>
            <CustomPageFormSubTitle Heading={"Task Deadline Details"} />
            <DeadlineTaskDetails />
          </CustomCardView>
        </Col>

        {AllHolidays?.length > 0 &&
          AllHolidays.map((item, i) => (
            <Col span={24} md={12} lg={6} key={i} sm={12}>
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
            <Col span={24} md={12} lg={6} key={i} sm={12}>
              <StyledCardAnnouncement style={{ padding: "20px 20px" }}>
                <h2>Announcement </h2>
                <h2>{item?.title} </h2>
                <h1>{item?.informed_by}</h1>
                <p>
                  {item?.from_date}&nbsp; To &nbsp;{item?.to_date}
                </p>
                <div
                  style={{ position: "absolute", right: "15px", top: "15px" }}
                  onClick={() => handleFile(item?.attachment)}
                >
                  <BsInfoCircle size={20} style={{ color: "#fff" }} />
                </div> 
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

export default ViewEmployeeDashboard;
