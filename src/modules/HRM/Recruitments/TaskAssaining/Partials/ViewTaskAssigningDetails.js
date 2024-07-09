import React, { Fragment, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { THEME } from "../../../../../theme";
import { AiOutlineEye } from "react-icons/ai";
import { base } from "../../../../../utils/request";
import PDFViewerr from "../../../EmployeeDetails/ViewEmployee/Partials/ViewPdf";
import { CustomModal } from "../../../../../components/CustomModal";
import AttachmentFile from "../../../../Dashboard/AttachmentFIle";

export const ViewTaskAssignDetails = ({viewTaskAssignRecord}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [formReset, setFormReset] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const pdfUrl = `${base}${viewTaskAssignRecord?.taskUrl}`;

  const ViewFile = (record) => {
    // console.log(record);
    // showModal();
    // setModalTitle("View Resume");
    // setModalContent(
    //   // <PDFViewer pdfUrl={pdfUrl} />
    //   <PDFViewerr record={record} pdfUrl={pdfUrl} />

    // );
    setModalContent(<AttachmentFile fileAttachment={record}/>);
    setModalTitle("Attachment File");
    showModal();
  };

  return (
    <Fragment>
    <CustomCardView>
      <CustomRow space={[12, 12]}>
        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>

            <Col span={24} md={11} sm={11}>
              <p className="para">Candidate Name</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.userName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Task Assignee</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.employeeName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Start Time</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.startTime}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">End Time</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.endTime}</p>
            </Col>

          </CustomRow>
        </Col>

        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>

            <Col span={24} md={11} sm={11}>
              <p className="para">Date</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.date}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Task priority</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.taskPriority}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Approval</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewTaskAssignRecord?.approvalType}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Task File</p>
            </Col>
            <Col span={24} md={13} sm={13}>
            <AiOutlineEye
                        style={{ cursor: "pointer" }}
                        color={THEME.green}
                        size={"22px"}
                        onClick={() => ViewFile(viewTaskAssignRecord?.taskUrl)}
                      />
            </Col>  

          </CustomRow>
        </Col>

      </CustomRow>
    </CustomCardView>

    <CustomModal
    width={700}
    isVisible={isModalOpen}
    handleCancel={handleCancel}
    handleOk={handleOk}
    modalTitle={modalTitle}
    modalContent={modalContent}
  />

  </Fragment>
  )
}