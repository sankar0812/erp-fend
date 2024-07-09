import React, { useEffect, useState } from "react";
import { CustomModal } from "../../../../../components/CustomModal";
import { Col, Form } from "antd";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomTimePicker } from "../../../../../components/Form/CustomTimePicker";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Approval } from "../../data";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { BiReset } from "react-icons/bi";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import {
  getDepartmentRole,
  getGroupDiscussion,
  getHRRound,
  selectAllDepartmentRole,
} from "../../RecruitmentSlice";
import request from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { PatchHooks } from "../../../../../utils/PatchHook";

export const HrInterviewForm = ({
  FormExternalClose,
  formReset,
  formname,
  updateHrInterviewrecord,
  updatetrigger,
  AddHrRound,
}) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeOption, setEmployeeOption] = useState([]);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [ImageInitialValue, setImageInitialValue] = useState([]);

  const dispatch = useDispatch();

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    if (AddHrRound) {
      form.setFieldsValue({
        userName: AddHrRound?.userName,
        candidateId: AddHrRound?.candidateId,
      });
    }
  }, [AddHrRound, updatetrigger]);

  useEffect(() => {
    if (updateHrInterviewrecord) {
      setHR();
    }
  }, [updateHrInterviewrecord, updatetrigger]);

  const setHR = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateHrInterviewrecord?.date);
    const Datee = dayjs(Dated).format(dateFormat);

    const formattedInTime = updateHrInterviewrecord?.time
      ? dayjs(updateHrInterviewrecord?.time, "HH:mm:A")
      : null;
    setInTime(updateHrInterviewrecord?.time);
    form.setFieldsValue(updateHrInterviewrecord);
    setSelectedDate(Datee);
    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
      time: formattedInTime,
    });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
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

  useEffect(() => {
    dispatch(getDepartmentRole());
  }, []);

  const AllDepartmentRole = useSelector(selectAllDepartmentRole);

  const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
    label: emp.departmentName,
    value: emp.departmentId,
  }));

  const onReset = () => {
    form.resetFields();
  };

  const inTimeChange = (_, timeString) => {
    setInTime(timeString);
  };

  const handleDepartment = (e) => {
    form.setFieldsValue({ employeeName: null });
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

  const onFinish = (values) => {
    if (updateHrInterviewrecord) {
      const NewValue = {
        ...values,
        time: inTime,
        date: selectedDate,
      };
      UpdateHrRounds(NewValue, updateHrInterviewrecord?.candidateId);
    }
    else{
      const NewValue = {
        ...values,
        time: inTime,
        date: selectedDate,
      };
      AddHrRounds(NewValue);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddHrRounds = (values) => {
    request
      .post(`${APIURLS.POSTHRINTERVIEW}`, values)
      .then(function (response) {
        toast.success("Hr Round Added Successfully");

        PatchHR({ approvalType: "completed" }, AddHrRound?.candidateId);
        PatchHooks({ statusLevel: "hrRound" }, AddHrRound?.candidateId);
        dispatch(getGroupDiscussion());
        dispatch(getHRRound());

        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        console.error(error, "check");
        if (error.response.status && error.response.status === 400) {
          toast.warn(error.response.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const PatchHR = (values, id) => {
    request
      .patch(`${APIURLS.PATCHGROUPDISCUSSION}${id}`, values)
      .then(function (response) {
        toast.success("GD Added Successfully");
        dispatch(getGroupDiscussion());
        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const UpdateHrRounds = (values, id) => {
    request
      .put(`${APIURLS.PUTHRINTERVIEW}${id}`, values)
      .then(function (response) {
        toast.info("HR Details Updated Successfully");
        dispatch(getHRRound());
        FormExternalClose();
      })
      .catch(function (error) {
        console.log(error,'error');
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
            disabled={AddHrRound || updateHrInterviewrecord}
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
            name={"employeeName"}
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
            label={"Time"}
            name={"time"}
            onChange={inTimeChange}
            rules={[
              {
                required: true,
                message: "Please Select Time",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea label={"Feedback"} name={"feedback"} />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {updateHrInterviewrecord ? (
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
