import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { useForm } from "antd/es/form/Form";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../../utils/request";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const PersonalInformation = ({
  FormExternalClose,
  trigger,
  formname,
  Record,
  formReset,
  id,
  personalDetail,
  GetPersonalDetail,
}) => {

  const [form] = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
const [marital,setMarital] = useState()
console.log(personalDetail,'personalDetail');
  const dispatch = useDispatch();

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);



  const maritalStatus = [
    {
      label: "Unmarried",
      value: "unmarried",
    },
    {
      label: "Married",
      value: "married",
    },
  ];

  const ReligionOptions = [
    {
      label: "Hindu",
      value: "Hindu",
    },
    {
      label: "Christian",
      value: "Christian",
    },
    {
      label: "Muslim",
      value: "Muslim",
    },
    {
      label: "Others",
      value: "Others",
    },
  ]
  const setForm = () => {
    form.setFieldsValue(personalDetail);
    if (personalDetail?.passportExpDate) {
      const formattedDate = dayjs(personalDetail?.passportExpDate);
      form.setFieldsValue({ passportExpDate: formattedDate });
    }
  };

  useEffect(() => {
    if (personalDetail) {
      setForm();
    }
  }, [personalDetail, trigger]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const FormExternalClosee = () => {
    handleOk();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleMaritalStatus =(e)=>{
    setMarital(e)
    // form.resetFields(['noOfChildren']);
  }

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values,'values');
    request
      .put(`${APIURLS.PUTPERSONALDETAIL}${personalDetail?.personalId}`, values)
      .then((response) => {
        toast.success("Employee Personal Details Update Successfully !");
        GetPersonalDetail();
        FormExternalClose();
      })
      .catch((error) => {
        console.log(error, "Getting Error");
      });
  };

  const onFinishFailed = (errorInfo) => { };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      name={formname}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <CustomRow space={[12, 12]}>

        <Col span={24} md={12}>
          <CustomInput
            label={"Passport Number"}
            name={"passportNo"}
            placeholder={"Passport No"}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Passport Exp Date"}
            name={"passportExpDate"}
            placeholder={"Passport Exp Date"}
            onChange={handleDate}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Nationality"}
            name={"nationality"}
            placeholder={"Nationality"}
            rules={[
              {
                required: true,
                message: "Please enter Nation !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={maritalStatus}
            onChange={handleMaritalStatus}
            name={"married"}
            label={"marital status"}
            placeholder={"marital status"}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber
            label={"Phone Number"}
            name={"tel"}
            placeholder={"Phone Number"}
            maxLength={10}
            minLength={10}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter Phone Number !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            label={"Religion"}
            name={"religion"}
            placeholder={"Religion"}
            options={ReligionOptions}
            rules={[
              {
                required: true,
                message: "Please enter Religion !",
              },
            ]}
          />
        </Col>

        {
          marital === "married" ?
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"No of children"}
                name={"noOfChildren"}
                placeholder={"No of children"}
              />
            </Col> : null
        }

      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0"}>
        {Record ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClose()}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>

      <CustomModal
        isVisible={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Form>
  );
};
