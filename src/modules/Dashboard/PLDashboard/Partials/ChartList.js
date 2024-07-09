import React, { Fragment, useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectDepartmentId,
} from "../../../Auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPLDashboardLeave, selectAllPLDashLeaves } from "./PLDashboardSlice";
import { StyledTable } from "../../AdminDashboard/style";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { AiOutlineInbox } from "react-icons/ai";
import { Avatar } from "antd";

export const BarChart = () => {
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
      .catch(function (error) {});
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
        categories: month,
      },
    });
  }, [dataSource]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export const HighPriorityTask = () => {
  const [dataSource, setDataSource] = useState([]);

  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    getHighPriority();
  }, []);

  const getHighPriority = () => {
    request
      .get(`${APIURLS.GETPLHIGHPRIORITY}${RoleId}/${EmployeeId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };
console.log(dataSource,'pldashpriority');
  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Project</th>
            <th>Employee</th>
            <th>High Priority</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
         dataSource.map((item, index) => (
          // Check if high_priority_count is not null
          item?.high_priority_count !== null && (
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
              <td>{item?.user_name}</td>
              <td>{item?.high_priority_count}</td>
            </tr>
          )
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

export const WorkingProjectsMembers = () => {
  const [dataSource, setDataSource] = useState([]);

  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    getWorkingMembers();
  }, []);

  const getWorkingMembers = () => {
    request
      .get(`${APIURLS.GETPLWORKINGMEMBERS}${RoleId}/${EmployeeId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Project</th>
            <th>Project Status</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.projectName}</td>
                <td>{item?.typeOfProject}</td>
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
                      <Avatar
                        key={empIndex}
                        src={`${base}${employee?.profile}`}
                      />
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

export const LeavePLTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    getProjectLeaves();
  }, []);

  const getProjectLeaves = () => {
    request
      .get(`${APIURLS.GETPLPROJECTLEAVES}${RoleId}/${EmployeeId}`)
      .then(function (response) {
        setDataSource(response.data);
        console.log(dataSource,'empppppppp');
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <StyledTable style={{height:'320px'}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Employee</th>
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
                <td>
                <img
                    src={`${base}${item?.profile}`}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  /></td>
                <td>{item?.user_name}</td>
                <td>{item?.date}</td>
                <td>{item?.to_date}</td>
                <td>
                  <Fragment>
                    {item.leave_type === "approved" && (
                      <CustomTag
                        bordered={"true"}
                        color={"success"}
                        title={"Approved"}
                      />
                    )}

                    {item.leave_type === "pending" && (
                      <CustomTag
                        bordered={"true"}
                        color={"processing"}
                        title={"Pending"}
                      />
                    )}

                    {item.leave_type === "rejected" && (
                      <CustomTag
                        bordered={"true"}
                        color={"error"}
                        title={"Rejected"}
                      />
                    )}
                  </Fragment>
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

export const MultipleDataChart = () => {

  const [dataSource, setDataSource] = useState([]);

  const EmployeeId = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);

  useEffect(() => {
    getProjectList();
  }, []);

  const getProjectList = () => {
    request
      .get(`${APIURLS.GETPLPROJECTLIST}${RoleId}/${EmployeeId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Yearly Project List",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      // tooltip: {
      //   y: {
      //     formatter: (val) => val + "K",
      //   },
      // },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 40,
      },
    },
  });

  useEffect(() => {
    const completedProjectCount = dataSource?.map((item) => item.completedProjectCount) || [];
    const onprocessCount = dataSource?.map((item) => item.onprocessCount) || [];
    const totalCount = dataSource?.map((item) => item.totalCount) || [];
    const year = dataSource?.map((item) => item.year) || [];

    setChartData({
      ...chartData,
      series: [
        {
          name: "Completed",
          data: completedProjectCount,
        },
        {
          name: "On Process",
          data: onprocessCount,
          color: "#FEB019",
        },
        {
          name: "New Projects",
          data: totalCount,
          color: "#FF4560",
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: year.map(String),
        },
      },
    });
  }, [dataSource]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
