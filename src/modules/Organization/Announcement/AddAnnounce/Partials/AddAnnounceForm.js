import React, { useEffect, useState } from "react";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form } from "antd";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import request, { base } from "../../../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { toast } from "react-toastify";
import { getBusinessProfile } from "../../../../BusinessProfile/BusinessSlice";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { getAnnouncement } from "../../announceSlice";
import {
  getInitialEmployee,
  selectAllInitialEmployee,
} from "../../../../HRM/EmployeeDetails/EmployeeSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { selectCurrentRoleName } from "../../../../Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";

export const AddAnnounceForm = ({
  formname,
  FormExternalClose,
  formReset,
  updateAnnounceRecord,
  updatetrigger,
}) => {

  // ----- Define Form
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RoleName = useSelector(selectCurrentRoleName);

  const [fromDate, setFromDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [fileName, setFileName] = useState();
  const [checkeds, setCheckeds] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [form, formReset]);

  useEffect(() => {
    dispatch(getBusinessProfile());
  }, []);

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    dispatch(getInitialEmployee());
  }, []);

  const AllEmployeeeId = useSelector(selectAllInitialEmployee);

  const employeeoptions = AllEmployeeeId?.map((value) => ({
    label: value.userName,
    value: value.employeeId,
  }));

  const publishoptions = [
    {
      label: "Published",
      value: "published",
    },
    {
      label: "Un Published",
      value: "unpublished",
    },
  ];

  useEffect(() => {
    if (updateAnnounceRecord) {
      const frommDate = new Date(updateAnnounceRecord?.fromDate);
      const tooDate = new Date(updateAnnounceRecord?.toDate);
      const dateFormat = "YYYY-MM-DD";
      const fromDate = dayjs(frommDate).format(dateFormat);
      const toDate = dayjs(tooDate).format(dateFormat);

      setFromDate(fromDate);
      setToDate(toDate);
      setFileName(updateAnnounceRecord?.fileName)

      form.setFieldsValue(updateAnnounceRecord)

      form.setFieldsValue({
        // announcementId: updateAnnounceRecord?.announcement_id,
        employeeId: updateAnnounceRecord?.employeeId,
        fromDate: dayjs(fromDate, dateFormat),
        informedBy: updateAnnounceRecord?.informedBy,
        publish: updateAnnounceRecord?.publish,
        title: updateAnnounceRecord?.title,
        toDate: dayjs(toDate, dateFormat),
      });
      form.setFieldsValue({ attachment: ImageInitialValue });
    }
  }, [updateAnnounceRecord, updatetrigger, form, ImageInitialValue]);

  const handleFromdate = (e) => {
    setFromDate(e);
  };

  const handleTodate = (e) => {
    setToDate(e);
  };

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  useEffect(() => {
    if (updateAnnounceRecord?.attachment?.length > 0) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${updateAnnounceRecord?.attachment}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }
    form.setFieldsValue({ attachment: ImageInitialValue });
  }, [updateAnnounceRecord]);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const AddAnnouncement = (values) => {
    request
      .post(`${APIURLS.POSTANNOUNCE}`, values)
      .then(function (response) {
        // dispatch(getBusinessProfile());
        // FormExternalClose();
        form.resetFields();
        toast.success("Announcement Added Successfully");
        navigate(-1);
      })

      .catch(function (error) {
        console.log(error, "errorvvv");
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data) {
              toast.warn(error.response.data);
            }
          } else {
            toast.error("Invalid input.");
          }
        } else {
          toast.error("Failed");
        }
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      informedBy: RoleName,
    });
  }, []);

  const UpdateAnnouncement = (values) => {
    request
      .put(
        `${APIURLS.PUTANNOUNCE}/${updateAnnounceRecord?.announcementId}`,
        values,
        config
      )
      .then(function (response) {
        FormExternalClose();
        form.resetFields();
        toast.info("Announcement Updated Successfully");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          if (error.response.data) {
            if (error.response.data) {
              toast.warn(error.response.data);
            }
          } else {
            toast.error("Invalid input.");
          }
        } else {
          toast.error("Failed");
        }
      });
  };

  const onFinish = (values) => {
    const newValues = { ...values, fromDate: fromDate, toDate: toDate };
    if (updateAnnounceRecord) {
      const formData = new FormData(); 
      formData.append("title", newValues?.title);
      formData.append("fromDate", newValues?.fromDate);
      formData.append("toDate", newValues?.toDate);
      formData.append("informedBy", newValues?.informedBy);
      formData.append("publish", newValues?.publish);
      formData.append("description", newValues?.description || "");
      formData.append("fileName", fileName);

      if (values?.attachment.length === 0) {
        formData.append("imageStatus", "false");
      } else if (!values?.attachment[0]?.url) {
        formData.append("imageStatus", "true");
        formData.append("attachment", values?.attachment[0].originFileObj);
      }

      console.log([...formData.entries()], "ffff");
      UpdateAnnouncement(formData);
    } else {
      const formData = new FormData();
      formData.append("title", newValues?.title);
      formData.append("fromDate", newValues?.fromDate);
      formData.append("toDate", newValues?.toDate);
      formData.append("description", newValues.description || "");
      formData.append("informedBy", newValues?.informedBy);
      formData.append("publish", newValues?.publish);
      formData.append("fileName", fileName);

      if (newValues?.attachment && newValues.attachment.length > 0) {
        newValues.attachment.forEach((file) => {
          formData.append("imageStatus", "true");
          formData.append(`attachment`, file.originFileObj);
        });
      }
      AddAnnouncement(formData);
      console.log([...formData.entries()], "adddd");
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const handleChecked = (e) => {
    setCheckeds(e);
  };

  const handlePic = (value) => {
    setFileName(value.file.name.slice(-3))
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
            label={"Title for Announcement"}
            placeholder={"Enter title"}
            name={"title"}
            rules={[
              {
                required: true,
                message: "Please enter title !",
              },
            ]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            label={"Informed By"}
            name={"informedBy"}
            placeholder={"Informed By"}
            disabled={"disabled"}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Start Date"}
            name={"fromDate"}
            onChange={handleFromdate}
            rules={[
              {
                required: true,
                message: "Please Choose Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"End Date"}
            name={"toDate"}
            onChange={handleTodate}
            rules={[
              {
                required: true,
                message: "Please Choose Date !",
              },
            ]}
          />
        </Col>

        {/* accept={'application/pdf'} */}
        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Document"}
            initialValue={ImageInitialValue}
            name={"attachment"}
            listType="picture-card"
            maxCount={1}
            onChange={handlePic}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
            label={"Description"}
            name={"description"}
            placeholder={"Description"}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            label={"Published"}
            name={"publish"}
            placeholder={"Select Option"}
            options={publishoptions}
          />
        </Col>
      </CustomRow>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {updateAnnounceRecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClose()}
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
