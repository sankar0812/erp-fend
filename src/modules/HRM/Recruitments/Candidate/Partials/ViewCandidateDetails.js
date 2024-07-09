import React, { Fragment, useState } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { GrEdit } from "react-icons/gr";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { Details, EmpView } from "../../../EmployeeDetails/Style";
import image from "../../../../../Images/logo-white.png";
import { THEME } from "../../../../../theme";
import { AiOutlineEye } from "react-icons/ai";
import { base } from "../../../../../utils/request";
import PDFViewerr from "../../../EmployeeDetails/ViewEmployee/Partials/ViewPdf";
import { CustomModal } from "../../../../../components/CustomModal";
import { BsInfoCircle } from "react-icons/bs";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { SvgIcons } from "../../../../../Images";
import AttachmentFile from "../../../../Dashboard/AttachmentFIle";

export const ViewCandidateDetails = ({ viewCandidaterecord }) => {
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  // const pdfUrl = `${base}${viewCandidaterecord?.resumeUrl}`;

  // const ViewResume = () => {
  //   showModal();
  //   setModalTitle("View Resume");
  //   setModalContent(
  //     // <PDFViewer pdfUrl={pdfUrl} />
  //     <PDFViewerr record={viewCandidaterecord} pdfUrl={pdfUrl} />

  //   );
  // };

  const ViewCandidateResume = (item) => {
    setModalContent(<AttachmentFile fileAttachment={item} />);
    setModalTitle("Attachment File");
    showModal();
  };

  return (
    <Fragment>
      <EmpView>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={13}>
            <CustomCardView>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={24} sm={24}>
                  <p className="cardheading">Personal Informations</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">UserName</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.userName}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Email</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.emailId}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Phone Number</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.mobileNumber}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Gender</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.gender}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Date of Birth</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.dateofBirth}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Address</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.address}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Marital Status</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.maritalStatus}</p>
                </Col>
              </CustomRow>
            </CustomCardView>
          </Col>

          {/* Education Details */}

          <Col span={24} md={11}>
            <CustomCardView>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={24} sm={24}>
                  <p className="cardheading">Education Details</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Education</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.education}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Branch</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.branch}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">College</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.college}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">CGPA</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.cgpa}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Year of Passing</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.yearOfPassing}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">City</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.city}</p>
                </Col>

                <Col span={24} md={11} sm={11}>
                  <p className="para">Country</p>
                </Col>
                <Col span={24} md={13} sm={13}>
                  <p>{viewCandidaterecord?.country}</p>
                </Col>
              </CustomRow>
            </CustomCardView>
          </Col>

          <Col span={24} md={24}>
            <CustomCardView>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={24} sm={24}>
                  <p className="cardheading">Work Expectations</p>
                </Col>
                <Col span={24} md={12}>
                  <CustomRow space={[12, 12]}>
                    <Col span={24} md={11} sm={11}>
                      <p className="para">Role</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.jobRole}</p>
                    </Col>

                    <Col span={24} md={11} sm={11}>
                      <p className="para">Skill Details</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.skillDetails}</p>
                    </Col>

                    <Col span={24} md={11} sm={11}>
                      <p className="para">Salary Expectation</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.salaryExpectations}</p>
                    </Col>

                    <Col span={24} md={11} sm={11}>
                      <p className="para">Work Experience</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.workExperience}</p>
                    </Col>
                    {viewCandidaterecord?.year != 0 && (
                      <Col span={24} md={11} sm={11}>
                        <p className="para">Experience Years</p>
                      </Col>
                    )}

                    {viewCandidaterecord?.year != 0 && (
                      <Col span={24} md={13} sm={13}>
                        <p>{viewCandidaterecord?.year}</p>
                      </Col>
                    )}

                    <Col span={24} md={11} sm={11}>
                      <p className="para">Cover Letter</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.coverLetter}</p>
                    </Col>

                    <Col span={24} md={11} sm={11}>
                      <p className="para">Date:</p>
                    </Col>
                    <Col span={24} md={13} sm={13}>
                      <p>{viewCandidaterecord?.date}</p>
                    </Col>
                  </CustomRow>
                </Col>
                <Col span={24} md={12}>
                  <CustomRow space={[12, 12]}>
                    <Col span={24} md={23} sm={23}>
                      <CustomRow space={[12, 12]}>
                        <Col span={24} md={10} sm={10}>
                          <p className="para">Resume:</p>
                        </Col>
                        <Col span={24} md={12} sm={12}>
                          <TableIconHolder
                            style={{ justifyContent: "start" }}
                            color={THEME.green}
                            size={"22px"}
                            onClick={() => {
                              ViewCandidateResume(
                                viewCandidaterecord?.resumeUrl
                              );
                            }}
                          >
                            <Tooltip placement="top" title={"view"}>
                              <img src={SvgIcons.viewIcon} alt="view" />
                            </Tooltip>
                          </TableIconHolder>
                          {/* <img
                            src={`${base}${viewCandidaterecord?.resumeUrl}`}
                            alt="Resume"
                            width="100"
                            height="100"
                            style={{ borderRadius: "10%", objectFit: "cover" }}
                          /> */}
                        </Col>
                        {/* <Col span={24} md={2} sm={2}>
                          <AiOutlineEye
                            style={{ cursor: "pointer" }}
                            color={THEME.green}
                            size={"22px"}
                            onClick={ViewResume}
                          />
                        </Col> */}

                        {/* {
                        qualification.resumeurl && qualification.resumeurl.length > 0 ? (<> */}
                        {/* <img
                            // src={`${base}${qualification?.resumeurl}`}
                            src={image}
                            alt="Resume"
                            width="70"
                            height="70"
                            style={{ borderRadius: "10%" }}
                          /> */}
                        {/* </>)
                          :
                          (<>
                            No resume Uploaded Yet
                          </>)
                      } */}
                        {/* <AiOutlineEye
                        style={{ cursor: "pointer" }}
                        color={THEME.green}
                        size={"22px"}
                        // onClick={() => ViewResume(record)}
                      /> */}
                      </CustomRow>
                    </Col>
                  </CustomRow>
                </Col>
              </CustomRow>
            </CustomCardView>
          </Col>
        </CustomRow>
      </EmpView>
      <CustomModal
        width={800}
        isVisible={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
