import React, { Fragment, useEffect, useState } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { useSelector } from "react-redux";
import { getInitialEmployee, viewEmpDetails } from "../../EmployeeSlice";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import Flex from "../../../../../components/Flex";
import { Col } from "antd";
import { Details, EmpDetails, EmpView, StyledDetails } from "../../Style";
import { GrEdit } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { EmergencyContactsForm } from "../../EmergencyContacts/Partials/EmergencyContactForm";
import { CustomModal } from "../../../../../components/CustomModal";
import { useNavigate, useParams } from "react-router-dom";
import { AddBankDetails } from "../../BankDetails/Partials/AddBankDetails";
import { PersonalInformation } from "../../PersonalInformation/Partials/PersonalInformation";
import { FamilyInformation } from "../../FamilyInformation/Partials/FamilyInformation";
import { AddEmployeeForm } from "./AddEmployeeForm";
import { EmployeeQualificationForm } from "../../Qualifications/Partials/QualificationForm";
import { THEME } from "../../../../../theme";
import PDFViewerr from "./ViewPdf";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import Button from "../../../../../components/Form/CustomButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CustomTabs } from "../../../../../components/CustomTabs";
import { ViewEmployeeProfileDetail } from "./ViewEmployeeProfileDetail";
import { ViewEmployeeProjects } from "./ViewEmployeeProjects";
import { ViewEmployeeAssets } from "./ViewEmployeeAssets";

const ViewEmployeeProfile = ({ record }) => {
  const viewEmployeeDetails = useSelector(viewEmpDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [detailget, setDetailsGet] = useState([]);
  const [bankDetail, setBankDetail] = useState([]);
  const [personalDetail, setPersonalDetail] = useState([]);
  const [emerContact, setEmerContact] = useState([]);
  const [famDetails, setFamDetails] = useState([]);
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
    GetInitialEmployee();
  }, []);

  const GetInitialEmployee = () => {
    request
      .get(`${APIURLS.GETINITIALEMPLOYEE}/${id}/`)
      .then(function (response) {
        setDetailsGet(response.data);
      })
      .catch(function (error) { });
  };

  useEffect(() => {
    GetPersonalDetail();
  }, []);

  const GetPersonalDetail = () => {
    request
      .get(`${APIURLS.GETPERSONALDETAILS}/${id}/`)
      .then(function (response) {
        setPersonalDetail(response.data);
      })
      .catch(function (error) { });
  };

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

  const EditInitialEmployee = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Staff Details");
    setModalContent(
      <AddEmployeeForm
        FormExternalCloseeee={FormExternalClose}
        formname={"editemployee"}
        formReset={formReset}
        id={id}
        detailget={detailget}
        updatetrigger={trigger}
        GetInitialEmployee={GetInitialEmployee}
      />
    );
    showModal();
  };

  // const pdfUrl = `${base}${qualification.resumeurl}`;/

  // const ViewResume = (record) => {
  //   showModal();
  //   setModalTitle("View Resume");
  //   setModalContent(<PDFViewerr record={record} pdfUrl={pdfUrl} />);
  // };

  const ActiveStatus = (record) => {
    request
      .put(`${APIURLS.EMPLOYEESTATUS}${record.employeeId}`)
      .then(function (response) {
        toast.success("Status Changed Successfully");
        GetInitialEmployee();
        navigate(-1);
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };
  
  const tabs = [
    {
      key: "1",
      label: "Profile",
      children: <ViewEmployeeProfileDetail getDetails={detailget} />,
    },
    { key: "2", label: "Projects", children: <ViewEmployeeProjects /> },
    { key: "3", label: "Assets", children: <ViewEmployeeAssets /> },
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
                          src={`${base}${detailget?.profile}`}
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
                            {detailget?.userName}
                          </p>
                          <p>{detailget?.departmentName}</p>
                          <br />
                          <p>{detailget?.designationName}</p>
                          <br />
                          <p style={{ color: "#000" }}>
                            Staff ID : {detailget?.userId}
                          </p>
                        </div>
                      </Col>

                      <Col
                        span={24}
                        md={24}
                        style={{
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {detailget?.status === true || detailget?.exitType === null && (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(detailget)}
                          >
                            In Active
                          </Button>
                        )}

                        {detailget?.status === false || detailget?.exitType === null&& (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(detailget)}
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
                            <p className="paraBlue">{detailget?.phoneNumber}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Email:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.email}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Gender:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.gender}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Birthday:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.dob}</p>
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
                            <p className="paraBlue">{detailget?.address}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">City:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">{detailget?.city}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">State:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">{detailget?.state}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Country:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">{detailget?.country}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Attendance Type:</p>
                          </Col>
                          <Col
                            span={24}
                            md={13}
                            sm={13}
                            style={{ width: "100%" }}
                          >
                            <p className="paraBlue">
                              {detailget?.attendanceType}
                            </p>
                          </Col>
                        </CustomRow>
                      </Col>
                      <div className="icon-places">
                        {/* <FiPlus className="Add-icon" /> */}

                        {
                          detailget && detailget?.status === true ?
                            (
                              <GrEdit
                                className="icon"
                                onClick={() => {
                                  EditInitialEmployee(id);
                                }}
                              />
                            ) : null
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

          {/* Personal Informations */}

          {/* <Col span={24} md={12}>
            <CustomCardView>
              <StyledDetails>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={21} sm={21}>
                    <p className="cardheading">Personal Informations</p>
                  </Col>
                  <Col span={24} md={3} sm={3}>
                    <div className="icon-places">
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddPersonalInformation(id);
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Passport No.</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.passportNo}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Passport Exp Date.</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">
                      {personalDetail?.passportExpDate}
                    </p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Tel</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.tel}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Nationality</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.nationality}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Religion</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.religion}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Marital status</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.married}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">No. of children</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{personalDetail?.noOfChildren}</p>
                  </Col>
                </CustomRow>
              </StyledDetails>
            </CustomCardView>
          </Col> */}

          {/* BAnk Details */}

          {/* <Col span={24} md={12}>
            <CustomCardView>
              <StyledDetails>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={21} sm={21}>
                    <p className="cardheading">Bank Details</p>
                  </Col>
                  <Col span={24} md={3} sm={3}>
                    <div className="icon-places">
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddBankDetailss(id);
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Bank Name</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{bankDetail?.bankName}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Branch Name</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{bankDetail?.branchName}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Bank account No.</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{bankDetail?.accountNumber}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">IFSC Code</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{bankDetail?.ifseCode}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">PAN No</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{bankDetail?.panNumber}</p>
                  </Col>
                </CustomRow>
              </StyledDetails>
            </CustomCardView>
          </Col> */}

          {/* Emergency Contact */}

          {/* <Col span={24} md={12}>
            <CustomCardView>
              <StyledDetails>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={21} sm={21}>
                    <p className="cardheading">Emergency Contact</p>
                  </Col>
                  <Col span={24} md={3} sm={3}>
                    <div className="icon-places">
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddEmergencyContacts(id);
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Name</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{emerContact?.relatinoName}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Phone</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{emerContact?.phoneNumber}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Address</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{emerContact?.address}</p>
                  </Col>
                </CustomRow>
              </StyledDetails>
            </CustomCardView>
          </Col> */}

          {/* relationship */}

          {/* <Col span={24} md={12}>
            <CustomCardView>
              <StyledDetails>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={21} sm={21}>
                    <p className="cardheading">Family Informations</p>
                  </Col>
                  <Col span={24} md={3} sm={3}>
                    <div className="icon-places">
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddFamilyInformations(id);
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Name</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{famDetails?.name}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Relationship</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{famDetails?.relationShip}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Date of Birth</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{famDetails?.dob}</p>
                  </Col>

                  <Col span={24} md={11} sm={11}>
                    <p className="para">Phone Number</p>
                  </Col>
                  <Col span={24} md={13} sm={13}>
                    <p className="paraBlue">{famDetails?.phone}</p>
                  </Col>
                </CustomRow>
              </StyledDetails>
            </CustomCardView>
          </Col> */}

          {/* Education Informations */}

          {/* <Col span={24} md={24}>
            <CustomCardView>
              <StyledDetails>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={21} sm={21}>
                    <p className="cardheading">Qualification</p>
                  </Col>
                  <Col span={24} md={3} sm={3}>
                    <div className="icon-places">
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddQualification(id);
                        }}
                      />
                    </div>
                  </Col>

                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Highest Qualification</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <p className="paraBlue">
                          {qualification?.highestQualification}
                        </p>
                      </Col>
                    </CustomRow>
                  </Col>
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Aadhar Card Photo</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.aadharurl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Aadhar Card Number</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <p className="paraBlue">{qualification?.aadharNO}</p>
                      </Col>
                    </CustomRow>
                  </Col>
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Pan Card Photo</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.pannourl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>

                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Resume Photo</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.resumeurl}`}
                          alt="Resume"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />

                        <AiOutlineEye
                          style={{ cursor: "pointer" }}
                          color={THEME.green}
                          size={"22px"}
                          onClick={() => ViewResume(record)}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Degree Certificate</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.degreeurl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>

                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Bank Passbook</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.bankBookurl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">10th Certificate</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.tenurl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>

                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">12th Certificate</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <img
                          src={`${base}${qualification?.twelveurl}`}
                          alt="Staff"
                          width="100"
                          height="100"
                          style={{ borderRadius: "10%" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                </CustomRow>
              </StyledDetails>
            </CustomCardView>
          </Col> */}
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

export default ViewEmployeeProfile;
