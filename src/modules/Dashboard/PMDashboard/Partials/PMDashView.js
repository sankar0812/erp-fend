import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SvgIcons } from '../../../../Images';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import { selectCurrentRoleName } from '../../../Auth/authSlice';
import { CustomPageFormSubTitle, CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../components/CustomRow';
import { useSelector } from 'react-redux';
import { Col, Flex } from 'antd';
import { CustomCardView } from '../../../../components/CustomCardView';
import { ProjectCountLine, ProjectEndTable, ProjectListBar, ProjectStatus, ProjectTask } from './PMDashTables';
import { StyledCardDash } from '../../PLDashboard/style';
import { LeavesTable } from '../../ManagerDashBoard/Partials/ManagerDashTables';
import { getAllProjectManagerCard, getProjectHeadCard, selectAllProjectHeadCard, selectAllProjectHeadCardView,} from './PMDashSlice';
import { StyledCardAnnouncement, StyledCardManagerDash } from '../../AdminDashboard/style';
import { getAnnouncement, getHolidays, selectAllAnnouncement, selectAllDashHolidays } from '../../ManagerDashBoard/Partials/ManagerDashboardSlice';
import { CustomModal } from '../../../../components/CustomModal';
import { BsInfoCircle } from 'react-icons/bs';
import AttachmentFile from '../../AttachmentFIle';
import { Counterss } from '../../Counterss';

export const PMDashView = () => {
    const dispatch = useDispatch();
    const [cardData, setCardData] = useState([])

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
      dispatch(getHolidays());
      dispatch(getAnnouncement());
    }, []);
  
    const AllHolidays = useSelector(selectAllDashHolidays);
    const AllAnnouncement = useSelector(selectAllAnnouncement);
    const CurrentRole = useSelector(selectCurrentRoleName)

    useEffect(() => {
      dispatch(getAllProjectManagerCard());
    }, []);
    
    const AllCardDatas = useSelector(selectAllProjectHeadCardView);
    
    useEffect(() => {
     setCardData(AllCardDatas)
    }, [AllCardDatas])
  
    const employeedata = [
      {
        key: "1",
          rate: cardData?.totalProjectCount ? cardData?.totalProjectCount : 0,
        // rate: "ghjgh",
        icon: SvgIcons.approval,
        p: "Total Projects",
        backgroundColor:
          "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
      },
      {
        key: "2",
          rate: cardData?.onProcessProject ? cardData?.onProcessProject : 0,
        // rate: "xcvbcvb",
        icon: SvgIcons.onprocess,
        p: "Onprocess Projects",
        backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
      },
      {
        key: "3",
          rate: cardData?.completedProjectCount ? cardData?.completedProjectCount : 0,
        // rate: "xcvbcvb",
        icon: SvgIcons.completed,
        p: "Completed Projects",
        backgroundColor: "linear-gradient(135deg,#E26EE5,#E6A4B4)",
      },
    ];
  
   const employeedatas = [
      {
        key: "1",
          rate: cardData?.projectHeadCount ? cardData?.projectHeadCount : 0,
        // rate: "bxcvbxc",
        icon: SvgIcons.lead,
        p: "Project Head",
        backgroundColor: "linear-gradient(135deg,#8e4cf1 0,#c554bc 100%)",
      },
      {
        key: "2",
          rate: cardData?.employeeCount ? cardData?.employeeCount : 0,
        // rate: "xcvbcv",
        icon: SvgIcons.Employee,
        p: "Total Employee",
        backgroundColor: "linear-gradient(135deg,#C70039 0,#FF6969 100%)",
      },
      {
        key: "3",
          rate: cardData?.traineeCount ? cardData?.traineeCount : 0,
        // rate: "xcvbcv",
        icon: SvgIcons.Trainee,
        p: "Total Trainee",
        backgroundColor: "linear-gradient(135deg,#f48665 0,#d68e41 100%)",
      },
    ];

    const handleFile = (item) => {
      setModalContent(<AttachmentFile fileAttachment={item}/>);
      setModalTitle("Attachment File");
      showModal();
    }
  
    return (
      <div>
        {
          CurrentRole === USER_ROLES.PROJECHEAD ? (<><CustomPageTitle Heading={"PROJECT MANAGER DASHBOARD"} /></>)
            :
            (<><CustomPageTitle Heading={"PROJECT MANAGER DASHBOARD"} /></>)
        }
        <CustomRow space={[24, 24]}>
  
          <Col span={24} md={14}>
            <CustomCardView style={{height:"100%"}}>
              <ProjectCountLine/>
            </CustomCardView>
          </Col>
  
          <Col span={24} md={10}>
          <CustomRow space={[20, 20]} style={{ height: "30%" }}>
              {employeedata.map((item, i) => (
                <Col span={24} md={24} key={i} style={{ height: "100%" }}>
                  <StyledCardDash backgroundcolor={item?.backgroundColor}>
                <h1>{item?.p} </h1>
                <Flex>
                  <img src={item?.icon} alt="" />
                </Flex>
                <h2>{item?.rate}</h2>
              </StyledCardDash>
                </Col>
              ))}
            </CustomRow>
          </Col>
  
          <Col span={24} md={8}>
          <CustomRow space={[20, 20]} style={{ height: "30%" }}>
              {employeedatas.map((item, i) => (
                <Col span={24} md={24} key={i} style={{ height: "100%" }}>
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
            </CustomRow>
          </Col>
  
          <Col span={24} md={16}>
            <CustomCardView style={{height:"100%"}}>
              <CustomPageFormSubTitle Heading={"Project Status"} />
              <ProjectStatus />
            </CustomCardView>
          </Col>
  
          <Col span={24} md={14}>
            <CustomCardView style={{height:"100%"}}>
              <CustomPageFormSubTitle Heading={"Yearly High Priority Task"} />
              <ProjectTask />
            </CustomCardView>
          </Col>
  
          <Col span={24} md={10}>
            <CustomCardView style={{height:"100%"}}>
              <ProjectListBar/>
            </CustomCardView>
          </Col>
  
          <Col span={24} md={12}>
            <CustomCardView style={{height:"100%"}}>
              <CustomPageFormSubTitle Heading={"Project DeadLine"} />
              <ProjectEndTable />
            </CustomCardView>
          </Col>
  
          <Col span={24} md={12}>
            <CustomCardView style={{height:"100%"}}>
              <CustomPageFormSubTitle Heading={"Leave List"} />
              <LeavesTable />
            </CustomCardView>
          </Col>
  
      {/*     <Col span={24} md={12} lg={12}>
            <CustomCardView style={{height:"100%"}}>
              <CustomPageFormSubTitle Heading={"Working Projects"} />
              <WorkingProjects/>
            </CustomCardView>
          </Col>
  
          <Col span={24} md={12}>
            <Collapse
              style={{ background: "#607274", marginTop: "10px" }}
              items={LeaveItems}
            />
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
}
