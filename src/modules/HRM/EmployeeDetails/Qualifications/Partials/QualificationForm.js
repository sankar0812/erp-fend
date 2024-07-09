import { Col, Form } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../../utils/request";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { toast } from "react-toastify";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const EmployeeQualificationForm = ({
  formname,
  FormExternalClose,
  formReset,
  record,
  id,
  qualification,
  getQualification,
  trigger,
}) => {
  console.log(qualification, "lll");
  // ----- Define Form
  const [form] = Form.useForm();

  const [ImageInitialValue, setImageInitialValue] = useState({});

  const dispatch = useDispatch();

  const onReset = () => {
    form.resetFields();
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (qualification) {
      const QualificationUrls = {
        aadhar: [
          {
            uid: 1,
            name: `${qualification.qualificationId}aadhar`,
            status: "done",
            url: `${base}${qualification?.aadharurl}`,
          },
        ],
        panno: [
          {
            uid: 2,
            name: `${qualification.qualificationId}panno`,
            status: "done",
            url: `${base}${qualification?.pannourl}`,
          },
        ],
        bankBook: [
          {
            uid: 3,
            name: `${qualification.qualificationId}bankBook`,
            status: "done",
            url: `${base}${qualification?.bankBookurl}`,
          },
        ],
        degree: [
          {
            uid: 4,
            name: `${qualification.qualificationId}degree`,
            status: "done",
            url: `${base}${qualification?.degreeurl}`,
          },
        ],
        ten: [
          {
            uid: 5,
            name: `${qualification.qualificationId}ten`,
            status: "done",
            url: `${base}${qualification?.tenurl}`,
          },
        ],
        twelve: [
          {
            uid: 6,
            name: `${qualification.qualificationId}twelve`,
            status: "done",
            url: `${base}${qualification?.twelveurl}`,
          },
        ],
        resume: [
          {
            uid: 7,
            name: `${qualification.qualificationId}resume`,
            status: "done",
            url: `${base}${qualification?.resumeurl}`,
          },
        ],
      };
      setImageInitialValue(QualificationUrls);
    }
  }, [qualification]);

  useEffect(() => {
    if (qualification) {
      form.setFieldsValue({
        highestQualification: qualification.highestQualification,
      });
      form.setFieldsValue({ aadharNO: qualification.aadharNO });
      qualification.aadharurl &&
        form.setFieldsValue({ aadhar: ImageInitialValue.aadhar });
      qualification.bankBookurl &&
        form.setFieldsValue({ bankBook: ImageInitialValue.bankBook });
      qualification.degreeurl &&
        form.setFieldsValue({ degree: ImageInitialValue.degree });
      qualification.pannourl &&
        form.setFieldsValue({ panno: ImageInitialValue.panno });
      qualification.resumeurl &&
        form.setFieldsValue({ resume: ImageInitialValue.resume });
      qualification.tenurl &&
        form.setFieldsValue({ ten: ImageInitialValue.ten });
      qualification.twelveurl &&
        form.setFieldsValue({ twelve: ImageInitialValue.twelve });
    }
    
  }, [qualification, ImageInitialValue, trigger]);

  const UpdateEmployeeQualifications = (values) => {
    request
      .put(
        `${APIURLS.PUTQUALIFICATION}${qualification?.qualificationId}`,
        values,
        config
      )
      .then(function (response) {
        toast.info("Employee Qualification Updated Successfully !");
        getQualification();
        FormExternalClose();
      })
      .catch((error) => {
        console.log(error, "errorerror");
      });
  };

  const onFinish = (values) => {
    const formData = new FormData();

    formData.append("highestQualification", values?.highestQualification);
    formData.append("aadharNO", values?.aadharNO);
    formData.append("imageStatus", true);

    if (values?.aadhar && values.aadhar.length > 0) {
      values.aadhar.forEach((file) => {
        formData.append(`aadhar`, file.originFileObj);
      });
    }

    if (values?.panno && values.panno.length > 0) {
      values.panno.forEach((file) => {
        formData.append(`panno`, file.originFileObj);
      });
    }

    if (values?.degree && values.degree.length > 0) {
      values.degree.forEach((file) => {
        formData.append(`degree`, file.originFileObj);
      });
    }

    if (values?.bankBook && values.bankBook.length > 0) {
      values.bankBook.forEach((file) => {
        formData.append(`bankBook`, file.originFileObj);
      });
    }

    if (values?.resume && values.resume.length > 0) {
      values.resume.forEach((file) => {
        formData.append(`resume`, file.originFileObj);
      });
    }

    if (values?.ten && values.ten.length > 0) {
      values.ten.forEach((file) => {
        formData.append(`ten`, file.originFileObj);
      });
    }

    if (values?.twelve && values.twelve.length > 0) {
      values.twelve.forEach((file) => {
        formData.append(`twelve`, file.originFileObj);
      });
    }

    UpdateEmployeeQualifications(formData);
    console.log([...formData.entries()], "fffffffffffffff");
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Fragment>
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
              label={"Highest Qualification"}
              name={"highestQualification"}
              placeholder={"Enter Highest Qualification"}
              rules={[
                { required: true, message: "Please Enter Qualification!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber
              label={"Aadhar Card Number"}
              name={"aadharNO"}
              placeholder={"Enter Aadhar Number"}
              maxLength={12}
              minLength={12}
              rules={[
                { required: true, message: "Please Enter Aadhar Card Number!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload Aadhar Card Here"}
              name={"aadhar"}
              rules={[
                { required: true, message: "Please Upload Aadhar Card!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload Pan Card Here"}
              name={"panno"}
              rules={[{ required: true, message: "Please Upload Pan Card!" }]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              maxCount={1}
              label={"Upload Resume Here"}
              name={"resume"}
              accept=".pdf"
              rules={[{ required: true, message: "Please Upload resume!" }]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload Degree Certificate Here"}
              name={"degree"}
              rules={[
                { required: true, message: "Please Upload Certificate!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload Bank Passbook Here"}
              name={"bankBook"}
              rules={[
                { required: true, message: "Please Upload Bank Passbook!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload 10th Certificate Here"}
              name={"ten"}
              rules={[
                { required: true, message: "Please Upload 10th Certificate!" },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomUpload
              form={form}
              listType="picture-card"
              maxCount={1}
              label={"Upload 12th Certificate Here"}
              name={"twelve"}
              rules={[
                { required: true, message: "Please Upload 12th Certificate!" },
              ]}
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
    </Fragment>
  );
};
