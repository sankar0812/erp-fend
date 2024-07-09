import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { AddExpenseType } from "./AddExpenseType";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { useDispatch } from "react-redux";
import {
  getExpense,
  getExpenseType,
  selectAllExpenseType,
} from "../../AccountsSlice";
import { useSelector } from "react-redux";
import request from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";

export const AddExpense = ({
  formname,
  FormExternalClosess,
  updateTrigger,
  Expenserecord,
}) => {
  const [form] = Form.useForm(); // ----- Define Form

  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formReset, setFormReset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [formReset,updateTrigger]);

  useEffect(() => {
    if (Expenserecord) {
      setExpense();
    }
  }, [Expenserecord, updateTrigger]);

  const setExpense = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(Expenserecord?.date);
    const Datee = dayjs(Dated).format(dateFormat);

    form.setFieldsValue(Expenserecord);

    form.setFieldsValue({
      date: dayjs(Datee, dateFormat),
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  useEffect(() => {
    dispatch(getExpenseType());
  }, []);

  const AllExpenseTypes = useSelector(selectAllExpenseType);

  const ExpenseTypesOptions = AllExpenseTypes?.map((item) => ({
    label: item?.expenseType,
    value: item?.expenseTypeId,
  }));

  //   useEffect(() => {
  //     form.setFieldsValue({
  //       projectId: projectOption?.projectId
  //     })
  //   }, [projectOption])

  const onReset = () => {
    form.resetFields();
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

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

    if (Expenserecord) {
      const newValue = {
        ...values,
        date: selectedDate,
      };
      EditExpense(newValue, Expenserecord?.expenseId);
    } else {
      const newValue = {
        ...values,
        date: selectedDate,
      };
      AddExpense(newValue);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const ExpenseTypeModal = () => {
    setModalTitle("Add Expense Type Here");
    setModalContent(
      <AddExpenseType
        FormExternalCloses={FormExternalClose}
        formname={"AddExpenseType"}
      />
    );
    showModal();
  };

  const AllExpenseType = [
    {
      label: "sgdfg",
      value: "sdfggdf",
    },
  ];

  const AddExpense = (value) => {
    request
      .post(`${APIURLS.POSTEXPENSE}`, value)
      .then(function (response) {
        toast.success("Expense Added Successfully");
        FormExternalClosess();
        dispatch(getExpense());
        form.resetFields();
      })
      .catch((error) => {});
  };

  const EditExpense = (value, id) => {
    request
      .put(`${APIURLS.PUTEXPENSE}${id}`, value)
      .then(function (response) {
        toast.success("Expense Updated Successfully");
        FormExternalClosess();
        dispatch(getExpense());
      })
      .catch((error) => {});
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
            label={"Expense Name"}
            name={"expenseName"}
            placeholder={"Expense Name"}
            rules={[
              {
                required: true,
                message: "Please Enter Expense Name!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDropSelect
            options={ExpenseTypesOptions}
            onButtonClick={ExpenseTypeModal}
            showSearch={true}
            buttonLabel="Add Expense Type"
            label={"Expense Type"}
            name={"expenseTypeId"}
            placeholder={"Select Expense Type"}
            rules={[
              {
                required: true,
                message: "Please Select Designation!",
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
                message: "Please Enter Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Amount"}
            placeholder={"Amount"}
            name={"amount"}
            rules={[
              {
                required: true,
                message: "Please Enter Amount !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Description"}
            name={"description"}
            placeholder={"Description"}
            rules={[
              {
                required: true,
                message: "Please Enter Description!",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {Expenserecord ? (
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
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Form>
  );
};
