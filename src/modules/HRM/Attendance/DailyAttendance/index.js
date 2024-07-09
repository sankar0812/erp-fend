import React, { Fragment } from "react";
import { AttendanceTable } from "./Partials/AttendanceTable";
import { CustomTabs } from "../../../../components/CustomTabs";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { TraineeAttendance } from "./Partials/TraineeAttendance";

export const DailyAttendance = () => {
  const tabs = [
    { key:"1", label: "Employee", children: <AttendanceTable /> },
    { key:"2", label: "Trainee", children: <TraineeAttendance /> },
  ];

const handleChange = () => {

}


  return (
    // <AttendanceTable/>
    <Fragment>
      <CustomPageTitle Heading={"Daily Attendance"} />
      <CustomTabs tabs={tabs} defaultActiveKey={"1"} onChange={handleChange}/>
    </Fragment>
  );
};
