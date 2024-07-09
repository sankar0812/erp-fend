import React, { Fragment } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'

export const ViewAppointment = ({viewAppointmentrecord}) => {
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
              <p>{viewAppointmentrecord?.userName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Position</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAppointmentrecord?.position}</p>
            </Col>

          </CustomRow>
        </Col>

        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>
            <Col span={24} md={11} sm={11}>
              <p className="para">Date</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAppointmentrecord?.date}</p>
            </Col>
            <Col span={24} md={11} sm={11}>
              <p className="para">Status</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAppointmentrecord?.approvalType}</p>
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
  )
}
