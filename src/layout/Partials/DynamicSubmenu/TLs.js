import { AiOutlineAccountBook, AiOutlineDashboard, AiOutlineFundView, AiOutlineTags } from "react-icons/ai";
import { BsFillClipboard2DataFill, BsFillClipboard2PulseFill, BsFillFileEarmarkRuledFill, BsFillPersonVcardFill, BsPersonFillLock } from "react-icons/bs";
import { MenuText } from "../Style";
import { GiCardExchange, GiTimeSynchronization } from "react-icons/gi";
import { LiaAwardSolid } from "react-icons/lia";
import { MdOutlineDiscount } from "react-icons/md";
import { FaRocketchat, FaRunning } from "react-icons/fa";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { TbMessageReport } from "react-icons/tb";



export const TLsItems = (collapsed,Employeeid ) => {
    
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
                getItem('Attendance', 'sub2', <AiOutlineFundView />, [
                    
                    getItem('Punching Attendance', `AddPunchingAttendance/${Employeeid}`, <GiTimeSynchronization />),
                    getItem('Attendance Count', `AttendanceCountView/${Employeeid}`, <MdOutlineDiscount />),
                ]),
                // getItem('Project', 'sub3', <BsFillClipboard2PulseFill />, [
                //     getItem('View Assigned Task', 'ViewAssiginigTask', <GiCardExchange />),
                //     getItem('Project Management', 'project_management', <BsFillFileEarmarkRuledFill />),
                // ]),
                getItem('Complaints', 'complaint', <FaPersonWalkingDashedLineArrowRight />),
                getItem('Leave', 'employee_leave', <BsPersonFillLock />),
                getItem('Resignation', 'resignation', <FaRunning />),
                
                getItem('Awards', 'Awards', <LiaAwardSolid />),


            ], 'group'),

            getItem(
                <MenuText>{collapsed ? null : "PM"}</MenuText>,
                "PM",
                null,
                [
                    getItem('Task Board', 'ViewAssiginigTask', <GiCardExchange />),
                    getItem('Task Status', 'project_management', <BsFillFileEarmarkRuledFill />),
                ],
                "group"
              ),

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

export const TLsKeys = ['sub0','sub1', 'sub2', 'sub3'];