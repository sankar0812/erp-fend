import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { BiReset } from "react-icons/bi";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { getHRRound, getOffer } from "../../RecruitmentSlice";
import { PatchHooks } from "../../../../../utils/PatchHook";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";

export const OfferForm = ({
  FormExternalClose,
  formReset,
  formname,
  updateOfferrecord,
  updatetrigger,
  AddOfferDetails,
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

  const [joiningDate, setJoiningDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [expiryDate, setExpiryDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  useEffect(() => {
    if (AddOfferDetails) {
      form.setFieldsValue({
        userName: AddOfferDetails?.userName,
        candidateId: AddOfferDetails?.candidateId,
      });
    }
  }, [AddOfferDetails, updatetrigger]);

  useEffect(() => {
    if (updateOfferrecord) {
      setOffers();
    }
  }, [updateOfferrecord, updatetrigger]);

  const setOffers = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateOfferrecord?.date);
    const JoinedDated = new Date(updateOfferrecord?.joiningDate);
    const ExpiryDated = new Date(updateOfferrecord?.expiryDate);
    const Datee = dayjs(Dated).format(dateFormat);
    const JoinedDatee = dayjs(JoinedDated).format(dateFormat);
    const ExpiryDatee = dayjs(ExpiryDated).format(dateFormat);

    form.setFieldsValue(updateOfferrecord);

    setJoiningDate(JoinedDatee);
    setExpiryDate(ExpiryDatee);
    setSelectedDate(Datee);
    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
      joiningDate: dayjs(JoinedDatee, dateFormat),
      expiryDate: dayjs(ExpiryDatee, dateFormat),
    });
    form.setFieldValue({ userName: updateOfferrecord.employeeName });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleJoiningDate = (date) => {
    setJoiningDate(date);
  };

  const handleExpiryDate = (date) => {
    setExpiryDate(date);
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

  const onFinish = (values) => {
    if (updateOfferrecord) {
      const NewValue = {
        ...values,
        date: selectedDate,
        joiningDate: joiningDate,
        expiryDate: expiryDate,
      };
      UpdateOffers(NewValue, updateOfferrecord?.candidateId);
    } else {
      const NewValue = {
        ...values,
        date: selectedDate,
        joiningDate: joiningDate,
        expiryDate: expiryDate,
      };
      AddOffers(NewValue);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddOffers = (values) => {
    request
      .post(`${APIURLS.POSTOFFERS}`, values)
      .then(function (response) {
        toast.success("Offer Added Successfully");

        PatchOffer({ approvalType: "completed" }, AddOfferDetails?.candidateId);
        PatchHooks({ statusLevel: "offer" }, AddOfferDetails?.candidateId);
        dispatch(getOffer());
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

  const PatchOffer = (values, id) => {
    request
      .patch(`${APIURLS.PATCHHRINTERVIEW}${id}`, values)
      .then(function (response) {
        toast.success("offer Added Successfully");
        dispatch(getHRRound());
        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  }; 

  const UpdateOffers = (values, id) => {
    request
      .put(`${APIURLS.PUTOFFERS}${id}`, values)
      .then(function (response) {
        toast.info("Offer Updated Successfully");
        dispatch(getOffer());
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
            disabled={AddOfferDetails || updateOfferrecord}
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
          <CustomDatePicker
            label={"Joining Date"}
            name={"joiningDate"}
            placeholder={"Joining Date"}
            onChange={handleJoiningDate}
            rules={[
              {
                required: true,
                message: "Please Enter Joining Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Expiry Date"}
            name={"expiryDate"}
            placeholder={"Expiry Date"}
            onChange={handleExpiryDate}
            rules={[
              {
                required: true,
                message: "Please Enter Expiry Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Salary Package"}
            name={"salaryPackage"}
            rules={[
              {
                required: true,
                message: "Please Enter Salary Package!",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {updateOfferrecord ? (
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
