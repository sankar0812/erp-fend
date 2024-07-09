import React, { Fragment } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'

export const ViewAssetDetail = ({AssetsViewRecord}) => {
  return (
    <Fragment>
      <CustomCardView>
        <CustomRow space={[12, 12]}>
          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{HrInterviewrecord?.userName}</p> */}dfsgsdgf
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Assets Values</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{HrInterviewrecord?.employeeName}</p> */}dfsgsdgf
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">imageUrl</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{HrInterviewrecord?.feedback}</p> */}dfsgsdgf
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">brandName</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{HrInterviewrecord?.date}</p> */}dfsgsdgf
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">accessoriesName</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{HrInterviewrecord?.time}</p> */}dfsgsdgf
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
