import React, { useEffect, useState } from "react";
import { Calendar, Col, DatePicker, Form, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import request from "../../../../utils/request";
import { CustomInput } from "../../../../components/Form/CustomInput";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { CustomRow } from "../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { getNotification } from "../../../Notifications/Partials/NotificationSlice";
import { getHoliday } from "../HolidaySlice";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { IoMdClose } from "react-icons/io";
import moment from "moment";

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

export const HolidayForm = ({
  FormExternalClose,
  FormExternalClosee,
  updatetrigger,
  holidayrecord,
  showSelectedDate,
  showAddedDate,
}) => {
  const [form] = useForm(); // ----- Define Form
  const dispatch = useDispatch();
  // const [dateRange, setDateRange] = useState([]); // Use date range send values
  // const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger]);

  useEffect(() => {
    if (holidayrecord) {
      setHoliday();
    }
  }, [holidayrecord, updatetrigger]);

  const setHoliday = () => {
    form.setFieldsValue(holidayrecord);
    const leaveList = holidayrecord?.leaveList;

    // const date = leaveList.map((item) => item.date);
    // const day = leaveList.map((item) => item.day);
    // setSelectedDates((prevDates) => ({
    //   ...prevDates,
    //   [date]: day,
    // }));

    if (leaveList) {
      const updatedDates = leaveList.reduce((acc, item) => {
        const { date, day } = item;
        return { ...acc, [date]: day };
      }, {});
  
      setSelectedDates(updatedDates);
    }
  };

  // useEffect(() => {
  //   if (!showSelectedDate) {
  //     setDateRange([]);
  //     setRecordData([]);
  //   }
  // }, [showSelectedDate]);

  const UpdateHoliday = (values) => {
    request
      .put(`${APIURLS.PUTHOLIDAY}${holidayrecord?.holidaysId}`, values)
      .then(function (response) {
        toast.info("Holiday Details Updated Successfully");
        dispatch(getHoliday());
        dispatch(getNotification());
        FormExternalClosee();
        setSelectedDates([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleDateRangeChange = (date, dateString) => {
  //   // // setDateRange([...dateRange, date])
  //   if (holidayrecord) {
  //     // setRecordData([...recordData, date])
  //     setDateRange([...dateRange, date]);
  //   } else {
  //     setDateRange([...dateRange, date]);
  //   }
  // };
  // console.log(dateRange, "dateRange");

  // const handleDeleteDate = (index) => {
  //   const addDateRange = [...dateRange];
  //   addDateRange.splice(index, 1);
  //   setDateRange(addDateRange);

  //   if (holidayrecord) {
  //     const updatedRecordDays = holidayrecord.leaveList
  //       .filter((item, i) => i !== index)
  //       .map((item) => ({
  //         date: item.date,
  //         day: item.day,
  //         holidaysListId: item.holidaysListId,
  //       }));
  //     updatedRecordDays.slice(index);
  //     setRecordData(updatedRecordDays);
  //   }
  // };

  const AddHolidayPost = (value) => {
    request
      .post(`${APIURLS.POSTHOLIDAY}`, value)
      .then(function (response) {
        dispatch(getHoliday());
        dispatch(getNotification());
        FormExternalClose();
        form.resetFields();
        toast.success("Holiday Added Successfully");
        setSelectedDates([]);
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error.response.data);
      });
  };

  // useEffect(() => {
  //   if (holidayrecord) {
  //     const RecordDays = holidayrecord?.leaveList?.map((item) => ({
  //       date: item.date,
  //       day: item.day,
  //     }));
  //     form.setFieldsValue(holidayrecord);
  //     const startDate = new Date(holidayrecord?.date);
  //     const dateFormat = "YYYY/MM/DD";
  //     const starttDate = dayjs(startDate).format(dateFormat);
  //     console.log(RecordDays, "RecordDays");
  //     form.setFieldsValue({ date: RecordDays[dayjs(starttDate, dateFormat)] });
  //     setRecordData(holidayrecord?.leaveList);
  //   }
  // }, [form, holidayrecord, updatetrigger]);

  // const allSelectedDates = [...recordData, ...dateRange];

  const onFinish = (values) => {
    const { title } = values;
    const leaveList = Object.keys(selectedDates).map((date) => ({
      date,
      day: selectedDates[date],
    }));

    const formattedData = {
      title,
      leaveList,
    };
    if (holidayrecord) {
      UpdateHoliday(formattedData)
    }else{
      AddHolidayPost(formattedData);
    }
  };

  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

  const [selectedDates, setSelectedDates] = useState([]);

  const handleSelect = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");

    const day = dayjs(formattedDate).format("dddd");

    setSelectedDates((prevDates) => ({
      ...prevDates,
      [formattedDate]: day,
    }));
  };

  const handleDeleteDates = (date) => {
    const { [date]: _, ...updatedDates } = selectedDates;
    setSelectedDates(updatedDates);
  };

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ margin: "30px 0px" }}>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            <Calendar
              onSelect={handleSelect}
              onPanelChange={(date, mode) => {
              }}
            />

            <div>
              <h2>Selected Dates:</h2>
              <ul>
                {Object.keys(selectedDates).map((date) => (
                  <div style={{ display: "flex", gap: "10px" }} key={date}>
                    <li>{date}</li>
                    <Button
                      type="danger"
                      onClick={() => handleDeleteDates(date)}
                    >
                      <IoMdClose
                        style={{
                          fontSize: "18px",
                          color: "red",
                          alignItems: "center",
                        }}
                      />
                    </Button>
                  </div>
                ))}
              </ul>
            </div>
          </Col>

          <Col span={24} md={12}>
            <CustomInput
              label={"Title"}
              placeholder={"Enter Title"}
              name={"title"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Title ! ! !",
                },
              ]}
            />
          </Col>
        </CustomRow>
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {holidayrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};
