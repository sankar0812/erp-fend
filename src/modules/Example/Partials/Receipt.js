import React from "react";
import { CustomCardView } from "../../../components/CustomCardView";
import styled from "styled-components";
import { CustomRow } from "../../../components/CustomRow";
import { Col } from "antd";

const Receipts = styled.div`
  padding: 20px;
  p {
    font-size: 18px;
  }
`;

export const Receipt = () => {
  return (
    <CustomCardView>
      <Receipts>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Receipt No : 1</p>
          <div style={{ float: "end" }}>
            <p>Payment Date : 22-10-2023</p>
            <p style={{ lineHeight: "40px" }}>Payment Cash : ₹ 1000</p>
          </div>
        </div>
        {/* <div style={{padding:"20px 0px"}}> */}
        <CustomRow space={[24, 24]} style={{ paddingTop: "20px" }}>
          <Col span={24} md={6}>
            <p>Client Name :</p>
          </Col>
          <Col span={24} md={6}>
            <p>Shiva Kannan</p>
          </Col>
          <Col span={24} md={12}></Col>

          <Col span={24} md={6}>
            <p>Address :</p>
          </Col>
          <Col span={24} md={6}>
            <p>dfhdfhdfhdfhhdfgsgs</p>
          </Col>
          <Col span={24} md={12}></Col>

          <Col span={24} md={6}>
            <p>Old Balance :</p>
          </Col>
          <Col span={24} md={6}>
            <p style={{ borderBottom: "1px dashed #000" }}>₹ 10000</p>
          </Col>
          <Col span={24} md={12}></Col>

          <Col span={24} md={6}>
            <p>Received Amount :</p>
          </Col>
          <Col span={24} md={6}>
            <p style={{ borderBottom: "1px dashed #000" }}>₹ 10000</p>
          </Col>
          <Col span={24} md={12}></Col>

          <Col span={24} md={6}>
            <p>Balance :</p>
          </Col>
          <Col span={24} md={6}>
            <p style={{ borderBottom: "1px dashed #000" }}>₹ 10000</p>
          </Col>
          <Col span={24} md={12}></Col>

          <Col span={24} md={20}></Col>
          <Col span={24} md={4}>
            <div>
              <p>Sign By</p>
              <p style={{ paddingTop: "20px",borderBottom: "1px dashed #000" }}></p>
            </div>
          </Col>
        </CustomRow>

        {/* </div> */}
      </Receipts>
    </CustomCardView>
  );
};
