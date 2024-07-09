import React, { useEffect, useState } from "react";
import { Col, Form, Upload, message } from "antd";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomTimePicker } from "../../../../../components/Form/CustomTimePicker";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import request, { base } from "../../../../../utils/request";
import {
  getDepartmentRole,
  getIntSchedule,
  getTaskAssigning,
  selectAllDepartmentRole,
} from "../../RecruitmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Approval } from "../../data";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { PatchHooks } from "../../../../../utils/PatchHook";

import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export const TaskAssignForm = ({
  FormExternalClose,
  formReset,
  formname,
  AddTaskRecord,
  updateTaskAssignrecord,
  updatetrigger,
}) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [fileName, setFileName] = useState();
  
  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});

  const dispatch = useDispatch();

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    if (updateTaskAssignrecord) {
      setTaskValues();
    }
  }, [updateFormData, updatetrigger, updateTaskAssignrecord]);

  const setTaskValues = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateTaskAssignrecord?.date);
    const Datee = dayjs(Dated).format(dateFormat);

    const formattedInTime = updateTaskAssignrecord?.startTime
      ? dayjs(updateTaskAssignrecord?.startTime, "HH:mm:A")
      : null;
    const formattedOutTime = updateTaskAssignrecord?.endTime
      ? dayjs(updateTaskAssignrecord?.endTime, "HH:mm:A")
      : null;

    setInTime(updateTaskAssignrecord?.startTime);
    setOutTime(updateTaskAssignrecord?.endTime);
    form.setFieldsValue(updateTaskAssignrecord);

    setSelectedDate(Datee);
    setFileName(updateTaskAssignrecord?.fileName)
    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
      startTime: formattedInTime,
      endTime: formattedOutTime,
    });
    form.setFieldsValue({ userName: updateTaskAssignrecord?.userName });
    form.setFieldsValue({ candidateId: updateTaskAssignrecord?.candidateId });
    form.setFieldsValue({ taskFile: ImageInitialValue });
  };

  useEffect(() => {
    if (updateTaskAssignrecord?.taskUrl) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${updateTaskAssignrecord?.taskUrl}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }

    setUpdateFormData(updateTaskAssignrecord);
  }, [updateTaskAssignrecord]);

  useEffect(() => {
    if (AddTaskRecord) {
      form.setFieldsValue({
        userName: AddTaskRecord?.userName,
        candidateId: AddTaskRecord?.candidateId,
      });
    }
  }, [AddTaskRecord, updatetrigger]);

  const handleDate = (date) => {
    setSelectedDate(date);
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

  const outTimeChange = (_, timeString) => {
    setOutTime(timeString);
  };

  const ChangeApprovalId = (e) => {
    // console.log(e, "wwwwwwwwww");
  };

  const handleInterviewChange = (value) => {
    form.setFieldsValue({ employeeId: value });
  };

  const onFinish = (values) => {
    if (updateTaskAssignrecord) {
      const formData = new FormData();
      formData.append("candidateId", values.candidateId);
      formData.append("departmentId", values.departmentId);
      formData.append("employeeId", values.employeeId);
      formData.append("date", selectedDate);
      formData.append("startTime", inTime);
      formData.append("endTime", outTime);
      formData.append("taskPriority", values.taskPriority);
      formData.append("fileName", fileName);

      if (values?.taskFile[0].originFileObj) {
        values.taskFile.forEach((file) => {
          formData.append(`taskFile`, file.originFileObj);
        });
      }

      UpdateTaskAssign(formData, updateTaskAssignrecord?.candidateId);
    } else {
      const formData = new FormData();
      formData.append("candidateId", values.candidateId);
      formData.append("departmentId", values.departmentId);
      formData.append("employeeId", values.employeeId);
      formData.append("date", selectedDate);
      formData.append("startTime", inTime);
      formData.append("endTime", outTime);
      formData.append("taskPriority", values.taskPriority);
      formData.append("taskFile", pdfUrl);
      formData.append("fileName", fileName);

      if (values?.taskFile && values.taskFile.length > 0) {
        values.taskFile.forEach((file) => {
          formData.append(`taskFile`, file.originFileObj);
        });
      }
      AddTaskAssign(formData);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddTaskAssign = (values) => {
    request
      .post(`${APIURLS.POSTTASKASSIGNING}`, values)
      .then(function (response) {
        toast.success("task assigning Added Successfully");
        PatchTaskAssign(
          { interviewType: "completed" },
          AddTaskRecord?.candidateId
        );
        PatchHooks({ statusLevel: "taskAssign" }, AddTaskRecord?.candidateId);
        dispatch(getTaskAssigning());
        dispatch(getIntSchedule());
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

  const UpdateTaskAssign = (values, id) => {
    request
      .put(`${APIURLS.PUTTASKASSIGNING}${id}`, values)
      .then(function (response) {
        toast.success("task assigning updated Successfully");
        dispatch(getTaskAssigning());
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

  const PatchTaskAssign = (values, id) => {
    request
      .patch(`${APIURLS.PATCHINTERVIEWSCHEDULE}${id}`, values)
      .then(function (response) {
        toast.success("task assigning Added Successfully");
        dispatch(getIntSchedule());
        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };
  const TaskPriority = [
    {
      label: "High",
      value: "high",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Low",
      value: "low",
    },
  ];

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handlePic = (value) => {
    setFileName(value.file.name.slice(-3))
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
            disabled={AddTaskRecord || updateTaskAssignrecord}
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
            label={"Task Assignee Department"}
            placeholder={"Task Assignee Department"}
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
            label={"Task Assignee"}
            placeholder={"Task Assignee"}
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
            label={"Start Time"}
            name={"startTime"}
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
            onChange={outTimeChange}
            rules={[
              {
                required: true,
                message: "Please Select End Time",
              },
            ]}
          />
        </Col>

        {/* <Col span={24} md={12}>
          <CustomSelect
            options={Approval}
            label={"Approval"}
            name={"approvalType"}
            rules={[
              {
                required: true,
                message: "Please select Approval !",
              },
            ]}
            onChange={ChangeApprovalId}
          />
        </Col> */}

        <Col span={24} md={12}>
          <CustomSelect
            options={TaskPriority}
            label={"Task Priority"}
            name={"taskPriority"}
            rules={[
              {
                required: true,
                message: "Please select Task Priority !",
              },
            ]}
            onChange={ChangeApprovalId}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Task Upload"}
            name={"taskFile"}
            onChange={handlePic}
            accept={"application/pdf"}
            initialValue={ImageInitialValue}
            maxCount={1}
            rules={[
              {
                required: true,
                message: "Please Select Task Upload",
              },
            ]}
          />
        </Col>

      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        <Button.Success text={"Submit"} htmlType={"submit"} />
        <Button.Danger text={"cancel"} onClick={() => onReset()} />
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
