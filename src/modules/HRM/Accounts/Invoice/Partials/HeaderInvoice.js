import { Card, Col } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { APIURLS } from "../../../../../utils/ApiUrls/Client";
import request from "../../../../../utils/request";
import {
  getClientProfile,
  viewclientprofile,
} from "../../../../Client/ClientSlice";

export const HeaderInvoice = ({
  setSelectedDate,
  setClientData,
  setProjectData,
  invoiceRecord,
}) => {
  console.log(setProjectData, "setProjectDataaaa");

  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  // const [choose, setChoose] = useState('');
  const [width, setWidth] = useState(0);

  //=========Find Select party Fields ============//
  const [findParty, setFindParty] = useState(false);
  //=======
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const project = "client";
    request
      .get(`${APIURLS.GETCLIENTPROJECT}`, { params: { project } })
      .then(function (response) {
        setDataSource(response.data);
      })

      .catch(function (error) {
        console.log(error, "hhhh");
      });
  }, []);

  //=====================Client name ===================================

  const ClientDetails = useSelector(viewclientprofile);

  useEffect(() => {
    dispatch(getClientProfile());
  }, []);
  console.log(ClientDetails, "ClientDetails");
  console.log(dataSource, "prooooooo");
  const SelectClientOptions = ClientDetails?.map((item) => ({
    label: item?.clientName,
    value: item?.clientId,
  }));

  const handleclient = (value) => {
    console.log(value, "value");
    const ClientNameSelect = ClientDetails?.find(
      (mem) => mem.clientId === value
    );
    setClientData(ClientNameSelect); // Find Client deatils mobile Number
    setFindParty(value);

    const FindProjectId = dataSource?.find((item) => item.clientId == value); //  Find project Name get
    console.log(dataSource, "ffffffffff");
    console.log(FindProjectId?.projectDetails, "FindProjectId");
    setProjectData(FindProjectId?.projectDetails);
  };

  //===================Date onChange fn======================//

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  //==================
  return (
    <Fragment>
      <Card>
        <CustomPageTitle Heading={"Invoice"} />
        <CustomRow space={[24, 24]}>
          <Col span={24} md={8}>
            <CustomRow space={[24, 24]}>
              <Col span={24} md={24}>
                <CustomSelect
                  label={"Client Name"}
                  name={"clientId"}
                  options={SelectClientOptions}
                  onChange={handleclient}
                  disabled={invoiceRecord}
                  placeholder={"Client Name"}
                  rules={[
                    {
                      required: true,
                      message: "Please Fill Details!",
                    },
                  ]}
                />
                <CustomInput name={"clientName"} display={"none"} />
              </Col>
              <Col span={24} md={24}>
                <CustomInputNumber
                  label={"Mobile Number"}
                  name={"mobileNumber"}
                  disabled={invoiceRecord}
                />
              </Col>
            </CustomRow>
          </Col>
          <Col span={24} md={8}></Col>
          <Col span={24} md={8}>
            <CustomRow space={[24, 24]}>
              <CustomInput
                label={"Company Name"}
                display={"none"}
                name={"companyId"}
              />
              <Col span={24} md={24}>
                <CustomDatePicker
                  label={"Date"}
                  onChange={handleOnChange}
                  name={"invoiceDate"}
                  rules={[
                    {
                      required: true,
                      message: "Please Choose  Date!",
                    },
                  ]}
                />
              </Col>
            </CustomRow>
          </Col>
        </CustomRow>
      </Card>
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={width}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
