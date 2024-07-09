import { Layout, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView';
import styled from 'styled-components';
import { TraineeLeaveReports } from '../../TraineesReports/TraineeLeaveReports';
import { TraineeComplaintsReports } from '../../TraineesReports/TraineeComplaintsReports';
import { TraineeAttendanceReports } from '../../TraineesReports/TraineeAttendanceReports';
import { TraineeStatus } from '../../TraineesReports/TraineeStatus';
import { CustomTabs } from '../../../../../components/CustomTabs';

const { Content } = Layout;
const { TabPane } = Tabs;

export const TraineeReports = () => {
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
  
    const TabHeader = styled(Tabs)`
      :where(.css-dev-only-do-not-override-190m0jy).ant-tabs
        > .ant-tabs-nav
        .ant-tabs-nav-list,
      :where(.css-dev-only-do-not-override-190m0jy).ant-tabs
        > div
        > .ant-tabs-nav
        .ant-tabs-nav-list {
        position: relative;
        display: flex;
        transition: opacity 0.3s;
        margin-top: 66px;
      }
    `;

const items = [
  {
    key: "1",
    label: "Trainee Leave",
    children: <TraineeLeaveReports />,
  },
  {
    key: "2",
    label: "Trainee Complaints",
    children: <TraineeComplaintsReports />,
  },
  {
    key: "3",
    label: "Trainee Attendance",
    children: <TraineeAttendanceReports />,
  },
  {
    key: "4",
    label: "Trainee Status",
    children: <TraineeStatus />,
  }
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
            {/* <TabHeader
              tabPosition={tabPosition}
              activeKey={activeTab}
              onChange={handleTabChange}>
              <TabPane tab="Trainee Leave" key="1">
                <TraineeLeaveReports />
              </TabPane>
              <TabPane tab="Trainee Complaints" key="2">
                <TraineeComplaintsReports />
              </TabPane>
              <TabPane tab="Trainee Attendance" key="3">
                <TraineeAttendanceReports />
              </TabPane>
              <TabPane tab="Trainee Status" key="4">
                <TraineeStatus />
              </TabPane>
            </TabHeader> */}
          </CustomCardView>
        </Content>
      </Layout>
    );
}
