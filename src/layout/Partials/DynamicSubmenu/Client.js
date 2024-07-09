import { AiOutlineDashboard, AiOutlineTags } from "react-icons/ai";
import { BsFillClipboard2PulseFill, BsFillFileEarmarkRuledFill, BsFillPersonVcardFill } from "react-icons/bs";
import { MenuText } from "../Style";
import { AiOutlineFileProtect } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiSolidUserCircle } from 'react-icons/bi'

export const clientItems = (collapsed,Employeeid) => {

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
        getItem('Dashboard', '', <AiOutlineDashboard />),

        getItem(<MenuText>{collapsed ? null : 'ERP'}</MenuText>, 'menu', null,
            [
                getItem('Requirement Form', 'sub1', <BiSolidUserCircle />, [
                    getItem('Requirement', 'requireform', <BsFillPersonVcardFill />),

                ]),
                getItem('Client', 'sub2', <BiSolidUserCircle />, [

                    getItem('Quotation', 'viewClientQuotation', <AiOutlineFileProtect />),
                    getItem('Invoice', `viewClientInvoice/${Employeeid}`, <LiaFileInvoiceDollarSolid />),
                    getItem('Receipt', `viewClientReceipt`, <LiaFileInvoiceDollarSolid />),
                ]),
                getItem('Reports', 'sub3', <BsFillClipboard2PulseFill />, [
                    getItem('All Reports', 'all_reports', <BsFillFileEarmarkRuledFill />)
                   ]),
   
            ], 'group'),
    ]

    return items;
}

export const clientKeys = ['sub1', 'sub2', 'sub3'];