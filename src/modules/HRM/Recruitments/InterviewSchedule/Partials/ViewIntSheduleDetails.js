import React, { Fragment } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";

export const ViewSheduleDetails = ({viewIntScheduleRecord}) => {
  
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
                <p>{viewIntScheduleRecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Interviewer Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewIntScheduleRecord?.interviewerName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Interview Type</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewIntScheduleRecord?.interviewType}</p>
              </Col>

            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>

              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewIntScheduleRecord?.date}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Start Time</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewIntScheduleRecord?.startTime}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">End time</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewIntScheduleRecord?.endTime}</p>
              </Col>

            </CustomRow>
          </Col>

        </CustomRow>
      </CustomCardView>

      {/* <CustomModal
      width={700}
      isVisible={isModalOpen}
      handleCancel={handleCancel}
      handleOk={handleOk}
      modalTitle={modalTitle}
      modalContent={modalContent}
    /> */}

    </Fragment>
  );
};
