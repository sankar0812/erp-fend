import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { CustomInput } from '../../../../../components/Form/CustomInput';
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import request from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';
import { getExpenseType } from '../../AccountsSlice';
import { useDispatch } from 'react-redux';

export const AddExpenseType = ({ formname, FormExternalCloses, ExpenseTyperecord,updateTrigger }) => {
    const [form] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [form, updateTrigger]);

  useEffect(() => {
    form.setFieldsValue(ExpenseTyperecord);
  }, [ExpenseTyperecord, updateTrigger]);

//   const UpdateDesignation = (values) => {
//     request
//       .put(
//         `${APIURLS.PUTDESIGNATION}${designationrecord?.designationId}`,
//         values
//       )
//       .then(function (response) {
//         toast.info("Designation Details Updated Successfully");
//         dispatch(getDesignation());
//         FormExternalClosee();
//       })
//       .catch((error) => {});
//   };

  const AddExpenseTypes = (value) => {
    request
      .post(`${APIURLS.POSTEXPENSETYPE}`, value)
      .then(function (response) {
        toast.success("Expense Type Added Successfully");
        FormExternalCloses();
        dispatch(getExpenseType());
        form.resetFields();
      })
      .catch((error) => {});
  };

  const EditExpenseTypes = (value) => {
    request
      .put(`${APIURLS.PUTEXPENSETYPE}${ExpenseTyperecord?.expenseTypeId}`, value)
      .then(function (response) {
        toast.success("Expense Type Updated Successfully");
        FormExternalCloses();
        dispatch(getExpenseType());
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    if (ExpenseTyperecord) {
      EditExpenseTypes(values);
    }
    else{
      AddExpenseTypes(values);
    }
  };
  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      name={formname}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Expense Type"}
          placeholder={"Add Expense Type"}
          name={"expenseType"}
          rules={[
            {
              required: true,
              message: "Please Enter Expense Type !!!",
            },
          ]}
        />
        {/* <CustomInput name={"designationId"} display={"none"} /> */}
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {/* {designationrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
            />
          </>
        ) : ( */}
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        {/* )} */}
      </Flex>
    </Form>
  );
}
