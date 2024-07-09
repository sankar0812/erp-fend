import { Col, Form, Mentions } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import dayjs from "dayjs";
import { CustomUpload } from "../../../../components/Form/CustomUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialEmployee,
  selectAllInitialEmployee,
} from "../../EmployeeDetails/EmployeeSlice";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../../utils/request";
import { getComplaints } from "../ComplaintsSlice";
import {
  selectCurrentId,
  selectCurrentRoleName,
} from "../../../Auth/authSlice";

export const ComplaintsForm = ({
  FormExternalClosee,
  formReset,
  complaintsrecord,
  updatetrigger,
  GetEmpComplaints,
}) => {
  const [form] = useForm();
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedMention, setSelectedMention] = useState([]);

  const RoleName = useSelector(selectCurrentRoleName);
  const Employeeid = useSelector(selectCurrentId);

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger,formReset]);

  useEffect(() => {
    form.setFieldsValue({ employeeId: selectedMention });
  }, [selectedMention]);

  useEffect(() => {
    if (complaintsrecord) {
      setComplaints();
    }
  }, [updateFormData, complaintsrecord, updatetrigger]);

  const setComplaints = () => {
    const complaintDate = new Date(complaintsrecord?.complaintsDate);
    const dateFormat = "YYYY/MM/DD";
    const complainttDate = dayjs(complaintDate).format(dateFormat);

    form.setFieldsValue(complaintsrecord);
    form.setFieldsValue({
      complaintsDate: dayjs(complainttDate, dateFormat),
      complaintsAgainstName: complaintsrecord?.complaintsAgainstName,
      employeeId: complaintsrecord?.complaintsAgainst,
    });
    form.setFieldsValue({ attachments: ImageInitialValue });
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (complaintsrecord?.attachments?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${complaintsrecord?.attachments}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
    

    setUpdateFormData(complaintsrecord);
  }, [complaintsrecord]);

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const onFinish = (values) => {
    if (complaintsrecord) {
      const formData = new FormData();

      if (RoleName === "Training") {
        formData.append("traineeId", Employeeid);
      } else if (
        RoleName === "Employee" ||
        RoleName === "TL" ||
        RoleName === "ProjectHead"
      ) {
        formData.append("employeeId", Employeeid);
      }

      // formData.append("employeeId", Employeeid);
      formData.append("complaintsTitle", values.complaintsTitle);
      formData.append("complaintsAgainstName", values.complaintsAgainstName);
      formData.append(
        "complaintsDate",
        dayjs(values.complaintsDate).format("YYYY-MM-DD")
      );
      formData.append("complaintsAgainst", values.employeeId);
      formData.append("description", values.description);

      // if (values?.attachments[0]?.originFileObj) {
      //   values.attachments.forEach((file) => {
      //     formData.append(`attachments`, file.originFileObj);
      //   });
      // }
      if (values?.attachments.length === 0) {
        formData.append("imageStatus", "false");
    } else if (!values?.attachments[0]?.url) {
      formData.append("imageStatus", "true");
        formData.append("attachments", values?.attachments[0].originFileObj);
    }

      UpdateComplaints(formData, complaintsrecord?.complaintsId);
      console.log([...formData.entries()], "updateeeee");
    } else {
      const formData = new FormData();

      if (RoleName === "Training") {
        formData.append("traineeId", Employeeid);
      } else if (
        RoleName === "Employee" ||
        RoleName === "TL" ||
        RoleName === "ProjectHead"
      ) {
        formData.append("employeeId", Employeeid);
      }

      formData.append("complaintsTitle", values.complaintsTitle);
      formData.append("complaintsAgainstName", values.complaintsAgainstName);
      formData.append(
        "complaintsDate",
        dayjs(values.complaintsDate).format("YYYY-MM-DD")
      );
      formData.append("complaintsAgainst", values.employeeId);
      formData.append("description", values.description);

      if (values?.attachments && values.attachments.length > 0) {
        values.attachments.forEach((file) => {
          formData.append(`attachments`, file.originFileObj);
        });
      }

      AddComplaints(formData);
    }
  };

  const AddComplaints = (values) => {
    console.log(values,'values');
    request
      .post(`${APIURLS.POSTCOMPLAINT}`, values)
      .then(function (response) {
        toast.success("Complaints Added Successfully");
        form.resetFields();
        dispatch(getComplaints());
        GetEmpComplaints();
        FormExternalClosee();
        form.resetFields();
      })
      .catch(function (error) {
        if(error && error.response.status === 400){
          toast.error(error.response.data)
        }
        else{
          toast.error("Failed")
        }
      });
  };

  const UpdateComplaints = (values, id) => {
    request
      .put(
        `${APIURLS.PUTCOMPLAINT}${complaintsrecord?.complaintsId}`,
        values,
        config
      )
      .then(function (response) {
        toast.info("Complaints Updated Successfully");
        dispatch(getComplaints());
        GetEmpComplaints();
        FormExternalClosee();
      })
      .catch(function (error) {
        if(error && error.response.status === 400){
          toast.error(error.response.data)
        }
        else{
          toast.error("Failed")
        }
      });
  };

  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialEmployee());
  }, []);

  const AllEmployeeDetails = useSelector(selectAllInitialEmployee);

  const AllEmployeeOptions = AllEmployeeDetails?.map((emp) => ({
    value: `${emp.userName}`,
    label: `${emp.userName}`,
  }));

  const { getMentions } = Mentions;

  const checkMention = async (_, value) => {
    const mentions = getMentions(value);

    if (mentions.length !== 1) {
      throw new Error("Exactly one mention must be selected!");
    }
  };

  const handleOnChange = (value) => {
    const MentionTypes = AllEmployeeDetails?.find(
      (item) => `@${item.userName} ` == value
    );
    setSelectedMention(MentionTypes?.employeeId);
  };

  return (
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
            name={"complaintsTitle"}
            label={"Complaints Title"}
            placeholder={"Enter Complaints Title"}
            rules={[
              {
                required: true,
                message: "Please Enter Complaints Title ! ! !",
              },
            ]}
          />
        </Col>
        {complaintsrecord && (
          <Col span={24} md={12}>
            <CustomDatePicker
              label={"Complaints Date"}
              name={"complaintsDate"}
              placeholder={"Complaints Date"}
              disabled={'disabled'}
              onChange={handleDate}
              rules={[
                {
                  required: true,
                  message: "Please Select Date ! ! !",
                },
              ]}
            />
          </Col>
        )}

        <Col span={24} md={12}>
          <Form.Item
            name="complaintsAgainstName"
            label="Complaints Against Name"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            rules={[
              {
                validator: checkMention,
              },
            ]}
          >
            <Mentions
              onChange={handleOnChange}
              placeholder={"You can use @ to Mention employee Name"}
              rows={2}
              disabled={complaintsrecord && 'disabled'}
              autoFocus={true} 
              options={AllEmployeeOptions || []}
            />
          </Form.Item>
          <CustomInput name={"employeeId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
            rows={2}
            label={"Description"}
            name={"description"}
            placeholder={"Enter Description"}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Upload Attachment"}
            name={"attachments"}
            maxCount={1}
            accept=".png,.jpeg,.jpg"
            listType="picture-card"
            initialValue={ImageInitialValue}
          />
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {complaintsrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};