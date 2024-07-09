import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomModal } from "../../../../../components/CustomModal";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { PatchHooks } from "../../../../../utils/PatchHook";
import { getAppointment, getOffer } from "../../RecruitmentSlice";

export const AppointmentForm = ({
  FormExternalClose,
  formReset,
  formname,
  updateAppointmentrecord,
  updatetrigger,
  AddAppointments
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

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    if (AddAppointments) {
      form.setFieldsValue({
        userName: AddAppointments?.userName,
        candidateId: AddAppointments?.candidateId,
      });
    }
  }, [AddAppointments, updatetrigger]);

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

  //   useEffect(() => {
  //     dispatch(getCandidate());
  //   }, []);

  //   const AllCandidate = useSelector(selectAllCandidate);

  //   const AllCandidateOptions = AllCandidate?.map((emp) => ({
  //     label: emp.userName,
  //     value: emp.candidateId,
  //   }));

  const onReset = () => {
    form.resetFields();
  }; 

  const onFinish = (values) => {
    const NewValue = {
      ...values,
      date: selectedDate
    }
    AddAppointment(NewValue)
  };

  const onFinishFailed = (errorInfo) => {};

  const AddAppointment = (values) => {
    request
      .post(`${APIURLS.POSTAPPOINTMENT}`, values)
      .then(function (response) {
        toast.success("Appointment Added Successfully");

        PatchAppointment({ approvalType: "completed" }, AddAppointments?.candidateId);
        PatchHooks({ statusLevel: "appointed" }, AddAppointments?.candidateId);
        dispatch(getOffer());
        dispatch(getAppointment());

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

  const PatchAppointment = (values, id) => {
    request
      .patch(`${APIURLS.PATCHOFFERS}${id}`, values)
      .then(function (response) {
        toast.success("Appointment Added Successfully");
        dispatch(getOffer());
        FormExternalClose();
        form.resetFields();
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
      <CustomInput
            label={"Candidate Name"}
            placeholder={"Candidate Name"}
            name={"userName"}
            disabled={AddAppointments || updateAppointmentrecord}
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
          <CustomInput
            label={"Position"}
            name={"position"}
            rules={[
              {
                required: true,
                message: "Please Enter Position !",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {updateAppointmentrecord ? (
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
