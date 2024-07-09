import React, { Fragment, useEffect } from "react";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { Col, Form } from "antd";
import { CustomRow } from "../../../../../components/CustomRow";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { toast } from "react-toastify";

export const AssetsCount = ({
  trigger,
  triggerr,
  UpdateTypeRecord,
  updateEditRecord,
  SetDynamicEditTable,
  formExternalClosee,
  index,
}) => {
  
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(UpdateTypeRecord);
    form.setFieldsValue({
      returnCount: UpdateTypeRecord?.count,
    });
  }, [UpdateTypeRecord, trigger]);

  useEffect(() => {
    form.setFieldsValue(updateEditRecord);
    form.setFieldsValue({
      balanceCount: updateEditRecord?.balanceCountt,
    });
  }, [updateEditRecord, triggerr]);

  const onFinish = (values) => {
    if (updateEditRecord) {
      const newValue = {
        ...values,
        returnCount: values?.balanceCount + updateEditRecord?.returnCount,
        balanceCount: updateEditRecord?.balanceCountt - values?.balanceCount,
        accessoriesId: updateEditRecord?.accessoriesId,
        balanceCountt: updateEditRecord?.balanceCountt,
      };
      
      SetDynamicEditTable(newValue, index);
      formExternalClosee();
    }
    else{
      const newValue = {
        ...values,
        returnCount: values?.returnCount,
        balanceCount: UpdateTypeRecord?.count - values?.returnCount,
        accessoriesId: UpdateTypeRecord?.accessoriesId,
      };
      
      SetDynamicEditTable(newValue, index);
      formExternalClosee();
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo) => {};

  const handleCount = (values) => {
    if (values > UpdateTypeRecord?.count) {
      toast.warning("can not return more than received");
      form.setFieldsValue({
        returnCount: UpdateTypeRecord?.count,
      });
    } else {
      return values;
    }
  };

  const handleBalanceCount = (values) => {
    if (values > updateEditRecord?.balanceCountt) {
      toast.warning("can not return more than received");
      form.setFieldsValue({
        balanceCount: updateEditRecord?.balanceCountt,
      });
    } else {
      return values;
    }
  };
  return (
    <Fragment>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        name="products"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          {/* <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Company Assets</h3>
            </div> */}
          <Col span={24} md={12}>
            <CustomInput
              label={"Brand Name"}
              placeholder={"Brand Name"}
              name={"brandName"}
              disabled={"disabled"}
              rules={[
                {
                  required: true,
                  message: "Please Brand Name ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"Accessories Name"}
              placeholder={"Accessories Name"}
              name={"accessoriesName"}
              disabled={"disabled"}
              rules={[
                {
                  required: true,
                  message: "Please Accessories Name ! ! !",
                },
              ]}
            />
            <CustomInput name={"brandId"} display={"none"} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={"Count"}
              placeholder={"Count"}
              name={"count"}
              disabled={"disabled"}
              rules={[
                {
                  required: true,
                  message: "Please Enter the Count ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"Serial Number"}
              placeholder={"Serial Number"}
              name={"serialNumber"}
              disabled={"disabled"}
              rules={[
                {
                  required: true,
                  message: "Please Serial Number ! ! !",
                },
              ]}
            />
          </Col>

          {UpdateTypeRecord && (
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Return Count"}
                placeholder={"Return Count"}
                name={"returnCount"}
                onChange={handleCount}
                rules={[
                  {
                    required: true,
                    message: "Please Return Count ! ! !",
                  },
                ]}
              />
            </Col>
          )}

          {updateEditRecord && (
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Balance Count"}
                placeholder={"Balance Count"}
                name={"balanceCount"}
                onChange={handleBalanceCount}
                rules={[
                  {
                    required: true,
                    message: "Please Balance Count ! ! !",
                  },
                ]}
              />
            </Col>
          )}
        </CustomRow>
      </Form>

      <br />

      {/* <CustomStandardTable columns={columns} data={dynamicTableData} /> */}
      {/* <FooterComponent /> */}
      {/* {Assetsrecord ? (
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        <Button.Primary text={"Update"} onClick={() => onSubmit()} />
        <Button.Danger text={"Cancel"} onClick={() => Formcancel()} />
      </Flex>
    ) : ( */}
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        <Button.Primary text={"Save"} onClick={() => onSubmit()} />
        <Button.Danger
          text={"Reset"}
          icon={<BiReset style={{ marginRight: "5px" }} />}
          onClick={() => onReset()}
        />
      </Flex>
    </Fragment>
  );
};
