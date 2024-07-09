import React, { useEffect, useState } from "react";
import { Col, Form } from "antd";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomTimePicker } from "../../../../../components/Form/CustomTimePicker";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import request from "../../../../../utils/request";
import {
  getCandidate,
  getDepartmentRole,
  getIntSchedule,
  selectAllCandidate,
  selectAllDepartmentRole,
} from "../../RecruitmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiReset } from "react-icons/bi";
import { PatchHooks } from "../../../../../utils/PatchHook";

export const SheduleForm = ({
  FormExternalClose,
  formReset,
  formname,
  updateIntSchedulerecord,
  updatetrigger,
  AddNewRecord,
}) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showCancellationReason, setShowCancellationReason] = useState("");
  const [employeeOption, setEmployeeOption] = useState([]);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    form.setFieldsValue({
      userName: AddNewRecord?.userName,
      candidateId: AddNewRecord?.candidateId,
    });
  }, [AddNewRecord, updatetrigger]);

  const dispatch = useDispatch();

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);

  const [form] = Form.useForm(); // ----- Define Form

  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    if (updateIntSchedulerecord) {
      setIntSchedule();
    }
  }, [updateIntSchedulerecord, updatetrigger]);

  const setIntSchedule = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateIntSchedulerecord?.date);
    const Datee = dayjs(Dated).format(dateFormat);

    const formattedInTime = updateIntSchedulerecord?.startTime
      ? dayjs(updateIntSchedulerecord?.startTime, "HH:mm:A")
      : null;
    const formattedOutTime = updateIntSchedulerecord?.endTime
      ? dayjs(updateIntSchedulerecord?.endTime, "HH:mm:A")
      : null;
    setInTime(updateIntSchedulerecord?.startTime);
    setOutTime(updateIntSchedulerecord?.endTime);
    form.setFieldsValue(updateIntSchedulerecord);
    setSelectedDate(Datee);
    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
      startTime: formattedInTime,
      endTime: formattedOutTime,
    });
    form.setFieldValue({ userName: updateIntSchedulerecord.employeeName });
    // const findlObject = AllDepartmentRole.find(
    //   (item) => item.departmentId === updateIntSchedulerecord.departmentId
    // );
    // console.log(findlObject, "findlfgbdfgdsfObject");
    // const employeeOption = findlObject?.departmentDetails.map((value) => ({
    //   label: value.userName,
    //   value: value.employeeId,
    // }));
    // setEmployeeOption(employeeOption || [])
  };

  const interviewTypeOption = [
    {
      label: "Cancelled",
      value: "cancelled",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  const handleDepartment = (e) => {
    form.setFieldsValue({ interviewerName: null });
    form.setFieldsValue({ employeeId: null });

    const findObject = AllDepartmentRole.find(
      (item) => item.departmentId === e
    );
    const employeeOption = findObject.departmentDetails.map((value) => ({
      label: value.userName,
      value: value.employeeId,
    }));
    form.setFieldsValue({ departmentId: findObject.departmentId });
    setEmployeeOption(employeeOption);
  };

  const handleInterviewChange = (value) => {
    form.setFieldsValue({ employeeId: value });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
    const dayOfWeek = dayjs(date).format("dddd");
    form.setFieldsValue({ day: dayOfWeek });
  };

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ===== Modal Functions End =====

  // const handleButtonClick = () => {
  //   setModalTitle("Add Category");
  //   setModalContent(<SampleSmallForm />);
  //   showModal();
  // };

  useEffect(() => {
    dispatch(getCandidate());
    dispatch(getDepartmentRole());
  }, []);

  const AllCandidate = useSelector(selectAllCandidate);
  const AllDepartmentRole = useSelector(selectAllDepartmentRole);

  const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
    label: emp.departmentName,
    value: emp.departmentId,
  }));

  // const InterviewerOptions = AllDepartmentRole?.department_details.map((emp) => ({
  //   label: emp.userName,
  //   value: emp.employee_id,
  // }));

  // const AllCandidateOptions = AllCandidate?.map((emp) => ({
  //   label: emp.userName,
  //   value: emp.candidateId,
  // }));

  const onReset = () => {
    form.resetFields();
  };

  const inTimeChange = (_, timeString) => {
    setInTime(timeString);
  };

  const outTimeChange = (_, timeString) => {
    setOutTime(timeString);
  };

  const ChangeInterviewType = (e) => {
    setShowCancellationReason(e);
  };

  const onFinish = (values) => {
    if (updateIntSchedulerecord) {
      const NewValue = {
        ...values,
        startTime: inTime,
        endTime: outTime,
        date: selectedDate,
      };
      UpdateSchedule(NewValue, updateIntSchedulerecord?.candidateId);
    } else {
      const NewValue = {
        ...values,
        startTime: inTime,
        endTime: outTime,
        date: selectedDate,
      };
      AddSchedule(NewValue);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddSchedule = async (values, id) => {
    try {
      request
        .post(`${APIURLS.POSTINTERVIEWSCHEDULE}`, values)
        .then(function (response) {
          toast.success("Schedule Added Successfully");
          dispatch(getIntSchedule());
          PatchHooks(
            {
              statusLevel: "scheduled",
            },
            AddNewRecord?.candidateId
          );

          FormExternalClose();
          form.resetFields();
          dispatch(getCandidate());
        })
        .catch(function (error) {
          console.error(error, "check");
          if (error.response.status && error.response.status === 400) {
            toast.warn(error.response.data);
          } else {
            toast.error("Failed");
          }
        });
    } catch (error) {
      console.error(error, "check");
      if (error.response.status && error.response.status === 400) {
        toast.warn(error.response.data);
      } else {
        toast.error("Failed");
      }
      throw error;
    }
  };

  const UpdateSchedule = (values, id) => {
    request
      .put(`${APIURLS.PUTINTERVIEWSCHEDULE}${id}`, values)
      .then(function (response) {
        toast.info("Interview Schedule Updated Successfully");
        dispatch(getIntSchedule());
        FormExternalClose();
      })
      .catch(function (error) {
        console.log(error, "check");
        if (error.response.status && error.response.status === 400) {
          toast.warn(error.response.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  return (
    <Form
      form={form}
      name={formname}
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
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomInput
            label={"Candidate Name"}
            placeholder={"Candidate Name"}
            name={"userName"}
            disabled={AddNewRecord || updateIntSchedulerecord}
            rules={[
              {
                required: true,
                message: "Please Enter Candidate Name ! ! !",
              },
            ]}
          />
          <CustomInput name={"candidateId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            onChange={handleDepartment}
            label={"Interviewer Department"}
            placeholder={"Interviewer Department"}
            options={DepartmentRoleOptions}
            name={"departmentName"}
            // disabled={updateIntSchedulerecord}
            rules={[
              {
                required: true,
                message: "Please Enter Interviewer Department ! ! !",
              },
            ]}
          />
          <CustomInput name={"departmentId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            onChange={handleInterviewChange}
            label={"Interviewer Name"}
            placeholder={"Interviewer Name"}
            options={employeeOption}
            name={"interviewerName"}
            // disabled={updateIntSchedulerecord}
            rules={[
              {
                required: true,
                message: "Please Enter Interviewer Name ! ! !",
              },
            ]}
          />
          <CustomInput name={"employeeId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date"}
            name={"date"}
            placeholder={"Date"}
            // disabled={updateIntSchedulerecord}
            onChange={handleDate}
            rules={[
              {
                required: true,
                message: "Please Enter Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker
            label={"Start Time"}
            name={"startTime"}
            // disabled={updateIntSchedulerecord}
            onChange={inTimeChange}
            rules={[
              {
                required: true,
                message: "Please Select Start Time",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker
            label={"End Time"}
            name={"endTime"}
            // disabled={updateIntSchedulerecord}
            onChange={outTimeChange}
            rules={[
              {
                required: true,
                message: "Please Select End Time",
              },
            ]}
          />
        </Col>

        {/* {updateIntSchedulerecord && (
          <>
            <Col span={24} md={12}>
              <CustomSelect
                options={interviewTypeOption}
                label={"Interview Type"}
                name={"interviewType"}
                rules={[
                  {
                    required: true,
                    message: "Please enter Interview Type!",
                  },
                ]}
                onChange={ChangeInterviewType}
                initialValue={"scheduled"}
              />
            </Col>

            {showCancellationReason === "cancelled" && (
              <Col span={24} md={12}>
                <CustomTextArea
                  label={"Cancellation Reason"}
                  name={"cancellationReason"}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Cancellation Reason",
                    },
                  ]}
                />
              </Col>
            )}
          </>
        )} */}
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {updateIntSchedulerecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={FormExternalClose}
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
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Form>
  );
};
