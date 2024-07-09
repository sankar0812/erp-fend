import React, { useEffect } from "react";
import request from "../../../../../utils/request";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Form } from "antd";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { getAssetsBrand } from "../../AccountsSlice";

export const AddBrand = ({ formname, FormExternalCloses, formReset, Brandrecord, Trigger }) => {
  const [form] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    {
      Brandrecord?.brandId ? form.setFieldsValue(Brandrecord) : form.setFieldsValue({brandName:null})
    } 
  }, [Brandrecord,Trigger])

  const onReset = () => {
    form.resetFields();
  };
  
  const AddBrand = (value) => {
    request
      .post(`${APIURLS.POSTASSETBRAND}`, value)
      .then(function (response) {
        toast.success("Brand Added Successfully");
        FormExternalCloses();
        dispatch(getAssetsBrand());
        form.resetFields();
      })
      .catch((error) => {});
  };

  const UpdateBrand = (value) => {
    request
      .put(`${APIURLS.PUTASSETBRAND}${Brandrecord?.brandId}`, value)
      .then(function (response) {
        toast.success("Brand Updated Successfully");
        FormExternalCloses();
        dispatch(getAssetsBrand());
      })
      .catch((error) => {});
  };

  const onFinish = (values) => {
    if (Brandrecord) {
      UpdateBrand(values);
    } else {
    AddBrand(values);
    }
  };
  const onFinishFailed = (value) => {};



  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      name={formname}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Brand"}
          placeholder={"Add Brand"}
          name={"brandName"}
          rules={[
            {
              required: true,
              message: "Please Enter Brand !!!",
            },
          ]}
        />
        {/* <CustomInput name={"designationId"} display={"none"} /> */}
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {Brandrecord ? (
        <>
          <Button.Primary text={"Update"} htmlType={"submit"} />
          <Button.Danger
            text={"Cancel"}
            onClick={() => FormExternalCloses()}
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
  );
};
