import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAnnouncement,
  getDashHiring,
  getDashboardComplaints,
  getDashboardLeave,
  getDashboardResignation,
  getHolidays,
  getManagerCardData,
  selectAllAnnouncement,
  selectAllDashCardData,
  selectAllDashComplaints,
  selectAllDashHiring,
  selectAllDashHolidays,
  selectAllDashLeaves,
  selectAllDashResignation,
} from "./ManagerDashboardSlice";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import { employeedata } from "./ManagerDashboardData";
import {
  StyledCardAnnouncement,
  StyledCardDash,
  StyledCardManagerDash,
  StyledSaleCardRight,
  StyledTable,
} from "../../AdminDashboard/style";
import { Col, Collapse } from "antd";
import Flex from "../../../../components/Flex";
import { useSelector } from "react-redux";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { AiOutlineInbox } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {
  ApexChart,
  ComplaintsTable,
  DepartmentChart,
  HiringTable,
  LeavesTable,
  ManagerBarChart,
  ResignationTable,
  RotatedColumn,
} from "./ManagerDashTables";
import { AssetsChart } from "../../AccountantDashBoard/Partials/ViewTableDasboard";
import { SvgIcons } from "../../../../Images";
import image from "../../../../Images/holiday.jpg";
import { CustomModal } from "../../../../components/CustomModal";
import AttachmentFile from "../../AttachmentFIle";
import { Counterss } from "../../Counterss";

export const ViewManagerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCollapse, setActiveCollapse] = useState(null)

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
    dispatch(getDashboardComplaints());
    dispatch(getDashboardLeave());
    dispatch(getDashboardResignation());
    dispatch(getDashHiring());
  }, []);

  const AllComplaints = useSelector(selectAllDashComplaints);
  const AllDashLeaves = useSelector(selectAllDashLeaves);
  const AllHiring = useSelector(selectAllDashHiring);
  const AllDashResignation = useSelector(selectAllDashResignation);

  const handleRowClick = () => {};

  const ComplaintsItems = [
    {
      key: "complaints",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Complaints List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllComplaints?.length}
            </p>
          </div>
        </div>
      ),
      children: <ComplaintsTable />,
    },
  ];

  const LeaveItems = [
    {
      key: "leave",
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
              {AllDashLeaves?.length}
            </p>
          </div>
        </div>
      ),
      children: <LeavesTable />,
    },
  ];

  const ResignationItems = [
    {
      key: "resignation",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Resignation List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllDashResignation?.length}
            </p>
          </div>
        </div>
      ),
      children: <ResignationTable />,
    },
  ];

  const HiringDetails = [
    {
      key: "hiring",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >   
          <p>Hiring Details</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllHiring?.length}
            </p>
          </div>
        </div>
      ),
      children: <HiringTable />
    },
  ];

  useEffect(() => {
    dispatch(getManagerCardData());
  }, []);

  const AllDashData = useSelector(selectAllDashCardData);

  const cardData = [
    {
      key: "1",
      rate: AllDashData?.employeecount ? AllDashData?.employeecount : 0,
      icon: SvgIcons.ExpenseIcon,
      p: "Employee Count",
      backgroundColor:
        "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
    {
      key: "2",
      rate: AllDashData?.presentcount ? AllDashData?.presentcount : 0,
      icon: SvgIcons.IncomeIcon,
      p: "Present Count",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
    {
      key: "3",

      rate: AllDashData?.absentcount ? AllDashData?.absentcount : 0,
      icon: SvgIcons.Absent,
      p: "Absent Count",
      backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
    },
    {
      key: "4",
      rate: AllDashData?.traineecount ? AllDashData?.traineecount : 0,
      icon: SvgIcons.Trainee,
      p: "Trainee Count",
      backgroundColor: "linear-gradient(135deg,#f48665 0,#d68e41 100%)",
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

  const handleCollapse = (key) => {
    setActiveCollapse(key === activeCollapse ? null : key)
  }

  const handleFile = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item}/>);
    setModalTitle("Attachment File");
    showModal();
  }

  return (
    <div>
      <CustomPageTitle Heading={"MANAGER DASHBOARD"} />
      <CustomRow space={[12, 12]}>
        {cardData?.map((item, i) => (
          <Col span={24} md={12} key={i} lg={6} sm={12}>
            <StyledCardDash
              backgroundcolor={item?.backgroundColor}
              style={{ padding: "30px 20px" }}
            >
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
          <StyledSaleCardRight>
            <ManagerBarChart />
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={14}>   
          <StyledSaleCardRight>
            <ApexChart />
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={12}>
          <StyledSaleCardRight>
            <AssetsChart />
          </StyledSaleCardRight>
        </Col>
        
        <Col span={24} md={12}>
          <StyledSaleCardRight>
           <RotatedColumn/>
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={12}>
          <Collapse style={{ background: "#607274" }} items={ComplaintsItems} activeKey={activeCollapse === 'complaints' ? ['complaints'] : []}
            onChange={() => handleCollapse('complaints')}/>
        </Col>

        <Col span={24} md={12}>
          <Collapse style={{ background: "#607274"}} items={ResignationItems} activeKey={activeCollapse === 'resignation' ? ['resignation'] : []}
            onChange={() => handleCollapse('resignation')}/>
        </Col>

        <Col span={24} md={12}>
          <Collapse style={{ background: "#607274" }} items={LeaveItems} activeKey={activeCollapse === 'leave' ? ['leave'] : []}
            onChange={() => handleCollapse('leave')}/>
        </Col>

        <Col span={24} md={12}>
          <Collapse style={{ background: "#607274" }} items={HiringDetails} activeKey={activeCollapse === 'hiring' ? ['hiring'] : []}
            onChange={() => handleCollapse('hiring')}/>
        </Col>

        {AllHolidays?.length > 0 &&
          AllHolidays?.map((item, i) => (
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
          AllAnnouncement?.map((item, i) => (
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
