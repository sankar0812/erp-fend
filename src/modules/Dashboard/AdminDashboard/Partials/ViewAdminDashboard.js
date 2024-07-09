import React, { useEffect, useState } from "react";
import {
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import { Col, Collapse } from "antd";
import Flex from "../../../../components/Flex";
import { StyledCardAnnouncement, StyledCardDash, StyledCardManagerDash, StyledSaleCardRight } from "../style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCardData,
  getDashboardLeave,
  selectAllDashCardData,
  selectAllDashLeaves,
} from "./AdminDashboardSlice";
import { useNavigate } from "react-router-dom";
import {
  AccountsBarChart,
  AssetsChart,
  InvoiceDash,
  LineChart,
  MaintenanceInvoicesDash,
  PieChart,
} from "../../AccountantDashBoard/Partials/ViewTableDasboard";
import {
  getDashInvoice,
  getDashMaintaininvoices,
  selectAllDashinvoice,
  selectAllMaintainInvoices,
} from "../../DashboardSlice";
import {
  NoticePeriodCard,
  ProjectTypeCard,
} from "./DashCardsView";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomCardView } from "../../../../components/CustomCardView";
import { SvgIcons } from "../../../../Images";
import { ApexChart, ManagerBarChart, RotatedColumn } from "../../ManagerDashBoard/Partials/ManagerDashTables";
import { getAnnouncement, getHolidays, selectAllAnnouncement, selectAllDashHolidays } from "../../ManagerDashBoard/Partials/ManagerDashboardSlice";
import { ProjectCountLine, ProjectEndTable, ProjectStatus } from "../../PMDashboard/Partials/PMDashTables";
import { CustomModal } from "../../../../components/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import AttachmentFile from "../../AttachmentFIle";
import { Counterss } from "../../Counterss";

// const Counterss = ({ target, start, className }) => {
//   const [count, setCount] = useState(start || 0);
//   const speed = 2000;

//   useEffect(() => {
//     const updateCount = () => {
//       const inc = (target - count) / speed; 

//       if (count < target) {
//         setCount((prevCount) => prevCount + inc);
//         setTimeout(updateCount, 1);
//       } else {
//         setCount(target);
//       }
//     };

//     updateCount();

//     return () => clearTimeout();
//   }, [count, target]);

//   return (
//     <h1 className={className}>
//       {Math.floor(count)} {target === 78 ? "+" : ""}
//     </h1>
//   );
// };

export const ViewAdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [projectData, setProjectData] = useState([]); // use ProjectType
  const [noticeData, setNoticeData] = useState([]); // use Notice Period
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
    // dispatch(getDashboardComplaints());
    dispatch(getDashboardLeave());
  }, []);

  // const AllComplaints = useSelector(selectAllDashComplaints);
  const AllDashLeaves = useSelector(selectAllDashLeaves);

  // =====================Invoices List====================//

  useEffect(() => {
    dispatch(getDashInvoice());
  }, []);

  const AllInvoiceDashList = useSelector(selectAllDashinvoice);

  // =====================Maintenance Invoices====================//

  useEffect(() => {
    dispatch(getDashMaintaininvoices());
  }, []);

  const AllMaintenances = useSelector(selectAllMaintainInvoices);

  const handleRowClick = () => {};

  //==================Project Status and Project Type ==================//

  useEffect(() => {
    const dashboard = "percentage";
    request
      .get(`projectType/percentage/dashboard`, { params: { dashboard } })
      .then(function (response) {
        setProjectData(response?.data);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  }, []);

  // =====================Notice Period Dash Card Get====================//

  useEffect(() => {
    const resignations = "dashboard";
    request
      .get(`${APIURLS.GETMANAGERDASHRESIGNATION}`, { params: { resignations } })
      .then(function (response) {
        setNoticeData(response?.data);
      })
      .catch((error) => {
        console.error("Failed:", error);
      });
  }, []);

  const InvoiceItems = [
    {
      key: "invoiveItems",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Invoice List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllInvoiceDashList?.length}
            </p>
          </div>
        </div>
      ),
      children: <InvoiceDash AllInvoiceDashList={AllInvoiceDashList} />,
    },
  ];

  const MaintenenaceinvoicesItems = [
    {
      key: "maintenanceInvoice",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Maintenance Invoices List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllMaintenances?.length}
            </p>
          </div>
        </div>
      ),
      children: <MaintenanceInvoicesDash AllMaintenances={AllMaintenances} />,
    },
  ];
  const NoticeDashItems = [
    {
      key: "noticePeriod",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Notice Period</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {noticeData?.length}
            </p>
          </div>
        </div>
      ),
      children: <NoticePeriodCard noticeData={noticeData} />,
    },
  ];

  const ProjectStatuss = [
    {
      key: "projectStatus",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Project Status</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {/* {AllMaintenances?.length} */}
            </p>
          </div>
        </div>
      ),
      children: <ProjectStatus />,
    },
  ];

  const ProjectDeadLine = [
    {
      key: "projectDeadline",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Project DeadLine</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {/* {AllMaintenances?.length} */}
            </p>
          </div>
        </div>
      ),
      children: <ProjectEndTable />,
    },
  ];

  const ProjectTypeItems = [
    {
      key: "projectType",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Project Type</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllMaintenances?.length}
            </p>
          </div>
        </div>
      ),
      children: (
        <ProjectTypeCard
          AllMaintenances={AllMaintenances}
          projectData={projectData}
        />
      ),
    },
  ];


  useEffect(() => {
    dispatch(getCardData());
  }, []);

  const AllDashData = useSelector(selectAllDashCardData);

  const cardData = [
    {
      key: "1",
      rate: AllDashData?.clientcount ? AllDashData?.clientcount : 0,
      icon: SvgIcons.ExpenseIcon,
      p: "Client Count",
      backgroundColor:
        "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
    {
      key: "2",
      rate: AllDashData?.employeecount ? AllDashData?.employeecount : 0,
      icon: SvgIcons.IncomeIcon,
      p: "Employee Count",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
    {
      key: "3",
      rate:AllDashData?.presentcount ? AllDashData?.presentcount : 0,
      icon: SvgIcons.Absent,
      p: "Present Count",
      backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
    },
    {
      key: "4",
      rate: AllDashData?.projectcount ? AllDashData?.projectcount : 0,
      icon: SvgIcons.Trainee,
      p: "Project Count",
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

  const handleCollapse = (value) => {
    setActiveCollapse(value === activeCollapse ? null : value)
  }

  const handleFile = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item}/>);
    setModalTitle("Attachment File");
    showModal();
  }

  return (
    <div>
      <CustomPageTitle Heading={"ADMIN DASHBOARD"} />
      <CustomRow space={[12, 12]}>
        {cardData?.map((item, i) => (
          <Col span={24} md={12} key={i} lg={6} sm={12}>
            <StyledCardDash backgroundcolor={item?.backgroundColor} style={{padding:"30px 20px"}}>
              <h1>{item?.p} </h1>
              <Flex>
                <img src={item?.icon} alt="" />
              </Flex>
              {/* <h2>{item?.rate}</h2> */}
              <Counterss target={item?.rate}/>
            </StyledCardDash>
          </Col>
        ))}

        <Col span={24} md={24} lg={11}>
          <StyledSaleCardRight>
            <LineChart />
          </StyledSaleCardRight>
        </Col>
        <Col span={24} md={24} lg={13}>
          <StyledSaleCardRight>
            <AccountsBarChart />
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={24} lg={12}>
          <StyledSaleCardRight>
           <ManagerBarChart/>
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={24} lg={12}>
          <StyledSaleCardRight>
           <RotatedColumn/>
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={24} lg={13}>   
          <StyledSaleCardRight>
            <ApexChart />
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={24} lg={11}>
          <StyledSaleCardRight style={{ height: "100%" }}>
            <AssetsChart />
          </StyledSaleCardRight>
        </Col>

        <Col span={24} md={24} lg={12}>
              <StyledSaleCardRight style={{ height: "100%" }}>
                <PieChart />
              </StyledSaleCardRight>
            </Col>

            <Col span={24} md={24} lg={12}>
            <CustomCardView style={{height:"100%"}}>
              <ProjectCountLine/>
            </CustomCardView>
          </Col>

        <Col span={24} md={24} lg={10}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={NoticeDashItems}
            activeKey={activeCollapse === 'noticePeriod' ? ['noticePeriod'] : []}
            onChange={() => handleCollapse('noticePeriod')}
            />
        </Col>
        <Col span={24} md={24} lg={14}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={MaintenenaceinvoicesItems}
            activeKey={activeCollapse === 'maintenanceInvoice' ? ['maintenanceInvoice'] : []}
            onChange={() => handleCollapse('maintenanceInvoice')}
            />
        </Col>
        
        <Col span={24} md={24} lg={12}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={ProjectDeadLine}
            activeKey={activeCollapse === 'projectDeadline' ? ['projectDeadline'] : []}
            onChange={() => handleCollapse('projectDeadline')}
          />
        </Col>
        <Col span={24} md={24} lg={12}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={ProjectStatuss}
            activeKey={activeCollapse === 'projectStatus' ? ['projectStatus'] : []}
            onChange={() => handleCollapse('projectStatus')}
          />
        </Col>

        <Col span={24} md={24} lg={14}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={InvoiceItems}
            activeKey={activeCollapse === 'invoiveItems' ? ['invoiveItems'] : []}
            onChange={() => handleCollapse('invoiveItems')}
          />
        </Col>
        <Col span={24} md={24} lg={10}>
          <Collapse
            style={{ background: "#4191CE", marginTop: "10px" }}
            items={ProjectTypeItems}
            activeKey={activeCollapse === 'projectType' ? ['projectType'] : []}
            onChange={() => handleCollapse('projectType')}
          />
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
                <div style={{position:"absolute",right:"15px",top:"15px"}} onClick={()=>{handleFile(item?.attachment)}}><BsInfoCircle size={20} style={{color:"#fff"}}/></div>
              </StyledCardAnnouncement>
            </Col>
          ))}
      </CustomRow>
      <br />
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
