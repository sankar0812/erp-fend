import { Layout, Menu } from "antd";
import styled from "styled-components";

export const MainLayout = styled.section`
  min-height: 100vh;
  display: flex;
  width: 100%;
  overflow: hidden;
  transition: 0.5s;
  /* overflow-y: hidden !important; */
`;

export const ImageProfile = styled.div`
  /* text-align: center; */
  /* width:100%; */
  & img {
    object-fit: cover;
    width: 45px;
    height: 45px;
    margin: auto;
    border-radius: 50%;
  }
`;

export const SidemenuProfile = styled.div`
  /* text-align: center; */
  /* width:100%; */
  & img {
    object-fit: cover;
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 50%;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  }
`;

export const Profile = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px 0px;
  gap: 10px;
  padding: 5px 20px;
`;

export const Profiles = styled.div`
  display: flex;
  align-items: center;
  margin: -5px 0 20px 0px;
  gap: 10px;
  padding: 5px 10px;
  /* border-radius: 10%; */
`;
export const FullScreenBox = styled.div`
  margin-right: 15px;
  margin-top: 5px;

  align-items: center;
  & svg {
    font-size: 27px;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
    }
  }
`;

export const MenuText = styled.div`
  font-size: 16px;
  color: #545454;
  padding-left: 7px;
`;

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 13px 21px;
  z-index: 999;
  & p {
    padding-left: 10px;
  }
`;

export const NavTopDraw = styled.div`
  padding-top: 18px;      
  .ant-btn {
    border-radius: 0px !important;
  }
  @media (min-width: 991px) {
    .DrawBtn {
      display: none;
    }
  }
  @media (max-width: 901px) {
    .SearchTop {
      display: none;
    }

    .Btnresponsive {
      gap: 3px !important;
    }
  }
  /* .Btnresponsive {
    gap: 20px !important;
} */

  @media (max-width: 501px) {
    .Btnresponsive {
      gap: 3px !important;
    }
  }
  .btnborder {
    border-radius: 25px !important;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    &:hover {
      transform: scale(1.1);
    }
  }

  &.btnborder .icon {
    font-size: 3px;
    margin-right: 10px;
  }
`;

export const SideMenuLayout = styled(Layout.Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  @media (max-width: 900px) {
    display: none;
  }

  .ant-btn-text:not(:disabled):not(.ant-btn-disabled):hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .ant-btn {
    border-radius: 0px !important;
  }
  .anticon svg {
    font-size: 18px;
    color: #545454 !important;
  }
  .ant-layout .ant-layout-sider-children {
    background: #fff !important;
  }
  .ant-layout-sider-children {
    background: #fff !important;
    /* box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08) */
    border-right: 1px solid #e8e8e8;
  }
  .ant-menu-dark {
    background: #fff !important;
  }

  .ant-menu-light:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):active {
    background-color: #e6f4ff;
    border-radius: 0% !important;
  }

  .ant-menu .ant-menu-item {
    border-radius: 0% !important;
    /* border-right: 1px solid; */
  }

  .ant-menu-light .ant-menu-item-selected {
    border-right: 2px solid !important;
  }

  .ant-menu-light
    .ant-menu-item:not(.ant-menu-item-selected):not(
      .ant-menu-submenu-selected
    ):hover {
    color: #2196f3 !important;
  }
  .ant-menu-light:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: transparent !important;
  }
  .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-submenu-title:hover {
    background-color: transparent !important;
  }
  .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    background-color: transparent !important;
  }
  .ant-menu-item .ant-menu-item-icon + span {
    margin-inline-start: 20px !important;
  }
  .ant-menu .ant-menu-submenu-title .ant-menu-item-icon + span {
    margin-inline-start: 20px !important;
  }
  /* .ant-menu-submenu-arrow {
    inset-inline-end: 236px!important;
} */

  /* .ant-menu-submenu-title {
    padding-left: 48px !important;
}
.ant-menu-item {
    padding-left: 48px !important;
} */
`;

export const TopHeader = styled(Layout.Header)`
  height: 73px !important;
  /* box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08) !important; */
  background: ${(props) => props.bacColor};
  padding: " 0 15px";
`;

export const BodyContent = styled(Layout.Content)`
  height: 80vh;
  overflow-y: auto;
  & .ant-menu-item-icon {
    font-size: 20px !important;
  }
  & .ant-menu .ant-menu-item .ant-menu-item-icon {
    font-size: 20px !important;
  }

  @media (max-width: 900px) {
    & .ant-layout-content {
      width: 100% !important;
      margin: 0 !important;
    }
  }
`;

export const AntdStyledMenu = styled(Menu)`
  position: absolute !important;
  right: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px !important;
  .ant-dropdown-menu-item {
    padding: 10px 12px !important;
    color: "#757575" !important;
  }
  .ant-dropdown-menu-item-icon {
    margin-inline-end: 16px !important;
  }
`;

export const BtnProfile = styled.div`
  margin: 0 10px;
  padding: 9px;
  display: flex;
  color: black !important;
  border-radius: 25px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  & h1 {
    display: flex;
    justify-content: flex-start;
    font-weight: 600;
    padding-right: 9px;
  }

  & svg {
    font-size: 1.5rem;
    color: "#111827";
  }

  &:hover {
    background: #d9d9e75e;
  }

  & .header__icon {
    font-size: 26px;
    color: "white";
  }
`;
