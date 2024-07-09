import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form } from "antd";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../../../utils/request";
import { toast } from "react-toastify";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { BiFilterAlt } from "react-icons/bi";
import dayjs from "dayjs";
import { CustomCardView } from "../../../../../components/CustomCardView";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";
import { Filter, MoveSlider } from "../../Style";
import {
  getAttendanceCount,
  getCountAttStatus,
  getCountAttStatusError,
  selectAllAttendance,
} from "../../../Attendance/AttendanceSlice";
import { TbArrowsExchange } from "react-icons/tb";
import { selectCurrentId } from "../../../../Auth/authSlice";
import { CustomDateRangePicker } from "../../../../../components/Form/CustomDateRangePicker";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import {
  getDepartmentRole,
  selectAllDepartmentRole,
} from "../../../Recruitments/RecruitmentSlice";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";

export const ViewAllAttendanceReports = () => {
  const [form] = Form.useForm();

  const Employeeid = useSelector(selectCurrentId);
  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [show, setShow] = useState(false); //  use Date filter
  const [yearShow, setYearShow] = useState(false); // use  year filter
  const [monthshow, setMonthShow] = useState(false); // use  month filter
  const [yearData, setYearData] = useState([]); //  use year handle fn
  const [monthData, setMonthData] = useState([]); //  use month handle fn
  const [currentData, setCurrentData] = useState([]); //  use month handle fn
  const [totalValues, setTotalValues] = useState({}); // use date filter values post

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const dispatch = useDispatch();

  const countattendance = useSelector(selectAllAttendance);
  const AttendanceCountStatus = useSelector(getCountAttStatus);
  const AttendanceCountError = useSelector(getCountAttStatusError);

  useEffect(() => {
    dispatch(getAttendanceCount());
  }, []);
  useEffect(() => {
    setDataSource(countattendance);
  }, [countattendance]);

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

  //================= Delete filter Attendance fn============

  const DatesFilter = [
    { label: "Employee", value: "month" },
    { label: "Year", value: "year" },
    { label: "Current Day", value: "currentday" },
  ];

  //===========  month  options==========
  // const YearOptions = [];
  // for (let year = 2010; year <= 2050; year++) {
  //   YearOptions.push({ label: year.toString(), value: year.toString() });
  // }

  
  const currentYear = new Date().getFullYear();
  const YearOptions = [{ label: currentYear.toString(), value: currentYear.toString() }];
  
  for (let year = 2010; year <= 2050; year++) {
      if (year !== currentYear) {
          YearOptions.push({ label: year.toString(), value: year.toString() });
      }
  }


  //============ year options ============

  const MonthOptions = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < months.length; i++) {
    MonthOptions.push({ label: months[i], value: months[i] });
  }

  //=====================================================

  //=================== Currend Day =======================//
  const CurrentDays = [
    {
      label: "Present",
      value: "present",
    },
    {
      label: "Absent",
      value: "absent",
    },
  ];

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "currentday") {
      setShow(true);
      setMonthShow(false);
      setYearShow(false);
      setChoiceFull(value);
    } else if (value === "month") {
      setMonthShow(true);
      setShow(false);
      setYearShow(false);
      setChoiceFull(value);
    } else if (value === "year") {
      setYearShow(true);
      setShow(false);
      setMonthShow(false);
      setChoiceFull(value);
    } else {
      setMonthShow(false);
      setYearShow(false);
      setShow(false);
    }

    const choice = {
      choose: value,
    };
  };

  const handleYear = (values) => {
    setYearData(values);
  };
  const handleMonth = (values) => {
    setMonthData(values);
  };
  const handleCurrentDay = (values) => {
    setCurrentData(values);
  };

  const DateSearch = (values) => {
    request
      .post(`${APIURLS.POSTREPORTDATE_ATTENDANCE}`, values)
      .then(function (response) {
        setDataSource(response.data);
        setTableData(response.data);
        setEmployeeData(response.data);
        if (response.data.length) {
          toast.success("Date Filter Search");
        } else {
          toast.warn("No Data");
        }
      })
      .catch(function (error) {
        toast.error("Failed");
        console.log(error, "hhhhhh");
      });
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  //==========

  useEffect(() => {
    const newvalues = {
      choose: choiceFull,
      data: currentData,
    };
    const yearvalues = {
      choose: choiceFull,
      year: yearData,
      monthName: monthData,
    };
    const monthvalues = {
      choose: choiceFull,
      year: yearData,
      monthName: monthData,
    };
    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "month") {
      setTotalValues(monthvalues);
    } else if (choiceFull === "currentday") {
      setTotalValues(newvalues);
    }
  }, [yearData, monthData, choiceFull, currentData]);

  const onFinish = (values) => {
    if (values.month === "month") {
      const newValues = {
        ...totalValues,
        employeeId: values.employeeId,
        departmentId: values.departmentId,
      };
      DateSearch(newValues);
    } else {
      DateSearch(totalValues);
    }
  };


  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill the details!");
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit:"cover" }}
          />
        );
      },
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    // {
    //   title: "Department",
    //   dataIndex: "departmentName",
    // },
    {
      title: "Present Days",
      dataIndex: "presentDays",
      render: (text, record) => <span style={{ color: "green" }}>{text}</span>,
    },
    {
      title: "Absent Days",
      dataIndex: "absentDays",
      render: (text, record) => <span style={{ color: "red" }}>{text}</span>,
    },
    
    {
      title: "Total Days",
      dataIndex: "totalDays",
      render: (text, record) => <span style={{ color: "blue" }}>{text}</span>,
    },
  ];

  let content;

  if (AttendanceCountStatus === "loading") {
    content = <CommonLoading />;
  } else if (AttendanceCountStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeAttId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        style={{ cursor: "pointer" }}
      />
    );
  } else if (AttendanceCountStatus === "failed") {
    content = <h2>{AttendanceCountError}</h2>;
  }


  const Presentcolumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit:"cover" }}
          />
        );
      },
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
  ];

  let content1;

  if (AttendanceCountStatus === "loading") {
    content1 = <CommonLoading />;
  } else if (AttendanceCountStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employee_id;
    content1 = (
      <CustomStandardTable
        columns={Presentcolumns}
        data={tableData}
        rowKey={rowKey}
        style={{ cursor: "pointer" }}
      />
    );
  } else if (AttendanceCountStatus === "failed") {
    content1 = <h2>{AttendanceCountError}</h2>;
  }



  const Employeecolumns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit:"cover" }}
          />
        );
      },
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "In Time",
      dataIndex: "inTime",
    },
    {
      title: "Out Time",
      dataIndex: "outTime",
    },
    {
      title: "In Date",
      dataIndex: "indate",
    },
    {
      title: "Working Hour",
      dataIndex: "workinghour",
    },
    // {
    //   title: "IP Address",
    //   dataIndex: "ipAddress",
    // },
  ];

  let content2;

  if (AttendanceCountStatus === "loading") {
    content2 = <CommonLoading />;
  } else if (AttendanceCountStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employee_id;
    content2 = (
      <CustomStandardTable
        columns={Employeecolumns}
        data={employeeData}
        rowKey={rowKey}
        style={{ cursor: "pointer" }}
      />
    );
  } else if (AttendanceCountStatus === "failed") {
    content2 = <h2>{AttendanceCountError}</h2>;
  }

  useEffect(() => {
    dispatch(getDepartmentRole());
  }, []);

  const AllDepartmentRole = useSelector(selectAllDepartmentRole);


  const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
    label: emp.departmentName,
    value: emp.departmentId,
  }));

  const [employeeOption, setEmployeeOption] = useState([]);

  const handleDepartment = (e) => {
    form.setFieldsValue({ employeeName: null });
    form.setFieldsValue({ employeeId: null });

    const findObject = AllDepartmentRole.find(
      (item) => item.departmentId === e
    );
    // const employeeOption = findObject?.departmentDetails?.map((value) => ({
    //   label: value.userName,(value.employeeId),
    //   value: value.employeeId,
    // }));
    const employeeOption = findObject?.departmentDetails?.map((value) => ({
      label: `${value.userName}\u00A0\u00A0(${value.userId})`,
      value: value.employeeId,
    }));
    form.setFieldsValue({ departmentId: findObject.departmentId });
    setEmployeeOption(employeeOption);
  };

  const handleInterviewChange = (value) => {
    form.setFieldsValue({ employeeId: value });
  };


  let renderedContent;

if (choiceFull === "year") {
  renderedContent = content;
} else if (choiceFull === "currentday") {
  renderedContent = content1;
} else if (choiceFull === "month") {
  renderedContent = content2;
}

  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee Attendance Report"} />
      <br />
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          from_date: dayjs(),
          to_date: dayjs(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          <Col span={24} md={5}>
            <Filter onClick={handleChange}>
              <BiFilterAlt />
              &nbsp;&nbsp;Filter
            </Filter>
          </Col>
          <Col span={24} md={15}></Col>
          <Col span={24} md={4}></Col>
        </CustomRow>
        <MoveSlider showdetailsons={showdetailsON ? "true" : undefined}>
          <CustomRow
            space={[24, 24]}
            style={{ marginTop: "20px", flexWrap: "wrap" }}
          >
            <>
              <Col span={24} md={24} lg={3} style={{ marginTop: "10px" }}>
                <b>Choose</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24} lg={10}>
                <CustomSelect
                  options={DatesFilter}
                  name={"month"}
                  placeholder={"Select"}
                  onChange={handleMonthSelect}
                  rules={[
                    { required: true, message: "Please Select the Month" },
                  ]}
                />
              </Col>
              <Col span={24} md={24}>
                {show ? (
                  <CustomRow space={[24, 24]}>
                    <Col span={24} md={24} lg={3} style={{paddingLeft:"0px"}}>
                      <b>Present/Absent</b>&nbsp;&nbsp;
                      <TbArrowsExchange />
                    </Col>

                    <Col span={24} md={24} lg={8} style={{paddingLeft:"0px"}}>
                      <CustomSelect
                        onChange={handleCurrentDay}
                        name={"range"}
                        options={CurrentDays}
                        rules={[
                          {
                            required: true,
                            message: "Please Select the Date",
                          },
                        ]}
                      />
                    </Col>

                    <Col span={24} md={24} lg={6}>
                      <Flex>
                        <ButtonStandard.Primary
                          text={"Submit"}
                          htmlType="submit"
                        />
                      </Flex>
                    </Col>
                  </CustomRow>
                ) : null}

                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3} style={{paddingLeft:"0px"}}>
                        <b>Month</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={4} style={{paddingLeft:"0px"}}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                          rules={[
                            {
                              required: true,
                              message: "Please Select a Year",
                            },
                          ]}
                        />
                      </Col>

                      <Col span={24} md={24} lg={6}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                          rules={[
                            {
                              required: true,
                              message: "Please Select a month",
                            },
                          ]}
                        />
                      </Col>
                      <Col span={24} md={24} lg={6}>
                        <CustomSelect
                          onChange={handleDepartment}
                          options={DepartmentRoleOptions}
                          name={"departmentName"}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Employee Department ! ! !",
                            },
                          ]}
                        />
                        <CustomInput name={"departmentId"} display={"none"} />
                      </Col>

                      <Col span={24} md={24} lg={4}>
                        <CustomSelect
                          onChange={handleInterviewChange}
                          options={employeeOption}
                          name={"employeeName"}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Employee Name ! ! !",
                            },
                          ]}
                        />
                        <CustomInput name={"employeeId"} display={"none"} />
                      </Col>
                      <Col span={24} md={24} lg={6} style={{paddingLeft:"0px"}}>
                        <Flex>
                          <ButtonStandard.Primary
                            text={"Submit"}
                            htmlType="submit"
                          />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}

                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]} >
                      <Col span={24} md={3} style={{paddingLeft:"0px"}}>
                        <b>Year</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={4} style={{paddingLeft:"0px"}}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                          rules={[
                            {
                              required: true,
                              message: "Please Select a Year",
                            },
                          ]}
                        />
                      </Col>
                      <Col span={24} md={4}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                          rules={[
                            {
                              required: true,
                              message: "Please Select a month",
                            },
                          ]}
                        />
                      </Col>
                      <Col span={24} md={6}>
                        <Flex>
                          <ButtonStandard.Primary
                            text={"Submit"}
                            htmlType="submit"
                          />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}
              </Col>
            </>
          </CustomRow>
        </MoveSlider>
      </Form>

      {/* {show ? (
        content1
      ) : (
        <CustomCardView style={{ marginTop: "30px" }}>{content}</CustomCardView>
      )} */}
      {renderedContent}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modalWidth}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
