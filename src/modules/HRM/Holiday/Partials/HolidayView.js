import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../components/CustomModal";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { CustomRow } from "../../../../components/CustomRow";
import { Col, Form, Tooltip } from "antd";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { HolidayForm } from "./HolidayForm";
import {
  getHoliday,
  getHolidayError,
  getHolidayStatus,
  selectAllHoliday,
} from "../HolidaySlice";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../components/CommonLoading";
import { CustomLableBack } from "../../../../components/CustomLableBack";
import { toast } from "react-toastify";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { THEME } from "../../../../theme";
import { SvgIcons } from "../../../../Images";
import { TableIconHolder } from "../../../../components/CommonStyled";

const ViewHoliday = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [closed, setClosed] = useState(false);
  const dispatch = useDispatch();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

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

  const FormExternalClose = () => {
    handleOk();
  };

  useEffect(() => {
    dispatch(getHoliday());
  }, []);

  const AllHolidayDetails = useSelector(selectAllHoliday);
  const AllHolidayStatus = useSelector(getHolidayStatus);
  const AllHolidayError = useSelector(getHolidayError);

  const UpdateHoliday = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Holiday");
    setModalContent(
      <HolidayForm
        showSelectedDate={true}
        FormExternalClosee={FormExternalClose}
        formname={"editholiday"}
        formReset={formReset}
        holidayrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  useEffect(() => {
    setDataSource(AllHolidayDetails);
  }, [AllHolidayDetails]);

  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Date",
      render: (record) => {
        const value = record?.leaveList;
        return (
          <Flex center={"true"} gap={"10px"}>
            {value.map((item, index) => (
              <p key={index}>{item?.date.substring(item.date.length - 2)},</p>
            ))}
          </Flex>
        );
      },
    },
    
    {
      title: "Title",
      dataIndex: "title",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.title).includes(value.toUpperCase())
        );
      },
      render: (text) => <span style={{ fontSize: "14px" }}>{text}</span>, // Adjust the fontSize as needed
    },
    {
      title: "Day",
      render: (record) => {
        const value = record?.leaveList;
        return (
          <Flex center={"true"} gap={"10px"}>
            {value.map((item, index) => ( // Adding index as key
              <p key={index}>{item?.day},</p>
            ))}
          </Flex>
        );
      },
    },
    
    {
      title: "Month",
      dataIndex: "monthName",
      render: (text) => <span style={{ fontSize: "14px" }}>{text}</span>,
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            {
              record.status === true ? (
<TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  UpdateHoliday(record);
                }}
              >
                <Tooltip placement="top" title={"Edit Holiday"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit" />
                </Tooltip>
              </TableIconHolder>
              ) : (
                <p>...</p>
              )
            }
            
          </Flex>
        );
      },
    },
  ];

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const AddHoliday = () => {
    setModalTitle("Add Holidays");
    setTrigger(trigger + 1);
    setModalContent(
      <HolidayForm
        showAddedDate={true}
        formname={"AddHolidayForm"}
        FormExternalClose={FormExternalClose}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  let content;

  if (AllHolidayStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllHolidayStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.holidaysId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllHolidayStatus === "failed") {
    content = <h2>{AllHolidayError}</h2>;
  }

  const onFinish = (values) => {
    const NewValue = {
      year: yearData
    }
    
    DateSearch(NewValue);
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill the details!");
  };

  const YearOptions = [];
  for (let year = 2010; year <= 2050; year++) {
    YearOptions.push({ label: year.toString(), value: year.toString() });
  }

  const handleYear = (values) => {
    setYearData(values);
  };

  const DateSearch = (values) => {
    request
      .post(`${APIURLS.POSTHOLIDAYSEARCH}`, values)
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

  return (
    <div>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"Holiday Details"} />
      </Flex>
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10}>
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          // initialValues={{
          //   from_date: dayjs(),
          //   to_date: dayjs(),
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomRow
            space={[24, 24]}
            style={{ flexWrap: "wrap" }}
          >
            <>
              <Col span={24} md={24} lg={3} style={{ marginTop: "10px" }}>
                <b>Choose</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24} lg={10}>
                {/* <CustomSelect
                  options={DatesFilter}
                  name={"choose"}
                  placeholder={"Select"}
                  rules={[
                    { required: true, message: "Please Select the Month" },
                  ]}
                /> */}

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

              <Flex>
                <ButtonStandard.Primary text={"Search"} htmlType="submit" />
              </Flex>
            </>
          </CustomRow>
        </Form>
        </Col>
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={AddHoliday}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
};

export default ViewHoliday;
