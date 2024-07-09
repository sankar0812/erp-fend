import { AiOutlineAccountBook, AiOutlineDashboard, AiOutlineFundView, AiOutlineTags } from "react-icons/ai";
import { BsFillClipboard2DataFill, BsFillClipboard2PulseFill, BsFillFileEarmarkRuledFill, BsFillPersonVcardFill, BsPersonFillLock } from "react-icons/bs";
import { MenuText } from "../Style";
import { GiTimeSynchronization,GiThreeLeaves, GiCardExchange } from "react-icons/gi";
import { LiaAwardSolid } from "react-icons/lia";
import { FaPeopleCarry, FaRocketchat } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { TbMessageReport } from "react-icons/tb";
// import { GiThreeLeaves } from "react-icons/gi";



export const TraineeItems = (collapsed,Employeeid ) => {
    
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

        getItem(<MenuText>{collapsed ? null : 'ERP'}</MenuText>, 'menu', null,
            [
                
                getItem('Attendance', 'sub1', <AiOutlineFundView />, [

                    getItem('Punching Attendance', `AddPunchingAttendance/${Employeeid}`, <GiTimeSynchronization />),
                    getItem('Attendance Count', `AttendanceCountView/${Employeeid}`, <MdOutlineDiscount />),
                ]),
                // getItem('Complaint', 'sub1', <FaPeopleCarry />, [
                //     getItem('Complaints', 'complaint', <FaPeopleCarry />),
                // ]),
                getItem('Complaint', 'complaint', <FaPersonWalkingDashedLineArrowRight />),
                getItem('Leave', 'trainee_leave', <BsPersonFillLock />),
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
                    getItem('All Reports', 'trainee_all_reports', <TbMessageReport />)
                ],
                "group"
              ),
    ]

    return items

}

export const TraineeKeys = ['sub0','sub1', 'sub2', 'sub3','sub4'];