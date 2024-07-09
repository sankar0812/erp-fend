import React, { useEffect, useState } from "react";
import { Col, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomInput } from "../../../../components/Form/CustomInput";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import {
  getInitialEmployee,
  getLeave,
  selectAllInitialEmployee,
} from "../../EmployeeDetails/EmployeeSlice";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";

export const LeaveForm = ({ leaveRecord, FormExternalCloseee, formname }) => {
  // ----- Define Form
  const [form] = useForm();

  const [approval, setApproval] = useState([])

    const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getInitialEmployee());
  //   }, []);

  //   const AllEmployeeDetails = useSelector(selectAllInitialEmployee);

  //   const AllEmployeeOptions = AllEmployeeDetails?.map((emp) => ({
  //     label: emp.employeeName,
  //     value: emp.employeeId,
  //   }));

  //   console.log(AllEmployeeDetails, "AllEmployeeOptionsAllEmployeeOptions");
  // useEffect(() => {
  //     form.setFieldsValue(rolerecord)
  // }, [rolerecord, updatetrigger, form])

  // const UpdateRoll = (values) => {
  //     request.put(`role/edit/${rolerecord?.roleId}`, values)
  //         .then(function (response) {
  //             toast.info('Roll Details Updated Successfully')
  //             FormExternalClose()
  //         })
  //         .catch(error => { })
  // }

  const ApprovalOptions = [
    {
      label: "Approval",
      value: "approved",
    },
    {
      label: "Cancelled",
      value: "rejected",
    },
  ];

  const onFinish = (values) => {
    UpdateLeave(values,leaveRecord?.employeeLeaveId)
  };

  const UpdateLeave = (values, id) => {
    request.put(`${APIURLS.PUTLEAVE}/${id}`, values)
        .then(function (response) {
            toast.info("Profile Updated Successfully")
            dispatch(getLeave())
            FormExternalCloseee()
            form.resetFields();
        })
        .catch(function (error) { });
}

  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

  const handleChange = (value) => {
    setApproval(value)
  }

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomRow space={[24, 24]}>
          <Col span={24} md={12}>
            <CustomSelect
              label={"Approval"}
              placeholder={"Approval"}
              options={ApprovalOptions}
              onChange={handleChange}
              name={"leaveType"}
              rules={[
                {
                  required: true,
                  message: "Please Select Approval ! ! !",
                },
              ]}
            />
          </Col>

          {approval === "rejected" && (
            <Col span={24} md={12}>
              <CustomTextArea
                label={"Cancel reason"}
                placeholder={"Enter Cancel Reason"}
                name={"cancellationReason"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Reason ! ! !",
                  },
                ]}
              />
            </Col>
          )}
        </CustomRow>
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        <Button.Success text={"Submit"} htmlType={"submit"} />
        <Button.Danger text={"Reset"} onClick={() => onReset()} />
      </Flex>
    </Form>
  );
};
