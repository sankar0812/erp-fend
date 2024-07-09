import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../components/Form/CustomInput";
import Button from "../../../../components/Form/CustomButton";
import Flex from "../../../../components/Flex";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { getTraining } from "../TrainingSlice";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { CustomInputPassword } from "../../../../components/Form/CustomInputPassword";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import { CustomUpload } from "../../../../components/Form/CustomUpload";
import {
  getDepartmentinTable,
  selectAllDepartmentinTable,
} from "../../EmployeeDetails/EmployeeSlice";
import { useSelector } from "react-redux";

export const TrainingForm = ({
  FormExternalClose,
  FormExternalClosee,
  updatetrigger,
  trainingrecord,
  addtrigger,
}) => {
  const [form] = useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const [email, setEmail] = useState();
  const [number, setNumber] = useState();

  const [ImageInitialValue, setImageInitialValue] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (trainingrecord) {
      setTraining();
    }
  }, [trainingrecord, updatetrigger]);

  const setTraining = () => {
    const dateFormat = "YYYY-MM-DD";
    const DOB = new Date(trainingrecord?.dateOfBirth);

    form.setFieldsValue(trainingrecord);

    setSelectedDate(trainingrecord?.dateOfBirth);

    form.setFieldsValue({ dateOfBirth: dayjs(DOB) });
    form.setFieldsValue({ profile: ImageInitialValue });
  };

  useEffect(() => {
    if (trainingrecord?.profile?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${trainingrecord?.profile}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
  }, [trainingrecord]);

  useEffect(() => {
    if (addtrigger) {
      form.resetFields();
    }
  }, [addtrigger]);

  const UpdateTraining = (values) => {
    request
      .put(`${APIURLS.PUTTRAINING}${trainingrecord?.traineeId}`, values)
      .then(function (response) {
        toast.info("Training Details Updated Successfully");
        dispatch(getTraining());
        FormExternalClosee();
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const AddTraining = (value) => {
    request
      .post(`${APIURLS.POSTTRAINING}`, value)
      .then(function (response) {
        dispatch(getTraining());
        FormExternalClose();
        form.resetFields();
        toast.success("Trainee Added Successfully");
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const onFinish = (values) => {
    if (trainingrecord) {
      const formData = new FormData();

      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("departmentId", values.departmentId);
      formData.append("dateOfBirth", selectedDate);
      formData.append("address", values.address);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("maritalStatus", values.maritalStatus);

      if (values?.profile[0].originFileObj) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }
      UpdateTraining(formData);
    } else {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("departmentId", values.departmentId);
      formData.append("dateOfBirth", selectedDate);
      formData.append("address", values.address);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("maritalStatus", values.maritalStatus);

      if (values?.profile && values.profile.length > 0) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }
      AddTraining(formData);
    }
  };

  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

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

  const maritalStatus = [
    {
      label: "Married",
      value: "married",
    },
    {
      label: "Single",
      value: "single",
    },
  ];

  useEffect(() => {
    dispatch(getDepartmentinTable());
  }, []);

  const AllDepartmentDetails = useSelector(selectAllDepartmentinTable);

  const AllDepartment = AllDepartmentDetails?.map((dep) => ({
    label: dep.departmentName,
    value: dep.departmentId,
  }));

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlephoneNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomInput
              label={"Trainee Name"}
              placeholder={"Enter Trainee Name"}
              name={"userName"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Trainee Name ! ! !",
                },
              ]}
            />
          </Col>

          {trainingrecord ? (
            <Col span={24} md={12}>
              <CustomInput
                label={"Email ID"}
                placeholder={"Enter Email ID"}
                name={"email"}
                type={"email"}
                disabled={trainingrecord?.email === null ? false : true}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email ID !",
                  },
                ]}
              />
            </Col>
          ) : (
            <Col span={24} md={12}>
              <CustomInput
                label={"Email ID"}
                placeholder={"Enter Email ID"}
                name={"email"}
                type={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email ID !",
                  },
                ]}
              />
            </Col>
          )}

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
                  message: "Please Enter Mobile Number !",
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
                  message: "Please Enter City ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"State"}
              placeholder={"Enter State"}
              name={"state"}
              rules={[
                {
                  required: true,
                  message: "Please Enter State ! ! !",
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
                  message: "Please Enter Country ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomSelect
              options={AllDepartment}
              showSearch={true}
              name={"departmentId"}
              label={"Department"}
              placeholder={"Department"}
              rules={[
                {
                  required: true,
                  message: "Please Select Department !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomDatePicker
              label={"Date of Birth"}
              placeholder={"Date of Birth"}
              onChange={handleDate}
              name={"dateOfBirth"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Date of Birth ! ! !",
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
            <CustomSelect
              options={maritalStatus}
              showSearch={true}
              name={"maritalStatus"}
              label={"Marital Status"}
              placeholder={"Marital Status"}
              rules={[
                {
                  required: true,
                  message: "Please Select Marital Status !",
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
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {trainingrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
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
