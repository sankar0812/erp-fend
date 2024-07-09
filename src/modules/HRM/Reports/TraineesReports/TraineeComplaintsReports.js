import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CustomCardView } from "../../../../components/CustomCardView";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import dayjs from "dayjs";
import { BiFilterAlt } from "react-icons/bi";
import { Filter, MoveSlider } from "../Style";
import { CustomRow } from "../../../../components/CustomRow";
import { TbArrowsExchange } from "react-icons/tb";
import { CustomDateRangePicker } from "../../../../components/Form/CustomDateRangePicker";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";
import Flex from "../../../../components/Flex";
import { CustomSelect } from "../../../../components/Form/CustomSelect";

export const TraineeComplaintsReports = () => {
  const [form] = Form.useForm();
  const nevigate = useNavigate();

  const Employeeid = useSelector(selectCurrentId);
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
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComplaints());
  // }, []);

  // const AllComplaintsDetails = useSelector(selectAllComplaints);
  // const AllComplaintsStatus = useSelector(getComplaintsStatus);
  // const AllComplaintsError = useSelector(getComplaintsError);
  // console.log(AllComplaintsDetails,'AllComplaintsDetails');

  // useEffect(() => {
  //   setDataSource(AllComplaintsDetails);
  // }, [AllComplaintsDetails]);

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

  const FormExternalClose = () => {
    handleOk();
    // dispatch(getLeave())
  };

  //================= Delete filter Complaints fn============

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Custom", value: "date" },
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
      .post(`${APIURLS.POSTREPORTTRAINEECOMPLAINTS}`, values)
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

  const TableColumn = [
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
            style={{ borderRadius: "50%",objectFit:"cover" }}
          />
        );
      },
    },
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "User Name",
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
      title: "Complaints Title",
      dataIndex: "complaintsTitle",
    },
    {
      title: "Complaints Date",
      dataIndex: "complaintsDate",
    },
    {
      title: "Complaints Against Name",
      dataIndex: "complaintsAgainstName",
    },
    //   {
    //     title: 'Action',
    //     render: (record) => {
    //       return (
    //         <Flex center={"true"} gap={'10px'}>
    //           <FiEdit onClick={() => UpdateDesignation(record)} />
    //         </Flex>
    //       );
    //     },
    //   },
  ];

  // const AddEmployeeDesinationDetails = () => {
  //   setModalTitle("Add Staff Designation");
  //   setModalContent(
  //     <AddDesignationModal
  //       formname={"AddDesignationForm"}
  //       FormExternalCloses={FormExternalClose}
  //     />
  //   );
  //   showModal();
  // };

  // let content;

  // if (AllComplaintsStatus === "loading") {
  //   content = <CommonLoading />;
  // } else if (AllComplaintsStatus === "succeeded") {
  //   const rowKey = (dataSource) => dataSource.designationId;
  //   content = (
  //     <CustomStandardTable
  //       columns={TableColumn}
  //       data={dataSource}
  //       rowKey={rowKey}
  //     />
  //   );
  // } else if (AllComplaintsStatus === "failed") {
  //   content = <h2>{AllComplaintsError}</h2>;
  // }

  const rowKey =(dataSource) => dataSource?.complaintsId

  return (
    <Fragment>
      <CustomPageTitle Heading={"Trainee Complaints Report"} />
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
                        <ButtonStandard.Primary
                          text={"Submit"}
                          htmlType="submit"
                        />
                      </Flex>
                    </Col>
                  </CustomRow>
                ) : null}

                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}>
                        <b>Between</b>&nbsp;&nbsp;
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
                          <ButtonStandard.Primary
                            text={"Submit"}
                            htmlType="submit"
                          />
                        </Flex>
                      </Col>
                    </CustomRow>
                  </>
                )}
                {monthshow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}>
                        <b>Between</b>&nbsp;&nbsp;
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
        {/* )} */}
      </Form>
      {/* <CustomCardView style={{ marginTop: "30px" }}> */}
        <CustomStandardTable
          columns={TableColumn}
          data={dataSource}
          rowKey={rowKey}
        />
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
