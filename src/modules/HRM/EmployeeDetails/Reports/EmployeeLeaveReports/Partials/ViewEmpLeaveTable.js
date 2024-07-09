import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col, Form } from "antd";
import Flex from "../../../../../../components/Flex";
import { CustomModal } from "../../../../../../components/CustomModal";
import Button from "../../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../../utils/request";
import { toast } from "react-toastify";
import { CustomTag } from "../../../../../../components/Form/CustomTag";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectCurrentRoleName,
} from "../../../../../Auth/authSlice";
import {
  getLeave,
  getLeaveDetailsError,
  getLeaveDetailsStatus,
  selectLeaveDetails,
} from "../../../../EmployeeDetails/EmployeeSlice";
import { CustomDateRangePicker } from "../../../../../../components/Form/CustomDateRangePicker";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { BiFilterAlt } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import dayjs from "dayjs";
import styled from "styled-components";

const Filter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-size: 25px;
  color: #1677ff;
  font-weight: 600;
  margin: 0 0 20px 0;

  & svg {
    font-size: 25px;
  }
`;
export const MoveSlider = styled.div`
  position: relative;
  background: ${(props) => (props.showdetailsons ? "#f8f8f8" : "white")};
  /* box-shadow: 0 0 5px 5px rgba(0,0,0,0.03); */
  width: 100%;
  height: ${(props) => (props.showdetailsons ? "100%" : "0")};
  overflow: hidden;
  border-radius: 10px;
  border: white 1px;
  top: ${(props) => (props.showdetailsons ? "0" : "-100px")};
  transition: all 0.5s;
`;
export const ViewAllEmployeeLeaveReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [show, setShow] = useState(false); //  use Date filter
  const [yearShow, setYearShow] = useState(false); // use  year filter
  const [monthshow, setMonthShow] = useState(false); // use  month filter
  const [yearData, setYearData] = useState([]); //  use year handle fn
  const [monthData, setMonthData] = useState([]); //  use month handle fn
  const [totalValues, setTotalValues] = useState({}); // use date filter values post

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const dispatch = useDispatch();

  const Employeeid = useSelector(selectCurrentId);
  const RoleName = useSelector(selectCurrentRoleName);
  const RoleId = useSelector(selectCurrentRoleId);

  const InitialEmployeeDetails = useSelector(selectLeaveDetails);
  const InitialEmployeeStatus = useSelector(getLeaveDetailsStatus);
  const InitialEmployeeError = useSelector(getLeaveDetailsError);

  const EmployeeFindId = useMemo(
    () =>
      InitialEmployeeDetails?.filter((item) => item?.employeeId == Employeeid),
    [InitialEmployeeDetails, Employeeid]
  );

  useEffect(() => {
    if (EmployeeFindId) {
      setDataSource(EmployeeFindId);
    }
  }, [EmployeeFindId]);

  useEffect(() => {
    if (EmployeeFindId) {
      setDataSource(EmployeeFindId);
    }
  }, [EmployeeFindId]);

  useEffect(() => {
    dispatch(getLeave());
  }, []);

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

  //================= Delete filter leave fn============

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Custom", value: "date" },
  ];

  //===========  month  options==========
  const YearOptions = [];
  for (let year = 2010; year <= 2050; year++) {
    YearOptions.push({ label: year.toString(), value: year.toString() });
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

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "date") {
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

  const DateSearch = (values) => {

    if (RoleName === "Training") {
      request
      .post(`${APIURLS.POSTTRAINEE_LEAVE_REPORTS}`, values)
      .then(function (response) {
        setDataSource(response.data);
        if (response.data.length) {
          toast.success("Date Filter Search");
        } else {
          toast.warn("No Data");
        }
      })
      .catch(function (error) {
        toast.error("Failed");
      });
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      request
      .post(`${APIURLS.POSTEMPLOYEE_LEAVE_REPORTS}`, values)
      .then(function (response) {
        setDataSource(response.data);
        if (response.data.length) {
          toast.success("Date Filter Search");
        } else {
          toast.warn("No Data");
        }
      })
      .catch(function (error) {
        toast.error("Failed");
      });
    }
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  //==========

  useEffect(() => {
    let newvalues;
    let yearvalues;
    let monthvalues;

    if (RoleName === "Training") {
      newvalues = {
        traineeId: Employeeid,
        startDate: dateRange?.start_date,
        endDate: dateRange?.end_date,
        choose: choiceFull,
        roleId: RoleId,
      };
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      newvalues = {
        startDate: dateRange?.start_date,
        endDate: dateRange?.end_date,
        choose: choiceFull,
        employeeId: Employeeid,
        roleId: RoleId,
      };
    }

    if (RoleName === "Training") {
      yearvalues = {
        traineeId: Employeeid,
        choose: choiceFull,
        year: yearData,
        roleId: RoleId,
      };
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      yearvalues = {
        choose: choiceFull,
        year: yearData,
        employeeId: Employeeid,
        roleId: RoleId,
      };
    }

    if (RoleName === "Training") {
      monthvalues = {
        traineeId: Employeeid,
        choose: choiceFull,
      monthName: monthData,
        roleId: RoleId,
      };
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      monthvalues = {
        choose: choiceFull,
        monthName: monthData,
        employeeId: Employeeid,
        roleId: RoleId,
      };
    }

    // const newvalues = {
    //   startDate: dateRange?.start_date,
    //   endDate: dateRange?.end_date,
    //   choose: choiceFull,
    //   employeeId:Employeeid,
    // };
    // const yearvalues = {
    //   choose: choiceFull,
    //   year: yearData,
    //   employeeId: Employeeid,
    // };
    // const monthvalues = {
    //   choose: choiceFull,
    //   monthName: monthData,
    //   employeeId: Employeeid,
    // };
    
    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "month") {
      setTotalValues(monthvalues);
    } else if (choiceFull === "date") {
      setTotalValues(newvalues);
    }
  }, [yearData, monthData, choiceFull, dateRange, Employeeid]);

  const onFinish = (values) => {
    DateSearch(totalValues);
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
      title: RoleName === 'Training' ? "Trainee Name" : "Employee Name",
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
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "From Date",
      dataIndex: "date",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
    },
    {
      title: "Total Day",
      dataIndex: "totalDay",
    },
    {
      title: "Status",
      // dataIndex: "statusLevel",
      render: (record, i) => {
        return (
          <Fragment>
            {record.leavetype === "pending" && (
              <CustomTag
                bordered={"true"}
                color={"warning"}
                title={"Pending"}
              />
            )}

            {record.leavetype === "rejected" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}

            {record.leavetype === "approved" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Approval"}
              />
            )}
          </Fragment>
        );
      },
    },
  ];

  let content;

  if (InitialEmployeeStatus === "loading") {
    content = <CommonLoading />;
  } else if (InitialEmployeeStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (InitialEmployeeStatus === "failed") {
    content = <h2>{InitialEmployeeError}</h2>;
  }

  return (
    <Fragment>
      {
        RoleName === 'Training' ? <CustomPageTitle Heading={"Trainee Leave Report"} /> : <CustomPageTitle Heading={"Employee Leave Report"} />
      }
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
          <Col span={24} md={4}>
            {/* <Flex end={true}>
              <ButtonStandard.Primary
                text={"Add Sale"}
                style={{ marginRight: "10px" }}
                onClick={() => nevigate(`/addsale`)}
              />
            </Flex> */}
          </Col>
        </CustomRow>
        {/* {showdetailsON && ( */}
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
                    <Col span={24} md={24} lg={3}>
                      <b>Between</b>&nbsp;&nbsp;
                      <TbArrowsExchange />
                    </Col>

                    <Col span={24} md={24} lg={8}>
                      <CustomDateRangePicker
                        onChange={handleDateRangeChange}
                        name={"range"}
                        value={dateRange}
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
                        <Button.Primary text={"Submit"} htmlType="submit" />
                      </Flex>
                    </Col>
                  </CustomRow>
                ) : null}

                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}>
                        <b>Month</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                        />
                      </Col>
                      <Col span={24} md={24} lg={6}>
                        <Flex>
                          <Button.Primary text={"Submit"} htmlType="submit" />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}

                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}>
                        <b>Year</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                        />
                      </Col>
                      <Col span={24} md={24} lg={6}>
                        <Flex>
                          <Button.Primary text={"Submit"} htmlType="submit" />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}
              </Col>
            </>
          </CustomRow>
        </MoveSlider>
        {/* )} */}
      </Form>

      {content}

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
