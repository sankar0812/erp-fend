import { Card, Col, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../../../components/CustomModal";
import { CustomRow } from "../../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../../../components/Form/CustomInput";
import { CustomInputNumber } from "../../../../../../components/Form/CustomInputNumber";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { APIURLS } from "../../../../../../utils/ApiUrls/Client";
import request from "../../../../../../utils/request";
import { getInvoice, getinvoiceView } from "../../../Invoice/invoiceSlice";

export const HeaderForm = ({
  setSelectedDate,
  setClientData,
  setProjectData,
  form,
  mainRecord,
  setProjUnderInv,
  setProTableData,
  data,
  setTirggers,
  tirggers,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [width, setWidth] = useState(0);
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

  //===============  Client project Name  (client Requirements)=====//

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
  }, [tirggers]);

  //=====================Invoice Get Details===================================

  const Allinvoiceview = useSelector(getinvoiceView);

  const [openInvoice, setOpenInvoice] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    dispatch(getInvoice());
  }, []);

  const uniqueClientIds = new Set(); // Set to keep track of unique client IDs

  const SelectClientOptions = Allinvoiceview?.reduce((options, item) => {
    if (!uniqueClientIds.has(item.clientId)) {
      uniqueClientIds.add(item.clientId);

      // Add the option to the array only if the invoice is open for the desired clientId
      if (!openInvoice || (openInvoice && item.clientId === openInvoice)) {
        options.push({
          label: item.clientName,
          value: item.clientId,
        });
      }
    }

    return options;
  }, []);

  // Filter invoice options based on the selected client
  const SelectInvoiceOptions = Allinvoiceview?.filter((item) => item.clientId === selectedClientId).map((item) => ({
    label: `Invoice ${item.invoiceId}`,
    value: item.invoiceId,
  }));

  useEffect(() => {
    if (mainRecord?.clientId) {
      setSelectedClientId(mainRecord?.clientId);
    }
  }, [mainRecord]);

  const handleClientChange = (selectedValue) => {
    setSelectedClientId(selectedValue); //<<<<<<<<<<<<<<<<<< Find invoice Id find
    if (selectedValue) {
      form.setFieldsValue({ invoiceNo: null,mobileNumber:null});

    }
    const Allinvoice = Allinvoiceview?.find( (item) => item.clientId === selectedValue); //<<<<<<  Clientdeatils(Mobile Number set...)
    setClientData(Allinvoice);

    const FindProjectId = dataSource?.find( (item) => item.clientId === selectedValue); //<<<<<<<<  Find Project Name get (BAES ON clientid)
    setProjectData(FindProjectId?.projectDetails);

    // setTirggers( (prevTriggers) => prevTriggers + 1);
  };
console.log(Allinvoiceview,'Allinvoiceview');
  const handleInvoiceUnderProject =(inv)=>{
    console.log(inv,'invinv');
    const Allinvoice = Allinvoiceview?.find( (item) => item.invoiceId === inv); //<<<<<<  Clientdeatils(Mobile Number set...)
    setProjUnderInv(Allinvoice);
    console.log(Allinvoice,'AllinvoiceAllinvoice');

  }
  //===================Date onChange fn======================//

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  //==================

  return (
    <Fragment>
      <Card>
        {/* <CustomPageTitle Heading={'Invoice'} /> */}
        <CustomRow space={[24, 24]}>
          <Col span={24} md={12}>
            <CustomRow space={[24, 24]}>
              <Col span={24} md={12}>
                <CustomSelect
                  label={"Client Name"}
                  name={"clientId"}
                  options={SelectClientOptions}
                  onChange={handleClientChange}
                  placeholder={"Client Name"}
                  rules={[
                    {
                      required: true,
                      message: "Please Fill Details!",
                    },
                  ]}
                />

                <CustomInputNumber
                  label={"Mobile Number"}
                  name={"mobileNumber"}
                />
              </Col>
              <Col span={24} md={12}>
                {selectedClientId && (
                  <CustomSelect
                    label={"Invoice No"}
                    placeholder={"Please Choose Invoice No"}
                    name={"invoiceNo"}
                    options={SelectInvoiceOptions}
                    disabled={mainRecord}
                    onChange={handleInvoiceUnderProject}
                    rules={[
                      {
                        required: true,
                        message: "Please Fill Details!",
                      },
                    ]}
                  />
                )}
              </Col>
            </CustomRow>
          </Col>
          <Col span={24} md={4}></Col>
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
