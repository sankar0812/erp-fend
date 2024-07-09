import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCurrentId, selectCurrentRoleId, selectDepartmentId } from "../../../Auth/authSlice";
import { getPLDashboardLeave, selectAllPLDashLeaves } from "../../PLDashboard/Partials/PLDashboardSlice";
import { Fragment, useEffect, useMemo, useState } from "react";
import { StyledTable } from "../../AdminDashboard/style";
import { AiOutlineInbox } from "react-icons/ai";
import { CustomTag } from "../../../../components/Form/CustomTag";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import ReactApexChart from "react-apexcharts";

export const LeaveTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const dispatch = useDispatch();
  
    const DepartmentId = useSelector(selectDepartmentId);
    const AllEmployeeLeave = useSelector(selectAllPLDashLeaves);
  
    useEffect(() => {
      dispatch(getPLDashboardLeave());
    }, []);
  
    const EmployeeDepartmentId = useMemo(
      () =>
        AllEmployeeLeave?.filter((item) => item?.departmentId == DepartmentId),
      [AllEmployeeLeave, DepartmentId]
    );
  
    useEffect(() => {
      if (EmployeeDepartmentId) {
        setDataSource(EmployeeDepartmentId);
      }
    }, [EmployeeDepartmentId]);
  
    return (
      <StyledTable>
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
                        <Fragment>
                          {item.leavetype === "approved" && (
                            <CustomTag
                              bordered={"true"}
                              color={"success"}
                              title={"Approved"}
                            />
                          )}

                          {item.leavetype === "pending" && (
                            <CustomTag
                              bordered={"true"}
                              color={"processing"}
                              title={"Pending"}
                            />
                          )}

                          {item.leavetype === "rejected" && (
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

  export const YearlyTask = () =>{
    const [dataSource, setDataSource] = useState([]);

    const EmployeeId = useSelector(selectCurrentId);
    const RoleId = useSelector(selectCurrentRoleId);
  
    useEffect(() => {
      getProjectList();
    }, []);
  
    const getProjectList = () => {
      request
        .get(`${APIURLS.GETPROJECTLIST}${EmployeeId}/${RoleId}`)
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

    console.log(dataSource,'data');
  
    useEffect(() => {
      const completed_count = dataSource?.map((item) => item.completedCount) || [];
      const onprocess_count = dataSource?.map((item) => item.onprocessCount) || [];
      const pending_count = dataSource?.map((item) => item.pendingCount) || [];
      const year = dataSource?.map((item) => item.year) || [];
    
      setChartData({
        ...chartData,
        series: [
          {
            name: "Completed",
            data: completed_count,
          },
          {
            name: "On Process",
            data: onprocess_count,
            color: "#FEB019",
          },
          {
            name: "Pending",
            data: pending_count,
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
        <div id="chartt">
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
  }