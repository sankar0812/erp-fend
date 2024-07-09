import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import {
  getCandidate,
  getDepartmentRole,
  getGroupDiscussion,
  getTaskAssigning,
  selectAllCandidate,
  selectAllDepartmentRole,
} from "../../RecruitmentSlice";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import dayjs from "dayjs";
import { CustomTimePicker } from "../../../../../components/Form/CustomTimePicker";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { BiReset } from "react-icons/bi";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { Approval } from "../../data";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { PatchHooks } from "../../../../../utils/PatchHook";

export const GdForm = ({
  updateGdrecord,
  FormExternalClose,
  formReset,
  formname,
  updatetrigger,
  AddGD,
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

  const dispatch = useDispatch();

  // =======  Get Selected Time =======
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    if (AddGD) {
      form.setFieldsValue({
        userName: AddGD?.userName,
        candidateId: AddGD?.candidateId,
      });
    }
  }, [AddGD, updatetrigger]);

  useEffect(() => {
    if (updateGdrecord) {
      setGD();
    }
  }, [updateGdrecord, updatetrigger]);

  const setGD = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateGdrecord?.date);
    const Datee = dayjs(Dated).format(dateFormat);

    const formattedInTime = updateGdrecord?.time
      ? dayjs(updateGdrecord?.time, "HH:mm:A")
      : null;
    setInTime(updateGdrecord?.time);
    form.setFieldsValue(updateGdrecord);
    setSelectedDate(Datee);
    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
      time: formattedInTime,
    });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
    // const dayOfWeek = dayjs(date).format('dddd');
    // form.setFieldsValue({ day: dayOfWeek });
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

  const onReset = () => {
    form.resetFields();
  };

  const inTimeChange = (_, timeString) => {
    setInTime(timeString);
  };

  const onFinish = (values) => {
    if (updateGdrecord) {
      const NewValue = {
        ...values,
        time: inTime,
        date: selectedDate,
      };
      UpdateGroupDiscussion(NewValue, updateGdrecord?.candidateId);
    } else {
      const NewValue = {
        ...values,
        time: inTime,
        date: selectedDate,
      };
      AddGroupDiscussion(NewValue);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddGroupDiscussion = (values) => {
    request
      .post(`${APIURLS.POSTGROUPDISCUSSION}`, values)
      .then(function (response) {
        toast.success("GD Added Successfully");
        PatchGD({ approvalType: "completed" }, AddGD?.candidateId);
        PatchHooks({ statusLevel: "groupDiscussion" }, AddGD?.candidateId);
        dispatch(getGroupDiscussion());
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

  const PatchGD = (values, id) => {
    request
      .patch(`${APIURLS.PATCHTASKASSIGN}${id}`, values)
      .then(function (response) {
        toast.success("GD Added Successfully");
        dispatch(getTaskAssigning());
        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const UpdateGroupDiscussion = (values, id) => {
    request
      .put(`${APIURLS.PUTGROUPDISCUSSION}${id}`, values)
      .then(function (response) {
        toast.info("GD Updated Successfully");
        dispatch(getGroupDiscussion());
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
            disabled={AddGD || updateGdrecord}
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
          <CustomInput
            label={"Topic"}
            name={"topic"}
            rules={[
              {
                required: true,
                message: "Please Enter Topic!",
              },
            ]}
          />
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
                message: "Please Enter Date!",
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
        {updateGdrecord ? (
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
