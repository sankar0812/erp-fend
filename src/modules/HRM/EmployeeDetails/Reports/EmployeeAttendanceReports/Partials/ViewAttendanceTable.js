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
import request, { base } from "../../../../../../utils/request";
import { toast } from "react-toastify";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectCurrentRoleName,
} from "../../../../../Auth/authSlice";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import { BiFilterAlt } from "react-icons/bi";
import dayjs from "dayjs";
import styled from "styled-components";
import { CustomCardView } from "../../../../../../components/CustomCardView";
import {
  getAttendanceCount,
  getCountAttStatus,
  getCountAttStatusError,
  selectAllAttendance,
} from "../../../../Attendance/AttendanceSlice";

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
  width: 100%;
  height: ${(props) => (props.showdetailsons ? "100%" : "0")};
  overflow: hidden;
  border-radius: 10px;
  border: white 1px;
  top: ${(props) => (props.showdetailsons ? "0" : "-100px")};
  transition: all 0.5s;
`;

export const ViewAllEmpAttendanceReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const Employeeid = useSelector(selectCurrentId);
  const RoleName = useSelector(selectCurrentRoleName);
  const RoleId = useSelector(selectCurrentRoleId);
  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [show, setShow] = useState(false); //  use Date filter
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
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAttendanceCount());
  // }, []);

  // const Allattendancereoprts = useSelector(selectAllAttendance);
  // const AllattendanceStatus = useSelector(getCountAttStatus);
  // const AllattendanceError = useSelector(getCountAttStatusError);

  // const InitialAttendanceValues = useMemo(
  //   () =>
  //     Allattendancereoprts?.filter((item) => item?.employeeId == Employeeid),
  //   [Allattendancereoprts, Employeeid]
  // );

  // useEffect(() => {
  //   setDataSource(InitialAttendanceValues);
  // }, [InitialAttendanceValues]);

  useEffect(() => {
    GetEmpAttendance();
  }, []);

  const GetEmpAttendance = () => {
    request
      .get(`${APIURLS.GETEMPATTENDANCE}${Employeeid}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  //================= Delete filter Complaints fn============

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

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

  //===============  year select =========================
  const handleYear = (values) => {
    setYearData(values);
  };

  //================ month select =======================
  const handleMonth = (values) => {
    setMonthData(values);
  };
  //=====================
  const DateSearch = (values) => {
    if (RoleName === "Training") {
      request
        .post(`${APIURLS.POST_TRAINEE_ATTENDANCE_REPOERTS}`, values)
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
          console.log(error);
        });
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      request
        .post(`${APIURLS.POST_EMP_ATTENDANCE_REPOERTS}`, values)
        .then(function (response) {
          setDataSource(response.data);
          if (response.data.length) {
            toast.success("Date Filter Search");
          } else {
            toast.warn("No Data");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };

  const onFinish = (values) => {
    let newvalues;
    if (RoleName === "Training") {
      newvalues = {
        traineeId: Employeeid,
        year: yearData,
        monthName: monthData,
        roleId: RoleId,
      };
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      newvalues = {
        year: yearData,
        monthName: monthData,
        employeeId: Employeeid,
        roleId: RoleId,
      };
    }
    DateSearch(newvalues);
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill the details!");
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    // {
    //     title: "Image",
    //     dataIndex: "profile",
    //     render: (profile) => {
    //         return <img
    //             src={`${base}${profile}`}
    //             alt="Staff"
    //             width="50"
    //             height="50"
    //             style={{ borderRadius: "50%" }}
    //         />
    //     }

    // },
    {
      title: RoleName === "Training" ? "Trainee Name" : "Employee Name",
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

  // let content;
  let rowKey;
  if (RoleName === "Training") {
    rowKey = (dataSource) => dataSource.traineeId;
  } else if (
    RoleName === "Employee" ||
    RoleName === "TL" ||
    RoleName === "ProjectHead"
  ) {
    rowKey = (dataSource) => dataSource.employeeId;
  }

  // if (AllattendanceStatus === "loading") {
  //   content = <CommonLoading />;
  // } else if (AllattendanceStatus === "succeeded") {
  //   content = (
  //     <CustomStandardTable
  //       columns={columns}
  //       data={dataSource}
  //       rowKey={rowKey}
  //       style={{ cursor: "pointer" }}
  //     />
  //   );
  // } else if (AllattendanceStatus === "failed") {
  //   content = <h2>{AllattendanceError}</h2>;
  // }

  return (
    <Fragment>
      {RoleName === "Training" ? (
        <CustomPageTitle Heading={"Trainee Attendance Report"} />
      ) : (
        <CustomPageTitle Heading={"Employee Attendance Report"} />
      )}
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
              <Col span={24} md={24} lg={6} style={{ marginTop: "10px" }}>
                <b>Choose Month & Year</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24}>
                {showdetailsON && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                        />
                      </Col>
                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                        />
                      </Col>
                      <Col span={24} md={24} lg={8}>
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
      {/* {content} */}
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        style={{ cursor: "pointer" }}
      />
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
