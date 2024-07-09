import { Col, Form } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import Button from "../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { IoMdRemoveCircle } from "react-icons/io";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import Flex from "../../../../../components/Flex";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { AddJobRole } from "./AddJobRole";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import {
  getHiring,
  getJobTitle,
  selectAllJobRole,
} from "../../RecruitmentSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import request from "../../../../../utils/request";
import { useNavigate } from "react-router-dom";
import { AddDepartmentModal } from "../../../EmployeeDetails/ViewEmployee/Partials/AddEmployeeModals";
import { getDepartmentinTable, selectAllDepartmentinTable } from "../../../EmployeeDetails/EmployeeSlice";

export const HiringForm = ({
  FormExternalClose,
  formname,
  updateHiringrecord,
  updatetrigger,
}) => {
  console.log(updateHiringrecord,'updateHiringrecord');
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [roleId, setRoleId] = useState([]);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [formReset, setFormReset] = useState(0);
  const [postedDate, setPostedDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [closedDate, setClosedDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm(); // ----- Define Form

  useEffect(() => {
    form.resetFields();
  }, [formReset]);

  const handleOnChanges = (value) => {
    const SelectedRole = AllJobTitle?.find((item) => item.jobTitle === value);
    setRoleId(SelectedRole);
  };

  useEffect(() => {
    form.setFieldsValue({
      applicationId: roleId?.applicationId,
      jobTitle: roleId?.jobTitle,
    });
  }, [roleId, form]);

  useEffect(() => {
    if (updateHiringrecord) {
      setHiring();
    }
  }, [updateHiringrecord]);

  const setHiring = () => {
    const dateFormat = "YYYY-MM-DD";
    const PostedOn = new Date(updateHiringrecord?.posted);
    const ClosedOn = new Date(updateHiringrecord?.closing);
    const Posted = dayjs(PostedOn).format(dateFormat);
    const Closed = dayjs(ClosedOn).format(dateFormat);
    setPostedDate(updateHiringrecord?.posted);
    setClosedDate(updateHiringrecord?.closing);
    form.setFieldsValue(updateHiringrecord);

    form.setFieldsValue({
      posted: dayjs(Posted, dateFormat),
      closing: dayjs(Closed, dateFormat),
      departmentId: updateHiringrecord?.applicationId,
    });
  };

  useEffect(() => {
    dispatch(getDepartmentinTable());
  }, []);

  const AllDepartmentDetails = useSelector(selectAllDepartmentinTable);

  const AllDepartment = AllDepartmentDetails?.map((dep) => ({
    label: dep.departmentName,
    value: dep.departmentId,
  }));

  const DepartmentModal = () => {
    setModalTitle("Add Department Here");
    setModalContent(
      <AddDepartmentModal
        FormExternalCloses={FormExternalClosee}
        formname={"AddDepartmentForm"}
      />
    );
    showModal();
  };

  useEffect(() => {
    dispatch(getJobTitle());
  }, []);

  const AllJobTitle = useSelector(selectAllJobRole);
  const AllJobRoles = AllJobTitle?.map((value) => ({
    label: value.jobTitle,
    value: value.jobTitle,
  }));

  const handlePostedDate = (date) => {
    setPostedDate(date);
  };

  const handleClosedDate = (date) => {
    setClosedDate(date);
  };

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

  const onReset = () => {
    form.resetFields();
  };


  const onFinish = (values) => {
    if (updateHiringrecord) {
      const newValue = {
        ...values,
        posted: postedDate,
        closing: closedDate,
        // departmentId:updateHiringrecord?.applicationId

      };
      UpdateHiringDetails(newValue, updateHiringrecord?.hiringId);
      console.log(newValue,'updatess');

    } else {
      const currDate = dayjs().format("YYYY-MM-DD");
      const newValue = {
        ...values,
        posted: postedDate,
        closing: closedDate,
        currentdate: currDate,
      };


      console.log(newValue,'newvalue');
      AddHiringDetails(newValue);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddHiringDetails = (values) => {
    request
      .post(`${APIURLS.POSTHIRING}`, values)
      .then(function (response) {
        toast.success("Hiring Details Added Successfully");
        navigate("/hiring_details");
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClosee = () => {
    handleOk();
    FormRest();
  };

  const JobRoleModal = () => {
    setModalTitle("Add JobRole Here");
    setModalContent(
      <AddJobRole
        FormExternalCloses={FormExternalClosee}
        formname={"AddJobRoleForm"}
      />
    );
    showModal();
  };

  const UpdateHiringDetails = (values, id) => {
    request
      .put(`${APIURLS.PUTHIRING}${id}`, values)
      .then(function (response) {
        toast.info("Hiring Details Updated Successfully");
        dispatch(getHiring());
        FormExternalClose();
        form.resetFields();
      })
      .catch(function (error) {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data)
        }
        else{
          toast.error('Failed')
        }
      });
  };

  return (
    <CustomCardView style={{height:"auto"}}>
      {updateHiringrecord ? (
        ""
      ) : (
        <CustomPageFormTitle
          Heading={"Add Hiring Details"}
          style={{ fontSize: "20px", padding: "10px 0px" }}
        />
      )}

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
        initialValues={{
          briefList: [{ briefDescription: "" }],
          preferredList: [{ prefferdSkills: "" }],
        }}
      >
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            {/* <CustomDropSelect
              options={AllJobRoles || []}
              onButtonClick={JobRoleModal}
              showSearch={true}
              buttonLabel="Add JobRole"
              label={"JobRole"}
              name={"jobTitle"}
              onChange={handleOnChanges}
              placeholder={"Select JobRole"}
              rules={[
                {
                  required: true,
                  message: "Please Select JobRole!",
                },
              ]}
            />
            <CustomInput name={"applicationId"} display={"none"} /> */}

<CustomDropSelect
            options={AllDepartment || []}
            onButtonClick={DepartmentModal}
            showSearch={true}
            buttonLabel="Add Department"
            label={"Department"}
            name={"departmentId"}
            placeholder={"Select Department"}
            rules={[
              {
                required: true,
                message: "Please Select Department!",
              },
            ]}
          />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Position'} name={'position'} placeholder={'Position'}   rules={[
                {
                  required: true,
                  message: "Please Enter Position !",
                },
              ]}/>
             </Col>

          <Col span={24} md={12}>
            <CustomDatePicker
              label={"Posted Date"}
              name={"posted"}
              placeholder={"Posted Date"}
              onChange={handlePostedDate}
              rules={[
                {
                  required: true,
                  message: "Please Enter Posted Date !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomDatePicker
              label={"Closed Date"}
              name={"closing"}
              placeholder={"Closed Date"}
              onChange={handleClosedDate}
              rules={[
                {
                  required: true,
                  message: "Please Enter Closed Date !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"Email ID"}
              placeholder={"Enter Email ID"}
              name={"email"}
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
            <CustomTextArea label={"Request"} name={"requests"} />
          </Col>

          <Col span={24} md={12}>
            <CustomInputNumber label={"No of Vacancy"} name={"vacancy"} />
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Brief Description">
              <Form.List name="briefList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <CustomRow gutter={[24, 24]} key={key}>
                        <Col span={24} md={22}>
                          <CustomInput
                            placeholder="Brief Description"
                            name={[name, "briefDescription"]}
                            rules={[
                              {
                                required: true,
                                message: "This is required field!",
                              },
                            ]}
                          />
                        </Col>
                        <Col span={24} md={2}>
                          {fields.length > 1 && (
                            <IoMdRemoveCircle
                              style={{
                                fontSize: "25px",
                                color: "red",
                                cursor: "pointer",
                                margin: "10px 10px",
                              }}
                              onClick={() => remove(name)}
                            />
                          )}
                        </Col>
                      </CustomRow>
                    ))}
                    <Form.Item style={{ margin: "20px 10px" }}>
                      <Button type="dashed" onClick={() => add()} block>
                        Add
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
          <Form.Item label="Prefferd Skills">
            <Form.List name="preferredList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <CustomRow gutter={[24, 24]} key={key}>
                      <Col span={24} md={22}>
                        <CustomInput
                          placeholder="Prefferd Skills"
                          name={[name, "preferredSkills"]}
                          key={key}
                          rules={[
                            {
                              required: true,
                              message: "This is required field!",
                            },
                          ]}
                        />
                      </Col>
                      <Col span={24} md={2}>
                        {fields.length > 1 && (
                          <IoMdRemoveCircle
                            style={{
                              fontSize: "25px",
                              color: "red",
                              cursor: "pointer",
                              margin: "10px 10px",
                            }}
                            onClick={() => remove(name)}
                          />
                        )}
                      </Col>
                    </CustomRow>
                  ))}
                  <Form.Item style={{ margin: "20px 10px" }}>
                    <Button type="dashed" onClick={() => add()} block>
                      Add
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            </Form.Item>
          </Col>
        </CustomRow>

        <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
          {updateHiringrecord ? (
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
    </CustomCardView>
  );
};
