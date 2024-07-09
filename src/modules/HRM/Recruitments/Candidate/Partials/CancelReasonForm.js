import { Form } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import request from '../../../../../utils/request';
import { CustomTextArea } from '../../../../../components/Form/CustomTextArea';
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import { toast } from 'react-toastify';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { getCandidate } from '../../RecruitmentSlice';

export const CancelReasonForm = ({
    formname,
  FormExternalClose,
  CancelRecord,
}) => {
    const [form] = Form.useForm(); // ----- Define Form
    const dispatch = useDispatch();
  
    const onReset = () => {
      form.resetFields();
    };
  
    const onFinish = (values) => {
      const NewValue = {
        ...values,
        approvalType: "cancelled",
      };
      CancelSchedule(NewValue, CancelRecord?.candidateId);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    const CancelSchedule = (values, id) => {
      request
        .patch(`${APIURLS.PATCHCANDIDATECANCEL}${id}`, values)
        .then(function (response) {
          toast.success("Candidate Cancelled Successfully");
          dispatch(getCandidate());
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
      <CustomTextArea
        rows={2}
        label={"Cancellation Reason"}
        name={"cancellationReason"}
        rules={[
          {
            required: true,
            message: "Please Select Cancellation Reason",
          },
        ]}
      />

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        <Button.Success text={"Submit"} htmlType={"submit"} />
        <Button.Danger text={"cancel"} onClick={() => onReset()} />
      </Flex>
    </Form>
  );
}
