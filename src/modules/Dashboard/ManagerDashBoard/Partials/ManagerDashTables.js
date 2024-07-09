import { useDispatch } from "react-redux";
import { StyledTable } from "../../AdminDashboard/style";
import {
  getDashHiring,
  getDashboardAttendance,
  getDashboardComplaints,
  getDashboardLeave,
  getDashboardResignation,
  getDepartment,
  getTraineeAttendance,
  selectAllDashAttendance,
  selectAllDashComplaints,
  selectAllDashHiring,
  selectAllDashLeaves,
  selectAllDashResignation,
  selectAllDepartment,
  selectAllTraineeAttendance,
} from "./ManagerDashboardSlice";
import { useSelector } from "react-redux";
import { AiOutlineInbox } from "react-icons/ai";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { useEffect, useState } from "react";
import { selectCurrentId } from "../../../Auth/authSlice";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

export const LeavesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDashboardLeave());
  }, []);

  const AllDashLeaves = useSelector(selectAllDashLeaves);


  const onRowClick = (record, index) => {
    if (record?.employeeId) {
      navigate(`/viewemployee/${record.employeeId}`);
    } else if (record?.traineeId) {
      navigate(`/viewTraining/${record.traineeId}`);
    }
  };

  return (
    <StyledTable style={{ height: "320px" }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Role</th>
            <th>From Date</th>
            {/* <th>To Date</th> */}
            <th>Leave Status</th>
          </tr>
        </thead>
        <tbody>
          {AllDashLeaves?.length > 0 ? (
            AllDashLeaves?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  onRowClick(item, index);
                }}
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item?.profile}`}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <CustomTag
                    bordered={"true"}
                    color={"success"}
                    title={item?.roleName}
                  />
                </td>
                <td>{item?.date}</td>
                {/* <td>{item?.toDate}</td> */}
                <td>
                  <CustomTag
                    style={{ position: 'relative' }}
                    bordered={"true"}

                    color={"warning"}
                    title={item?.leavetype}

                  // color={item.leavetype === "pending" ? "orange" : item.leavetype === "approved" ? "green" : "red"}
                  // title={item.leavetype}

                  />
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

export const ComplaintsTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardComplaints());
  }, []);

  const AllComplaints = useSelector(selectAllDashComplaints);

  const handleRowClick = () => { };

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>User Id</th>
            <th>Complaint Title</th>
            <th>Complaint Date</th>
            <th>Complaint Against</th>
          </tr>
        </thead>
        <tbody>
          {AllComplaints?.length > 0 ? (
            AllComplaints?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item?.profile}`}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{item?.userId}</td>
                <td>{item?.complaintsTitle}</td>
                <td>{item?.complaintsDate}</td>
                <td>{item?.complaintsAgainstName}</td>
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

export const ResignationTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardResignation());
  }, []);

  const AllResignation = useSelector(selectAllDashResignation);

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>User Name</th>
            <th>Title</th>
            <th>From Date</th>
            <th>To Date</th>
          </tr>
        </thead>
        <tbody>
          {AllResignation?.length > 0 ? (
            AllResignation?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item?.profile}`}
                    alt="Profile"
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{item?.userName}</td>
                <td>{item?.title}</td>
                <td>{item?.fromDate}</td>
                <td>{item?.toDate}</td>
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

//hiring Table

export const HiringTable = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashHiring());
  }, []);

  const AllHiring = useSelector(selectAllDashHiring);
  console.log(AllHiring,'AllHiring');

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Job Title</th>
            <th>Vacancy</th>
            <th>Posted Date</th>
            <th>Closing Date</th>
            <th>Total Applicants</th>
          </tr>
        </thead>
        <tbody>
          {AllHiring?.length > 0 ? (
            AllHiring?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.jobTitle}</td>
                <td>{item?.vacancy}</td>
                <td>{item?.posted}</td>
                <td>{item?.closing}</td>
                <td>{item?.candidate_count}</td>
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

// Bar Chart

export const ManagerBarChart = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardAttendance());
  }, []);

  const AllAttendance = useSelector(selectAllDashAttendance);

  useEffect(() => {
    setDataSource(AllAttendance);
  }, [AllAttendance]);

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
    title: {
      text: "Attendance Percentage",
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
          return val + "%";
        },
      },
    },
  });

  useEffect(() => {
    const presentCount =
      dataSource?.map((item) => item?.presentpercentage) || [];
    const absentCount = dataSource?.map((item) => item?.absentpercentage) || [];
    const month = dataSource?.map((item) => item?.month) || [];
    const mon = month?.map(month => month.substring(0, 3));

    setChartOptions({
      ...chartOptions,
      series: [
        {
          name: "Present Percentage",
          data: presentCount,
        },
        {
          name: "Absent Percentage",
          data: absentCount,
          color: "#FEB019",
        },
      ],
      xaxis: {
        categories: mon,
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

export const ApexChart = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const AllDepartment = useSelector(selectAllDepartment);

  useEffect(() => {
    setDataSource(AllDepartment);
  }, [AllDepartment]);

  const [chartState, setChartState] = useState({
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
        text: "Department",
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
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
    const employee = dataSource?.map((item) => item?.employee_count) || [];
    const trainee = dataSource?.map((item) => item?.training_count) || [];
    const department = dataSource?.map((item) => item?.department_name || '') || [];

    setChartState({
      ...chartState,
      options: {
        ...chartState.options,
        xaxis: {
          categories: department,
        },
      },
      series: [
        {
          name: "Employee",
          data: employee,
        },
        {
          name: "Trainee",
          data: trainee,
        },
      ],
    });
  }, [dataSource]);

  return (
    <div id="chart-container">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

// export const ApexChart = () => {
//   const [dataSource, setDataSource] = useState([]);
//   const [dataSourceOptions, setDataSourceOptions] = useState({});
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getDepartment());
//   }, []);

//   const AllDepartment = useSelector(selectAllDepartment);
//   console.log(dataSource, 'AllDepartmentAllDepartment');

//   useEffect(() => {
//     setDataSource(AllDepartment);
//   }, [AllDepartment]);


//   // useEffect(() => {
//   //   if(dataSource?.length != 0){
//   //     const employee = dataSource?.map((item) => item?.employee_count) || [];
//   //     const trainee = dataSource?.map((item) => item?.training_count) || [];
//   //     const department = dataSource?.map((item) => item?.department_name) || [];
    
//   //   }
//   // }, [dataSource])
  
//   const employee = dataSource?.map((item) => item?.employee_count) || [];
//   const trainee = dataSource?.map((item) => item?.training_count) || [];
//   const department = dataSource?.map((item) => item?.department_name || '') || [];

//   console.log(employee,trainee,department,'gffgffg');

//   const chtartOptions = {
//     series: [{
//       name: 'Employee',
//       data: employee,
//     }, {
//       name: 'Trainee',
//       data: trainee
//     },],
//     options: {
//       chart: {
//         type: 'bar',
//         height: 350
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: '55%',
//           endingShape: 'rounded'
//         },
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ['transparent']
//       },
//       xaxis: {
//         categories: department,
//       },
//       yaxis: {
//         title: {
//           text: '$ (thousands)'
//         }
//       },
//       fill: {
//         opacity: 1
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return "$ " + val + " thousands"
//           }
//         }
//       }
//     },
//   }

//   return (
//     <div id="chart-container">
//       <ReactApexChart options={chtartOptions?.options} series={chtartOptions?.series} type="bar" height={350} />
//     </div>
//   )
// }

export const RotatedColumn = () => {

  const [dataSource, setDataSource] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTraineeAttendance())
  }, [])

  const AllTraineeAttendance = useSelector(selectAllTraineeAttendance)

  useEffect(() => {
    setDataSource(AllTraineeAttendance)
  }, [AllTraineeAttendance])

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [],
        tickPlacement: "on",
      },
      title: {
        text: "Trainee Attendance Percentage",
      },
      // yaxis: {
      //   title: {
      //     text: "Servings",
      //   },
      // },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });

  useEffect(() => {

    const presentCount = dataSource?.map((item) => item?.presentpercentage) || [];
    const absentCount = dataSource?.map((item) => item?.absentpercentage) || [];
    const totalDays = dataSource?.map((item) => item?.totalWorkingDays) || [];
    const month = dataSource?.map((item) => item?.month) || [];
    const mon = month?.map(month => month?.substring(0, 3));

    setChartData({
      ...chartData,
      series: [
        {
          name: "Present Percentage",
          data: presentCount,
        },
        {
          name: "Absent Percentage",
          data: absentCount,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: mon,
        },
      },
    });
  }, [dataSource]); // Add dependencies if needed

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};
