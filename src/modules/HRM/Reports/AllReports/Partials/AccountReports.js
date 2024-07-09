import React, { useState, useEffect } from 'react';
import { Layout, Tabs } from 'antd';
import { CustomCardView } from '../../../../../components/CustomCardView';
import ViewQuotationReportsTable from '../../../Accounts/Reports/QuotationReports/Partials/ViewReportsTable';
import ViewMaintenanceInvoices from '../../../Accounts/Reports/MaintenanceReports/Partials/ViewReportsTable';
import ViewServermaintainReportTable from '../../../Accounts/Reports/ServerMaintenanceReports/Partials/ViewReportTable';
import ViewReceiptReportTable from '../../../Accounts/Reports/ReceiptReports/Partials/ViewReportTable';
import { ViewAllExpenseReports } from '../../../Accounts/Reports/ExpenseReports/Partials/ViewReportTable';
import { ViewAllCompanyAssetReports } from '../../../Accounts/Reports/CompanyAssetsReports/Partials/ViewReportTable';
import { ViewAllServerReports } from '../../../Accounts/Reports/ServerReports/Partials/ViewReportTable';
import { CustomTabs } from '../../../../../components/CustomTabs';
import ViewInvoiceReportsTable from '../../../Accounts/Reports/InvoiceReports/Partials/ViewReportsTable';



const { Content } = Layout;
const { TabPane } = Tabs;

const Reports = () => {
  const [tabPosition, setTabPosition] = useState('top');
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    // Load the active tab from local storage if available
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  // Update the local storage when the active tab changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition('top');
      } else {
        setTabPosition('left');
      }
    };

    // Initial check when the component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

const items = [
  {
    key: "1",
    label: "Invoice Reports",
    children: <ViewInvoiceReportsTable />,
  },
  {
    key: "2",
    label: "Quotation Reports",
    children: <ViewQuotationReportsTable />,
  },
  {
    key: "3",
    label: "Maintenance Invoices Reports",
    children: <ViewMaintenanceInvoices />,
  },
  {
    key: "4",
    label: "Server Maintenance Reports",
    children: <ViewServermaintainReportTable />,
  },
  {
    key: "5",
    label: "Receipt Reports",
    children: <ViewReceiptReportTable />,
  },
  {
    key: "6",
    label: "Expense Reports",
    children: <ViewAllExpenseReports />,
  },
  {
    key: "7",
    label: "Company Assets Reports",
    children: <ViewAllCompanyAssetReports />,
  },
  {
    key: "8",
    label: "Server Reports",
    children: <ViewAllServerReports />,
  }
];

// const items = [
//   {
//     key: "1",
//     label: "Trainee Leave",
//     children: <TraineeLeaveReports />,
//   },
//   {
//     key: "2",
//     label: "Trainee Complaints",
//     children: <TraineeComplaintsReports />,
//   },
//   {
//     key: "3",
//     label: "Trainee Attendance",
//     children: <TraineeAttendanceReports />,
//   },
//   {
//     key: "4",
//     label: "Trainee Status",
//     children: <TraineeStatus />,
//   }
// ];
  return (
    <Layout>
      <Content style={{ margin: '24px 16px', padding: 0 }}>
        <CustomCardView>
        <CustomTabs
            tabPosition={tabPosition}
            activeKey={activeTab}
            onChange={handleTabChange}
            tabs={items}
          />
        </CustomCardView>
      </Content>
    </Layout>
  );
};

export default Reports;
