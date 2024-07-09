import {
  AiFillMoneyCollect,
  AiOutlineAccountBook,
  AiOutlineDashboard,
  AiOutlineFileProtect,
  AiOutlineFolderView,
  AiOutlineFundView,
  AiOutlinePayCircle,
  AiOutlineTags,
} from "react-icons/ai";
import {
  BsFillBoxFill,
  BsFillClipboard2DataFill,
  BsFillClipboard2PulseFill,
  BsFillFileEarmarkPersonFill,
  BsFillFileEarmarkRuledFill,
  BsFillPersonVcardFill,
  BsFillPinMapFill,
  BsGraphUpArrow,
  BsPersonXFill,
} from "react-icons/bs";
import { FaCertificate, FaRunning } from "react-icons/fa";
import {
  FaPersonWalkingDashedLineArrowRight,
  FaPersonWalkingLuggage,
  FaClipboardUser,
  FaRocketchat,
  FaPersonDotsFromLine,
} from "react-icons/fa6";
import { MenuText } from "../Style";
import {
  GiCardExchange,
  GiLetterBomb,
  GiPayMoney,
  GiTargetDummy,
  GiTimeSynchronization,
} from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../modules/Auth/authSlice";
import {
  LiaAwardSolid,
  LiaBackwardSolid,
  LiaCertificateSolid,
} from "react-icons/lia";
import { GoProjectRoadmap, GoProjectSymlink } from "react-icons/go";
import { RiShieldUserFill, RiPresentationFill } from "react-icons/ri";
import { GiArchiveResearch } from "react-icons/gi";
import { HiDocumentReport, HiDocumentText } from "react-icons/hi";
import { GrCertificate } from "react-icons/gr";
import {
  MdAddTask,
  MdAirplanemodeInactive,
  MdGroups,
  MdModelTraining,
  MdOutlinePersonAddAlt1,
  MdOutlinePreview,
  MdScheduleSend,
} from "react-icons/md";
import { HiRefresh } from "react-icons/hi";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { LuView } from "react-icons/lu";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdExit } from "react-icons/io";
import { BiSolidOffer, BiTrip } from "react-icons/bi";
import { SiBisecthosting, SiCountingworkspro, SiFampay, SiRoamresearch, SiVitest } from "react-icons/si";
import { TbMessageReport } from "react-icons/tb";

export const Managers = (collapsed, Employeeid) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  // const Employeeid = useSelector(selectCurrentId);

  let items = [
    getItem(
      <MenuText>{collapsed ? null : "ERP"}</MenuText>,
      "menu",
      null,
      [
        getItem("Dashboard", "", <AiOutlineDashboard />),
        getItem("Organization", "sub0", <AiOutlineAccountBook />, [
          getItem("Announcement", "ViewAnnounce", <TfiAnnouncement />),
          getItem("Allan AI Chat", "chatAI", <FaRocketchat />),
        ]),
      ],
      "group"
    ),
    getItem(
      <MenuText>{collapsed ? null : "HRM"}</MenuText>,
      "HRM",
      null,
      [
        getItem("Employee", "sub1", <AiOutlineTags />, [
          getItem("Profile", "viewprofile", <BsFillPersonVcardFill />),
          getItem("Attendance", "Attendance", <RiPresentationFill />),
          // getItem("Awards", "Awards", <AiOutlineFundView />),
          getItem(
            "Complaints",
            "complaints",
            <FaPersonWalkingDashedLineArrowRight />
          ),
          getItem("Leave", "leave", <FaPersonWalkingLuggage />),
          // getItem("Holidays", "holiday", <BiTrip />),
          // getItem("Assigning Assets", "assigningAssets", <BsFillBoxFill />),
          // getItem("Promotions", "promotions", <BsGraphUpArrow />),
          getItem("Resignation", "Resignation", <FaRunning />),
          // getItem("Training", "training", <HiRefresh />),
          getItem("InActive Employee", "inAciveEmployee", <BsPersonXFill />),
        ]),
        getItem("E-Recruitment", "sub2", <SiCountingworkspro />, [
          getItem("Hiring Details", "hiring_details", <HiRefresh />),

          getItem("Add Candidate", "add_candidate", <MdOutlinePersonAddAlt1 />),
          getItem("Interview Shedule", "interview_shedule", <MdScheduleSend />),
          getItem("Task Assigning", "task_assigning", <MdAddTask />),
          getItem("Group Discussion", "group_Discussion", <MdGroups />),
          getItem("HR Interview", "hr_Interview", <FaPersonDotsFromLine />),
          getItem("Offer", "offer", <BiSolidOffer />),
          getItem("Appointment", "appointment", <GiTargetDummy />),
        ]),

        getItem("Awards", "sub8", <AiFillMoneyCollect />, [
          getItem("Add Awards", "AddAwards", <LiaBackwardSolid />),
          getItem("View Awards", "Awards", <LuView />),
        ]),
        getItem("Exit Type", "sub4", <IoMdExit />, [
          getItem("Exit", "exit", <IoMdExit />),
        ]),
        getItem("Payroll", "sub3", <GiPayMoney />, [
          getItem("Staff Basic Salary", "basicsalary", <AiOutlinePayCircle />),
          getItem(
            "View Basic Salary",
            "view_basicsalary",
            <AiOutlineFolderView />
          ),
          getItem("Payroll", "payroll", <GiPayMoney />),
          getItem("View Payroll", "view_payroll", <SiFampay />),
        ]),
        getItem("Training", "training", <MdModelTraining />),
        getItem("Holidays", "holiday", <BiTrip />),
        getItem("Assigning Assets", "assigningAssets", <BsFillBoxFill />),
        getItem("Promotions", "promotions", <BsGraphUpArrow />),
        getItem("Other Tables", "extra_table", <BsFillPinMapFill />),
      ],
      "group"
    ),

    getItem(
      <MenuText>{collapsed ? null : "CRM"}</MenuText>,
      "CRM",
      null,
      [
        getItem("Client's Request", `clientRequest`, <FaClipboardUser />),
          // getItem('Client Requirement', `ViewClientRequirement`, <FaClipboardUser />),
          // getItem('Research Docs', `ViewResesearchDocs`, <GiArchiveResearch />),
          getItem(
            "Client Quotation",
            `ViewClientProjectQuot`,
            <RiShieldUserFill />
          ),
          getItem(
            "Client Approved Projects",
            "assigntask_approved_projects",
            <MdOutlinePreview />
          ),
      ],
      "group"
    ),

    getItem(
      <MenuText>{collapsed ? null : "PM"}</MenuText>,
      "PM",
      null,
      [
        getItem("Projects", "sub5", <GoProjectRoadmap />, [
          // getItem("Client's Request", `clientRequest`, <FaClipboardUser />),
          // getItem(
          //   "Client Quotation",
          //   `ViewClientProjectQuot`,
          //   <RiShieldUserFill />
          // ),
          // getItem(
          //   "Client Approved Projects",
          //   "assigntask_approved_projects",
          //   <MdOutlinePreview />
          // ),
          // getItem("Project Docs", `ViewProjectDocs`, <HiDocumentText />),
          getItem(
            "Approving Quotation",
            "viewClientQuotation",
            <AiOutlineFileProtect />
          ),
          getItem(
            "Task Board",
            "ViewAssiginigTask",
            <GiCardExchange />
          ),
          getItem(
            "Task Status",
            "project_management",
            <BsFillFileEarmarkRuledFill />
          ),
        ]),

        getItem("Project Documentation", "sub6", <BsFillClipboard2DataFill />, [
          getItem(
            "Research Documents",
            "view_research_document",
            <SiRoamresearch />
          ),
          getItem(
            "R & D Documents",
            "view_dev_document",
            <HiDocumentMagnifyingGlass />
          ),
          getItem(
            "Project Documents",
            "view_project_document",
            <GoProjectSymlink />
          ),
          getItem(
            "Tested Documents",
            "view_tested_document",
            <SiVitest />
          ),
          getItem(
            "Hosted Documents",
            "view_hosted_document",
            <SiBisecthosting />
          ),
        ]),

        // getItem("Certificate", "sub7", <GrCertificate />, [
        //   getItem("Offer Letter", "offerLetter", <GiLetterBomb />),
        //   getItem(
        //     "Experience Certificate",
        //     "experienceCertificate",
        //     <LiaCertificateSolid />
        //   ),
        // ]),
      ],
      "group"
    ),
    getItem(
      <MenuText>{collapsed ? null : "Reports"}</MenuText>,
      "reports",
      null,
      [
          getItem("All Reports", "all_reports", <TbMessageReport />),
      ],
      "group"
    ),
  ];

  return items;
};

export const managerKeys = [
  'sub0',
  "sub1",
  "sub2",
  "sub3",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
];
