import { Col, Form } from "antd";
import React, { useState } from "react";
import { CustomRow } from "../../../components/CustomRow";
import { CustomInput } from "../../../components/Form/CustomInput";
import { CustomInputPassword } from "../../../components/Form/CustomInputPassword";
import { CustomSelect } from "../../../components/Form/CustomSelect";
import { CustomTextArea } from "../../../components/Form/CustomTextArea";
import Flex from "../../../components/Flex";
import Button from "../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { toast } from "react-toastify";
import request, { base } from "../../../utils/request";
import { CustomUpload } from "../../../components/Form/CustomUpload";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../UserSlice";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";

const AddUser = ({
  FormExternalClose,
  FormExternalClosee,
  updaterecord,
  updatetrigger,
  triggerr,
  GetUserDetail,
}) => {
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  const [form] = Form.useForm();
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [form, triggerr]);

  const onFinish = (values) => {
    if (updaterecord) {
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("country", values.country);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("roleType", values.roleType);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("location", values.location);
      formData.append("username", values.username);

      // if (values?.userProfile && values.userProfile.length > 0) {
      //   values.userProfile.forEach((file) => {
      //     formData.append(`userProfile`, file.originFileObj);
      //   });
      // }

      if (values?.userProfile[0].originFileObj) {
        values.userProfile.forEach((file) => {
          formData.append(`userProfile`, file.originFileObj);
        });
      }

      EditUsers(formData, updaterecord?.userId);
    } else {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("country", values.country);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("roleType", values.roleType);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("location", values.location);
      formData.append("username", values.username);

      if (values?.userProfile && values.userProfile.length > 0) {
        values.userProfile.forEach((file) => {
          formData.append(`userProfile`, file.originFileObj);
        });
      }
      AddUsers(formData);
    }
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (updaterecord?.userProfile?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${updaterecord?.userProfile}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
  }, [updaterecord]);

  useEffect(() => {
    setUserDetails();
  }, [updaterecord, updatetrigger]);

  const setUserDetails = () => {
    form.setFieldsValue(updaterecord);
    form.setFieldsValue({ userProfile: ImageInitialValue });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Added Failed");
  };

  const onReset = () => {
    form.resetFields();
  };

  const RollType = [
    {
      label: "Manager",
      value: "Manager",
    },
    {
      label: "Accountant",
      value: "Accountant",
    },
    {
      label: "ProjectManager",
      value: "ProjectManager",
    },
  ];

  const AddUsers = (values) => {
    request
      .post(`${APIURLS.POSTUSER}`, values)
      .then(function (response) {
        form.resetFields();
        toast.success("User Added Successfully");
        dispatch(getUserDetails());
        FormExternalClose();
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const EditUsers = (values, id) => {
    request
      .put(`${APIURLS.PUTUSER}${id}/`, values, config)
      .then(function (response) {
        toast.info("User Profile Updated Successfully");
        dispatch(getUserDetails());
        GetUserDetail();
        FormExternalClose();
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlephoneNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <Form
      form={form}
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
          <CustomInput
            name={"username"}
            label={"Username"}
            placeholder={"Enter username"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            name={"mobileNumber"}
            label={"Mobile Number"}
            placeholder={"Enter Mobile Number"}
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
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        
        {updaterecord ? (
          <Col span={24} md={12}>
            <CustomInput
              label={"Email ID"}
              disabled={updaterecord?.email === null ? false : true}
              placeholder={"Enter EmailID"}
              name={"email"}
              type={"email"}
              rules={[
                {
                  required: true,
                  message: "This is Required Field!",
                },
              ]}
            />
          </Col>
        ) : (
          <Col span={24} md={12}>
            <CustomInput
              label={"Email ID"}
              placeholder={"Enter EmailID"}
              name={"email"}
              type={"email"}
              rules={[
                {
                  required: true,
                  message: "This is Required Field!",
                },
              ]}
            />
          </Col>
        )}
        {updaterecord ? (
          <Col span={24} md={12}>
            <CustomSelect
              placeholder={"Select Roll"}
              disabled={"disabled"}
              name={"roleType"}
              options={RollType}
              label={"Roll Type"}
              rules={[
                {
                  required: true,
                  message: "This is Required Field!",
                },
              ]}
            />
          </Col>
        ) : (
          <Col span={24} md={12}>
            <CustomSelect
              placeholder={"Select Roll"}
              name={"roleType"}
              options={RollType}
              label={"Roll Type"}
              rules={[
                {
                  required: true,
                  message: "This is Required Field!",
                },
              ]}
            />
          </Col>
        )}
        <Col span={24} md={12}>
          <CustomInputPassword
            placeholder={"Password"}
            name={"password"}
            type={"password"}
            label={"Password"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInputPassword
            placeholder={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            label={"Confirm Password"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            label={"City"}
            placeholder={"Enter City"}
            name={"city"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            label={"Country"}
            placeholder={"Enter Country"}
            name={"country"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            label={"Location"}
            placeholder={"Enter Location"}
            name={"location"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomTextArea
            label={"Address"}
            placeholder={"Enter Address"}
            name={"address"}
            rules={[
              {
                required: true,
                message: "This is Required Field!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Upload Photo"}
            name={"userProfile"}
            listType="picture-card"
            maxCount={1}
            initialValue={ImageInitialValue}
            rules={[
              {
                required: true,
                message: "Please Upload Profile Pic !",
              },
            ]}
          />
        </Col>
      </CustomRow>
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {updaterecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Close"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={() => FormExternalClosee()}
            />
          </>
        ) : (
          <>
            <Button.Primary text={"Save"} htmlType={"submit"} />
            <Button.Danger
              text={"Reset"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={() => onReset()}
            />
          </>
        )}
      </Flex>
    </Form>
  );
};

export default AddUser;
