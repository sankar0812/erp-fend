import React, { useEffect, useState } from "react";
import { Col, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAttendancePunch,
  getLeaveDetailsError,
  getLeaveDetailsStatus,
} from "../../EmployeeDetails/EmployeeSlice";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";
import { useForm } from "antd/es/form/Form";
import request from "../../../../utils/request";
import dayjs from "dayjs";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import Flex from "../../../../components/Flex";
import { selectCurrentId, selectCurrentRoleName } from "../../../Auth/authSlice";
import { toast } from "react-toastify";

export const ViewAttendance = ({ id, roleId, viewData, setViewData }) => {

  const navigate = useNavigate();

  const [form] = useForm();

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); //  -->   Date

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const InitialEmployeeDetails = useSelector(getAttendancePunch);
  const RoleName = useSelector(selectCurrentRoleName);


  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  }; 
  

  const handleOk = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  //======================Month =====================//
  const month = [
    { label: "January", value: "january" },
    { label: "February", value: "february" },
    { label: "March", value: "march" },
    { label: "April", value: "april" },
    { label: "May", value: "may" },
    { label: "June", value: "june" },
    { label: "July", value: "july" },
    { label: "August", value: "august" },
    { label: "September", value: "september" },
    { label: "October", value: "october" },
    { label: "November", value: "november" },
    { label: "December", value: "december" },
  ];
  const currentMonthIndex = new Date().getMonth();
  const defaultSelectedMonth = month[currentMonthIndex].value;

  // ================= Year ============================

  const Year = [
    { label: "2015", value: "2015" },
    { label: "2016", value: "2016" },
    { label: "2017", value: "2017" },
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];
  const currentYear = new Date().getFullYear();
  const defaultSelectedYear = currentYear.toString();

  //=====================================

  const FilterAttendance = (value) => {
    request
      .post(`${APIURLS.POSTDATEATTENDANCE}`, value)
      .then(function (response) {
        message.success("Flitered");
        setViewData(response.data);
      })
      .catch((error) => {
        setViewData([]);
        message.error(error.response?.data);
      });
  };

  const onFinish = (values) => {
    let newvalues;

    if (RoleName === "Training") {
      newvalues = {
        trainee_id: id,
        month: values?.month,
        year: values?.year,
        role_id: roleId,
      };
    }
    //  else if (
    //   RoleName === "Employee" ||
    //   RoleName === "TL" ||
    //   RoleName === "ProjectHead"
    // ) {
    //   newvalues = {
    //     employee_id: id,
    //     month: values?.month,
    //     year: values?.year,
    //     role_Id: roleId,
    //   };
    // }
    else {
      newvalues = {
        employee_id: id,
        month: values?.month,
        year: values?.year,
        role_id: roleId,
      };
    }
    
    FilterAttendance(newvalues);
  };

  const onFinishFailed = () => {};


  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "in_date",
    },
    {
      title: "Punch In",
      dataIndex: "in_time",
    },
    {
      title: "Punch Out",
      dataIndex: "out_time",
    },
    {
      title: "Working Hrs",
      dataIndex: "working_hour",
    },
  ];

  const rowKey = (dataSource) => dataSource.employee_att_id;

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        month: defaultSelectedMonth,
        year: defaultSelectedYear,
      }}
    >
      <CustomPageTitle Heading={"Employee"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={6}>
          <CustomSelect
            label={"Select Month"}
            options={month}
            name={"month"}
            rules={[
              {
                required: true,
                message: "Please Select a Month!",
              },
            ]}
          />
        </Col>
        <Col span={24} md={8}>
          <Flex alignend="true" gap={"15px"}>
            <CustomSelect
              label={"Select Year"}
              options={Year}
              name={"year"}
              rules={[
                {
                  required: true,
                  message: "Please Select a Year!",
                },
              ]}
            />
            <ButtonStandard.Primary
              style={{ borderRadius: "6px" }}
              text={"Search"}
              htmlType={"submit"}
            />
          </Flex>
        </Col>
        <Col span={24} md={10}></Col>
      </CustomRow>
      <CustomStandardTable columns={columns} data={viewData} rowKey={rowKey}/>
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
