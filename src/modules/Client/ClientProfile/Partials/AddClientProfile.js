import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import Button from "../../../../components/Form/CustomButton";
import Flex from "../../../../components/Flex";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { CustomInputPassword } from "../../../../components/Form/CustomInputPassword";
import dayjs from "dayjs";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomInputNumber } from "../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomCardView } from "../../../../components/CustomCardView";
import { STATES } from "../../../../components/SampleData";
import { CustomUpload } from "../../../../components/Form/CustomUpload";

export const AddClientProfile = ({
  FormExternalClosee,
  formReset,
  profilerecord,
}) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [mobNumber, setMobNumber] = useState()
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [ImageInitialValue, setImageInitialValue] = useState([]); // Use image inital value
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (profilerecord) {
      form.setFieldsValue(profilerecord);
    }
  }, [profilerecord]);

  useEffect(() => {
    if (profilerecord?.clientProfile?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${profilerecord?.clientProfile}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
  }, [profilerecord]);

  //     useEffect(()=>{
  //    form.resetFields()
  //     },[formReset])

  const onFinish = (values) => {
    if (profilerecord) {
      const formData = new FormData();

      formData.append("clientName", values.clientName);
      formData.append("gender", values.gender);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("state", values.state);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("referral", values.referral);
      formData.append("zipCode", values.zipCode);

      if (values?.profile[0].originFileObj) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }
      // console.log([...formData.entries()],'data');
      UpdateProfile(formData, profilerecord);
    } else {
      const formData = new FormData();
      formData.append("clientName", values.clientName);
      formData.append("gender", values.gender);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("state", values.state);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("referral", values.referral);
      formData.append("zipCode", values.zipCode);

      if (values?.profile && values.profile.length > 0) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }
      AddProfile(formData);
    }
  };

  const AddProfile = (values) => {
    request
      .post(`${APIURLS.POSTPROFILE}`, values)
      .then(function (response) {
        toast.success("Client Profile Added Successfully");
        form.resetFields();
        // dispatch(getInitialEmployee())
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data)
        }
        else {
          toast.error('Failed')
        }
      });
  };

  const UpdateProfile = (values, id) => {
    request
      .put(`${APIURLS.PUTCLIENTPROFILE}${profilerecord?.clientId}`, values)
      .then(function (response) {
        toast.info("Client Profile Updated Successfully");
        if (FormExternalClosee) {
          FormExternalClosee();
        }
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data)
        }
        else {
          toast.error('Failed')
        }
      });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const StatesOptions = STATES?.map((state) => ({
    label: state?.name,
    value: state?.name,
  }));

  const gender = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const roletype = [
    {
      label: "Employee",
      value: "Employee",
    },
    {
      label: "ProjectHead",
      value: "ProjectHead",
    },
    {
      label: "TL",
      value: "TL",
    },
    {
      label: "Training",
      value: "Training",
    },
  ];

  const onReset = () => {
    form.resetFields();
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlephoneNumber = (e) => {
    setNumber(e)
  }

  const handlemobileNumber = (e) => {
    setMobNumber(e)
  }

  return (
    <Fragment>
      {/* {profilerecord ? null : <CustomPageTitle Heading={'Client Profile:'} />}  */}

      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            {profilerecord ? null : (
              <CustomPageTitle Heading={"Client Profile:"} />
            )}
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              name={"clientName"}
              label={"Name"}
              placeholder={"Enter name"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Client Name!",
                },
              ]}
            />
          </Col>
          {
            profilerecord ? <Col span={24} md={12}>
            <CustomInput
              label={"Email ID"}
              placeholder={"Enter Email ID"}  
              name={"email"}
              type={"email"}
              disabled={profilerecord?.email === null ? false : true}
              rules={[
                {
                  required: true,
                  message: "Please Enter Email Id !",
                },]}
            />
          </Col> : <Col span={24} md={12}>
            <CustomInput
              label={"Email ID"}
              placeholder={"Enter Email ID"}  
              name={"email"}
              type={"email"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Email Id !",
                },]}
            />
          </Col>
          }
          
          <Col span={24} md={12}>
            <CustomInputNumber
              name={"phoneNumber"}
              label={"Contact Number"}
              placeholder={"Enter Contact Number"}
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
                  message: "Please Enter Your Phone Number !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              name={"mobileNumber"}
              label={"Alternate Number"}
              placeholder={"Enter Alternate Number "}
              maxLength={10}
              minLength={10}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomSelect
              options={gender}
              showSearch={true}
              name={"gender"}
              label={"Gender"}
              placeholder={"Gender"}
              rules={[
                {
                  required: true,
                  message: "Please Select Gender !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomTextArea
              label={"Address"}
              name={"address"}
              placeholder={"Enter Address"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Address !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              name={"city"}
              label={"City"}
              placeholder={"Enter city"}
              rules={[
                {
                  required: true,
                  message: "Please Enter City !",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput
              name={"state"}
              label={"State"}
              placeholder={"Enter state"}
              // options={StatesOptions}
              rules={[
                {
                  required: true,
                  message: "Please Enter State !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              name={"country"}
              label={"Country"}
              placeholder={"Enter country"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Country !",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInputPassword
              label={"Password"}
              placeholder={"Enter Password"}
              name={"password"}
              type={"password"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Password !",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInputPassword
              label={"Confirm Password"}
              placeholder={"Enter Password"}
              name={"confirmPassword"}
              type={"password"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Confirm Password !",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInput
              options={roletype}
              name={"referral"}
              label={"Referrals"}
              placeholder={"Referrals"}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomInputNumber
              options={roletype}
              name={"zipCode"}
              label={"Zip Code"}
              placeholder={"Zip Code"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Zip Code !",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              label={"Upload Photo"}
              name={"profile"}
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
          {profilerecord ? (
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

        <CustomModal
          isVisible={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          modalTitle={modalTitle}
          modalContent={modalContent}
        />
      </Form>
    </Fragment>
  );
};
