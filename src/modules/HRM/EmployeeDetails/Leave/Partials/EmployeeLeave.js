import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../../components/CustomModal";
import request from "../../../../../utils/request";
import {
  getInitialEmployee,
  selectAllInitialEmployee,
} from "../../EmployeeSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import {
  selectCurrentId,
  selectCurrentRoleName,
} from "../../../../Auth/authSlice";

export const AddEmpLeaveForm = ({
  FormExternalClosee,
  leaverecord,
  updatetrigger,
  setCall,
  GetEmployeeLeave,
}) => {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  const [formReset, setFormReset] = useState(0);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");
  const [selectedShift, setSelectedShift] = useState([]);
  const [dateRange, setDateRange] = useState(dayjs().format("YYYY-MM-DD"));
  const [todateRange, setTodateRange] = useState(dayjs().format("YYYY-MM-DD"));

  const RoleName = useSelector(selectCurrentRoleName);

  const Employeeid = useSelector(selectCurrentId);
  const EmployeeName = useSelector(selectAllInitialEmployee);

  const SelectEmp = EmployeeName?.map((item) => ({
    label: item.userName,
    value: item.employeeId,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const onFinish = (values) => {
    const record = { ...values, date: dateRange, toDate: todateRange };
    let Newvalue;

    if (RoleName === "Training") {
      Newvalue = {
        date: record.date,
        toDate: record.toDate,
        reason: record.reason,
        reasonDescription: record.reasonDescription,
        traineeId: Employeeid,
        employeeLeaveList: [{}],
      };
    }
    // else if (
    //   RoleName === "Employee" ||
    //   RoleName === "TL" ||
    //   RoleName === "ProjectHead"
    // ) {
    //   Newvalue = {
    //     date: record.date,
    //     toDate: record.toDate,
    //     reason: record.reason,
    //     reasonDescription:record.reasonDescription,
    //     employeeId: Employeeid,
    //   };
    // }
    else {
      Newvalue = {
        date: record.date,
        toDate: record.toDate,
        reason: record.reason,
        reasonDescription: record.reasonDescription,
        employeeId: Employeeid,
        employeeLeaveList: [{}],
      };
    }
    if (leaverecord) {
      UpdateLeave(Newvalue);
    } else {
      AddLeave(Newvalue);
    }
  };
  const handleDateRangeChange = (date) => {
    setDateRange(date);
  };
  const handleDateToChange = (date) => {
    setTodateRange(date);
  };

  const AddLeave = (values) => {
    request
      .post(`${APIURLS.POSTLEAVE}`, values)
      .then(function (response) {
        toast.success("Employee Leave Added");
        form.resetFields();
        // dispatch(getLeave());
        setCall((prev) => prev + 1);
      })
      .catch(function (error) {
        toast.warn(error.response.data);
      });
  };

  const UpdateLeave = (values, id) => {
    request
      .put(`${APIURLS.PUTLEAVE}/${leaverecord?.employeeLeaveId}`, values)
      .then(function (response) {
        toast.info("Profile Updated Successfully");
        GetEmployeeLeave();
        if (FormExternalClosee) {
          FormExternalClosee();
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.warn(error.response.data);
      });
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    dispatch(getInitialEmployee());
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (leaverecord) {
      form.setFieldsValue(leaverecord);
    }
  }, [leaverecord, updatetrigger]);

  useEffect(() => {
    if (leaverecord) {
      const fromdatee = new Date(leaverecord?.date);
      const Todate = new Date(leaverecord?.toDate);

      const dateFormat = "YYYY-MM-DD";
      const FrmDateee = dayjs(fromdatee).format(dateFormat);
      const todates = dayjs(Todate).format(dateFormat);

      form.setFieldsValue({
        date: dayjs(FrmDateee),
        toDate: dayjs(todates),
        employeeId: leaverecord?.employeeId,
      });
    }
  }, [leaverecord, updatetrigger]);

  return (
    <Form
      form={form}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={
        {
          date: dayjs(),
        }
        // {
        //     toDate:dayjs()
        // }
      }
    >
      <CustomRow space={[12, 12]}>
        {/* <Col span={24} md={12}>
                        <CustomSelect
                            showSearch={true}
                            name={"employeeId"}
                            label={"Employee Name"}
                            options={SelectEmp}
                            placeholder={"Employee Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Select Employee Name !",
                                },
                            ]}
                        />
                    </Col> */}
        <Col span={24} md={12}>
          <CustomInput
            name={"reason"}
            label={"reason"}
            placeholder={"Reason"}
            rules={[
              {
                required: true,
                message: "Please Enter Emp Reason!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            onChange={handleDateRangeChange}
            name={"date"}
            label={"From Date"}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomDatePicker
            onChange={handleDateToChange}
            name={"toDate"}
            label={"To Date"}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomTextArea
            label={"Description"}
            // placeholder={"Description"}
            name={"reasonDescription"}
            rules={[
              {
                required: true,
                message: "Please Enter Description !",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {leaverecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={FormExternalClosee}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
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
        handleCancel={handleCancel}
        handleOk={handleOk}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Form>
  );
};
