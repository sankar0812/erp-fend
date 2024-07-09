import React, { Fragment, useEffect, useRef, useState } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import Flex from "../../../../../components/Flex";
import { Card, Col } from "antd";
import {
  Details,
  EmpDetails,
  EmpView,
} from "../../../../HRM/EmployeeDetails/Style";
import { GrEdit } from "react-icons/gr";
import { AiFillPrinter, AiOutlineEye } from "react-icons/ai";
import { CustomModal } from "../../../../../components/CustomModal";
import { useParams } from "react-router-dom";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { THEME } from "../../../../../theme";
import { PersonalInformation } from "../../../../HRM/EmployeeDetails/PersonalInformation/Partials/PersonalInformation";
import { AddBankDetails } from "../../../../HRM/EmployeeDetails/BankDetails/Partials/AddBankDetails";
import { FamilyInformation } from "../../../../HRM/EmployeeDetails/FamilyInformation/Partials/FamilyInformation";
import { AddEmployeeForm } from "../../../../HRM/EmployeeDetails/ViewEmployee/Partials/AddEmployeeForm";
import { viewEmpDetails } from "../../../../HRM/EmployeeDetails/EmployeeSlice";
import { EmergencyContactsForm } from "../../../../HRM/EmployeeDetails/EmergencyContacts/Partials/EmergencyContactForm";
import { EmployeeQualificationForm } from "../../../../HRM/EmployeeDetails/Qualifications/Partials/QualificationForm";
import PDFViewerr from "../../../../HRM/EmployeeDetails/ViewEmployee/Partials/ViewPdf";
import { getReceipts, viewreceipts } from "../../../ClientSlice";
import styled from "styled-components";
import Button from "../../../../../components/Form/CustomButton";
import { useReactToPrint } from "react-to-print";

const Receipts = styled.div`
  padding: 10px;
  p {
    font-size: 18px;
  }
`;

const ViewClientReceiptsCard = ({ record }) => {

  const viewEmployeeDetails = useSelector(viewEmpDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailget, setDetailsGet] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);

  const dispatch = useDispatch();
  const componentRef = useRef();

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const { id } = useParams();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };



  const Allreceipts = useSelector(viewreceipts);
  const ClientFindId = Allreceipts.find((item) => item.client_id === id);
 console.log(Allreceipts,'Allreceipts');
  useEffect(() => {
    setDetailsGet(ClientFindId);
  }, [ClientFindId]);

  useEffect(() => {
    dispatch(getReceipts());
  }, []);


  return (
    <Fragment>
      {/* <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Receipts"} />
      </Flex> */}
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Receipts"} />
        <div>
          <Button.Primary
            text={<AiFillPrinter style={{ fontSize: "30px" }} />}
            onClick={handlePrint}
          />
        </div>
      </Flex>

      {/* <CustomRow space={[12, 12]}>
        {ClientFindId?.clientDetails?.map((item,index) => {
          return (
            <>
              <Col span={24} key={item.receipt_id}>
                <CustomCardView>
                  <Receipts ref={componentRef}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>Receipt No : {item.receipt_id}</p>
                      <div style={{ float: "end" }}>
                        <p>Payment Date : {item.payment_date}</p>
                        <p style={{ lineHeight: "40px" }}>Payment Type : {item.payment_type}</p>
                      </div>
                    </div>
                    
                    <CustomRow space={[24, 24]} style={{ paddingTop: "20px" }}>
                      <Col span={24} md={6}>
                        <p>Client Name : </p>
                      </Col>
                      <Col span={24} md={6}>
                        <p>{item.client_name}</p>
                      </Col>
                      <Col span={24} md={12}></Col>

                      <Col span={24} md={6}>
                        <p>Address :</p>
                      </Col>
                      <Col span={24} md={6}>
                        <p>{item.address}</p>
                      </Col>
                      <Col span={24} md={12}></Col>

                      <Col span={24} md={6}>
                        <p>Old Balance :</p>
                      </Col>
                      <Col span={24} md={6}>
                        <p style={{ borderBottom: "1px dashed #000" }}>{item.invoiceBalance}</p>
                      </Col>
                      <Col span={24} md={12}></Col>

                      <Col span={24} md={6}>
                        <p>Received Amount :</p>
                      </Col>
                      <Col span={24} md={6}>
                        <p style={{ borderBottom: "1px dashed #000" }}>{item.received_amount}</p>
                      </Col>
                      <Col span={24} md={12}></Col>

                      <Col span={24} md={6}>
                        <p>Balance :</p>
                      </Col>
                      <Col span={24} md={6}>
                        <p style={{ borderBottom: "1px dashed #000" }}>{item.balance}</p>
                      </Col>
                      <Col span={24} md={12}></Col>

                      <Col span={24} md={20}></Col>
                      <Col span={24} md={4}>
                        <div>
                          <p>Sign By</p>
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
                </CustomCardView>
              </Col>
            </>
          );
        })}
      </CustomRow> */}

<CustomRow space={[12, 12]}>
  {ClientFindId?.clientDetails?.map((item, index) => {
    return (
      <Col span={24} key={item.receipt_id}>
        <CustomCardView>
          <Receipts ref={componentRef}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Receipt No : {item.receipt_id}</p>
              <div style={{ float: "end" }}>
                <p>Payment Date : {item.payment_date}</p>
                <p style={{ lineHeight: "40px" }}>Payment Type : {item.payment_type}</p>
              </div>
            </div>
            <CustomRow space={[24, 24]} style={{ paddingTop: "20px" }}>
              <Col span={24} md={6}>
                <p>Client Name : </p>
              </Col>
              <Col span={24} md={6}>
                <p>{item.client_name}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Address :</p>
              </Col>
              <Col span={24} md={6}>
                <p>{item.address}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Old Balance :</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>{item.invoiceBalance}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Received Amount :</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>{item.received_amount}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={6}>
                <p>Balance :</p>
              </Col>
              <Col span={24} md={6}>
                <p style={{ borderBottom: "1px dashed #000" }}>{item.balance}</p>
              </Col>
              <Col span={24} md={12}></Col>

              <Col span={24} md={20}></Col>
              <Col span={24} md={4}>
                <div>
                  <p>Sign By</p>
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
        </CustomCardView>
      </Col>
    );
  })}
</CustomRow>


      {/* Employee Information */}


    </Fragment>
  );
};

export default ViewClientReceiptsCard;
