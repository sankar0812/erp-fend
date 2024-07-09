import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { useForm } from "antd/es/form/Form";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../../utils/request";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const FamilyInformation = ({
  FormExternalClose,
  trigger,
  formname,
  Record,
  formReset,
  id,
  famDetails,
  GetFamilyInformation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();

  //=========Modal title and content ============//
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [form] = useForm();

  const EmployeeeName = [
    {
      label: "rol",
      value: "ex",
    },
  ];

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

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    request
      .put(`${APIURLS.PUTFAMILYDETAILS}${famDetails?.familyInformationsId}/`, values)
      .then((response) => {
        toast.success("Emergency contact Details Update Successfully !");
        GetFamilyInformation();
        FormExternalClose();
      })
      .catch((error) => {
        console.log(error, "Getting Error");
      });
  };

  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    form.setFieldsValue(famDetails);
    if (famDetails?.dob) {
      const formattedDate = dayjs(famDetails?.dob);
      form.setFieldsValue({ dob: formattedDate });
    }
  }, [famDetails,trigger]);

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
            label={"Name"}
            name={"name"}
            placeholder={"Name"}
            rules={[
              {
                required: true,
                message: "Please enter Name !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Relationship"}
            name={"relationShip"}
            placeholder={"Relationship"}
            rules={[
              {
                required: true,
                message: "Please enter Relationship !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date of Birth"}
            name={"dob"}
            placeholder={"Date of Birth"}
            onChange={handleDate}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber
            label={"Phone Number"}
            name={"phone"}
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
