import React, { useEffect, useState } from "react";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form } from "antd";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import request, { base } from "../../../../../utils/request";
import {
  getInitialEmployee,
  selectAllInitialEmployee,
} from "../../EmployeeSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const AddAwards = ({
  formname,
  FormExternalClose,
  formReset,
  record,
  triggerAwards
}) => {
  // ----- Define Form
  const [form] = Form.useForm();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const awardsPhotoUrls = record?.awardsPhotos?.map(
      (awardsPhotos, index) => ({
        uid: `${index + 1}`,
        name: `example${index}.jpg`,
        status: "done",
        url: `${base}${awardsPhotos?.url}`,
      })
    );

    if (record) {
      setImageInitialValue(awardsPhotoUrls);
    }
    setUpdateFormData(record);
  }, [record]);

  useEffect(() => {
    if (record) {
      const formattedDate = dayjs(record?.date);
      form.setFieldsValue(record);
      form.setFieldsValue({ date: formattedDate });
      form.setFieldsValue({ awardsPhotos: null });
    }
  }, [record, form, triggerAwards]);

  // ======= Employee id name ======================

  const InitialEmployeeDetails = useSelector(selectAllInitialEmployee);

  useEffect(() => {
    dispatch(getInitialEmployee());
  }, []);

  const EmployeeeName = InitialEmployeeDetails?.map((empdetails) => ({
    label: empdetails?.userName,
    value: empdetails?.employeeId,
  }));

  const onReset = () => {
    form.resetFields();
  };
  const handleOnChanges = (value) => {
    const SelectName = InitialEmployeeDetails?.find(
      (item) => `${item?.first_name} ${item?.last_name}` === value
    );

    if (SelectName) {
      form.setFieldsValue({ employeeId: SelectName?.employee_id });
    }
  };

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const AddEmployeeAwards = (values) => {
    request
      .post(`${APIURLS.POSTAWARDS}`, values, config)
      .then(function (response) {
        // dispatch(getAwards())
        form.resetFields();
        toast.success("Employee Award Saved Successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed");
      });
  };

  const UpdateEmployeeAwards = (value) => {
    request
      .put(`${APIURLS.PUTAWARDS}/${record?.awardsId}`, value, config)
      .then(function (response) {
        // dispatch(getAwards())
        form.resetFields();
        FormExternalClose();
        toast.info("Employee Award Updated Successfully!");
      })
      .catch((error) => {});
  };

  const onFinish = (values) => {
    if (record) {
      const formData = new FormData();
      formData.append("description", values?.description);
      formData.append("date", selectedDate);
      formData.append("employeeId", values?.employeeId);
      formData.append("awardsType", values?.awardsType);

    if(values?.awardsPhotos && values.awardsPhotos.length > 0){
        values.awardsPhotos.forEach((file) => {
            formData.append(`awardsPhotos`, file.originFileObj);
          });
      }
    //    else if (values?.awardsPhotos[0].originFileObj) {
    //     values?.awardsPhotos?.forEach((file) => {
    //       formData.append(`awardsPhotos`, file?.originFileObj);
    //     });
    //   }

      UpdateEmployeeAwards(formData);
    } else {
      const formData = new FormData();
      formData.append("description", values?.description);
      formData.append("date", selectedDate);
      formData.append("employeeId", values?.employeeId);
      formData.append("awardsType", values?.awardsType);

      // if (values?.awardsPhoto && values.awardsPhoto.length > 0) {
      //     values?.awardsPhoto.forEach((file) => {
      //         formData.append(`awardsPhoto`, file.originFileObj);
      //     });
      // }
      if (values?.awardsPhotos && values.awardsPhotos.length > 0) {
        values.awardsPhotos.forEach((file) => {
          formData.append(`awardsPhotos`, file.originFileObj);
        });
      }
      AddEmployeeAwards(formData);
    }
  };

  const onFinishFailed = (errorInfo) => {};

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
      initialValues={{
        date: dayjs,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomSelect
            label={"Employee Name"}
            placeholder={"Select Employee Name "}
            options={EmployeeeName}
            onChange={handleOnChanges}
            name={"employeeId"}
          />
          <CustomInput name={"employeeId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date"}
            name={"date"}
            onChange={handleOnChange}
            value={selectedDate}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Award Type"}
            name={"awardsType"}
            placeholder={"Award type"}
          />
        </Col>

        {record && (
          <Col span={24} md={12}>
            <h3>Selected Image</h3>
            <div style={{ gap: "10px", display: "flex", flexDirection: "row" }}>
              {ImageInitialValue?.map((img) => (
                <div key={img.uid}>
                  <img
                    src={img?.url}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                    alt="AwardsImgs"
                  />
                </div>
              ))}
            </div>
          </Col>
        )}

        <Col span={24} md={12}>
          {/* <CustomUpload form={form} label={'Upload Award Photo'} 
                            name={'awardsPhoto'} 
                            // initialValue={ImageInitialValue}
                             maxCount={10} accept='.png,.jpeg,.jpg'
                              rules={[
                                {
                                    required: true,
                                    message: 'Please Upload Image'
                                }
                            ]} /> */}

          <CustomUpload
            form={form}
            label={"Upload Award Photo"}
            name={"awardsPhotos"}
            listType="picture-card"
            maxCount={3}
            accept=".png,.jpeg,.jpg"
            rules={[
              {
                required: true,
                message: "Please Upload Image",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
            label={"Description"}
            name={"description"}
            placeholder={"Description"}
          />
        </Col>
      </CustomRow>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {record ? (
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
