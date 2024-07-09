import React, { Fragment, useEffect, useRef, useState } from "react";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import { Col } from "antd";
import { AiFillPrinter } from "react-icons/ai";
import styled from "styled-components";
import Button from "../../../../../../components/Form/CustomButton";
import { useReactToPrint } from "react-to-print";
import { base } from "../../../../../../utils/request";

const Receipts = styled.div`
  padding: 20px;
  border: 2px solid black;

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
  }

  @media print {
    padding: 10px !important;
    margin: 70px;
    border: 1px solid black !important;
  }
`;

const TopTitle = styled.div`
  text-align: center;

  h1 {
    font-size: 24px;
    color: #007bff;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #333;
    margin-bottom: 8px;
  }
`;

const ViewReceiptsPrint = ({ receiptrecord }) => {
  const [detailget, setDetailsGet] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setDetailsGet(receiptrecord);
  }, [receiptrecord]);

  return (
    <Fragment>
      <Flex>
        <CustomPageTitle Heading={"View Receipts"} />
        <div>
          <Button.Primary
            text={<AiFillPrinter style={{ fontSize: "30px" }} />}
            onClick={handlePrint}
          />
        </div>
      </Flex>
      <CustomRow space={[16, 16]}>
        <Col span={24}>
          <Receipts ref={componentRef}>
            <TopTitle>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                  marginBottom:"10px"
                }}
              >
                <img
                  src={`${base}${detailget?.profile}`}
                  alt=""
                  style={{ width: "50px", height: "50px", objectFit: "cover",borderRadius:"50%" }}
                />
                <h1 style={{ paddingTop: "8px" }}>{detailget?.companyName}</h1>
                <br />
              </div>
              <p>
                {detailget?.companyAddress}-{detailget?.companyZipcode},
                {detailget?.companyCountry}
              </p>
              <br />
              <p>Email: {detailget?.companyEmail}</p>,Contact No:{" "}
              {detailget?.companyPhoneNumber1}
            </TopTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Receipt No : {detailget.receiptId}</p>
              <div style={{ float: "end" }}>
                <p>Payment Date : {detailget.paymentDate}</p>
                <p style={{ lineHeight: "40px" }}>
                  Payment Type : {detailget.paymentType}
                </p>
              </div>
            </div>
            {/* <div style={{padding:"20px 0px"}}> */}


            <CustomRow space={[24, 24]} style={{ paddingTop: "20px" }}>
              <Col span={24} md={6}>
                <p>Client Name : </p>
              </Col>
              <Col span={24} md={6}>
                <p>{detailget.clientName}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Address :</p>
              </Col>
              <Col span={24} md={6}>
                <p>{detailget.address}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Old Balance:</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>
                  {/* {parseFloat(detailget.receivedAmount) +
                    parseFloat(detailget.balance)} */}
                    {detailget.amount}
                </p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Received Amount :</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>
                  {detailget.receivedAmount}
                </p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Balance :</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>
                  {detailget.balance}
                </p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={20}></Col>
              <Col span={24} md={4}>
                <div>
                  <p>Sign By</p>
                  <img
                    src={`${base}${detailget?.signature}`}
                    alt=""
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                  <p
                    style={{
                      paddingTop: "20px",
                      borderBottom: "1px dashed #000",
                    }}
                  ></p>
                </div>
              </Col>
            </CustomRow>
          </Receipts>
        </Col>
      </CustomRow>
    </Fragment>
  );
};

export default ViewReceiptsPrint;
