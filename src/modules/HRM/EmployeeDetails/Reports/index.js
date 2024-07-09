import React, { useState, useEffect } from 'react';
import { Layout, Tabs } from 'antd';
import styled from 'styled-components';
import { ViewAllEmployeeLeaveReports } from './EmployeeLeaveReports/Partials/ViewEmpLeaveTable';
import { ViewAllEmpComplaintsReports } from './EmployeeComplaintReports/Partials/ViewEmpComplaintTable';
import { CustomCardView } from '../../../../components/CustomCardView';
import { ViewAllEmpAttendanceReports } from './EmployeeAttendanceReports/Partials/ViewAttendanceTable';
import { useSelector } from 'react-redux';
import { selectCurrentRoleName } from '../../../Auth/authSlice';
import { CustomTabs } from '../../../../components/CustomTabs';


const { Content } = Layout;
const { TabPane } = Tabs;

const AllEmployeeReports = () => {
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

  const TabHeader = styled(Tabs)`
    :where(.css-dev-only-do-not-override-190m0jy).ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
    :where(.css-dev-only-do-not-override-190m0jy).ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
      position: relative;
      display: flex;
      transition: opacity 0.3s;
      margin-top: 66px;
    }
  `;

  const RoleName = useSelector(selectCurrentRoleName);

  console.log(RoleName);

  const item = [
    {
      key: "1",
      label: "Employee leave",
      children: <ViewAllEmployeeLeaveReports />,
    },
    {
      key: "2",
      label: "Employee Complaints",
      children: <ViewAllEmpComplaintsReports />,
    },
    {
      key: "3",
      label: "Employee Attendance",
      children: <ViewAllEmpAttendanceReports />,
    }
  ];

  const items = [
    {
      key: "1",
      label: "Trainee leave",
      children: <ViewAllEmployeeLeaveReports />,
    },
    {
      key: "2",
      label: "Trainee Complaints",
      children: <ViewAllEmpComplaintsReports />,
    },
    {
      key: "3",
      label: "Trainee Attendance",
      children: <ViewAllEmpAttendanceReports />,
    }
  ];

  return (
    <Layout>
      <Content style={{ margin: '24px 16px', padding: 0 }}>
        <CustomCardView>
          {
            RoleName === 'Training' ? 
            <CustomTabs
            tabPosition={tabPosition}
            activeKey={activeTab}
            onChange={handleTabChange}
            tabs={items}
          />
          //   <TabHeader tabPosition={tabPosition} activeKey={activeTab} onChange={handleTabChange}>
          //   <TabPane tab="Employee leave" key="1"> 
          //       <ViewAllEmployeeLeaveReports/>
          //   </TabPane>
          //   <TabPane tab="Employee Complaints" key="2">     
          //     <ViewAllEmpComplaintsReports/>      
          //   </TabPane>
          //   <TabPane tab="Employee Attendance" key="3">     
          //     <ViewAllEmpAttendanceReports/>      
          //   </TabPane>
          // </TabHeader> 
          : 
          <CustomTabs
            tabPosition={tabPosition}
            activeKey={activeTab}
            onChange={handleTabChange}
            tabs={item}
          />

        //   <TabHeader tabPosition={tabPosition} activeKey={activeTab} onChange={handleTabChange}>
        //   <TabPane tab="Trainee leave" key="1"> 
        //       <ViewAllEmployeeLeaveReports/>
        //   </TabPane>
        //   <TabPane tab="Trainee Complaints" key="2">     
        //     <ViewAllEmpComplaintsReports/>      
        //   </TabPane>
        //   <TabPane tab="Trainee Attendance" key="3">     
        //     <ViewAllEmpAttendanceReports/>      
        //   </TabPane>
        // </TabHeader>
          }
          
        </CustomCardView>
      </Content>
    </Layout>
  );
};

export default AllEmployeeReports;
