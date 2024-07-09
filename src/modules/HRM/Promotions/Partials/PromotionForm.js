import React, { useEffect, useState } from "react";
import { Col, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomInput } from "../../../../components/Form/CustomInput";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { CustomRow } from "../../../../components/CustomRow";
import dayjs from "dayjs";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import {
  getInitialEmployee,
  selectAllInitialEmployee,
} from "../../EmployeeDetails/EmployeeSlice";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import { getPromotion } from "../PromotionSlice";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import { selectCurrentRoleName } from "../../../Auth/authSlice";

export const PromotionForm = ({
  FormExternalClose,
  FormExternalClosee,
  updatetrigger,
  promotionrecord,
}) => {
  // ----- Define Form
  const [form] = useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [employeeselected, setSelectedEmployee] = useState([]);

  const RoleName = useSelector(selectCurrentRoleName);

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger]);

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({ employeeId: employeeselected });
  }, [employeeselected]);

  const roletype = [
    {
      label: "Employee",
      value: "Employee",
    },
    {
      label: "ProjectHead",
      value: "ProjectHead",
    },
    {
      label: "TL",
      value: "TL",
    },
  ];

  useEffect(() => {
    if (promotionrecord) {
      setPromotion();
    }
  }, [promotionrecord, updatetrigger]);

  const setPromotion = () => {
    form.setFieldsValue(promotionrecord);
    form.setFieldsValue({
      roleType: promotionrecord?.role_type,
      promotionsBy: promotionrecord?.promotions_by,
      userName: promotionrecord?.user_name,
      employeeId: promotionrecord?.employee_id,
    });
  };

  useEffect(() => {
    dispatch(getInitialEmployee());
  }, []);

  const AllEmployeeDetails = useSelector(selectAllInitialEmployee);

  const AllEmployeeOptions = AllEmployeeDetails?.map((emp) => ({
    label: emp.userName,
    value: emp.userName,
  }));

  const UpdatePromotions = (values) => {
    request
      .put(`${APIURLS.PUTPROMOTIONS}${promotionrecord?.promotions_id}`, values)
      .then(function (response) {
        toast.info("Promotion Details Updated Successfully");
        dispatch(getPromotion());
        FormExternalClosee();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleOnChange = (value) => {
    const SelectedEmployee = AllEmployeeDetails.find(
      (emp) => emp.userName === value
    );
    setSelectedEmployee(SelectedEmployee.employeeId);
  };

  const AddPromotionsPost = (value) => {
    request
      .post(`${APIURLS.POSTPROMOTIONS}`, value)
      .then(function (response) {
        dispatch(getPromotion());
        FormExternalClose();
        form.resetFields();
        toast.success("Promoted Successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response?.data);
        } else {
          toast.error("Failed");
        }
      });
  };

  const onFinish = (values) => {
    if (promotionrecord) {
      UpdatePromotions(values);
    } else {
      AddPromotionsPost(values);
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
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomSelect
              label={"Staff Name"}
              placeholder={"Staff Name"}
              options={AllEmployeeOptions}
              onChange={handleOnChange}
              name={"userName"}
              rules={[
                {
                  required: true,
                  message: "Please Enter User Name ! ! !",
                },
              ]}
            />
            <CustomInput name={"employeeId"} display={"none"} />
          </Col>

          {/* <Col span={24} md={12}>
            <CustomDatePicker label={'Date'} placeholder={'Enter Date'} onChange={handleDate}
              name={'date'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Date ! ! !',
                },

              ]} />
          </Col> */}

          <Col span={24} md={12}>
            <CustomSelect
              options={roletype}
              name={"roleType"}
              label={"Role Type"}
              placeholder={"Role Type"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Role Type ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"Promotions By"}
              placeholder={"Enter Promotions By"}
              initialValue={RoleName}
              disabled={true}
              name={"promotionsBy"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Promotions By ! ! !",
                },
              ]}
            />
          </Col>

          <Col span={24} md={12}>
            <CustomTextArea
              label={"Description"}
              placeholder={"Enter Description"}
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Description ! ! !",
                },
              ]}
            />
          </Col>
        </CustomRow>
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {promotionrecord ? (
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
