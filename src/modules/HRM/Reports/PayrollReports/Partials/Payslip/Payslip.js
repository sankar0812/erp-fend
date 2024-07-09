import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import logo from "../../../../../../Images/logo-white.png";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col} from "antd";
import { useParams } from "react-router-dom";
import Button from "../../../../../../components/Form/CustomButton";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import Flex from "../../../../../../components/Flex";
import { CustomLableBack } from "../../../../../../components/CustomLableBack";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import request from "../../../../../../utils/request";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";

const StyledPayslip = styled.div``;

const Header = styled.div`
  background: #e0f1ff;
  text-align: center;
  padding: 15px 0px;
  line-height: 40px;

  img {
    padding: 15px 0px;
  }

  p {
    font-size: large;
    color: #000;
    padding: 10px 0px;
  }
`;

const PayslipBody = styled.div`
  padding: 20px 50px;
  .value {
    border-bottom: 1px solid #000;
    padding: 0px 0px 2px 0px;
    font-size: 16px;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-top: 50px;
    border: 1px solid #000;
  }

  th {
    color: #000;
    border: 1px solid #000;
    background-color: #DEF1FF;
  }

  td,
  th {
    text-align: left;
  }

  table th,
  table td {
    padding: 15px;
    border: 1px solid #000;
  }
`;

export const Payslip = () => {
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    GetEmployeePayslip();
  }, []);

  const GetEmployeePayslip = () => {
    const department = "CurrentMonth";
    request
      .get(`${APIURLS.GETPAYROLLREPORTS}/${id}/`, { params: { department } })
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Fragment>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Employeee Payslip"} />
      <div>
        <Button.Primary
          text={<AiFillPrinter style={{ fontSize: "30px" }} />}
          onClick={handlePrint}
        />
      </div>
      </Flex>
      <StyledPayslip ref={componentRef}>
        {/* <PDFDownloadLink fileName="Payslip" document={<PayslipPdf />}>
          <Button.Danger
            text={<AiFillFilePdf style={{ fontSize: "30px" }} />}
          />
        </PDFDownloadLink> */}

        <Header>
          <img src={logo} alt="" />
          <p>Pay Slip</p>
        </Header>
        <PayslipBody>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "16px" }}>Date :</p>
            <div className="value">{dataSource[0]?.todayDate}</div>
          </div>
          <CustomRow space={[24, 24]}>
            {/* first Row */}

            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>Employee :</p>
            </Col>
            <Col span={24} md={6}>
              <div className="value">{dataSource[0]?.employeeName}</div>
            </Col>
            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>Pay Period :</p>
            </Col>
            <Col span={24} md={6}>
              <div className="value">{dataSource[0]?.paymentDate}</div>
            </Col>

            {/* Second Row */}

            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>ID Number :</p>
            </Col>
            <Col span={24} md={6}>
              <div className="value">{dataSource[0]?.userId}</div>
            </Col>
            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>Email :</p>
            </Col>
            <Col span={24} md={6}>
              <div className="value">{dataSource[0]?.email}</div>
            </Col>

            {/* Third Row */}

            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>Bank Name :</p>
            </Col>
            <Col span={24} md={18}>
              <div className="value">{dataSource[0]?.bankName}</div>
            </Col>

            {/* Fourth Row */}

            <Col span={24} md={6}>
              <p style={{ fontSize: "16px" }}>Account Number :</p>
            </Col>
            <Col span={24} md={18}>
              <div className="value">{dataSource[0]?.accountNumber}</div>
            </Col>
          </CustomRow>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Earning</th>
                  <th>Amount</th>
                  <th>Gross Pay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td>{dataSource[0]?.salaryAmount}</td>
                  <td>{dataSource[0]?.salaryAmount}</td>
                </tr>

                <tr>
                  <td>Deductions</td>
                  <td>{dataSource[0]?.deductions}</td>
                  <td>{dataSource[0]?.deductions}</td>
                </tr>

                <tr>
                  <td>Allowance</td>
                  <td>{dataSource[0]?.allowance}</td>
                  <td>{dataSource[0]?.allowance}</td>
                </tr>

                <tr>
                  <td>Net Pay</td>
                  <td>{dataSource[0]?.netPay}</td>
                  <td>{dataSource[0]?.netPay}</td>
                </tr>

                <tr style={{background:"#DEF1FF"}}>
                  <td></td>
                  <td>Total Pay</td>
                  <td>₹ {dataSource[0]?.netPay}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </PayslipBody>
      </StyledPayslip>
    </Fragment>
  );
};


