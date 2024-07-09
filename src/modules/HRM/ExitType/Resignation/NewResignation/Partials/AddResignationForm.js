import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCurrentId } from "../../../../../Auth/authSlice";
import { CustomRow } from "../../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../../components/Form/CustomDatePicker";
import Flex from "../../../../../../components/Flex";
import Button from "../../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../../components/CustomModal";
import { BiReset } from "react-icons/bi";
import { CustomInput } from "../../../../../../components/Form/CustomInput";
import request from "../../../../../../utils/request";
import { toast } from "react-toastify";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import { getResignation } from "../../ResignationSlice";
import { CustomTextArea } from "../../../../../../components/Form/CustomTextArea";

export const AddResignationForm = ({ FormExternalClosee, resignationrecord, updatetrigger }) => {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [formReset, setFormReset] = useState(0);
  const [ImageInitialValue, setImageInitialValue] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [attendanceType, setAttendanceType] = useState("");
  const [selectedShift, setSelectedShift] = useState([]);
//   const [dateRange, setDateRange] = useState(dayjs().format("YYYY-MM-DD"));
//   const [todateRange, setTodateRange] = useState(dayjs().format("YYYY-MM-DD"));

  const dispatch = useDispatch();

  const Employeeid = useSelector(selectCurrentId);

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
  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const onFinish = (values) => {
    const Newvalue = {
      resignationsDate: selectedDate,
      reason: values?.reason,
      employeeId: Employeeid,
      title: values?.title,
    };
    if(resignationrecord){
        UpdateResignation(Newvalue)

    }
    else{
        AddResignation(Newvalue);

    }
  };


  const AddResignation = (values) => {
      request.post(`${APIURLS.POSTRESINATIONS}`, values)
          .then(function (response) {
              toast.success("Employee Resignation Added")
              form.resetFields();
              dispatch(getResignation())
          })
          .catch(function (error) {
              console.error(error, 'check');
              toast.error("Failed");
          });
  }

  const UpdateResignation = (values, id) => {
      request.put(`${APIURLS.RESIGNATIONEDIT}${resignationrecord?.resignationsId}`, values)
          .then(function (response) {
              toast.info("Resignation Updated Successfully")
              dispatch(getResignation())
                  FormExternalClosee()
          })
          .catch(function (error) { });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // useEffect(() => {
  //     dispatch(getInitialEmployee())
  // }, [])

  useEffect(() => {
      if (resignationrecord) {
          form.setFieldsValue(resignationrecord)
      }
  }, [resignationrecord,updatetrigger])

  useEffect(()=>{
      if (resignationrecord) {
      const date = new Date(resignationrecord?.resignationsDate)

      const dateFormat = 'YYYY-MM-DD';
      const Dated = dayjs(date).format(dateFormat);

      form.setFieldsValue({
        resignationsDate: dayjs(Dated),
        employeeId:resignationrecord?.employeeId
      })
  }

  },[resignationrecord,updatetrigger])

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
            resignationsDate: dayjs(),
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
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
            rules={[
              {
                required: true,
                message: "Please Enter Title!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTextArea
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

        {/* <Col span={24} md={12} >
                        <CustomDatePicker
                            onChange={handleDateRangeChange}
                            name={'date'}
                            label={'From Date'}
                            rules={[{ required: true, message: 'Please Select the Date' }]}
                        />
                    </Col> */}

        <Col span={24} md={12}>
          <CustomDatePicker
            onChange={handleDateChange}
            disabled={'disabled'}
            name={"resignationsDate"}
            label={"Date"}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
        </Col>
        {/* <Col span={24} md={12}>
                        <CustomInput
                            label={"Total Day"}
                            placeholder={"Total Day"}
                            name={"totalDay"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Total Day !",
                                },
                            ]}
                        />
                    </Col> */}
      </CustomRow>

      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        {resignationrecord ? (
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
