import { Col, Form } from "antd";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { FcPrint } from "react-icons/fc";
import { TbArrowsExchange } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { TableIconHolder } from "../../../../../../components/CommonStyled";
import { CustomCardView } from "../../../../../../components/CustomCardView";
import { CustomModal } from "../../../../../../components/CustomModal";
import {
  CustomPageTitle,
} from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import { CustomDateRangePicker } from "../../../../../../components/Form/CustomDateRangePicker";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import ButtonStandard from "../../../../../../components/Form/CustomStandardButton";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { THEME } from "../../../../../../theme";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../../utils/request";
import { Filter, MoveSlider } from "../../../../Reports/Style";
import {
  getMaintainInvoicesError,
  getMaintainInvoicesStatus,
  getMaintenance,
  getMaintianInvoices,
} from "../../../Invoice/invoiceSlice";
import {
  ReportMaintenanceViewPrint,
} from "./ReportQuotationViewPrint";

const ViewMaintenanceInvoices = () => {

  const dispatch = useDispatch();
  const [form] = Form.useForm(); //  --> Form Ref

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const [showdetailsON, setShowdetailsON] = useState(false);
  const [show, setShow] = useState(false); //  use Date filter
  const [yearShow, setYearShow] = useState(false); // use  year filter
  const [monthshow, setMonthShow] = useState(false); // use  month filter
  const [yearData, setYearData] = useState([]); //  use year handle fn
  const [monthData, setMonthData] = useState([]); //  use month handle fn
  const [totalValues, setTotalValues] = useState({}); // use date filter values post
  const [dateRange, setDateRange] = useState([]);
  const [choiceFull, setChoiceFull] = useState("");

  const AllmaintenanceInvoices = useSelector(getMaintianInvoices);
  const AllmaintenanceInvoicesStatus = useSelector(getMaintainInvoicesStatus);
  const AllmaintenanceInvoicesError = useSelector(getMaintainInvoicesError);

  useEffect(() => {
    setDataSource(AllmaintenanceInvoices);
  }, [AllmaintenanceInvoices]);

  useEffect(() => {
    dispatch(getMaintenance());
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleprintview = (record) => {
    setModalTitle("Maintenance Invoices Print");
    setModalContent(<ReportMaintenanceViewPrint record={record} />);
    showModal();
  };

  //================= Date filter MaintenanceDate Search fn============

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Six Month", value: "sixMonth" },
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
      setChoiceFull(value);
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
      .post(`${APIURLS.POST_MAINTAININVOICES_REPORTS}`, values)
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
        console.log(error, "hhhhhh");
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
    const Sixmonthvalues = {
      choose: choiceFull,
    };
    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "month") {
      setTotalValues(monthvalues);
    } else if (choiceFull === "date") {
      setTotalValues(newvalues);
    } else {
      setTotalValues(Sixmonthvalues);
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
      title: "Client Name",
      dataIndex: "clientName",
    },
    {
      title: "Maintenance No",
      dataIndex: "maintenanceInvoiceId",
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
    },
    {
      title: "Bill Amount",
      dataIndex: "total",
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (text, record, index) => {
        return (
          <Flex center={"true"}>
            <TableIconHolder
              color={THEME.blue}
              size={"22px"}
              onClick={() => handleprintview(record)}
            >
              <FcPrint />
            </TableIconHolder>
          </Flex>
        );
      },
    },
  ];
  let content;

  if (AllmaintenanceInvoicesStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllmaintenanceInvoicesStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.maintenanceInvoiceId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({})}
      />
    );
  } else if (AllmaintenanceInvoicesStatus === "failed") {
    content = <h2>{AllmaintenanceInvoicesError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={"Maintenance Invoices Report"} />
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
              {choiceFull === "sixMonth" && (
                <Col span={24} md={24} lg={6}>
                  <Flex>
                    <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
                  </Flex>
                </Col>
              )}
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
                        <b>Year</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={YearOptions}
                          onChange={handleYear}
                          rules={[
                            {
                              required: true,
                              message: "Please Select the year",
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
                  </>
                )}
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
        {content}
        {/* </CustomCardView> */}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};

export default ViewMaintenanceInvoices;
