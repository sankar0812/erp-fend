import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';
import request from '../../../../../utils/request';
import { CustomInput } from '../../../../../components/Form/CustomInput';
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import { getJobTitle } from '../../RecruitmentSlice';

export const AddJobRole = ({ formname,FormExternalCloses }) => {
      // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const AddJobRole = (value) => {
    request
      .post(`${APIURLS.POSTJOBROLE}`, value)
      .then(function (response) {
        toast.success("JobRole Added Successfully");
        FormExternalCloses();
        dispatch(getJobTitle());
        form.resetFields();
      })
      .catch((error) => {});
  };

  const onFinish = (values) => {
    AddJobRole(values);
  };

  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };
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
          label={"Job Title"}
          placeholder={"Job Title"}
          name={"jobTitle"}
          rules={[
            {
              required: true,
              message: "Please Enter Job Title !!!",
            },
          ]}
        />
        <CustomInput name={"designationId"} display={"none"} />
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
      </Flex>
    </Form>
  )
}
