import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../../components/CustomModal";
import {
  AddDepartmentModal,
  AddDesignationModal,
  AddShiftModal,
} from "./AddEmployeeModals";
import request, { base } from "../../../../../utils/request";
import {
  getDepartmentinTable,
  getDesignation,
  getInitialEmployee,
  getShift,
  selectAllDepartmentinTable,
  selectAllDesignation,
  selectAllShift,
} from "../../EmployeeSlice";
import { CustomPageFormSubTitle } from "../../../../../components/CustomPageTitle";
import { STATES, attendancetype } from "../../../../../components/SampleData";
import { getNotification } from "../../../../Notifications/Partials/NotificationSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { CustomInputPassword } from "../../../../../components/Form/CustomInputPassword";

export const AddEmployeeForm = ({
  FormExternalCloseeee,
  FormExternalClosee,
  detailget,
  GetInitialEmployee,
  updatetrigger,
}) => {

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  const [formReset, setFormReset] = useState(0);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");
  const [selectedShift, setSelectedShift] = useState([]);
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  useEffect(() => {
    if (detailget) {
      setEmpProfile();
    }
  }, [updateFormData, detailget, updatetrigger]);

  useEffect(() => {
    form.setFieldsValue({ shiftId: selectedShift });
  }, [selectedShift]);

  const setEmpProfile = () => {
    const dateFormat = "YYYY-MM-DD";
    const DOB = new Date(detailget?.dob);
    const Dat = dayjs(DOB).format(dateFormat);

    form.setFieldsValue(detailget);

    form.setFieldsValue({
      dob: dayjs(Dat, dateFormat),
      roleType: detailget?.roleName,
      shiftType: detailget?.shiftType,
      shiftId: detailget?.shiftId,
    });
    setAttendanceType(detailget.attendanceType);
    form.setFieldsValue({ profile: ImageInitialValue });
  };
  useEffect(() => {
    if (detailget?.profile?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${detailget?.profile}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }

    setUpdateFormData(detailget);
  }, [detailget]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const handleAttendanceTypeChange = (selectedType) => {
    setAttendanceType(selectedType);
  };

  const onFinish = (values) => {
    if (detailget) {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("gender", values.gender);
      formData.append("country", values.country);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("address", values.address);
      formData.append("dob", dayjs(values.dob).format("YYYY-MM-DD"));
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("designationId", values.designationId);
      formData.append("departmentId", values.departmentId);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("roleType", values.roleType);
      formData.append("attendanceType", "Regular");
      formData.append("shiftType", values.shiftType);

      if (values?.profile && values.profile.length > 0) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }

      if (values.shiftId) {
        formData.append("shiftId", values.shiftId);
      } else {
        formData.append("shiftId", 0);
      }
      UpdateProfile(formData, detailget?.employeeId);
    } else {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("gender", values.gender);
      formData.append("country", values.country);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("address", values.address);
      formData.append("dob", dayjs(values.dob).format("YYYY-MM-DD"));
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("designationId", values.designationId);
      formData.append("departmentId", values.departmentId);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("roleType", values.roleType);
      formData.append("attendanceType", "Regular");
      formData.append("shiftType", values.shiftType);

      if (values?.profile && values.profile.length > 0) {
        values.profile.forEach((file) => {
          formData.append(`profile`, file.originFileObj);
        });
      }

      if (values.shiftId) {
        formData.append("shiftId", values.shiftId);
      } else {
        formData.append("shiftId", 0);
      }
      AddProfile(formData);
    }
  };

  const AddProfile = (values) => {
    request
      .post(`${APIURLS.POSTINITIALEMPLOYEE}`, values)
      .then(function (response) {
        toast.success("Profile Added Successfully");
        form.resetFields();
        dispatch(getInitialEmployee());
        dispatch(getNotification());
        FormExternalClosee();
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const UpdateProfile = (values, id) => {
    request
      .put(`${APIURLS.PUTINITIALEMPLOYEE}${id}/`, values, config)
      .then(function (response) {
        toast.info("Profile Updated Successfully");
        GetInitialEmployee();
        dispatch(getNotification());
        FormExternalCloseeee();
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
  const handleDate = (date) => {
    setSelectedDate(date);
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

  const roletype = [
    {
      label: "Employee",
      value: "Employee",
    },
    // {
    //   label: "Customer",
    //   value: "Customer",
    // },
    {
      label: "TL",
      value: "TL",
    },
    {
      label: "ProjectHead",
      value: "ProjectHead",
    },
  ];

  useEffect(() => {
    dispatch(getDepartmentinTable());
    dispatch(getDesignation());
    dispatch(getShift());
  }, []);

  const AllDesignationDetails = useSelector(selectAllDesignation);
  const AllDepartmentDetails = useSelector(selectAllDepartmentinTable);
  const AllShiftsDetails = useSelector(selectAllShift);

  const AllDesignation = AllDesignationDetails?.map((des) => ({
    label: des.designationName,
    value: des.designationId,
  }));

  const AllDepartment = AllDepartmentDetails?.map((dep) => ({
    label: dep.departmentName,
    value: dep.departmentId,
  }));

  const StatesOptions = STATES?.map((state) => ({
    label: state?.name,
    value: state?.name,
  }));

  const AllShift = AllShiftsDetails?.map((sft) => ({
    label: sft.shiftType,
    value: sft.shiftType,
  }));
  const handleOnChange = (value) => {
    const AllShiftsDetailss = AllShiftsDetails.find(
      (emp) => emp.shiftType === value
    );
    setSelectedShift(AllShiftsDetailss?.shiftId);
  };

  const DesignationModal = () => {
    setModalTitle("Add Designation Here");
    setModalContent(
      <AddDesignationModal
        FormExternalCloses={FormExternalClose}
        formname={"AddDesignationForm"}
      />
    );
    showModal();
  };

  const DepartmentModal = () => {
    setModalTitle("Add Department Here");
    setModalContent(
      <AddDepartmentModal
        FormExternalCloses={FormExternalClose}
        formname={"AddDepartmentForm"}
      />
    );
    showModal();
  };

  const AttendanceTypeModal = () => {
    setModalTitle("Add Attendance Type");
    setModalContent(
      <AddShiftModal
        FormExternalCloseee={FormExternalClose}
        formname={"AddShiftModal"}
      />
    );
    showModal();
  };

  const onReset = () => {
    form.resetFields();
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  console.log(detailget,'llll');

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
      autoComplete="off"
    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={24}>
          <CustomPageFormSubTitle Heading={"Personal Details :"} />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            name={"userName"}
            label={"User Name"}
            placeholder={"Enter User Name"}
            rules={[
              {
                required: true,
                message: "Please Enter User Name !",
              },
            ]}
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
        {
          detailget ? <Col span={24} md={12}>
          <CustomInput
            label={"Email ID"}
            placeholder={"Enter Email ID"}
            name={"email"}
            type={"email"}
            disabled={detailget?.email === null ? false : true}
            rules={[
              {
                required: true,
                message: "Please Enter Email ID !",
              },
            ]}
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
                  message: "Please Enter Email ID !",
                },
              ]}
            />
          </Col>
        }
          <Col span={24} md={12}>
            <CustomInput
              name={"phoneNumber"}
              label={"Phone Number"}
              placeholder={"Enter Phone Number"}
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
        {/* )} */}

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date of Birth"}
            name={"dob"}
            placeholder={"Date of Birth"}
            onChange={handleDate}
            rules={[
              {
                required: true,
                message: "Please Enter Date Of Birth !",
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
          <CustomSelect
            name={"state"}
            options={StatesOptions}
            label={"State"}
            placeholder={"Enter state"}
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

        <Col span={24} md={24}>
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
            name={"password"}
            placeholder={"Password"}
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
            placeholder={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            label={"Confirm Password"}
            rules={[
              {
                required: true,
                message: "Please Enter Confirm Password !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={24}>
          <CustomPageFormSubTitle Heading={"Company Details :"} />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={roletype}
            name={"roleType"}
            label={"Role Type"}
            placeholder={"Role Type"}
            rules={[
              {
                required: true,
                message: "Please Select Role Type !",
              },
            ]}
          />
        </Col>

        {attendanceType === "Shift" && (
          <Col span={24} md={12}>
            <CustomDropSelect
              options={AllShift}
              name="shiftType"
              label="Select Shift"
              placeholder="Select Shift"
              showSearch={true}
              onButtonClick={AttendanceTypeModal}
              onChange={handleOnChange}
              rules={[
                {
                  required: true,
                  message: "Please Select Shift !",
                },
              ]}
            />
            <CustomInput name={"shiftId"} display={"none"} />
          </Col>
        )}
        <Col span={24} md={12}>
          <CustomDropSelect
            options={AllDesignation}
            onButtonClick={DesignationModal}
            showSearch={true}
            buttonLabel="Add Designation"
            label={"Designation"}
            name={"designationId"}
            placeholder={"Select Designation"}
            rules={[
              {
                required: true,
                message: "Please Select Designation!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDropSelect
            options={AllDepartment || []}
            onButtonClick={DepartmentModal}
            showSearch={true}
            buttonLabel="Add Department"
            label={"Department"}
            name={"departmentId"}
            placeholder={"Select Department"}
            rules={[
              {
                required: true,
                message: "Please Select Department!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
            rows={2}
            label={"Description"}
            name={"description"}
            placeholder={"Enter Description"}
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
                message: "Please Upload an Image!",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {detailget ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={FormExternalCloseeee}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Save"} htmlType={"submit"} />
            <Button.Danger
              text={"Reset"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={onReset}
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
  );
};
