import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { StyledDetails } from "../../Style";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { useParams } from "react-router-dom";
import { AddEmployeeForm } from "./AddEmployeeForm";
import { EmergencyContactsForm } from "../../EmergencyContacts/Partials/EmergencyContactForm";
import { AddBankDetails } from "../../BankDetails/Partials/AddBankDetails";
import { PersonalInformation } from "../../PersonalInformation/Partials/PersonalInformation";
import { FamilyInformation } from "../../FamilyInformation/Partials/FamilyInformation";
import { EmployeeQualificationForm } from "../../Qualifications/Partials/QualificationForm";
import { GrEdit } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from "../../../../../theme";
import { CustomModal } from "../../../../../components/CustomModal";
import { useSelector } from "react-redux";
import { selectCurrentRoleId } from "../../../../Auth/authSlice";
import PDFViewerr from "./ViewPdf";

export const ViewEmployeeProfileDetail = ({ getDetails }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [bankDetail, setBankDetail] = useState({});
  const [personalDetail, setPersonalDetail] = useState([]);
  const [emerContact, setEmerContact] = useState([]);
  const [famDetails, setFamDetails] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);

  // const dispatch = useDispatch()

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const { id } = useParams();
  // const RoleId = useSelector(selectCurrentRoleId)

  useEffect(() => {
    if (getDetails.length != 0) {
      GetPersonalDetail();
      GetBankDetails();
      GetEmergencyContact();
      GetFamilyInformation();
      getQualification();
    }
  }, [getDetails]);

  const GetBankDetails = () => {
    request
      .get(`${APIURLS.GETBANKDETAIL}/${id}/${getDetails?.roleId}`)
      .then(function (response) {
        setBankDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetPersonalDetail = () => {
    request
      .get(`${APIURLS.GETPERSONALDETAILS}/${id}/${getDetails?.roleId}`)
      .then(function (response) {
        setPersonalDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetEmergencyContact = () => {
    request
      .get(`${APIURLS.GETEMERGENCYDETAILS}/${id}/${getDetails?.roleId}`)
      .then(function (response) {
        setEmerContact(response.data);
      })
      .catch(function (error) {});
  };

  const GetFamilyInformation = () => {
    request
      .get(`${APIURLS.GETFAMILYDETAILS}/${id}/${getDetails?.roleId}`)
      .then(function (response) {
        setFamDetails(response.data);
      })
      .catch(function (error) {});
  };


  const getQualification = () => {
    request
      .get(`${APIURLS.GETQUALIFICATION}/${id}/${getDetails?.roleId}`)
      .then(function (response) {
        setQualification(response.data);
      })
      .catch(function (error) {});
  };

  const pdfUrl = `${base}${qualification.resumeurl}`;

  const ViewResume = (qualification) => {
    showModal();
    setModalTitle("View Resume");
    setModalContent(<PDFViewerr record={qualification} pdfUrl={pdfUrl} />);
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

  const AddEmergencyContacts = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Emergrncy Contacts");
    setModalContent(
      <EmergencyContactsForm
        FormExternalClose={FormExternalClose}
        formname={"addemergencycontact"}
        formReset={formReset}
        id={id}
        emerContact={emerContact}
        GetEmergencyContact={GetEmergencyContact}
        trigger={trigger}
      />
    );
    showModal();
  };

  const AddBankDetailss = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Bank Details");
    setModalContent(
      <AddBankDetails
        FormExternalClose={FormExternalClose}
        formname={"addbankdetails"}
        formReset={formReset}
        bankDetail={bankDetail}
        id={id}
        GetBankDetails={GetBankDetails}
        trigger={trigger}
      />
    );
    showModal();
  };

  const AddPersonalInformation = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Personal Information");
    setModalContent(
      <PersonalInformation
        FormExternalClose={FormExternalClose}
        formname={"addpersonalinformation"}
        formReset={formReset}
        personalDetail={personalDetail}
        id={id}
        GetPersonalDetail={GetPersonalDetail}
        trigger={trigger}
      />
    );
    showModal();
  };

  const AddFamilyInformations = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Family Information");
    setModalContent(
      <FamilyInformation
        FormExternalClose={FormExternalClose}
        formname={"addfamilyinformation"}
        formReset={formReset}
        id={id}
        famDetails={famDetails}
        GetFamilyInformation={GetFamilyInformation}
        trigger={trigger}
      />
    );
    showModal();
  };

  const AddQualification = (id) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Qualification");
    setModalContent(
      <EmployeeQualificationForm
        FormExternalClose={FormExternalClose}
        formname={"addQualification"}
        formReset={formReset}
        id={id}
        qualification={qualification}
        getQualification={getQualification}
        trigger={trigger}
      />
    );
    showModal();
  };
  return (
    <Fragment>
      <CustomRow space={[12, 12]}>
        {/* Personal Informations */}

        <Col span={24} md={12}>
          <CustomCardView>
            <StyledDetails>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={21} sm={21}>
                  <p className="cardheading">Personal Informations</p>
                </Col>
                <Col span={24} md={3} sm={3}>
                  <div className="icon-places">
                    {(personalDetail && personalDetail?.status === true) ||
                    personalDetail?.userStatus === true ? (
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddPersonalInformation(id);
                        }}
                      />
                    ) : null}
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
                  <p className="paraBlue">{personalDetail?.passportExpDate}</p>
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
                {personalDetail && personalDetail?.married === "married" ? (
                  <>
                    <Col span={24} md={11} sm={11}>
                      <p className="para">No. of children</p>
                    </Col>

                    <Col span={24} md={13} sm={13}>
                      <p className="paraBlue">{personalDetail?.noOfChildren}</p>
                    </Col>
                  </>
                ) : null}
              </CustomRow>
            </StyledDetails>
          </CustomCardView>
        </Col>

        {/* BAnk Details */}

        <Col span={24} md={12}>
          <CustomCardView>
            <StyledDetails>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={21} sm={21}>
                  <p className="cardheading">Bank Details</p>
                </Col>
                <Col span={24} md={3} sm={3}>
                  <div className="icon-places">
                    {/* <FiPlus className="Add-icon" /> */}
                    {(bankDetail && bankDetail?.status === true) ||
                    bankDetail?.userStatus === true ? (
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddBankDetailss(id);
                        }}
                      />
                    ) : null}
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

                <Col span={24} md={11} sm={11}>
                  <p className="para">Bank Holder Name</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p className="paraBlue">{bankDetail?.holderName}</p>
                </Col>
              </CustomRow>
            </StyledDetails>
          </CustomCardView>
        </Col>

        {/* Emergency Contact */}

        <Col span={24} md={12}>
          <CustomCardView>
            <StyledDetails>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={21} sm={21}>
                  <p className="cardheading">Emergency Contact</p>
                </Col>
                <Col span={24} md={3} sm={3}>
                  <div className="icon-places">
                    {/* <FiPlus className="Add-icon"/> */}
                    {(emerContact && emerContact?.status === true) ||
                    emerContact?.userStatus === true ? (
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddEmergencyContacts(id);
                        }}
                      />
                    ) : null}
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
        </Col>

        {/* relationship */}

        <Col span={24} md={12}>
          <CustomCardView>
            <StyledDetails>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={21} sm={21}>
                  <p className="cardheading">Family Informations</p>
                </Col>
                <Col span={24} md={3} sm={3}>
                  <div className="icon-places">
                    {/* <FiPlus className="Add-icon" /> */}
                    {(famDetails && famDetails?.status === true) ||
                    famDetails?.userStatus === true ? (
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddFamilyInformations(id);
                        }}
                      />
                    ) : null}
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
        </Col>

        {/* Education Informations */}

        <Col span={24} md={24}>
          <CustomCardView>
            <StyledDetails>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={21} sm={21}>
                  <p className="cardheading">Qualification</p>
                </Col>
                <Col span={24} md={3} sm={3}>
                  <div className="icon-places">
                    {/* <FiPlus className="Add-icon" /> */}
                    {(qualification && qualification?.status === true) ||
                    qualification?.userStatus === true ? (
                      <GrEdit
                        className="icon"
                        onClick={() => {
                          AddQualification(id);
                        }}
                      />
                    ) : null}
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
                {qualification?.aadharurl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

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

                {qualification?.pannourl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

                {qualification?.resumeurl && (
                  <Col span={24} md={12} sm={12}>
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={12} sm={12}>
                        <p className="para">Resume Photo</p>
                      </Col>
                      <Col span={24} md={12} sm={12}>
                        <AiOutlineEye
                          style={{ cursor: "pointer" }}
                          color={THEME.green}
                          size={"22px"}
                          onClick={() => ViewResume(qualification)}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

                {qualification?.degreeurl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

                {qualification?.bankBookurl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

                {qualification?.tenurl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}

                {qualification?.twelveurl && (
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
                          style={{ borderRadius: "10%", objectFit: "cover" }}
                        />
                      </Col>
                    </CustomRow>
                  </Col>
                )}
              </CustomRow>
            </StyledDetails>
          </CustomCardView>
        </Col>
      </CustomRow>

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
