import React, { useEffect, useState } from "react";
import { Col, Form, InputNumber } from "antd";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import request, { base } from "../../../../../utils/request";
import {
  getCandidate,
  getCandidateRole,
  selectAllCandidateRole,
} from "../../RecruitmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomRadioButton } from "../../../../../components/Form/CustomRadioButton";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import {
  getDepartmentinTable,
  selectAllDepartmentinTable,
} from "../../../EmployeeDetails/EmployeeSlice";

export const AddCandidateForm = ({
  FormExternalClose,
  formReset,
  formname,
  updateCandidaterecord,
  updatetrigger,
}) => {

  const [deptData, setDeptData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [deptId, setDeptId] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [positionRoles, setPositionsRole] = useState([]);
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // =======  Get Selected Time =======

  const [form] = Form.useForm(); // ----- Define Form

  const dispatch = useDispatch();

  const [department, setDepartment] = useState([]);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [coderDate, setCornerDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPosition();
  }, []);

  const getPosition = (values, key) => {
    const department = "hiring";
    request
      .get(`${APIURLS.POSITIONGET}`, { params: { department } })
      .then(function (response) {
        setDeptData(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    dispatch(getCandidateRole());
    dispatch(getDepartmentinTable());
  }, []);

  // useEffect(() => {
  //   form.setFieldsValue({ departmentId: deptId });
  //   form.setFieldsValue({ position: positionData?.position });
  // }, [deptId, positionData, trigger]);

  const AllDepartmentDetails = useSelector(selectAllDepartmentinTable);

  const AllDepartment = deptData?.map((dep) => ({
    label: dep.departmentName,
    value: dep.departmentName,
  }));

  const AllCandidateRole = useSelector(selectAllCandidateRole);

  const AllCandidateRoles = AllCandidateRole?.map((value) => ({
    label: value.jobTitle,
    value: value.jobTitle,
  }));

  useEffect(() => {
    if (updateCandidaterecord) {
      const DepartmentUpdate = deptData?.find(
        (item) => item.applicationId === updateCandidaterecord?.departmentId
      );
      setPositionData(DepartmentUpdate?.departmentDetails || []);
    }
  }, [deptData]);

  const handleDepartment = (value) => {
    console.log(value,'gg');
    const Department = deptData?.find((item) => item.departmentName === value);
    form.setFieldsValue({
      departmentId: Department?.applicationId
    })
    setPositionData(Department?.departmentDetails);
    // setPositionData(Department?.position)
    setDeptId(Department?.applicationId);
    setTrigger(trigger + 1);
  };

  useEffect(() => {
    form.setFieldsValue({ position: positionRoles?.position });
    form.setFieldsValue({ hiringId: positionRoles?.hiringId });
  }, [positionRoles, trigger]);

  const AllPositions = positionData.map((dep) => ({
    label: dep.position,
    value: dep.hiringId,
  }));

  const handlePositions = (value) => {
    const Department = positionData?.find((item) => item.hiringId === value);
    setPositionsRole(Department);
    setTrigger(trigger + 1);
  };

  // ===== Modal Functions End =====

  const onReset = () => {
    form.resetFields();
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleCurrentDate = (date) => {
    setCurrentDate(date);
  };

  useEffect(() => {
    if (updateCandidaterecord) {
      setCandidate();
    }
  }, [updateFormData, updateCandidaterecord, updatetrigger]);
  const setCandidate = () => {
    const dateFormat = "YYYY-MM-DD";
    const Dated = new Date(updateCandidaterecord?.date);
    const DOB = new Date(updateCandidaterecord?.dateofBirth);
    const DateofBirth = dayjs(DOB).format(dateFormat);
    const Datee = dayjs(Dated).format(dateFormat);

    setFileName(updateCandidaterecord?.fileName);

    form.setFieldsValue(updateCandidaterecord);
    setValue(updateCandidaterecord?.workExperience);
    // form.setFieldsValue({departmentId:updateCandidaterecord?.departmentId})
    // form.setFieldsValue({hiringId:updateCandidaterecord?.hiringId})
    form.setFieldsValue({
      dateofBirth: dayjs(DateofBirth, dateFormat),
      date: dayjs(Datee, dateFormat),
    });
    form.setFieldsValue({ resume: ImageInitialValue });
  };

  useEffect(() => {
    if (updateCandidaterecord?.resumeUrl) {
      setImageInitialValue([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${updateCandidaterecord?.resumeUrl}`,
        },
      ]);
    } else {
      setImageInitialValue([]);
    }

    setUpdateFormData(updateCandidaterecord);
  }, [updateCandidaterecord]);

  const onFinish = (values) => {
    if (updateCandidaterecord) {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("emailId", values.emailId);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("gender", values.gender);
      formData.append(
        "dateofBirth",
        dayjs(values.dateofBirth).format("YYYY-MM-DD")
      );
      formData.append("education", values.education);
      formData.append("branch", values.branch);
      formData.append("college", values.college);
      formData.append("cgpa", values.cgpa);
      formData.append("salaryExpectations", values.salaryExpectations);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("maritalStatus", values.maritalStatus);
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("jobRole", values.jobRole);
      formData.append("departmentId", values.departmentId);
      formData.append("skillDetails", values.skillDetails);
      formData.append("yearOfPassing", values.yearOfPassing);
      formData.append("workExperience", values.workExperience);
      formData.append("coverLetter", values.coverLetter);
      formData.append("position", values.position);
      formData.append("hiringId", values.hiringId);

      formData.append("year", values.year ? values.year : 0);
      formData.append("fileName", fileName);

      if (values?.resume[0].originFileObj) {
        values.resume.forEach((file) => {
          formData.append(`resume`, file.originFileObj);
        });
      }
      console.log([...formData.entries()], "updateformData");
      UpdateCandidate(formData, updateCandidaterecord?.candidateId);
    } else {
      const formData = new FormData();
      formData.append("userName", values.userName);
      formData.append("hiringId", values.hiringId);
      formData.append("emailId", values.emailId);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("gender", values.gender);
      formData.append(
        "dateofBirth",
        dayjs(values.dateofBirth).format("YYYY-MM-DD")
      );
      formData.append("education", values.education);
      formData.append("branch", values.branch);
      formData.append("college", values.college);
      formData.append("cgpa", values.cgpa);
      formData.append("salaryExpectations", values.salaryExpectations);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("maritalStatus", values.maritalStatus);
      formData.append("date", dayjs(values.date).format("YYYY-MM-DD"));
      formData.append("jobRole", values.jobRole);
      formData.append("departmentId", values.departmentId);
      formData.append("skillDetails", values.skillDetails);
      formData.append("yearOfPassing", values.yearOfPassing);
      formData.append("workExperience", values.workExperience);
      formData.append("coverLetter", values.coverLetter);
      formData.append("position", values.position);
      formData.append("hiringId", values.hiringId);

      formData.append("year", values.year ? values.year : 0);
      formData.append("fileName", fileName);

      if (values?.resume && values.resume.length > 0) {
        values.resume.forEach((file) => {
          formData.append(`resume`, file.originFileObj);
        });
      }
      console.log([...formData.entries()], "formData");
      AddCandidate(formData);
    }
  };

  const handlePic = (value) => {
    setFileName(value.file.name.slice(-3));
  };

  const AddCandidate = (values) => {
    request
      .post(`${APIURLS.POSTCANDIDATE}`, values)
      .then(function (response) {
        toast.success("Candidate Added Successfully");
        form.resetFields();
        dispatch(getCandidate());
        FormExternalClose();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const UpdateCandidate = (values, id) => {
    request
      .put(`${APIURLS.PUTCANDIDATE}${id}/`, values, config)
      .then(function (response) {
        toast.info("Candidate Updated Successfully");
        dispatch(getCandidate());
        FormExternalClose();
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const gender = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const maritalStatus = [
    {
      label: "Single",
      value: "single",
    },
    {
      label: "Married",
      value: "married",
    },
  ];

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    form.setFieldsValue({ year: null });
    setValue(e.target.value);
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
      initialValues={{ date: dayjs() }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomInput
            label={"User Name"}
            name={"userName"}
            placeholder={"User Name"}
            rules={[
              {
                required: true,
                message: "Please Enter User Name!",
              },
            ]}
          />
          {/* <CustomInput name={'hiringId'} /> */}
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Email ID"}
            placeholder={"Enter Email ID"}
            name={"emailId"}
            type={"email"}
            rules={[
              {
                required: true,
                message: "Please Enter Email ID !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            name={"mobileNumber"}
            label={"Phone Number"}
            placeholder={"Enter Phone Number"}
            maxLength={10}
            minLength={10}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please Enter Mobile Number !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={gender}
            showSearch={true}
            name={"gender"}
            label={"Gender"}
            placeholder={"Gender"}
            rules={[
              {
                required: true,
                message: "Please Select Gender !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date of Birth"}
            name={"dateofBirth"}
            placeholder={"Date of Birth"}
            onChange={handleDate}
            rules={[
              {
                required: true,
                message: "Please Enter Date Of Birth !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Education"}
            name={"education"}
            rules={[
              {
                required: true,
                message: "Please Enter Education !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Branch"}
            name={"branch"}
            rules={[
              {
                required: true,
                message: "Please Enter Branch !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"College"}
            name={"college"}
            rules={[
              {
                required: true,
                message: "Please Enter College !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber
            type={"number"}
            label={"Cgpa"}
            name={"cgpa"}
            rules={[
              {
                required: true,
                message: "Please Enter cgpa !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInputNumber
            label={"Salary Expectation"}
            name={"salaryExpectations"}
            rules={[
              {
                required: true,
                message: "Please Enter Salary Expectation !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"City"}
            name={"city"}
            rules={[
              {
                required: true,
                message: "Please Enter City !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Country"}
            name={"country"}
            rules={[
              {
                required: true,
                message: "Please Enter Country !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={maritalStatus}
            showSearch={true}
            name={"maritalStatus"}
            label={"Marital Status"}
            placeholder={"Marital status"}
            rules={[
              {
                required: true,
                message: "Please Select Marital status !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            label={"Date"}
            name={"date"}
            placeholder={"Date"}
            onChange={handleCurrentDate}
            disabled
            rules={[
              {
                required: true,
                message: "Please Enter Date !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={AllDepartment}
            showSearch={true}
            name={"jobRole"}
            onChange={handleDepartment}
            label={"Role"}
            placeholder={"Role"}
            rules={[
              {
                required: true,
                message: "Please Select Candidate Role !",
              },
            ]}
          />
          <CustomInput name={"departmentId"} display={'none'}/>
        </Col>

        <Col span={24} md={12}>
          <CustomSelect
            options={AllPositions}
            onChange={handlePositions}
            label={"Position"}
            name={"position"}
            placeholder={"Position"}
          />
          <CustomInput name={"hiringId"} display={"none"} />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Year Of Passing"}
            name={"yearOfPassing"}
            rules={[
              {
                required: true,
                message: "Please Enter Year Of Passing !",
              },
            ]}
            // maxLength={4}
            // minLength={4}
            // onKeyPress={(event) => {
            //   if (!/[0-9]/.test(event.key)) {
            //     event.preventDefault();
            //   }
            // }}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomRadioButton
            label={"Select Experience"}
            options={[
              { label: "Fresher", value: "fresher" },
              { label: "Experirnce Minimum One Year", value: "experience" },
            ]}
            name={"workExperience"}
            onChange={handleChange}
            rules={[
              {
                required: true,
                message: "Please Select Experience !",
              },
            ]}
          />
        </Col>

        {value === "experience" && (
          <Col span={24} md={12}>
            <CustomInputNumber
              label={"Years Of Experience"}
              addonAfter={"Year"}
              name={"year"}
              min={1.0}
              precision={1}
              rules={[
                {
                  required: true,
                  message: "Please Enter Years !",
                },
              ]}
            />
          </Col>
        )}

        <Col span={24} md={12}>
          <CustomTextArea
            label={"Address"}
            name={"address"}
            placeholder={"Enter Address"}
            rules={[
              {
                required: true,
                message: "Please Enter Address !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
            label={"Cover Letter"}
            name={"coverLetter"}
            placeholder={"Enter Cover Letter"}
            rules={[
              {
                required: true,
                message: "Please Enter Cover Letter !",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomInput
            label={"Skill Details"}
            name={"skillDetails"}
            rules={[
              {
                required: true,
                message: "Please Enter Skills",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Resume"}
            name={"resume"}
            listType="picture-card"
            initialValue={ImageInitialValue}
            maxCount={1}
            accept={'.pdf'}
            onChange={handlePic}
            rules={[
              {
                required: true,
                message: "Please Select Resume",
              },
            ]}
          />
        </Col>
      </CustomRow>
      {updateCandidaterecord ? (
        <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
          <Button.Success text={"Update"} htmlType={"submit"} />
          <Button.Danger text={"cancel"} onClick={() => onReset()} />
        </Flex>
      ) : (
        <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
          <Button.Success text={"Submit"} htmlType={"submit"} />
          <Button.Danger text={"cancel"} onClick={() => onReset()} />
        </Flex>
      )}

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Form>
  );
};
