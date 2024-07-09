import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { selectCurrentId } from "../../../../../Auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import Button from "../../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { CustomModal } from "../../../../../../components/CustomModal";
import request from "../../../../../../utils/request";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { getResignation } from "../../ResignationSlice";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { CustomDatePicker } from "../../../../../../components/Form/CustomDatePicker";

export const ManagerResignationForm = ({
  FormExternalClosee,
  resignationrecord,
  updatetrigger,
}) => {
  const [form] = Form.useForm();
  const [formReset, setFormReset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [fromDate, setFromDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [approval, setApproval] = useState([]);


  const dispatch = useDispatch();

  const Employeeid = useSelector(selectCurrentId);

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
  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const onFinish = (values) => {
    const Newvalue = {
      type: values?.type,
      fromDate: fromDate,
      toDate: toDate,
    };
    UpdateResignation(Newvalue);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const UpdateResignation = (values, id) => {
    request
      .put(
        `${APIURLS.RESIGNATIONEDIT}${resignationrecord?.resignationsId}`,
        values
      )
      .then(function (response) {
        toast.info("Resignation Updated Successfully");
        dispatch(getResignation());
        FormExternalClosee();
      })
      .catch(function (error) {
        console.error(error, 'check');
        toast.error(error.response.data);
    });
  };

  //   const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

  // useEffect(() => {
  //     dispatch(getInitialEmployee())
  // }, [])

  useEffect(() => {
    if (resignationrecord) {
      const fromDate = new Date(resignationrecord?.fromDate);

      const dateFormat = "YYYY-MM-DD";
      const FromDated = dayjs(fromDate).format(dateFormat);

      form.setFieldsValue({
        fromDate: dayjs(FromDated),
      });
    }
  }, [resignationrecord, updatetrigger]);

  const TypeOptions = [
    {
      label: "Approval",
      value: "approved",
    },
  ];

  const handleChange = (value) => {
    setApproval(value);
  };

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
        <Col span={24} md={12}>
          <CustomSelect
            label={"Approval"}
            placeholder={"Approval"}
            options={TypeOptions}
            onChange={handleChange}
            name={"type"}
            rules={[
              {
                required: true,
                message: "Please Select Type ! ! !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            onChange={handleFromDate}
            disabled={'disabled'}
            name={"fromDate"}
            label={"From Date"}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            onChange={handleToDate}
            name={"toDate"}
            label={"To Date"}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {resignationrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={FormExternalClosee}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
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
