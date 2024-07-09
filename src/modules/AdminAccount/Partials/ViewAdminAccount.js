import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { CustomCardView } from "../../../components/CustomCardView";
import { useSelector } from "react-redux";
import request, { base } from "../../../utils/request";
import { CustomModal } from "../../../components/CustomModal";
import { AdminAccountForm } from "./AdminAccountForm";
import { AdminProfile } from "../style";
import { SvgIcons } from "../../../Images";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import { selectCurrentId, selectCurrentRoleId, selectCurrentRoleName } from "../../Auth/authSlice";

export const ViewAdminAccount = () => {
  const id = useSelector(selectCurrentId);
  const RoleName = useSelector(selectCurrentRoleName);
  const RoleId = useSelector(selectCurrentRoleId);

  const [dataSource, setDataSource] = useState([]);
  console.log(dataSource,'dataSource');

  useEffect(() => {
    // if (id) {
      GetAdminDetails();
    // }
  }, []);

  const GetAdminDetails = () => {
    request
      .get(`${APIURLS.GETADMINACCOUNT}${id}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
    FormRest();
  };

  const AdminAccountView = () => {
    setTrigger(trigger + 1);
    setModalTitle("Admin Account");
    setModalContent(
      <AdminAccountForm
        FormExternalClosee={FormExternalClose}
        formname={"AddAdminAccount"}
        adminprofdetails={dataSource}
        updatetrigger={trigger}
        GetAdminDetails={GetAdminDetails}
      />
    );
    showModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const mainPassword = (password) => {
    if (typeof password !== "string" || password.length < 3) {
      return "Invalid password";
    }
    const hiddenPart = "*".repeat(password.length - 3);
    const visiblePart = password.slice(-3);
    return hiddenPart + visiblePart;
  };

  const ConfimPass = (password) => {
    if (typeof password !== "string" || password.length < 3) {
      return "Invalid password";
    }
    const hiddenPart = "*".repeat(password.length - 3);
    const visiblePart = password.slice(-3);
    return hiddenPart + visiblePart;
  };

  const password = dataSource?.password;
  const ConfirmPassword = dataSource?.confirmPassword;
  const hiddenPassword1 = mainPassword(password);
  const hiddenPassword2 = ConfimPass(ConfirmPassword);

  return (
    // <CustomRow>
    //     <Col span={24} md={24}>
    //         <CustomCardView>
    //             <CustomRow space={[12, 12]}>
    //                 <Col span={24} md={10}>
    //                     <EmpDetails>
    //                         <img
    //                             src={`${base}${adminprofdetails?.image}`}
    //                             alt="img"
    //                             width={100}
    //                             height={100}
    //                             style={{ borderRadius: "25%", objectFit: "cover" }}
    //                         />
    //                         <div style={{ marginLeft: "20px" }}>
    //                             <p
    //                                 style={{
    //                                     fontWeight: "900",
    //                                     fontSize: "25px",
    //                                     color: "#000",
    //                                 }}
    //                             >
    //                                 {/* {detailget?.userName} */}
    //                             </p>
    //                             {/* <p>{detailget?.departmentName}</p> */}
    //                             <br />
    //                             <p></p>
    //                             <br />
    //                             <h1 style={{ color: "#000" }}>
    //                                 {adminprofdetails?.name}
    //                             </h1>
    //                             {/* <p>Date of Join : {detailget?.date}</p> */}
    //                         </div>
    //                     </EmpDetails>
    //                 </Col>
    //                 <Col span={24} md={14}>
    //                     <Details>
    //                         <CustomRow
    //                             style={{ position: "relative" }}
    //                             space={[12, 12]}
    //                         >
    //                             <Col span={24} md={23} sm={23}>
    //                                 <CustomRow space={[12, 12]}>
    //                                     <Col span={24} md={11} sm={11}>
    //                                         <p className="para">Email :</p>
    //                                     </Col>
    //                                     <Col span={24} md={13} sm={13}>
    //                                         <p className="paraBlue">
    //                                             {adminprofdetails?.email}
    //                                         </p>
    //                                     </Col>
    //                                     <Col span={24} md={11} sm={11}>
    //                                         <p className="para">Password :</p>
    //                                     </Col>
    //                                     <Col span={24} md={13} sm={13}>
    //                                         <p className="paraBlue">
    //                                             *******
    //                                         </p>
    //                                     </Col>
    //                                     <Col span={24} md={11} sm={11}>
    //                                         <p className="para">Confirm Password:</p>
    //                                     </Col>
    //                                     <Col span={24} md={13} sm={13}>
    //                                         <p className="paraBlue">
    //                                         *******
    //                                         </p>
    //                                     </Col>

    //                                 </CustomRow>
    //                             </Col>
    //                             <div className="icon-places">
    //                                 {/* <FiPlus className="Add-icon" /> */}
    //                                 <GrEdit
    //                                     className="icon"
    //                                     onClick={() => {
    //                                         AdminAccountView();
    //                                     }}
    //                                 />
    //                             </div>
    //                         </CustomRow>
    //                     </Details>
    //                 </Col>
    //             </CustomRow>
    //         </CustomCardView>
    //     </Col>

    //     <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />
    // </CustomRow>

    <Fragment>
      <AdminProfile>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <img
                className="profileimg"
                src={`${base}${dataSource?.image}`}
                width={70}
                height={70}
                alt="image"
              />
              {(RoleName === "Admin" || RoleName === "SuperAdmin" ) && (
                  <Tooltip placement="top" title={"Edit"}>
                    <img
                      className="iconImg"
                      src={SvgIcons.edit}
                      width={25}
                      alt="edit"
                      onClick={() => AdminAccountView()}
                    />
                  </Tooltip>
                )}
            </div>
            <h1 style={{ fontSize: "20px" }}>{dataSource?.roleType}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <p>Recently Saved Changes</p>
              <p
                style={{
                  paddingTop: "10px",
                  fontSize: "20px",
                  color: "#3468C0",
                }}
              >
                {dataSource?.date} &nbsp; {dataSource?.inTime}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1
            style={{ fontSize: "28px", padding: "40px 0px", color: "#3468C0" }}
          >
            Personal Info
          </h1>
          <CustomRow space={[12, 12]}>
            <Col span={24} md={18}>
              <CustomCardView>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0px",
                  }}
                >
                  <div>{dataSource?.name}</div>
                  <div>UserName</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0px",
                  }}
                >
                  <div>{dataSource?.email}</div>
                  <div>Email</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0px",
                  }}
                >
                  <div>{hiddenPassword1}</div>
                  <div>Password</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 0px",
                  }}
                >
                  <div>{hiddenPassword2}</div>
                  <div>Confirm Password</div>
                </div>
              </CustomCardView>
            </Col>
          </CustomRow>
        </div>
      </AdminProfile>
      <CustomModal
        isVisible={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
