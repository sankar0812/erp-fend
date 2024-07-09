import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form } from "antd";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import {
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
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
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { getAppointment, getAppointmentError, getAppointmentStatus, selectAllAppointment } from "../../../Recruitments/RecruitmentSlice";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";
import { Filter, MoveSlider } from "../../Style";


export const ViewAllAppointmentReports = () => {

  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);
  const [yearData, setYearData] = useState([]); //  use year handle fn

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointment());
  }, []);

  const AllAppointment = useSelector(selectAllAppointment);
  const AppointmentStatus = useSelector(getAppointmentStatus);
  const AppointmentError = useSelector(getAppointmentError);

  useEffect(() => {
    setDataSource(AllAppointment);
  }, [AllAppointment]);

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

  //================= Delete filter appointment fn============

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

//===============  year select =========================

  const handleYear = (values) => {
    setYearData(values);
  };

//=====================
  const DateSearch = (values) => {
    request
      .post(`${APIURLS.POSTREPORTDATE_APPOINTEMENT}`, values)
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


  const onFinish = (values) => {
    const yearvalues = {
        year: yearData,
      };
    DateSearch(yearvalues);

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
      title: "Candidate Name",
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
      title: "Position",
      dataIndex: "position",
    },
    {
        title: "Date",
        dataIndex: "date",
      },
    {
      title: "Status",
      render: (record, i) => {
        return (
          <Fragment>
            {record.approvalType === "completed" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Completed"}
              />
            )}

            {record.approvalType === "scheduled" && (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Scheduled"}
              />
            )}

            {record.approvalType === "cancelled" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"Cancelled"}
              />
            )}
          </Fragment>
        );
      },
    },
  ];

  let content;

  if (AppointmentStatus === "loading") {
    content = <CommonLoading />;
  } else if (AppointmentStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.appointmentId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AppointmentStatus === "failed") {
    content = <h2>{AppointmentError}</h2>;
  }
  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee Appointment Report"} />
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
          <CustomRow space={[24, 24]} style={{ marginTop: "20px",flexWrap: 'wrap' }}>
            <>
              <Col span={24} md={24}>
                {showdetailsON && (
                  <>
                    <CustomRow space={[24, 24]}>
                      <Col span={24} md={24} lg={3}> 
                        <b>Choose Year</b>
                      </Col>

                      <Col span={24} md={24} lg={8}>
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
