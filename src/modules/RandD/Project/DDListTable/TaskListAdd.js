import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import dayjs from "dayjs";
import { RANDDURLS } from "../../../../utils/ApiUrls/RandD";
import request from "../../../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getProject, selectAllProject } from "../ProjectSlice";
import { useSelector } from "react-redux";

export const TaskListAdd = ({ FormExternalClose, formReset, formname }) => {
  const [form] = Form.useForm(); // ----- Define Form
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [updatedDate, setUpdatedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [projectOption, setProjectOption] = useState([]);

  const dispatch = useDispatch();


  const AllProjects = useSelector(selectAllProject);

  console.log(AllProjects, "AllProjects");

  useEffect(() => {
    dispatch(getProject());
  }, []);


  const projectOptions = AllProjects?.map((emp) => ({
    label: emp.projectName,
    value: emp.projectName,
  }));

useEffect(() => {
  form.setFieldsValue({
    projectId: projectOption?.projectId
  })
}, [projectOption])


  const onReset = () => {
    form.resetFields();
    FormExternalClose();
  };

  const handleDueDate = (date) => {
    setDueDate(date);
  };

  const handleUpdatedDate = (date) => {
    setUpdatedDate(date);
  };

  const handleOnChanges = (value) => {
    const SelectedProjectDetails = AllProjects?.find((item) => `${item.projectName}` === value)
    setProjectOption(SelectedProjectDetails)
}

  const status = [
    {
      label: "Todo",
      value: "todo",
    },
    {
      label: "Pending",
      value: "pending",
    },

    {
      label: "Onprogress",
      value: "onProgress",
    },

    {
      label: "Completed",
      value: "completed",
    },
    {
      label: "Hold",
      value: "hold",
    },
    {
      label: "Cancelled",
      value: "cancelled",
    },
  ];

  const priority = [
    {
      label: "High",
      value: "high",
    },
    {
      label: "Highest",
      value: "highest",
    },

    {
      label: "Medium",
      value: "medium",
    },

    {
      label: "Low",
      value: "low",
    },
    {
      label: "Lowest",
      value: "lowest",
    },
  ];

  const onFinish = (values) => {
    console.log(values, "onfinish");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddTask = (values) => {
    request
      .post(`${RANDDURLS.POSTTASKADD}`, values)
      .then(function (response) {
        console.log(response.data, "candidate");
        toast.success("Task Added Successfully");
        form.resetFields();
        // dispatch(getCandidate());
        FormExternalClose();
      })
      .catch(function (error) {
        console.error(error, "check");
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
          <CustomSelect
            label={"Project Name"}
            options={projectOptions || []}
            name={"projectName"}
            onChange={handleOnChanges}
          />
          <CustomInput name={"projectId"} display={'none'} />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Summary"}
            name={"summary"}
            placeholder={"Summary"}
            rules={[
              {
                required: true,
                message: "Please Enter Summary!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={status}
            showSearch={true}
            name={"status"}
            label={"Status"}
            rules={[
              {
                required: true,
                message: "Please Select Status !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Category"}
            placeholder={"Category"}
            name={"category"}
            rules={[
              {
                required: true,
                message: "Please Enter Category !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={status}
            label={"Assignee"}
            name={"employeeId"}
            placeholder={"Enter Assignee"}
            rules={[
              {
                required: true,
                message: "Please select Assignee !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Due Date"}
            name={"dueDate"}
            placeholder={"Due Date"}
            onChange={handleDueDate}
            rules={[
              {
                required: true,
                message: "Please Enter Due Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={priority}
            showSearch={true}
            name={"priority"}
            label={"Priority"}
            rules={[
              {
                required: true,
                message: "Please Select Priority !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Label"}
            name={"label"}
            placeholder={"Label"}
            rules={[
              {
                required: true,
                message: "Please Enter Label!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Updated Date"}
            name={"updatedDate"}
            placeholder={"Updated Date"}
            onChange={handleUpdatedDate}
            rules={[
              {
                required: true,
                message: "Please Enter Updated Date !",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        <Button.Success text={"Submit"} htmlType={"submit"} />
        <Button.Danger text={"cancel"} onClick={() => onReset()} />
      </Flex>

      {/* <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      /> */}
    </Form>
  );
};
