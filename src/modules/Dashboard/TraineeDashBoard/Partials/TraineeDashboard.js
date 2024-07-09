import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { Col, Collapse } from "antd";
import { CustomPageFormSubTitle, CustomPageTitle } from "../../../../components/CustomPageTitle";
import Flex from "../../../../components/Flex";
import {
  StyledCardAnnouncement,
  StyledCardDash,
  StyledCardManagerDash,
} from "../../AdminDashboard/style";
import { SvgIcons } from "../../../../Images";
import {
  LeaveApproval,
  MyTask,
  WeeklyBarChart,
} from "../../EmployeesDashboard/Partials/ViewCharts";
import { CustomCardView } from "../../../../components/CustomCardView";
import {
  getAnnouncement,
  getHolidays,
  selectAllAnnouncement,
  selectAllDashHolidays,
} from "../../ManagerDashBoard/Partials/ManagerDashboardSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AllEmployeeLeaveData } from "../../DashboardSlice";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { selectCurrentId, selectCurrentRoleId } from "../../../Auth/authSlice";
import { YearlyTask } from "../../TLDashboard/Partials/TLTableList";
import { CustomModal } from "../../../../components/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import AttachmentFile from "../../AttachmentFIle";
import { Counterss } from "../../Counterss";

export const TraineeDashboard = () => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  const AllHolidays = useSelector(selectAllDashHolidays);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  const AllAnnouncement = useSelector(selectAllAnnouncement);

  // const cardData = [
  //   {
  //     key: "1",
  //     //   rate: AllDashData[0]?.employeecount ? AllDashData[0]?.employeecount : 0,
  //     rate: 150,
  //     icon: SvgIcons.ExpenseIcon,
  //     p: "Employee Count",
  //     backgroundColor:
  //       "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
  //   },
  //   {
  //     key: "2",
  //     //   rate: AllDashData[0]?.presentcount ? AllDashData[0]?.presentcount : 0,
  //     rate: 5435,
  //     icon: SvgIcons.IncomeIcon,
  //     p: "Present Count",
  //     backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
  //   },
  //   {
  //     key: "3",
  //     //   rate: AllDashData[0]?.presentcount ? AllDashData[0]?.presentcount : 0,
  //     rate: 354,
  //     icon: SvgIcons.Absent,
  //     p: "Absent Count",
  //     backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
  //   },
  //   {
  //     key: "4",
  //     //   rate: AllDashData[0]?.presentcount ? AllDashData[0]?.presentcount : 0,
  //     rate: 534,
  //     icon: SvgIcons.Trainee,
  //     p: "Trainee Count",
  //     backgroundColor: "linear-gradient(135deg,#f48665 0,#d68e41 100%)",
  //   },
  // ];

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
const Id= useSelector(selectCurrentId)

const handleFile = (item) => {
  setModalContent(<AttachmentFile fileAttachment={item}/>);
  setModalTitle("Attachment File");
  showModal();
}
  return (
    <div>
      <CustomPageTitle Heading={"TRAINEE DASHBOARD"} />
      
      <CustomRow space={[12, 12]}>
        {employeeCarddata.map((item, i) => (
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
        <Col span={24} md={12}>
          <CustomCardView>
            <WeeklyBarChart />
          </CustomCardView>
        </Col>
        <Col span={24} md={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"My Daily Task"} />
            <MyTask />
          </CustomCardView>
        </Col>
        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <YearlyTask />
          </CustomCardView>
        </Col> 
        <Col span={24} md={12}>
          <CustomCardView style={{height:"100%"}}>
            <CustomPageFormSubTitle Heading={"Leave List"} />
            <LeaveApproval/>
          </CustomCardView>
        </Col>
        {/* <Col span={24} md={12}>
          <Collapse style={{ background: "#607274" }} items={LeaveItems} />
        </Col> */}

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
