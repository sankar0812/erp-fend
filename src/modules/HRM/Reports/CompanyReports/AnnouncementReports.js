import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import dayjs from "dayjs";
import { Filter, MoveSlider } from "../Style";
import { BiFilterAlt } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import { CustomDateRangePicker } from "../../../../components/Form/CustomDateRangePicker";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";
import Flex from "../../../../components/Flex";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomCardView } from "../../../../components/CustomCardView";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { toast } from "react-toastify";
import { CustomTag } from "../../../../components/Form/CustomTag";
import {
  getAnnouncement,
  getAnnouncementError,
  getAnnouncementStatus,
  selectAllAnnouncement,
} from "../../../Organization/Announcement/announceSlice";
import { useSelector } from "react-redux";
import { CommonLoading } from "../../../../components/CommonLoading";

export const AnnouncementReports = () => {
  const [form] = Form.useForm();

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

  const AllAnnouncement = useSelector(selectAllAnnouncement);
  const AnnouncementStatus = useSelector(getAnnouncementStatus);
  const AnnouncementError = useSelector(getAnnouncementError);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  useEffect(() => {
    setDataSource(AllAnnouncement);
  }, [AllAnnouncement]);

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
    { label: "Year", value: "year" },
    { label: "Company Announcement", value: "currentday" },
  ];

  const StatusOptions = [
    { label: "Published", value: "published" },
    { label: "UnPublished", value: "unpublished" },
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
  // =============================================

  const handleMonthSelect = (value) => {
    form.setFieldsValue({ range: null });
    if (value === "year") {
    //   setShow(true);
      setMonthShow(false);
      setYearShow(true);
      setChoiceFull(value);
    } else if (value === "currentday") {
      setMonthShow(true);
    //   setShow(false);
      setYearShow(false);
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
      .post(`${APIURLS.POSTANNOUNCEMENTREPORT}`, values)
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
      data: monthData,
    };

    if (choiceFull === "year") {
      setTotalValues(yearvalues);
    } else if (choiceFull === "currentday") {
      setTotalValues(monthvalues);
    }
  }, [yearData, monthData, choiceFull]);

  const onFinish = (values) => {
    DateSearch(totalValues);
    console.log(totalValues,'totalValues');
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
      title: "Informed By",
      dataIndex: "informedBy",
    },
    {
      title: "Title For Announcement",
      dataIndex: "title",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
    },
    {
      title: "Status",

      render: (record, i) => {
        return (
          <Fragment>
            {record.publish === "published" ? (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Published"}
              />
            ) : (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"Un Published"}
              />
            )}
          </Fragment>
        );
      },
    },
  ];

  let content;

  if (AnnouncementStatus === "loading") {
    content = <CommonLoading />;
  } else if (AnnouncementStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.announcementId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AnnouncementStatus === "failed") {
    content = <h2>{AnnouncementError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={"Announcement Report"} />
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
                    { required: true, message: "Please Choose one" },
                  ]}
                />
              </Col>
              <Col span={24} md={24}>

                {yearShow && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3} style={{paddingLeft:"0px"}}>
                        <b>Between</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8} style={{paddingLeft:"0px"}}>
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
                      <Col span={24} md={24} lg={3} style={{paddingLeft:"0px"}}>
                        <b>Between</b>&nbsp;&nbsp;
                        <TbArrowsExchange />
                      </Col>

                      <Col span={24} md={24} lg={8} style={{paddingLeft:"0px"}}>
                        <CustomSelect
                          options={StatusOptions}
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
        width={modalWidth}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
