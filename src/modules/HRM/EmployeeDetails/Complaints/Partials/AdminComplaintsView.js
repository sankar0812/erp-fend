import React, { Fragment } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import { base } from '../../../../../utils/request';

export const AdminComplaintsView = ({viewComplaints}) => {
  return (
    <Fragment>
    {/* <CustomCardView> */}
      <CustomRow space={[12, 12]}>
        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>
          <Col span={24} md={11} sm={11}>
              <p className="para" style={{paddingTop:"15px"}}>Candidate Image :</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p><img
          src={`${base}${viewComplaints?.profile}`}
          alt="Staff"
          width="50"
          height="50"
          style={{ borderRadius: "50%", objectFit:"cover" }}
        /></p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para">Candidate Name</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p style={{paddingTop:"15px",color : '#0d6efd'}}>: {viewComplaints?.userName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para" style={{paddingTop:"15px"}}>Complaint's Title</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p style={{paddingTop:"15px",color : '#0d6efd'}}>: {viewComplaints?.complaintsTitle}</p>
            </Col>

          </CustomRow>
        </Col>

        <Col span={12} md={12}>
          <CustomRow space={[12, 12]}>
            <Col span={24} md={11} sm={11}>
              <p className="para" style={{paddingTop:"15px"}}>Date</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p style={{paddingTop:"15px",color : '#0d6efd'}}>: {viewComplaints?.complaintsDate}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para" style={{paddingTop:"18px"}}>Complaints Against</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p style={{paddingTop:"18px",color : '#0d6efd'}}>: {viewComplaints?.complaintsAgainstName}</p>
            </Col>

            <Col span={24} md={11} sm={11}>
              <p className="para" style={{paddingTop:"17px"}}>Description</p>
            </Col>
            <Col span={24} md={13} sm={13}>
              <p style={{paddingTop:"17px",color : '#0d6efd'}}> {viewComplaints?.description}</p>
            </Col>

          </CustomRow>
        </Col>
      </CustomRow>
    {/* </CustomCardView> */}
  </Fragment>
  )
}
