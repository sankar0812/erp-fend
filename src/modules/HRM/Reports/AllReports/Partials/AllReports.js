import React, { useState, useEffect } from "react";
import { Layout, Tabs } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { PayrollReportsPage } from "../../PayrollReports/Partials/PayrollReportsPage";
import { ViewEmployee } from "../../../EmployeeDetails/Leave/Partials/ViewEmployee";
import { ViewAllEmpLeaveReports } from "../../LeaveAllReports/Partials/ViewLeaveTable";
import { ViewAllEmpComplaintsReports } from "../../ComplaintsReports/Partials/ViewComlaintsTable";
import { ViewAllAssetReports } from "../../AssetsReports/Partials/ViewAssetsTable";
import { ViewAllExitTypesReports } from "../../ExitTypeAllReports/Partials/ViewExitTypetable";
import { ViewAllPromotionReports } from "../../PromotionReports/Partials/ViewAllPromotion";
import { ViewAllResignationReports } from "../../ResignationReports/Partials/ViewAllResignations";
import { ViewAllAppointmentReports } from "../../AppointmentReports/Partials/ViewAllApointments";
import { ViewAllAttendanceReports } from "../../AttendanceReports/Partials/AttendanceReports";
import { CustomTabs } from "../../../../../components/CustomTabs";

const { Content } = Layout;
const { TabPane } = Tabs;

const AllReports = () => {
  const [tabPosition, setTabPosition] = useState("top");
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Load the active tab from local storage if available
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  // Update the local storage when the active tab changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition("top");
      } else {
        setTabPosition("left");
      }
    };

    // Initial check when the component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: "Employee Appointment",
      children: <ViewAllAppointmentReports />,
    },
    {
      key: "2",
      label: "Employee Assets",
      children: <ViewAllAssetReports />,
    },
    {
      key: "3",
      label: "Payroll Report",
      children: <PayrollReportsPage />,
    },
    {
      key: "4",
      label: "Employee Complaints",
      children: <ViewAllEmpComplaintsReports />,
    },
    {
      key: "5",
      label: "Employee leave",
      children: <ViewAllEmpLeaveReports />,
    },
    {
      key: "6",
      label: "Employee Promotion",
      children: <ViewAllPromotionReports />,
    },
    {
      key: "7",
      label: "Employee Resignation",
      children: <ViewAllResignationReports />,
    },
    {
      key: "8",
      label: "Employee Exit Type",
      children: <ViewAllExitTypesReports />,
    },
    {
      key: "9",
      label: "Employee Attendance",
      children: <ViewAllAttendanceReports />,
    },
  ];

  return (
    <Layout>
      <Content style={{ margin: "24px 16px", padding: 0 }}>
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

export default AllReports;
