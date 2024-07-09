import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col, Form } from "antd";
import Flex from "../../../../../../components/Flex";
import { CustomModal } from "../../../../../../components/CustomModal";
import { useNavigate } from "react-router-dom";
import {
  CustomPageTitle,
} from "../../../../../../components/CustomPageTitle";

import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../../utils/request";
import { toast } from "react-toastify";
import { selectCurrentId } from "../../../../../Auth/authSlice";
import { CustomDateRangePicker } from "../../../../../../components/Form/CustomDateRangePicker";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import ButtonStandard from "../../../../../../components/Form/CustomStandardButton";
import { BiFilterAlt } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import dayjs from "dayjs";
import { Filter, MoveSlider } from "../../../../Reports/Style";
import { getExpense, getExpenseError, getExpenseStatus, selectAllExpense } from "../../../AccountsSlice";


export const ViewAllExpenseReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");
  const [dataSource, setDataSource] = useState([]);

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
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  const Employeeid = useSelector(selectCurrentId);

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  const AllExpense = useSelector(selectAllExpense);
  const AllExpenseStatus = useSelector(getExpenseStatus);
  const AllExpenseError = useSelector(getExpenseError);

  useEffect(() => {
    setDataSource(AllExpense);
  }, [AllExpense]);

  // ===== Modal Functions Start =====

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
  
  //================= Date filter Expense Reports fn============

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Custom", value: "date" },
  ];

  //===========  month  options==========
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
    request
      .post(`${APIURLS.POST_EXPENSE_REPORT}`, values)
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
        console.log(error,'hhhhhh');
      });
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  //==========

  useEffect(() => {
    const newvalues = {
      startDate: dateRange?.start_date,
      endDate: dateRange?.end_date,
      choose: choiceFull,
    };
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
    } else if (choiceFull === "date") {
      setTotalValues(newvalues);
    }
  }, [yearData, monthData, choiceFull, dateRange]);

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
      title: "Expense Name",
      dataIndex: "expenseName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Expense Type",
      dataIndex: "expenseType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },

  ];

  let content;

  if (AllExpenseStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllExpenseStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.expenseId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllExpenseStatus === "failed") {
    content = <h2>{AllExpenseError}</h2>;
  }
  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee Expense Report"} />
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
          </Col>
        </CustomRow>
        <MoveSlider showdetailsons={showdetailsON ? "true" : undefined}>
          <CustomRow space={[24, 24]} style={{ marginTop: "20px",flexWrap: 'wrap' }} >
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
                    <Col span={24} md={24} lg={3} >
                      <b>Between</b>&nbsp;&nbsp;
                      <TbArrowsExchange />
                    </Col>

                    <Col span={24} md={24} lg={8} >
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

                    <Col span={24} md={24} lg={6} >
                      <Flex>
                        <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                      </Flex>
                    </Col>
                  </CustomRow>
                ) : null}

                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24}  lg={3}>
                        <b>Month</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={MonthOptions}
                          onChange={handleMonth}
                        />
                      </Col>
                      <Col span={24}  md={24} lg={6}>
                        <Flex>
                          <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}

                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={3}>
                        <b>Year</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={8}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                        />
                      </Col>
                      <Col span={24} md={6}>
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
