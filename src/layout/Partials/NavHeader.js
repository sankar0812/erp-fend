import React, { Fragment, useEffect, useState } from "react";
import Flex from "../../components/Flex";
import { Col, Row, Button as Buttons, Menu } from "antd";
import { FullScreenBox, ImageProfile, NavTopDraw, Profiles } from "./Style";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CustomSearchBar } from "../../components/Form/CustomSearchBar";
import { BsSearch } from "react-icons/bs";
import Button from "../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd/es";
import { CustomModal } from "../../components/CustomModal";
import { logOut, selectCurrentUser, setProfile } from "../../modules/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../Images/avatar.png";
import { base } from "../../utils/request";
import { GoScreenFull } from "react-icons/go";
import { RiFullscreenExitLine } from "react-icons/ri";


export const NavHeader = ({ updateCollapse, showDrawer }) => {
  const dispatch = useDispatch();
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

  const ProfileName = useSelector(selectCurrentUser);
  const SideProfile = useSelector(setProfile)    // profile
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addprofile");
  };

  const AdminLogOut = () => {
    setModalContent(<LogOutModal />);
    setModalTitle("Log Out");
    showModal();
  };

  const LogOutModal = () => (
    <div>
      <h1 style={{ fontSize: "1.2rem" }}>Are you Sure You Want to Logout ?</h1>
      <br />
      <Flex style={{ justifyContent: "center", gap: "20px" }}>
        <Button.Success text={"Logout"} onClick={Signout} />
        <Button.Danger text={"Cancel"} onClick={handleOk} />
      </Flex>
    </div>
  );

  const Signout = () => {
    dispatch(logOut());
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const ViewNotification = () => {
    // setModalContent(<Notifications />);
    setModalTitle("Notifications");
    showModal();
  };

  const items = [
    {
      key: "1",
      label: "My Account",
      onClick: () => {
        navigate("/profile");
        // console.log("clicked");
      },
    },
    {
      key: "2",
      label: "Log Out",
      onClick: () => {
        setModalContent(<LogOutModal />);
        setModalTitle("Log Out");
        showModal();
      },
    },
  ];

  return (
    <Fragment>
      <NavTopDraw>
        <Row>
          <Col span={4} md={4} className="DrawBtn">
            <Buttons type="text" onClick={showDrawer}>
              <AiOutlineMenu style={{ fontSize: "20px" }} />
            </Buttons>
          </Col>
          {/* <Col span={0} md={14} className="SearchTop"> */}
            {/* <Flex className="SearchTop">
              <CustomSearchBar
                placeholder={"Search in app..."}
                prefix={
                  <BsSearch
                    style={{
                      fontSize: "16px",
                      color: "#e1e1e1",
                      cursor: "pointer",
                    }}
                  />
                }
              />
            </Flex> */}
          {/* </Col> */}
          <Col span={20} lg={24} md={20}>
            <Flex className="Btnresponsive" style={{ justifyContent: "end" }}>
              {/* <AiOutlineBell
                style={{
                  fontSize: "23px",
                  marginRight: "10px",
                  marginTop: "6px",
                }}
                onClick={ViewNotification}
              /> */}
              <Profiles>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  placement="bottomRight">
                    
                  <a onClick={(e) => e.preventDefault()}>
                    <Flex aligncenter={'true'} gap={'10px'}>
                      <ImageProfile>
                        <img src={`${base}${SideProfile}`} alt="Profile" />
                      </ImageProfile>
                      <p
                        style={{
                          transition: "0.5s",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: "1.3",
                          textTransform: "capitalize",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{ProfileName}
                      </p>
                    </Flex>
                  </a>
                </Dropdown>
              </Profiles>
            </Flex>
          </Col>
          {/* <Col span={20} md={2}>
                  
                    </Col> */}
          <CustomModal
            isVisible={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={400}
            modalTitle={modalTitle}
            modalContent={modalContent} 
          />
        </Row>
      </NavTopDraw>
    </Fragment>
  );
};
