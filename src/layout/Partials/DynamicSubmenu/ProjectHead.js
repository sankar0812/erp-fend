import { AiOutlineAccountBook, AiOutlineDashboard, AiOutlineFundView } from "react-icons/ai";
import { BsFillClipboard2DataFill, BsFillClipboard2PulseFill, BsFillFileEarmarkRuledFill, BsPersonFillLock } from "react-icons/bs";
import { MenuText } from "../Style";
import { GiArchiveResearch, GiCardExchange, GiTimeSynchronization } from "react-icons/gi";
import { LiaAwardSolid } from "react-icons/lia";
import { MdOutlineDiscount, MdOutlinePreview } from "react-icons/md";
import { FaRocketchat, FaRunning } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { HiMiniDocumentText } from "react-icons/hi2";
import { GrDocumentPerformance, GrDocumentZip } from "react-icons/gr";



export const ProjectHeadItems = (collapsed, Employeeid) => {


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
        // getItem('Dashboard', '', <AiOutlineDashboard />),
        getItem(
            <MenuText>{collapsed ? null : "ERP"}</MenuText>,
            "menu",
            null,
            [
              getItem("Dashboard", "", <AiOutlineDashboard />),
              getItem("Organization", "sub0", <AiOutlineAccountBook />, [
                getItem("Allan AI Chat", "chatAI", <FaRocketchat />),
              ]),
            ],
            "group"
          ),

        getItem(<MenuText>{collapsed ? null : 'HRM'}</MenuText>, 'HRM', null,
            [
                // getItem('Complaint', 'sub1', <FaPersonWalkingDashedLineArrowRight />, [
                    // ]),
                    getItem('Attendance', 'sub2', <AiOutlineFundView />, [
                        
                        getItem('Punching Attendance', `AddPunchingAttendance/${Employeeid}`, <GiTimeSynchronization />),
                        getItem('Attendance Count', `AttendanceCountView/${Employeeid}`, <MdOutlineDiscount />),
                    ]),
                    getItem('Complaints', 'complaint', <FaPersonWalkingDashedLineArrowRight />),
                getItem('Leave', 'employee_leave', <BsPersonFillLock />),
                getItem('Resignation', 'resignation', <FaRunning />),

                getItem('Awards', 'Awards', <LiaAwardSolid />),

            ],
            "group"
          ),

        getItem(<MenuText>{collapsed ? null : 'PM'}</MenuText>, 'PM', null,
            [
                // getItem('Project', 'sub3', <AiOutlineFundView />, [

                    getItem('Assign Task', 'project_management', <GiCardExchange />),
                    getItem('Task Board', 'ViewAssiginigTask', <BsFillFileEarmarkRuledFill />),

                // ]),
                getItem('Documents', 'sub4', <GrDocumentZip />, [

                    getItem('Research Document', 'view_research_document', <HiMiniDocumentText />),
                    getItem('Development Document', 'view_dev_document', <GrDocumentPerformance />),

                ]),


            ], 'group'),

            getItem(
                <MenuText>{collapsed ? null : "Reports"}</MenuText>,
                "reports",
                null,
                [
                    getItem('All Reports', 'Employee_all_reports', <TbMessageReport />)
                ],
                "group"
              ),
    ]

    return items

}

export const ProjectHeadKeys = ['sub0','sub1', 'sub2', 'sub3', 'sub4', 'sub5'];