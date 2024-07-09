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
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import ButtonStandard from "../../../../../../components/Form/CustomStandardButton";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { THEME } from "../../../../../../theme";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../../utils/request";
import { Filter, MoveSlider } from "../../../../Reports/Style";
import {
  getInvoice,
  getInvoiceError,
  getInvoiceStatus,
  getinvoiceView,
} from "../../../Invoice/invoiceSlice";
import { ReportInvoiceViewPrint } from "./ReportInvoiceViewPrint";

const ViewInvoiceReportsTable = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm(); //  --> Form Ref

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const [choiceFull, setChoiceFull] = useState("");
  const [searchTexts, setSearchTexts] = useState([]); // Search bar
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [gstShow, setGstShow] = useState(false); // use  gstType filter
  const [yearShow, setYearShow] = useState(false); // use  year filter
  const [monthshow, setMonthShow] = useState(false); // use  month filter
  const [yearData, setYearData] = useState([]); //  use year handle fn
  const [monthData, setMonthData] = useState([]); //  use month handle fn
  const [gstData, setGstData] = useState([]); //  use month handle fn
  const [totalValues, setTotalValues] = useState({}); // use date filter values post

  const Allinvoiceview = useSelector(getinvoiceView);
  const ViewInvoiceStatus = useSelector(getInvoiceStatus);
  const ViewInvoiceError = useSelector(getInvoiceError);

  useEffect(() => {
    dispatch(getInvoice());
  }, []);

  useEffect(() => {
    setDataSource(Allinvoiceview);
  }, [Allinvoiceview]);

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
    setModalTitle("Invoice Print");
    setModalContent(<ReportInvoiceViewPrint record={record} />);
    showModal();
  };

  //================= Invoice Report Date Search fn============

  const DatesFilter = [
    { label: "This Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "Gst Type", value: "gst" },
  ];
    //===========  Gst Type  options==========

  const GstTypeoptions = [
    { label: "With Tax", value: "withTax" },
    { label: "WithOut Tax", value: "withoutTax" },
  ];

  //===========  month  options==========

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
  // =============================================

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "month") {
      setMonthShow(true);
      setYearShow(false);
      setGstShow(false);
      setChoiceFull(value);
    } else if (value === "year") {
      setYearShow(true);
      setMonthShow(false);
      setGstShow(false);
      setChoiceFull(value);
    } else if (value === "gst") {
      setGstShow(true);
      setYearShow(false);
      setMonthShow(false);
      setChoiceFull(value);
    } else {
      setMonthShow(false);
      setYearShow(false);
      setGstShow(false);
    }

    const choice = {
      choose: value,
    };
  };

  //===============  Gst Type select =========================
  const handleGst = (values) => {
    setGstData(values);
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
      .post(`${APIURLS.POST_INVOICE_REPORTS}`, values)
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
    const gstvalues = {
      choose: choiceFull,
      data: gstData,
    };
    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "month") {
      setTotalValues(monthvalues);
    } else if (choiceFull === "gst") {
      setTotalValues(gstvalues);
    }
  }, [yearData, gstData, monthData, choiceFull]);

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
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.clientName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.clientName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceId",
    },
    {
      title: "Invoice Date",
      dataIndex: "invoiceDate",
    },
    {
      title: "Bill Amount",
      dataIndex: "amount",
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

  if (ViewInvoiceStatus === "loading") {
    content = <CommonLoading />;
  } else if (ViewInvoiceStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.invoiceId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({})}
      />
    );
  } else if (ViewInvoiceStatus === "failed") {
    content = <h2>{ViewInvoiceError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={"Invoice Report"} />
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
                {gstShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}>
                        <b>Gst Type</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8}>
                        <CustomSelect
                          options={GstTypeoptions}
                          onChange={handleGst}
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

export default ViewInvoiceReportsTable;
