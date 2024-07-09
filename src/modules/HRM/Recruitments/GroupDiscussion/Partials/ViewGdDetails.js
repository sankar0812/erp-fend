import React, { Fragment } from "react";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { Col } from "antd";
import { CustomRow } from "../../../../../components/CustomRow";

export const ViewGdDetails = ({ viewGdrecord }) => {
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
                <p>{viewGdrecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Topic</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewGdrecord?.topic}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Feedback</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewGdrecord?.feedback}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewGdrecord?.date}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Time</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewGdrecord?.time}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Approval</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewGdrecord?.approvalType}</p>
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
