import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomCardView } from "../../../../../../components/CustomCardView";
import { CustomPageFormSubTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import Button from "../../../../../../components/Form/CustomButton";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../../utils/request";
import { getReceipts, viewreceipts } from "../../../../../Client/ClientSlice";
import MaintainInvoicePayTable from "./MaintainInvoicePayTable";

const MaintainInvoicePayForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [clientData, setClientData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDatas, setInvoiceDatas] = useState([]);
  const [initialData, setInitialData] = useState(1);

  const Allreceipts = useSelector(viewreceipts);

  useEffect(() => {
    dispatch(getReceipts());
  }, []);

  const InvoiceNoOptions = invoiceDatas?.map((item) => ({
    label: item.clientName,
    value: item.clientId,
  }));

  const handleChange = (key) => {
    const ChangeDetails = invoiceDatas?.find((item) => item.clientId === key);
    setInitialData(ChangeDetails?.clientName);
    setClientData(ChangeDetails);
    // form.setFieldsValue({clientId:null})
  };
 

  const AddSearch = (values, key) => {
    const receipt = 'receiptDetails'

    request
      .get(`${APIURLS.GETMAINTAINCLIENTPAY}/${values?.clientId}`)
      .then(function (response) {
        setInvoiceData(response.data[0]?.maintenancePayment);
        toast.success("Search Details..");
      })

      .catch(function (error) {
        toast.error("Failed");
      });
  };

  // useEffect(()=>{
  //   form.setFieldsValue({clientName:invoiceData?.clientName})
  // },[invoiceData])

  useEffect(() => {
    GetMaintainPay();
  }, []);

  const GetMaintainPay = (values, key) => {
    const maintenancePayment = "client";
    request
      .get(`${APIURLS.GETMAINTAINCLIENTPAY}`, {
        params: { maintenancePayment },
      })
      .then(function (response) {
        form.resetFields();
        setInvoiceData(response.data[0]?.maintenancePayment);
        setInvoiceDatas(response.data);
        setInitialData(response.data[0]?.clientId); ///  initial value
        setClientData(response.data[0]); // client form set
        console.log(response,'hhhhhh');
      })
      .catch(function (error) {
      });
  };
  const handleTableGet = () => {
    GetMaintainPay();
  };

  const onFinish = (values) => {
    AddSearch(values);
  };
  const onFinishFailed = (values) => {};
  const onReset = () => {
    form.resetFields();
    setClientData({});
  };
  return (
    <Fragment>
      <CustomCardView>
        <Form
          name="MaintainSearchpay"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          // initialValues={
          //     {
          //         clientId: initialData
          //      }
          // }
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomPageFormSubTitle Heading={"Search Invoice here"} />
          <CustomRow
            space={[24, 24]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col span={24} md={10}>
              <CustomSelect
                showSearch={true}
                options={InvoiceNoOptions}
                placeholder={"select"}
                onChange={handleChange}
                name={"clientId"}
                rules={[
                  {
                    required: true,
                    message: "This is a required field",
                  },
                ]}
              />
            </Col>
          </CustomRow>
          <Flex center={"true"} gap={"20px"} w_100={"true"} style={{ padding: "20px" }}>
            <Button.Primary htmlType={"submit"} text={"Search"} />
            <Button.Danger text={"Reset"} onClick={onReset} />
          </Flex>
        </Form>
        <div style={{ padding: "10px" }}>
          <CustomRow gutter={[24, 24]}>
            <Col span={24} md={12}>
              <CustomRow gutter={[24, 24]}>
                <Col span={24} sm={12} md={10}>
                  <h4>Client Name</h4>
                </Col>
                <Col span={24} sm={12}>
                  <h3>:&nbsp;{clientData?.clientName}</h3>
                </Col>
              </CustomRow>
              <br />
            </Col>
            <Col span={24} md={12}>
              <CustomRow gutter={[24, 24]}>
                <Col span={24} sm={12} md={10}>
                  <h4>Contact No</h4>
                </Col>
                <Col span={24} sm={12}>
                  <h3>:&nbsp;{clientData?.mobileNumber}</h3>
                </Col>
                <br />
              </CustomRow>
            </Col>
            <Col span={24} md={12}>
              <CustomRow gutter={[24, 24]}>
                <Col span={24} sm={12} md={10}>
                  <h4>Address</h4>
                </Col>
                <Col span={24} sm={12}>
                  <h3>:&nbsp;{clientData?.address}</h3>
                </Col>
                <br />
              </CustomRow>
            </Col>
          </CustomRow>
        </div>
      </CustomCardView>

      <MaintainInvoicePayTable
        record={invoiceData}
        handleTableGet={handleTableGet}
        initialData={initialData}
      />
    </Fragment>
  );
};

export default MaintainInvoicePayForm;
