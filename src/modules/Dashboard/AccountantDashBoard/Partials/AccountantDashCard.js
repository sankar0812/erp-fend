import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomPageFormSubTitle, CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import {
  StyledCardAnnouncement,
  StyledCardDash,
  StyledCardManagerDash,
  StyledSaleCardRight,
} from "../../AdminDashboard/style";
import { Col, Collapse } from "antd";
import Flex from "../../../../components/Flex";
import { useSelector } from "react-redux";
import {
  AccountsBarChart,
  AssetsChart,
  InvoiceDash,
  LineChart,
  MaintenanceInvoicesDash,
  PieChart,
  ReceiptsDash,
} from "./ViewTableDasboard";
import {
  getDashInvoice,
  getDashMaintaininvoices,
  getDashReceipts,
  selectAllDashinvoice,
  selectAllDashReceipts,
  selectAllMaintainInvoices,
} from "../../DashboardSlice";
import { SvgIcons } from "../../../../Images";
import { getExpenseIncome, selectAllExpenseIncome } from "./AccountantSlice";
import { getAnnouncement, getHolidays, selectAllAnnouncement, selectAllDashHolidays } from "../../ManagerDashBoard/Partials/ManagerDashboardSlice";
import { CustomCardView } from "../../../../components/CustomCardView";
import { BsInfoCircle } from "react-icons/bs";
import AttachmentFile from "../../AttachmentFIle";
import { CustomModal } from "../../../../components/CustomModal";
import { Counterss } from "../../Counterss";

export const AccountantDashCard = () => {

  const dispatch = useDispatch();
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

  // =====================Invoices List====================//

  useEffect(() => {
    dispatch(getDashInvoice());
  }, []);

  const AllInvoiceDashList = useSelector(selectAllDashinvoice);

  // =====================Receipts List===================//

  useEffect(() => {
    dispatch(getDashReceipts());
  }, []);

  const AllReceiptsList = useSelector(selectAllDashReceipts);

  // =====================Maintenance Invoices====================//

  useEffect(() => {
    dispatch(getDashMaintaininvoices());
  }, []);

  const AllMaintenances = useSelector(selectAllMaintainInvoices);

  useEffect(() => {
    dispatch(getExpenseIncome());
  }, []);

  const AllExpenseIncome = useSelector(selectAllExpenseIncome);

  const accountsdata = [
    {
      key: "1",
      rate: 
      (AllExpenseIncome && AllExpenseIncome.length > 0) ? AllExpenseIncome[0]?.total_expense?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || 0 : 0,
      icon: SvgIcons.ExpenseIcon,
      p: "Current Month Expense",
      backgroundColor: "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
    {
      key: "2",
      rate: (AllExpenseIncome && AllExpenseIncome.length > 0) ? AllExpenseIncome[0]?.total_income?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || 0 : 0,
      icon: SvgIcons.IncomeIcon,
      p: "Current Month Income",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
  ];

  const InvoiceItems = [
    {
      key: "invoicelist",
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
  const ReceiptsItems = [
    {
      key: "receiptlist",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <p>Payment Receipts List</p>
          <div style={{ height: "25px", width: "20px", textAlign: "center" }}>
            <p
              style={{
                background: "lightblue",
                borderRadius: "50%",
              }}
            >
              {AllReceiptsList?.length}
            </p>
          </div>
        </div>
      ),
      children: <ReceiptsDash AllReceiptsList={AllReceiptsList} />,
    },
  ];
  const MaintenenaceinvoicesItems = [
    {
      key: "1",
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

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

  const AllHolidays = useSelector(selectAllDashHolidays);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  const AllAnnouncement = useSelector(selectAllAnnouncement);

  const handleCollapse = (key) => {
    setActiveCollapse(key === activeCollapse ? null : key)
  }

  const handleFile = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item}/>);
    setModalTitle("Attachment File");
    showModal();
  }

  return (
    <div>
      <CustomPageTitle Heading={"ACCOUNTANT DASHBOARD"} />
      <CustomRow space={[12, 12]}>
        <Col span={24} md={16}>
          <StyledSaleCardRight>
            <AccountsBarChart />
            {/* <AccountCurrectedBarChart /> */}

          </StyledSaleCardRight>
        </Col>
        <Col span={24} md={8}>
          <CustomRow space={[12, 12]} style={{ height: "48%" }}>
            {accountsdata?.map((item, i) => (
              <Col span={24} md={24} key={i} sm={12} style={{ height: "100%" }}>
                <StyledCardDash backgroundcolor={item?.backgroundColor} style={{ padding: "20px 20px" }}>
                  <h1>{item?.p} </h1>
                  <Flex>
                    <img src={item?.icon} alt="" />
                  </Flex>
                  <h2>{item?.rate}</h2>
                  {/* <Counterss target={item?.rate}/> */}
                </StyledCardDash>
              </Col>
            ))}
          </CustomRow>
        </Col>
        <Col span={24} md={24}>
          <CustomRow space={[12, 12]} style={{ height: "100%" }}>
            <Col span={24} md={14}>
              <StyledSaleCardRight style={{ height: "100%" }}>
                <PieChart />
              </StyledSaleCardRight>
            </Col>
            <Col span={24} md={10}>
              <StyledSaleCardRight>
                <LineChart />
              </StyledSaleCardRight>
            </Col>
          </CustomRow>
        </Col>

        {/* <Col span={24} md={6}>
          <CustomRow space={[12, 12]} style={{height:"100%"}}>
            {accountsdata.map((item, i) => (
              <Col span={24} md={24} key={i} sm={12}>
                <StyledCardDash backgroundcolor={item?.backgroundColor} style={{padding:"20px 20px"}}>
                  <h1>{item?.p} </h1>
                  <Flex>
                    <img src={item?.icon} alt="" />
                  </Flex>
                  <h2>{item?.rate}</h2>
                </StyledCardDash>
              </Col>
            ))}
          </CustomRow>
        </Col> */}
        <Col span={24} md={14}>
          <StyledSaleCardRight>
            <AssetsChart />
          </StyledSaleCardRight>
        </Col>
        <Col span={24} md={10}>
          {/* <Collapse
            style={{ background: "#B852CA" }}
            items={MaintenenaceinvoicesItems}
          /> */}
          <CustomCardView>
            <CustomPageFormSubTitle Heading={'All Maintenance'} />
            <MaintenanceInvoicesDash AllMaintenances={AllMaintenances} />
          </CustomCardView>
        </Col>

        <Col span={24} md={14}>
          <Collapse
            style={{ background: "#B852CA", marginTop: "10px" }}
            // items={InvoiceItems}
            activeKey={activeCollapse === 'invoicelist' ? ['invoicelist'] : []}
            onChange={() => handleCollapse('invoicelist')}
          >
            {
              InvoiceItems.map(item => (
                <Collapse.Panel header={item.label} key={item.key}>
                  {item.children}
                </Collapse.Panel>
              ))
            }
          </Collapse>
        </Col>

        <Col span={24} md={10}>
          <Collapse
            style={{ background: "#B852CA", marginTop: "10px" }}
            activeKey={activeCollapse === 'receiptlist' ? ['receiptlist'] : []}
            onChange={() => handleCollapse('receiptlist')}
          // items={ReceiptsItems}
          >
            {
              ReceiptsItems.map(item => (
                <Collapse.Panel header={item.label} key={item.key}>
                  {item.children}
                </Collapse.Panel>
              ))
            }
          </Collapse>
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
                <h2>Announcement</h2>
                <h2>{item?.title} </h2>
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
};
