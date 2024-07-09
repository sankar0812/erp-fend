import React, { Fragment, useEffect, useState } from "react";
import { CustomPageTitle } from "../../../components/CustomPageTitle";
import { CustomRow } from "../../../components/CustomRow";
import Flex from "../../../components/Flex";
import Button from "../../../components/Form/CustomButton";
import { CustomModal } from "../../../components/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import request, { base } from "../../../utils/request";
import { toast } from "react-toastify";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import { Col } from "antd";
import { CustomLableBack } from "../../../components/CustomLableBack";
import { Details, EmpDetails, EmpView } from "../../HRM/EmployeeDetails/Style";
import { CustomCardView } from "../../../components/CustomCardView";
import { GrEdit } from "react-icons/gr";
import { CustomTabs } from "../../../components/CustomTabs";
import AddUser from "./AddUser";
import { ViewEmployeeProfileDetail } from "../../HRM/EmployeeDetails/ViewEmployee/Partials/ViewEmployeeProfileDetail";

export const ViewUserDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [personalDetail, setPersonalDetail] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);

  // const dispatch = useDispatch()
  const navigate = useNavigate();

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = () => {
    request
      .get(`${APIURLS.GETUSERURL}${id}`)
      .then(function (response) {
        setUserDetail(response.data);
        console.log(userDetail, 'userDetail');
      })
      .catch(function (error) { });
  };

console.log(userDetail,'userDetail');

  // useEffect(() => {
  //   GetPersonalDetail();
  // }, []);

  // const GetPersonalDetail = () => {
  //   request
  //     .get(`${APIURLS.GETPERSONALDETAILS}/${id}/`)
  //     .then(function (response) {
  //       setPersonalDetail(response.data);
  //     })
  //     .catch(function (error) {});
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const FormExternalClose = () => {
    handleOk();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const EditUser = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Edit User Details");
    setModalContent(
      <AddUser
        FormExternalClose={FormExternalClose}
        formname={"editUser"}
        formReset={formReset}
        id={id}
        updaterecord={userDetail}
        updatetrigger={trigger}
        GetUserDetail={GetUserDetail}
      />
    );
    showModal();
  };

  // const pdfUrl = `${base}${qualification.resumeurl}`;

  // const ViewResume = (record) => {
  //   showModal();
  //   setModalTitle("View Resume");
  //   setModalContent(<PDFViewerr record={record} pdfUrl={pdfUrl} />);
  // };

  const ActiveStatus = (record) => {
    request
      .put(`${APIURLS.USERSTATUS}${record.userId}`)
      .then(function (response) {
        toast.success("Status Changed Successfully");
        GetUserDetail();
        navigate(-1);
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };
  console.log(userDetail, 'userDetail');
  const tabs = [
    {
      key: "1",
      label: "Profile",
      children: <ViewEmployeeProfileDetail getDetails={userDetail} />,
    },
  ];

  const onChangeTabs = () => { };

  return (
    <Fragment>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Staffs"} />
      </Flex>
      <EmpView>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            <CustomCardView>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={10}>
                  <EmpDetails>
                    <CustomRow>
                      <Col span={24} md={12}>
                        <img
                          src={`${base}${userDetail?.userProfile}`}
                          alt="img"
                          width={100}
                          height={100}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                      </Col>
                      <Col span={24} md={12}>
                        <div style={{ marginLeft: "20px" }}>
                          <p
                            style={{
                              fontWeight: "900",
                              fontSize: "23px",
                              color: "#000",
                            }}
                          >
                            {userDetail?.username}
                          </p>
                          <p>{userDetail?.roleType}</p>
                          <br />
                          {/* <p>{userDetail?.designationName}</p>
                            <br /> */}
                          <p style={{ color: "#000" }}>
                            Staff ID : {userDetail?.managerId}
                          </p>
                        </div>
                      </Col>

                      <Col
                        span={24}
                        md={24}
                        style={{
                          display: "flex",
                          height: "100%",
                          // marginTop:"20px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {userDetail?.userStatus === true && (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(userDetail)}
                          >
                            In Active
                          </Button>
                        )}

                        {userDetail?.userStatus === false && (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(userDetail)}
                          >
                            Active
                          </Button>
                        )}
                      </Col>
                    </CustomRow>
                  </EmpDetails>
                </Col>
                <Col span={24} md={14}>
                  <Details>
                    <CustomRow
                      style={{ position: "relative" }}
                      space={[12, 12]}
                    >
                      <Col span={24} md={23} sm={23}>
                        <CustomRow space={[12, 12]}>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Phone :</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">
                              {userDetail?.mobileNumber}
                            </p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Email:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{userDetail?.email}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">City:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{userDetail?.city}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Country:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{userDetail?.country}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Address:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">{userDetail?.address}</p>
                          </Col>

                          <Col span={24} md={11} sm={11}>
                            <p className="para">Location:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">{userDetail?.location}</p>
                          </Col>
                        </CustomRow>
                      </Col>
                      <div className="icon-places">
                        {/* <FiPlus className="Add-icon" /> */}
                        {
                          userDetail && userDetail?.userStatus === true ?

                            (<GrEdit
                              className="icon"
                              onClick={() => {
                                EditUser(id);
                              }}
                            />) : null
                        }

                      </div>
                    </CustomRow>
                  </Details>
                </Col>
              </CustomRow>
            </CustomCardView>
          </Col>

          <CustomCardView style={{ width: "100%" }}>
            <CustomTabs
              tabs={tabs}
              defaultActiveKey={"1"}
              onChange={onChangeTabs}
            />
          </CustomCardView>
        </CustomRow>
      </EmpView>

      <CustomModal
        width={700}
        isVisible={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};

// export default ViewUserDetails
