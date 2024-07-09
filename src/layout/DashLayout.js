import React, { useState } from 'react';
import { BodyContent, HeaderNav, MainContent, MainLayout, SideMenuLayout, TopHeader, } from './Partials/Style'
import { SideMenu } from './Partials/SideMenu';
import { NavHeader } from './Partials/NavHeader';
import { Layout, Menu, theme, Button, Drawer } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';


export const DashLayout = ({ children }) => {

    const [collapse, setCollapse] = useState(false)

    const updateCollapse = () => {
        setCollapse(!collapse)
    }

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    return (
        <MainLayout >

            <Layout>
                <SideMenuLayout width={'280'} trigger={null} collapsible collapsed={collapsed}>
                    <div style={{  height: '73px', padding: '14px 0' }}>
                        <HeaderNav>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                            />
                            <div>
                                {
                                    collapsed ? null :
                                        <h3 style={{ fontSize: '20px', marginLeft: '10px' }}>ERP</h3>
                                    // <p style={{ transition: '0.5s', overflow: 'hidden' }}>
                                    // <img src={Logo} />
                                    // </p>
                                }
                            </div>

                        </HeaderNav>
                    </div>
                    <SideMenu collapsed={collapsed} />
                </SideMenuLayout>

                <Drawer
                    title="HRM"
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                    width={250}
                >
                    <SideMenu collapsed={collapsed} />
                </Drawer>
                <Layout>
                    <TopHeader
                        style={{
                            padding: ' 0 15px',
                            background: colorBgContainer,
                        }}
                    >
                        <NavHeader updateCollapse={updateCollapse} showDrawer={showDrawer} />
                    </TopHeader>
                    <BodyContent
                        style={{
                            margin: '1px 1px',
                            padding: 24,
                            // minHeight: 280,
                            // background: colorBgContainer,
                        }}
                    >
                        {children}
                    </BodyContent>
                </Layout>
            </Layout>
        </MainLayout>
    )
};