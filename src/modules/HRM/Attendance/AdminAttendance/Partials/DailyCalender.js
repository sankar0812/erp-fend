import { Calendar, Card, Col, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { selectCurrentRoleId } from "../../../../Auth/authSlice";
import { logDOM } from "@testing-library/react";
import { toast } from "react-toastify";

export const CalenderBox = styled(Col)`
  background: ${(props) => (props.absent ? "#ffe6e7" : "#e3f3db")};
  height: 100px;
  border-top: 5px ${(props) => (props.absent ? "#f9888a" : "green")} solid;
  text-align: center;
  &.ant-card {
    border-radius: none !important;
  }
  & h1 {
    display: flex;
    justify-content: flex-start;
    font-size: 30px;
    color: #667072;
  }
  & p {
    color: ${(props) => (props.absent ? "#f9888a" : "#41a558")};
    font-size: 15px;
  }
`;

const DailyCalender = (value) => {
  const [dailyData, setDailyData] = useState([]);
  const { id } = useParams();

  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    GetdailyAttendance();
  }, []);

  const GetdailyAttendance = (values) => {
    request
      .get(`${APIURLS.GETDAILYATT}/${id}/${RoleId}`)
      .then(function (response) {
        setDailyData(response.data);
      })
      .catch((error) => {
        console.log(error,'hhhhh');
        // message.error("Failed");
        toast.warn(error.response.data.error)
      });
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const dayData = dailyData.find((item) => item.date === formattedDate);
    const isCurrentMonth = value.isSame(new Date(), "month");
    const textColor = isCurrentMonth ? "rgb(17 24 39 / 84%)" : "grey";
    return (
      // <CalenderBox span={24} absent={dayData?.attendance_status === 'Absent' ? true : undefined}>
      //     <h1 style={{ color: textColor }}>{value.date()}</h1>
      //     <p>{dayData?.attendance_status}</p>
      // </CalenderBox>
      <CalenderBox
        span={24}
        absent={dayData?.attendance_status === "Absent" ? "true" : undefined}
      >
        <h1 style={{ color: textColor }}>{value.date()}</h1>
        <p>{dayData?.attendance_status}</p>
      </CalenderBox>
    );
  };

  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee Daily Attendance"} />
      <CustomCardView width={"900px"}>
        <CustomRow space={[24, 24]}>
          {/* <Calendar dateCellRender={dateCellRender} /> */}
          <Calendar cellRender={dateCellRender} />
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};

export default DailyCalender;
