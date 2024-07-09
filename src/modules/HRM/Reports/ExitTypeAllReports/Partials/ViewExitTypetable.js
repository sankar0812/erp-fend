import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form } from "antd";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../../../utils/request";
import { toast } from "react-toastify";
import { selectCurrentId } from "../../../../Auth/authSlice";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { BiFilterAlt } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import dayjs from "dayjs";
import styled from "styled-components";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { getEmployeeExit, getEmployeeExitError, getEmployeeExitStatus, selectAllEmployeeExit } from "../../../ExitType/Exit/Partials/ExitSlice";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";

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

export const ViewAllExitTypesReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const Employeeid = useSelector(selectCurrentId);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
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

  useEffect(() => {
    dispatch(getEmployeeExit());
  }, []);

  const AllEmployeeExit = useSelector(selectAllEmployeeExit);
  const EmployeeExitStatus = useSelector(getEmployeeExitStatus);
  const EmployeeExitError = useSelector(getEmployeeExitError);


  useEffect(() => {
    setDataSource(AllEmployeeExit);
  }, [AllEmployeeExit]);

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


  //================= Delete filter Exit Type fn============

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  //===========  month  options==========
  // const YearOptions = [];
  // for (let year = 2010; year <= 2050; year++) {
  //   YearOptions.push({ label: year.toString(), value: year.toString() });
  // }

  
  const currentYear = new Date().getFullYear();
  const YearOptions = [{ label: currentYear.toString() + " - Current Year", value: currentYear.toString() }];
  
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
// =============================================

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "month") {
      setMonthShow(true);
      setYearShow(false);
      setChoiceFull(value);
    } else if (value === "year") {
      setYearShow(true);
      setMonthShow(false);
      setChoiceFull(value);
    } else {
      setMonthShow(false);
      setYearShow(false);
    }

    const choice = {
      choose: value,
    };

  };
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
    request
      .post(`${APIURLS.POSTREPORTDATE_ExitType_SEARCH}`, values)
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
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  //==========

  useEffect(() => {

    const yearvalues = {
      choose: choiceFull,
      year: yearData,
    };
    const monthvalues = {
      choose: choiceFull,
      monthName: monthData,
    };
    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "month") {
      setTotalValues(monthvalues);
    } 
  }, [yearData, monthData, choiceFull]);

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
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%" }}
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
          String(record.employee_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.employee_name).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  let content;

  if (EmployeeExitStatus === "loading") {
    content = <CommonLoading />;
  } else if (EmployeeExitStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeExitId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (EmployeeExitStatus === "failed") {
    content = <h2>{EmployeeExitError}</h2>;
  }
  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee ExitType Report"} />
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
          <CustomRow space={[24, 24]} style={{ marginTop: "20px",flexWrap: 'wrap' }}>
            <>
              <Col span={24} md={24}  lg={3} style={{ marginTop: "10px" }}>
                <b>Choose</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24} lg={10}  >
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
                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3} >
                        <b>Between</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}  >
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                        />
                      </Col>
                      <Col span={24} md={24} lg={6}>
                        <Flex>
                          <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}
                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3} >
                        <b>Between</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                        />
                      </Col>
                      <Col span={24} md={24} lg={6} >
                        <Flex>
                          <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
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
      {/* <CustomCardView style={{ marginTop: "30px" }}> */}
        {content}
        {/* </CustomCardView> */}
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
