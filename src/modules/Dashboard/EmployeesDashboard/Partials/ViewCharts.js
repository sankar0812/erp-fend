import React, { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { AiOutlineInbox } from "react-icons/ai";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { StyledTable } from "../../AdminDashboard/style";
import User4 from "../../../../Images/DashImages/user4.jpg";
import User5 from "../../../../Images/DashImages/user5.jpg";
import { ImageProfile } from "../../../../layout/Partials/Style";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectDepartmentId,
} from "../../../Auth/authSlice";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { useDispatch } from "react-redux";
import { EmployeeLeaveData } from "../../DashboardSlice";
import { Avatar } from "antd";

export const ProjectAssigned = () => {
  const spark1 = {
    chart: {
      id: "sparkline1",
      type: "line",
      height: 140,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    series: [
      {
        name: "purple",
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    tooltip: {
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
    title: {
      // text: 'Count',
      style: {
        fontSize: "26px",
      },
    },
    colors: ["#734CEA"],
  };
  //   useEffect(() => {
  //     // Render the chart on component mount
  //     new ApexCharts(document.querySelector("#spark1"), spark1).render();
  //   }, []);
  return (
    <div>
      <Chart options={spark1} series={spark1.series} type="line" />
    </div>
  );
};

const data = [
  {
    name: "Mon",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tue",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thu",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

export const WeeklyBarChart = () => {
  const [dataSource, setDataSource] = useState([]);
  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    GetEmployeeAttendance();
  }, []);

  const GetEmployeeAttendance = () => {
    request
      .get(`${APIURLS.GETPLATTENDANCE}${EmployeeId}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    title: {
      text: "Employee Attendance Overview",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      categories: [],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "days";
        },
      },
    },
  });

  useEffect(() => {
    const presentCount =
      dataSource?.map((item) => item.presentPercentage) || [];
    const absentCount = dataSource?.map((item) => item.absentPercentage) || [];
    const totalDays = dataSource?.map((item) => item.totalWorkingDays) || [];
    const month = dataSource?.map((item) => item.month) || [];
    const mon = month.map((month) => month.substring(0, 3));

    setChartOptions({
      ...chartOptions,
      series: [
        {
          name: "Present",
          data: presentCount,
        },
        {
          name: "Total Working Days",
          data: totalDays,
          color: "#FEB019",
        },
        {
          name: "Absent",
          data: absentCount,
          color: "#FF4560",
        },
      ],
      xaxis: {
        categories: mon,
      },
    });
  }, [dataSource]);

  return (
    <div>
      {/* <h2 style={{ textAlign: "center" }}>Employee Attendance Overview</h2> */}
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export const MyTask = () => {
  const [dataSource, setDataSource] = useState([]);
  const departmentId = useSelector(selectDepartmentId);
  const empId = useSelector(selectCurrentId);
  const roletId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    GetMyTeam();
  }, []);

  const GetMyTeam = () => {
    request
      .get(`${APIURLS.GETDASHMYTEAM}${empId}/${roletId}/${departmentId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  // const dummy = [
  //   {
  //     projectName: "Biiling",
  //     taskname: "Sale",
  //     status: true,
  //     details: "Completed",
  //   },
  //   {
  //     projectName: "Automation",
  //     taskname: "Purchase",
  //     status: false,
  //     details: "Completed",
  //   },
  //   {
  //     projectName: "AI",
  //     taskname: "Expense",
  //     status: false,
  //     details: "Completed",
  //   },
  // ];

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Project Name</th>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item?.profile}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </td>
                <td>{item?.project_name}</td>
                {/* <td>{item?.employees.map((emp)=>(
                  emp?.category
                ))}</td> */}
                <td>{item?.category}</td>
                <td>
                  {item?.project_status === "completed" ? (
                    <CustomTag title={item?.project_status} color={"success"} />
                  ) : (
                    <CustomTag
                      title={item?.project_status}
                      color={"processing"}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const MyTeams = () => {
  const teams = [
    {
      empname: "Ram",
      status: true,
      empImg: User4,
    },
    {
      empname: "Jai",
      status: false,
      empImg: User5,
    },
    {
      empname: "Commins",
      status: true,
      empImg: User5,
    },
  ];
  return (
    <Fragment>
      <StyledTable>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {teams?.length > 0 ? (
              teams.map((item, index) => (
                <tr key={index}>
                  <td>
                    <ImageProfile>
                      <img src={item?.empImg} />
                    </ImageProfile>
                  </td>
                  <td>{item?.empname}</td>
                  <td>
                    {item?.status === true ? (
                      <CustomTag title={"Avilable"} color={"success"} />
                    ) : (
                      <CustomTag title={"Absent"} color={"error"} />
                    )}
                  </td>
                  <td>{item?.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                    paddingTop: "30px",
                  }}
                >
                  <AiOutlineInbox />
                  &nbsp;No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </StyledTable>
    </Fragment>
  );
};

export const LeaveApproval = () => {
  const [dataSource, setDataSource] = useState([]);
  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);
  const dispatch = useDispatch();

  useEffect(() => {
    GetEmployeeLeaveStatus();
  }, []);

  const GetEmployeeLeaveStatus = () => {
    request
      .get(`${APIURLS.GETEMPLOYEEDASHLEAVE}${EmployeeId}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
        dispatch(EmployeeLeaveData(response.data));
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>User Id</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Leave Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.userId}</td>
                <td>{item?.date}</td>
                <td>{item?.toDate}</td>
                <td>
                  {item?.leavetype === "pending" ? (
                    <CustomTag title={"Pending"} color={"processing"} />
                  ) : item?.leavetype === "approved" ? (
                    <CustomTag title={"Approved"} color={"success"} />
                  ) : item?.leavetype === "rejected" ? (
                    <CustomTag title={"Cancelled"} color={"error"} />
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const WorkingProjects = () => {
  const [dataSource, setDataSource] = useState([]);
  const departmentId = useSelector(selectDepartmentId);
  const EnteringId = useSelector(selectCurrentId)
  useEffect(() => {
    GetWorkingProjects();
  }, []);


  const GetWorkingProjects = () => {
    request
      .get(`${APIURLS.GETWORKINGPROJECT}${departmentId}`)
      .then(function (response) {
        setDataSource(response.data);
        
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Project Name</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item.profile}`}
                    width={40}
                    height={40}
                    alt="profile"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </td>
                <td>{item.projectName}</td>
                <td>
                  <Avatar.Group
                    maxCount={2}
                    size="large"
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.employees.map((employee, empIndex) => (
                      <Avatar key={empIndex} src={`${base}${employee.profile}`} />
                    ))}
                  </Avatar.Group>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};


export const DeadlineTaskDetails = () => {
  const [dataSource, setDataSource] = useState([]);
  const departmentId = useSelector(selectDepartmentId);
  
  useEffect(() => {
    GetDeadLineDetails();
  }, []);

  const GetDeadLineDetails = () => {
    request
      .get(`${APIURLS.GET_DEADLINE_TASK_DETAILS}${departmentId}`)
      .then(function (response) {
        setDataSource(response.data);
        
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Project Name</th>
            <th>Profile</th>
            <th>Name</th>
            <th>From Date</th>
            <th>Deadline Date</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.project_name}</td>
                <td>
                  <ImageProfile>
                    <img src={`${base}${item?.profile}`} />
                  </ImageProfile>
                </td>
                <td>{item?.user_name}</td>
                <td>{item?.start_date}</td>
                <td>{item?.updated}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  paddingTop: "30px",
                }}
              >
                <AiOutlineInbox />
                &nbsp;No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </StyledTable>
  );
};