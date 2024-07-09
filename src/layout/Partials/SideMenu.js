import { Divider, Dropdown, Menu } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineDashboard,
  AiOutlineFundView,
  AiOutlineTags,
  AiFillMoneyCollect,
  AiTwotoneSchedule,
} from "react-icons/ai";

import { useEffect, useState } from "react";
import styled from "styled-components";
import profile from "../../Images/avatar.png";

import { useDispatch, useSelector } from "react-redux";
import Flex from "../../components/Flex";
import {
  AntdStyledMenu,
  ImageProfile,
  Profile,
  SidemenuProfile,
} from "../Partials/Style";
import Button from "../../components/Form/CustomButton";
import { CustomModal } from "../../components/CustomModal";
import {
  logOut,
  selectCurrentId,
  selectCurrentRole,
  selectCurrentRoleName,
  selectCurrentUser,
  selectEmployeeId,
  setProfile,
} from "../../modules/Auth/authSlice";
import { clientItems, clientKeys } from "./DynamicSubmenu/Client";
import { AdminItems, adminKeys } from "./DynamicSubmenu/Admin";
import { RandDRole, randDKeys } from "./DynamicSubmenu/RandDRole";
import { EmployeeItems, employeeKeys } from "./DynamicSubmenu/Employee";
import { TLsItems, TLsKeys } from "./DynamicSubmenu/TLs";
import {
  ProjectHeadItems,
  ProjectHeadKeys,
} from "./DynamicSubmenu/ProjectHead";
import { base } from "../../utils/request";
import { USER_ROLES } from "../../utils/UserRoles/UserRole";
import { Manager, Managers, managerKeys } from "./DynamicSubmenu/Manager";
import { Accountant, accountantKeys } from "./DynamicSubmenu/Accountant";
import { TraineeItems, TraineeKeys } from "./DynamicSubmenu/Trainee";
import { ProjectManagerItems, ProjectManagerKeys } from "./DynamicSubmenu/ProjectManager";

export const SideMenu = ({ collapsed }) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [openKeys, setOpenKeys] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  // ================ Dynamic Items & Keys ====

  const [dynamicKeys, setDynamicKeys] = useState([]);
  const [items, setItems] = useState([]);

  const Role = useSelector(selectCurrentRole); //  role type

  const RoleName = useSelector(selectCurrentRoleName); // role Name

  const UserName = useSelector(selectCurrentUser); //  user Name

  const Employeeid = useSelector(selectCurrentId);

  const EmpId = useSelector(selectEmployeeId);

  const SideProfile = useSelector(setProfile); // profile

  useEffect(() => {
    if (Role === USER_ROLES.ADMIN) {
      setDynamicKeys(adminKeys);
      setItems(AdminItems(collapsed));
    } else if (Role === USER_ROLES.EMPLOYEE) {
      setDynamicKeys(employeeKeys);
      setItems(EmployeeItems(collapsed, Employeeid));
    }
    if (Role === USER_ROLES.TEAMLEADER) {
      setDynamicKeys(TLsKeys);
      setItems(TLsItems(collapsed, Employeeid));
    }
    if (Role === USER_ROLES.PROJECHEAD) {
      setDynamicKeys(ProjectHeadKeys);
      setItems(ProjectHeadItems(collapsed, Employeeid));
    } else if (Role === USER_ROLES.CLIENT) {
      setDynamicKeys(clientKeys);
      setItems(clientItems(collapsed, Employeeid));
    } else if (Role === USER_ROLES.RESEARCH_DEVELOPER) {
      setDynamicKeys(randDKeys);
      setItems(RandDRole(collapsed));
    } else if (Role === USER_ROLES.MANAGER) {
      setDynamicKeys(managerKeys);
      setItems(Managers(collapsed));
    } else if (Role === USER_ROLES.ACCOUNTANT) {
      setDynamicKeys(accountantKeys);
      setItems(Accountant(collapsed));
    } else if (Role === USER_ROLES.TRAINEE) {
      setDynamicKeys(TraineeKeys);
      setItems(TraineeItems(collapsed, Employeeid));
    }else if (Role === USER_ROLES.SUPERADMIN) {
      setDynamicKeys(adminKeys);
      setItems(AdminItems(collapsed, Employeeid));
    }
    else if (Role === USER_ROLES.PROJECTMANAGER) {
      setDynamicKeys(ProjectManagerKeys);
      setItems(ProjectManagerItems(collapsed,Employeeid));
    }
  }, [collapsed]);

  const route = useLocation();

  useEffect(() => {
    const pathname = route.pathname;
    const parts = pathname.split("/");
    const lastPart = parts[1];

    setActiveTab(lastPart);

    const storedOpenKeys = JSON.parse(localStorage.getItem("openKeys"));
    if (storedOpenKeys) {
      setOpenKeys(storedOpenKeys);
    }
  }, [route]);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const dynamicKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6','sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12'];

  const onOpenChange = (keys) => {
    // Store the open keys in local storage
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (dynamicKeys.indexOf(latestOpenKey) === -1) {
      localStorage.setItem("openKeys", JSON.stringify(keys));
      setOpenKeys(keys);
    } else {
      localStorage.setItem(
        "openKeys",
        JSON.stringify(latestOpenKey ? [latestOpenKey] : [])
      );
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const navigate = useNavigate();

  const onClick = ({ key }) => {
    if (key === null) {
    } else {
      navigate(`${key}/`);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const Signout = () => {
    dispatch(logOut());
  };

  const LogOutModal = () => (
    <div>
      <h1 style={{ fontSize: "1.2rem" }}>Are you Sure You Want to Logout ?</h1>
      <br />
      <Flex gap={"20px"} w_100={"true"} center={"true"} verticallyCenter>
        <Button.Success text={"Logout"} onClick={Signout} />
        <Button.Danger text={"Cancel"} onClick={handleOk} />
      </Flex>
    </div>
  );

  const handleClick = () => {
    navigate("/addprofile");
  };

  const AdminLogOut = () => {
    setModalContent(<LogOutModal />);
    setModalTitle("Log Out");
    showModal();
  };
  const userMenu = (
    <AntdStyledMenu>
      <Menu.Item style={{ color: "#545454" }} key="1" onClick={handleClick}>
        My Account
      </Menu.Item>
      <Menu.Item style={{ color: "#545454" }} key="2">
        Connections
      </Menu.Item>
      <Menu.Item style={{ color: "#545454" }} key="3" onClick={AdminLogOut}>
        Log Out
      </Menu.Item>
    </AntdStyledMenu>
  );

//   const handleEmployee = () => {
//     console.log(EmpId,'EmpId');
//     navigate(`/viewemployee/${EmpId}`)
//   };

  return (
    <>
      <Profile onClick={()=>{navigate("/profile")}}>
        <div
        //   onClick={() => {
        //     handleEmployee();
        //   }}
        >
          <SidemenuProfile>
            <img src={`${base}${SideProfile}`} alt="Profile" />
          </SidemenuProfile>
          {!collapsed && (
            <>
              <p
                style={{
                  fontSize: "16px",
                  color: "#545454",
                  textTransform: "capitalize",
                  margin: "5px",
                }}
              >
                {UserName}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "blue",
                  textTransform: "uppercase",
                }}
              >
                {RoleName}
              </p>
            </>
          )}
        </div>
      </Profile>
      <div style={{ margin: "auto", width: "82%" }}>
        <Divider style={{ background: "rgb(232 232 232 / 11%)" }} />
      </div>
      <div
        style={{
          minHeight: "calc(100vh - 280px)",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Menu
          style={{ color: "#545454", position: "absolute", width: "100%" }}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[activeTab]}
          // defaultSelectedKeys={[activeTab]}
          mode="inline"
          items={items}
        />
      </div>
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={400}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </>
  );
};
