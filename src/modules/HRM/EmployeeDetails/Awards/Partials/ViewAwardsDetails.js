import React, { Fragment } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import { base } from '../../../../../utils/request'

export const ViewAwardsDetails = ({viewAwardDetail}) => {
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
              <p>{viewAwardDetail?.userName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Date</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAwardDetail?.date}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Description</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAwardDetail?.description}</p>
            </Col>

          </CustomRow>
        </Col>

        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>
            <Col span={24} md={11} sm={11}>
              <p className="para">Award Type</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p>{viewAwardDetail?.awardsType}</p>
            </Col>
            <Col span={24} md={11} sm={11}>
              <p className="para">Photos</p>
            </Col>
            <Col span={24} md={13} sm={13}>
            {viewAwardDetail?.awardsPhotos.map((item) => (
  <img key={item?.awardsPhotoId} src={`${base}${item?.url}`} width={60} height={60} style={{padding:"2px",objectFit:"cover",borderRadius:"10px"}} alt="" />
))}

            </Col>

          </CustomRow>
        </Col>
      </CustomRow>
    </CustomCardView>
  </Fragment>
  )
}
