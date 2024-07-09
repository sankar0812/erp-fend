import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../components/CustomModal";
import { AddServerType } from "./AddServerType";
import { getServerType, selectAllServerType } from "../../AccountsSlice";
import { useSelector } from "react-redux";

export const AddTableServer = ({
  UpdateTypeRecord,
  SetDynamicTable,
  SetDynamicEditTable,
  handleClose,
}) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formReset, setFormReset] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [selectedVar, setSelectedVar] = useState([]);
  const [ischeck, setIscheck] = useState(false);

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedServerType, setSelectedServerType] = useState([]);

  useEffect(() => {
    form.setFieldsValue({ serverTypeId: selectedServerType });
  }, [selectedServerType]);

  useEffect(() => {
    form.setFieldsValue(UpdateTypeRecord)
  }, [UpdateTypeRecord])

  useEffect(() => {
    dispatch(getServerType());
  }, []);

  const AllServerType = useSelector(selectAllServerType);

  const FormExternalClose = () => {
    handleOk();
  };

  const ServerTypeModal = () => {
    setModalTitle("Add Server Type Here");
      setModalContent(
        <AddServerType FormExternalCloses={FormExternalClose} formname={"AddServerType"} />
      );

    showModal();
  };

  const ServerTypeOptions = AllServerType?.map((item) => ({
    label: item.serverTypeName,
    value: item.serverTypeName,
  }));

  const handleOnChange = (value) => {
      const AllServerTypes = AllServerType.find(item => item.serverTypeName === value);
      setSelectedServerType(AllServerTypes?.serverTypeId);
  };

  const onFinish = (values) => {
    let result = {
      serverTypeId: values?.serverTypeId,
      serverTypeName: values?.serverTypeName,
      amount: values?.amount,
      key: values.key,
    };

    if (UpdateTypeRecord) {
      SetDynamicEditTable(result);
      handleClose();
      setIscheck(false);
    } else {
      SetDynamicTable(result);
      form.resetFields();
      setIscheck(false);
    }
    setSelectedVar([]);
  };
  const onFinishFailed = (errorInfo) => {};

  const onReset = () => {
    if (UpdateTypeRecord) {
      handleOk();
    } else {
      form.resetFields();
    }
  };

  return (
    <Fragment>
      <Card>
        <Form
          form={form}
          name={"serverAdd"}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomRow space={[24, 24]}>
            <Col span={24} md={12}>
              <CustomDropSelect
                options={ServerTypeOptions || []}
                onButtonClick={ServerTypeModal}
                showSearch={true}
                buttonLabel="Add Server Type"
                label={"Server Type"}
                name={"serverTypeName"}
                placeholder={"Select Server Type"}
                onChange={handleOnChange}
                rules={[
                  {
                    required: true,
                    message: "Please Select Server Type!",
                  },
                ]}
              />
              <CustomInput name={"serverTypeId"} display={"none"} />
              <CustomInput name={"key"} display={"none"} />
            </Col>

            <Col span={24} md={12}>
              <CustomInput
                label={"Amount"}
                name={"amount"}
                placeholder={"Amount"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Amount !",
                  },
                ]}
              />
            </Col>
          </CustomRow>
          <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
            <Button.Success
              text={UpdateTypeRecord ? "Update" : "Add"}
              onClick={() => {
                form.submit();
              }}
            />
            <Button.Danger text={"Cancel"} onClick={() => onReset()} />
          </Flex>

          <CustomModal
            isVisible={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </Form>
      </Card>
    </Fragment>
  );
};
