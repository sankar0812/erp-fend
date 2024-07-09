import { Col, Form } from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import Button from "../../../../../../components/Form/CustomButton";
import { CustomDatePicker } from "../../../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../../../components/Form/CustomInput";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../../../../utils/request";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { getServerType, selectAllServerType } from "../../../AccountsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CustomUpload } from "../../../../../../components/Form/CustomUpload";
import axios from "axios";

const AddServerMainForm = ({
  ServerMainRecord,
  FormExternalClosess,
  handleSet,
  Trigger
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});

  useEffect(() => {
    if (ServerMainRecord?.serverBilling?.length > 0) {
      setImageInitialValue(
        [{
          uid: '1',
          name: 'example.jpg',
          status: 'done',
          url: `${base}${ServerMainRecord?.serverBilling}`,
        }],
      )
    }
    else {
      setImageInitialValue([]);
    }

  }, [ServerMainRecord])

  useEffect(() => {
    if (ServerMainRecord) {
      const formattedDate = dayjs(ServerMainRecord.date);
      form.setFieldsValue(ServerMainRecord);
      form.setFieldsValue({ date: formattedDate });
      form.setFieldsValue({ serverBilling: ImageInitialValue })
    }
  }, [ServerMainRecord, updateFormData, Trigger, form]);

  const paymentTypeoptions = [
    {
      label: "Cash",
      value: "Cash",
    },
    {
      label: "Cheque",
      value: "Cheque",
    },
    {
      label: "Online Transaction",
      value: "OnlineTransaction",
    },
  ];

  const AllServerType = useSelector(selectAllServerType);

  useEffect(() => {
    dispatch(getServerType());
  }, []);

  const ServerTypeOptions = AllServerType?.map((item) => ({
    label: item.serverTypeName,
    value: item.serverTypeId,
  }));
  const AddServerMaintain = (values) => {
    request
      .post(`${APIURLS.POSTSERVERMAINTAIN}`, values)
      .then(function (response) {
        toast.success("Added Successfully");
        form.resetFields();
      })
      .catch(function (error) {
        toast.error("Added Failed");
      });
  };
  const UpdateServerMaintain = (values, id) => {
    request
      .put(
        `${APIURLS.PUTSERVERMAINTAIN}/${ServerMainRecord?.serverMaintenanceId}`,
        values
      )
      .then(function (response) {
        if(handleSet){
          handleSet()
        }
        toast.info("Updated Successfully");
      })
      .catch(function (error) {
        toast.error("Updated Failed");
      });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    if (ServerMainRecord) {
      const formData = new FormData();
      formData.append("serverTypeId", values?.serverTypeId);
      formData.append("date", selectedDate);
      formData.append("amount", values?.amount);

      if (values?.serverBilling[0].originFileObj) {
        values.serverBilling.forEach((file) => {
          formData.append(`serverBilling`, file.originFileObj);
        });
      }
      UpdateServerMaintain(formData);
    } else {
      const formData = new FormData();
      formData.append("serverTypeId", values?.serverTypeId);
      formData.append("date", selectedDate);
      formData.append("amount", values?.amount);

      if (values?.serverBilling && values.serverBilling.length > 0) {
        values.serverBilling.forEach((file) => {
          formData.append(`serverBilling`, file.originFileObj);
        });
      }
      AddServerMaintain(formData);
    }
  };

  const onFinishFailed = (values) => {};
  return (
    <div>
      <Form
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <CustomRow space={[24, 24]}>
          <Col span={24} md={12}>
            <CustomSelect
              placeholder={"Server Type"}
              label={"Server Type"}
              name={"serverTypeId"}
              options={ServerTypeOptions}
              rules={[
                {
                  required: true,
                  message: "Please select Server Type!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker
              placeholder={"Paying Date"}
              label={"Paying Date"}
              name={"date"}
              onChange={handleDate}
              rules={[
                {
                  required: true,
                  message: "Please select Paying Date!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput
              placeholder={"Amount"}
              label={"Amount"}
              name={"amount"}
              rules={[
                {
                  required: true,
                  message: "Please enter amount!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              label={"Upload Server Billing"}
              name={"serverBilling"}
              initialValue={ImageInitialValue}
              maxCount={10}
              listType="picture-card"
              accept=".png,.jpeg,.jpg"
              rules={[
                {
                  required: true,
                  message: "Please Upload Image",
                },
              ]}
            />
          </Col>
        </CustomRow>
        <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
          {ServerMainRecord ? (
            <>
              <Button.Primary text={"Update"} htmlType={"submit"} />
              <Button.Danger
                text={"Cancel"}
                onClick={() => FormExternalClosess()}
              />
            </>
          ) : (
            <>
              <Button.Success text={"Submit"} htmlType={"submit"} />
              <Button.Danger text={"Reset"} onClick={() => onReset()} />
            </>
          )}
        </Flex>
      </Form>
    </div>
  );
};

export default AddServerMainForm;
