import { AiOutlineAccountBook,AiOutlineDashboard,} from "react-icons/ai";
import {BsBasketFill} from "react-icons/bs";
import {FaRocketchat, FaTools } from "react-icons/fa";
import { GiCash, GiExpense } from "react-icons/gi";
import { GrHostMaintenance } from "react-icons/gr";
import { IoReceiptOutline, IoServer } from "react-icons/io5";
import { MdBalance, MdProductionQuantityLimits } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
  import { MenuText } from "../Style";
import { RiShieldUserFill } from "react-icons/ri";
  
  export const Accountant = (collapsed) => {
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
      // getItem("Dashboard", "", <AiOutlineDashboard />),  
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
      getItem(
        <MenuText>{collapsed ? null : "A & F"}</MenuText>,
        "a&d",
        null,
        [
          // getItem('Accounts', 'sub1', <AiOutlineAccountBook />, [
            getItem("Client Quotations", `ViewClientProjectQuot`, <RiShieldUserFill />),
            getItem('Invoice', 'invoice', <MdProductionQuantityLimits />),
            getItem('Payement In', 'Payement_invoice_maintainInvoice', <GiCash />),
            getItem('Expense', 'expense', <GiExpense /> ),
            getItem('Assets', 'viewAssets', <BsBasketFill /> ),
            getItem('Server', 'server', <IoServer /> ),
            getItem('Maintenance Invoice', 'maintenanceInvoice', <FaTools /> ),
            getItem('Server Maintenance', 'ViewServer_Maintenance', <GrHostMaintenance />),
            getItem('Balance Sheet', 'balance_sheet', <MdBalance /> ),
            getItem('Reports', 'report', <TbReportSearch /> ),
        // ]),
        ],
        "group"
      ),

      // getItem(
      //   <MenuText>{collapsed ? null : "Reports"}</MenuText>,
      //   "reports",
      //   null,
      //   [
      //     getItem('Reports', 'report', <TbReportSearch />  ),
      //   ],
      //   "group"
      // ),
    ];
    return items;
  };
  export const accountantKeys = ['sub0'];
  