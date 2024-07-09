import { AiOutlineAccountBook, AiOutlineDashboard, AiOutlineFundView } from "react-icons/ai";
import { BsFillClipboard2DataFill, BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MenuText } from "../Style";
import { GiArchiveResearch, GiCardExchange, GiTimeSynchronization } from "react-icons/gi";
import { LiaAwardSolid } from "react-icons/lia";
import { MdCloudDone, MdOutlineLiveTv, MdOutlinePreview } from "react-icons/md";
import { HiClipboardDocumentList, HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { SiBisecthosting, SiRoamresearch, SiVitest } from "react-icons/si";



export const ProjectManagerItems = (collapsed, Employeeid) => {


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

        getItem(<MenuText>{collapsed ? null : 'PM'}</MenuText>, 'menus', null,
            [
                    getItem('Assiging Research', `ViewResesearchDocs`, <GiArchiveResearch />),
                    getItem('View Assigned Task', 'ViewAssiginigTask', <GiCardExchange />),
                    getItem('Project Status', 'project_management', <BsFillFileEarmarkRuledFill />),
                getItem('Approved Projects', 'sub2', <HiClipboardDocumentList />, [
                    getItem('Management Approved Projects', 'view_approved_by_management_projects', <MdOutlinePreview />),
                    // getItem('R & D Completed', 'view_dev_completed', <MdCloudDone />),
                    getItem('Approved R & D', 'view_after_R_and_D_List', <IoCheckmarkDoneCircleSharp />),
                    getItem('Projects for Testing', 'view_projects_for_testing', <HiDocumentMagnifyingGlass />),
                    getItem('Approved Projects for Testing', 'view_approved_projects_for_testing', <GoProjectSymlink />),
                    getItem('Hosting', 'view_all_projects_for_hosting', <MdOutlineLiveTv />),
                ]),
                getItem('Documents', 'sub3', <AiOutlineFundView />, [
                    getItem('Research Documents', 'view_research_document', <SiRoamresearch />),
                    getItem('R & D Documents', 'view_dev_document', <HiDocumentMagnifyingGlass />),
                    getItem('Project Documents', 'view_project_document', <GoProjectSymlink />),
                    getItem('Tested Documents', 'view_tested_document', <SiVitest />),
                    getItem('Hosted Documents', 'view_hosted_document', <SiBisecthosting />),
                ]),
            ], 'group'),
    ]

    return items

}

export const ProjectManagerKeys = ['sub0','sub1', 'sub2', 'sub3'];