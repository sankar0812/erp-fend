import { AiFillMoneyCollect, AiOutlineAccountBook, AiOutlineDashboard, AiOutlineFileProtect, AiOutlineFolderView, AiOutlineFundView, AiOutlinePayCircle, AiOutlineTags } from "react-icons/ai";
import { BiSolidOffer, BiTrip, BiUserPlus } from "react-icons/bi";
import { BsFillBoxFill, BsFillClipboard2DataFill, BsFillClipboard2PulseFill, BsFillFileEarmarkPersonFill, BsFillFileEarmarkRuledFill, BsFillPersonVcardFill, BsFillPinMapFill, BsGraphUpArrow, BsPersonXFill } from "react-icons/bs";
import { LiaAwardSolid, LiaBackwardSolid, LiaRProject, LiaShirtsinbulk } from 'react-icons/lia'
import { MenuText } from "../Style";
import { IoReceiptOutline, IoServer } from 'react-icons/io5'
import { MdAddModerator, MdAddTask, MdGroups, MdModelTraining, MdOutlinePersonAddAlt1, MdOutlinePreview, MdOutlineReport, MdProductionQuantityLimits, MdRunCircle, MdScheduleSend } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { TfiAnnouncement } from "react-icons/tfi";
import { GiCardExchange, GiCash, GiExitDoor, GiPayMoney, GiTargetDummy } from "react-icons/gi";
import { TbMessageReport, TbReportSearch } from "react-icons/tb";
import { RiPresentationFill, RiShieldUserFill  } from "react-icons/ri";
import { GiExpense } from "react-icons/gi";
import { BsBasketFill } from "react-icons/bs";
import { FaAward, FaPersonDotsFromLine, FaPersonWalkingDashedLineArrowRight, FaPersonWalkingLuggage } from "react-icons/fa6";
import { FaRocketchat, FaRunning, FaTasks, FaTools } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { HiClipboardDocumentList, HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { HiDocumentReport, HiDocumentSearch, HiRefresh } from "react-icons/hi";
import { SiBisecthosting, SiCountingworkspro, SiFampay, SiRoamresearch, SiVitest } from "react-icons/si";
import { CgAwards } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";


export const AdminItems = (collapsed) => {

    // const Role = useSelector(selectCurrentRole)

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let items = [

        // ERP 

        getItem(<MenuText>{collapsed ? null : 'ERP'}</MenuText>, 'menu', null,
        [
        getItem('Dashboard', '', <AiOutlineDashboard />),
        getItem('Organization', 'sub0', <AiOutlineAccountBook />, [
            getItem('Business Profile', 'business_profile', <BsFillFileEarmarkPersonFill />),
            getItem('Announcement', 'ViewAnnounce', <TfiAnnouncement />),
            getItem('Allan AI Chat', 'chatAI', <FaRocketchat />),

        ]),
    ], 'group'),


        // HRM

        getItem(<MenuText>{collapsed ? null : 'HRM'}</MenuText>, 'hrm', null,
            [
                getItem('User', 'user', <BiUserPlus />),

                getItem('Employee', 'sub1', <AiOutlineTags />, [
                    getItem('Profile', 'viewprofile', <BsFillPersonVcardFill />),
                    getItem("Attendance", "Attendance", <RiPresentationFill />),
                    // getItem('Other Tables', 'extra_table', <BsFillPinMapFill />),
                    getItem('Complaints', 'complaints', <FaPersonWalkingDashedLineArrowRight />),
                    getItem('Leave', 'leave', <FaPersonWalkingLuggage />),
                    // getItem('Assigning Assets', 'assigningAssets', <BsFillBoxFill />),
                    getItem('Resignation', 'Resignation', <FaRunning />),
                ]),

                getItem("E-Recruitment", "sub2", <SiCountingworkspro />, [
                    getItem(
                      "Hiring Details",
                      "hiring_details",
                      <HiRefresh />
                    ),
          
                    getItem(
                      "Add Candidate",
                      "add_candidate",
                      <MdOutlinePersonAddAlt1 />
                    ),
                    getItem(
                      "Interview Shedule",
                      "interview_shedule",
                      <MdScheduleSend />
                    ),
                    getItem(
                      "Task Assigning",
                      "task_assigning",
                      <MdAddTask />
                    ),
                    getItem(
                      "Group Discussion",
                      "group_Discussion",
                      <MdGroups />
                    ),
                    getItem(
                      "HR Interview",
                      "hr_Interview",
                      <FaPersonDotsFromLine />
                    ),
                    getItem("Offer", "offer", <BiSolidOffer />),
                    getItem("Appointment", "appointment", <GiTargetDummy />),
                  ]),

                getItem('Payroll', 'sub5', <AiFillMoneyCollect />, [
                    getItem('Staff Basic Salary', 'basicsalary', <AiOutlinePayCircle />),
                    getItem('View Basic Salary', 'view_basicsalary', <AiOutlineFolderView />),
                    getItem('Payroll', 'payroll', <GiPayMoney />),
                    getItem('View Payroll', 'view_payroll', <SiFampay />),
                ]),

                getItem('Promotions', 'sub6', <BsGraphUpArrow />, [
                    getItem('Promotions', 'promotions', <BsGraphUpArrow />),
                ]),

                getItem('Exit Type', 'sub7', <IoMdExit  />, [
                    getItem('Exit', 'exit', <IoMdExit />),
                    // getItem('Resignations', 'View_resignations', <BsFillFileEarmarkRuledFill />)
                ]),

                getItem('Training', 'sub8', <MdModelTraining />, [
                    getItem('Training', 'training', <MdModelTraining />),
                ]),

                getItem('Awards', 'sub14', <LiaAwardSolid   />, [
                    getItem("Add Awards", "AddAwards", <MdAddModerator />),
                    getItem('Awards', 'Awards', <LiaAwardSolid />),
                ]),
                getItem('Holiday', 'sub9', <BiTrip  />, [
                    getItem('Holidays', 'holiday', <BiTrip  />),
                ]),
                getItem('Assigning Assets', 'assigningAssets', <BsFillBoxFill />),
                getItem('Other Tables', 'extra_table', <BsFillPinMapFill />),
                getItem('InActive Employee', 'inAciveEmployee', <BsPersonXFill />),



                // getItem('Approved Projects', 'sub11', <HiClipboardDocumentList />, [
                //     getItem('Client Approved Projects', 'assigntask_approved_projects', <MdOutlinePreview />),
                // ]),
                // getItem('Documents', 'sub12', <HiClipboardDocumentList />, [
                //     getItem('Research Documents', 'view_research_document', <HiDocumentMagnifyingGlass />),
                //     getItem('R & D Documents', 'view_dev_document', <HiDocumentMagnifyingGlass />),
                //     getItem('Project Documents', 'view_project_document', <MdOutlinePreview />),
                //     getItem('Tested Documents', 'view_tested_document', <MdOutlinePreview />),
                //     getItem('Hosted Documents', 'view_hosted_document', <MdOutlinePreview />),
                // ]),
                // getItem('Project', 'sub13', <AiOutlineFundView />, [
                //     getItem('View Assigned Tasks', 'ViewAssiginigTask', <GiCardExchange />),
                //     getItem('Project Status', 'project_management', <BsFillFileEarmarkRuledFill />),
                //     // getItem('Approved Tested Documents', `ViewTestingDocs`, <HiDocumentReport />),
                //     // getItem('Approved Projects for Testing', 'view_approved_projects_for_testing', <HiDocumentMagnifyingGlass />),
                // ]),


                // getItem('Reports', 'sub10', <BsFillClipboard2PulseFill />, [
                //     getItem('All Reports', 'all_reports', <BsFillFileEarmarkRuledFill />)
                // ]),
            ], 'group'),


            //CRM

            getItem(<MenuText>{collapsed ? null : 'CRM'}</MenuText>, 'crm', null,
            [
                    getItem('Client Profile', 'clientprofile', <BsFillPersonVcardFill />),
                    getItem('Project Type', 'projectType', <GoProjectSymlink />),
                    getItem('Requirements', 'requirements', <LiaRProject />),
                    getItem("Client Quotations", `ViewClientProjectQuot`, <RiShieldUserFill />),
                    getItem('Approving Quotation', 'viewClientQuotation', <AiOutlineFileProtect />),
                    // getItem('Receipts', 'Receipts', <IoReceiptOutline />),
            ], 'group'),

            // Accounts and financial

            getItem(<MenuText>{collapsed ? null : 'A & F'}</MenuText>, 'af', null,
            [
                     // getItem('Quotation', 'quotation', <IoReceiptOutline />),
                    getItem('Invoice', 'invoice', <MdProductionQuantityLimits />),
                    getItem('Payement In', 'Payement_invoice_maintainInvoice', <GiCash />),
                    // getItem('Reports', 'report', <TbReportSearch />),
                    getItem('Expense', 'expense', <GiExpense />),
                    getItem('Assets', 'viewAssets', <BsBasketFill />),
                    getItem('Server', 'server', <IoServer />),
                    getItem('Maintenance Invoice', 'maintenanceInvoice', <FaTools />),
                    getItem('Server Maintenance', 'ViewServer_Maintenance', <GrHostMaintenance />),
            ], 'group'),

            // Project management

            getItem(<MenuText>{collapsed ? null : 'PM'}</MenuText>, 'pm', null,
            [
                getItem('Approved Projects', 'sub11', <HiClipboardDocumentList />, [
                    getItem('Client Approved Projects', 'assigntask_approved_projects', <MdOutlinePreview />),
                ]),
                getItem('Documents', 'sub12', <HiDocumentSearch />, [
                    getItem('Research Documents', 'view_research_document', <SiRoamresearch />),
                    getItem('R & D Documents', 'view_dev_document', <HiDocumentMagnifyingGlass />),
                    getItem('Project Documents', 'view_project_document', <GoProjectSymlink />),
                    getItem('Tested Documents', 'view_tested_document', <SiVitest />),
                    getItem('Hosted Documents', 'view_hosted_document', <SiBisecthosting />),
                ]),
                getItem('Project', 'sub13', <AiOutlineFundView />, [
                    getItem('Task Board', 'ViewAssiginigTask', <GiCardExchange />),
                    getItem('Task', 'project_management', <FaTasks />),
                    // getItem('Approved Tested Documents', `ViewTestingDocs`, <HiDocumentReport />),
                    // getItem('Approved Projects for Testing', 'view_approved_projects_for_testing', <HiDocumentMagnifyingGlass />),
                ]),
            ], 'group'),

            getItem(<MenuText>{collapsed ? null : 'Reports'}</MenuText>, 'reports', null,
            [
                    getItem('All Reports', 'all_reports', <TbMessageReport />)
            ], 'group'),
    ]

    return items;
}

export const adminKeys = ['sub0','sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12','sub13','sub14'];