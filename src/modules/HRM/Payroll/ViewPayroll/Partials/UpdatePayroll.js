import { Col, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { getPayroll, getTraineePayroll } from "../../PayrollSlice";

export const UpdatePayroll = ({
  updatepayrollrecord,
  FormExternalClosee,
  updatetrigger,
  updateTraineepayrollrecord,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [deductionsval, setDeductionsVal] = useState(0);
  const [netPay, setNetPay] = useState(0);
  const [disablebutton, setDisableButton] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // useEffect(() => {
  //   form.resetFields()
  // }, [trigger,updatetrigger])

  useEffect(() => {
    if (updatepayrollrecord) {
      setBasicSalary();
    } else if (updateTraineepayrollrecord) {
      setBasicSalary();
    }
  }, [updatepayrollrecord, updatetrigger, updateTraineepayrollrecord]);

  const setBasicSalary = () => {
    if (updatepayrollrecord) {

      const payDate = new Date(updatepayrollrecord?.paymentDate);
      const dateFormat = "YYYY/MM/DD";
      const paymernttDate = dayjs(payDate).format(dateFormat);
      form.setFieldsValue(updatepayrollrecord);
      form.setFieldsValue({ paymentDate: dayjs(paymernttDate, dateFormat) });
    } 
    else if (updateTraineepayrollrecord) {

      const payDate = new Date(updateTraineepayrollrecord?.paymentDate);
      const dateFormat = "YYYY/MM/DD";
      const paymernttDate = dayjs(payDate).format(dateFormat);
      form.setFieldsValue(updateTraineepayrollrecord);
      form.setFieldsValue({ paymentDate: dayjs(paymernttDate, dateFormat) });
    }
  };

  const handleDeductions = (value) => {

    const BasicPayVal = parseFloat(form.getFieldValue("payrollAmount"));
    const DeductionVal = parseFloat(form.getFieldValue("deductions"));

    if (DeductionVal > BasicPayVal) {
      toast.warn("Deduction Amount Can`t Be More Than Net Pay");
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const UpdateTheBasicSalary = (values) => {
    request
      .put(`${APIURLS.PUTPAYROLL}${updatepayrollrecord?.payrollTypeId}`, values)
      .then(function (response) {
        toast.info("Payroll Updated Successfully");
        dispatch(getPayroll());
        FormExternalClosee();
      })
      .catch((error) => {});
  };

  const UpdateTraineePayroll = (values) => {
    request
      .put(`${APIURLS.PUTTRAINEEPAYROLL}${updateTraineepayrollrecord?.payrollTypeId}`, values)
      .then(function (response) {
        toast.info("Trainee Payroll Updated Successfully");
        dispatch(getTraineePayroll());
        FormExternalClosee();
      })
      .catch((error) => {
        console.log(error,'error');
      });
  };

  const onFinish = (value) => {
    if (updatepayrollrecord) {
      UpdateTheBasicSalary(value);
    } else if (updateTraineepayrollrecord) {
      UpdateTraineePayroll(value)
    }
    
  };

  const onFinishFailed = (value) => {};

  return (
    <div>
      <Form
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomInput
              name={"userName"}
              label={"Staff Name"}
              disabled={"true"}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              name={"departmentName"}
              label={"Department Name"}
              disabled={"true"}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              name={"designationName"}
              label={"Designation Name"}
              disabled={"true"}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomDatePicker
              name={"paymentDate"}
              label={"Payment Date"}
              disabled={"true"}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              name={"payrollAmount"}
              label={"Basic Salary"}
              disabled={"true"}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber name={"allowance"} label={"Allowance"} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              name={"deductions"}
              label={"Deduction"}
              onChange={handleDeductions}
            />
          </Col>

          {/* <Col span={24} md={12}>
            <CustomInputNumber
              name={"netPay"}
              label={"Net Pay"}
              disabled={"true"}
            />
          </Col> */}

          {/* <Col span={24} md={12}>
            <CustomTextArea name={"reason"} label={"Reason"} />
          </Col> */}
        </CustomRow>

        <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
          <Button.Primary
            text={"Update"}
            htmlType={"submit"}
            disabled={disablebutton}
          />
          <Button.Danger text={"Cancel"} onClick={() => FormExternalClosee()} />
        </Flex>
      </Form>
    </div>
  );
};
