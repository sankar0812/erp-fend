import React, { Fragment } from 'react'
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import { CustomCardView } from '../../../../../components/CustomCardView';

export const ViewOfferDetails = ({viewOfferrecord}) => {
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
                <p>{viewOfferrecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Salary Package</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewOfferrecord?.salaryPackage}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Expiry Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewOfferrecord?.expiryDate}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewOfferrecord?.date}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Joining Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{viewOfferrecord?.joiningDate}</p>
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
}
