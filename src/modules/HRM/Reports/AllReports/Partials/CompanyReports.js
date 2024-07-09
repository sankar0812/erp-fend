import { Layout, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { AnnouncementReports } from '../../CompanyReports/AnnouncementReports';
import { CustomTabs } from '../../../../../components/CustomTabs';

const { Content } = Layout;
const { TabPane } = Tabs;

export const CompanyReports = () => {
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
    label: "Announcement Report",
    children: <AnnouncementReports />,
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
          </CustomCardView>
        </Content>
      </Layout>
    );
}
