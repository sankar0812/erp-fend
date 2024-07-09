import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNewProject, getProjectCount, getProjectEnd, getProjectStatus, getProjectTask, selectAllNewProject, selectAllProjectCount, selectAllProjectEnd, selectAllProjectStatus, selectAllProjectTask } from "./PMDashSlice";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { StyledTable } from "../../AdminDashboard/style";
import { base } from "../../../../utils/request";
import { AiOutlineInbox } from "react-icons/ai";
import { CustomTag } from "../../../../components/Form/CustomTag";

export const ProjectCountLine = () => {
  const dispatch = useDispatch();

  const AllProjectCount = useSelector(selectAllProjectCount);

  useEffect(() => {
    dispatch(getProjectCount());
  }, []);

  useEffect(() => {
    const currentcount =
      AllProjectCount?.map((item) => item.currentcount) || [];
    const previouscount =
      AllProjectCount?.map((item) => item.previouscount) || [];
    const month = AllProjectCount?.map((item) => item.month) || [];

    const options = {
      series: [
        {
          name: "Previous Year",
          data: previouscount,
          // data: [12, 52, 42, 68, 55, 32],
        },
        {
          name: "Current Year",
          data: currentcount,
          // data: [68, 55, 32, 12, 52, 42],
        },
      ],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: month,
        // categories: [ "Jan","Feb", "Mar", "Apr", "May", "Jun" ],
      },
      tooltip: {
        x: {
          format: "MMMM", // Format to display the month
        },
      },
      title: {
        text: "Project Count",
        style: {
          fontSize: "16px",
        },
      },
      // colors: ["#FF4E1A", "#26B170"],
      responsive: [
        {
          breakpoint: 480, // Adjust this breakpoint as needed
          options: {
            chart: {
              height: 200,
            },
          },
        },
        {
          breakpoint: 768, // Adjust this breakpoint as needed
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector("#lineChart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [AllProjectCount]);

  return <div id="lineChart" />;
};

export const ProjectStatus = () => {
  const [dataSource, setDataSource] = useState([]);

  const dispatch = useDispatch();

  const AllProjectStatus = useSelector(selectAllProjectStatus);

  useEffect(() => {
    dispatch(getProjectStatus());
  }, []);

  useEffect(() => {
    setDataSource(AllProjectStatus);
  }, [AllProjectStatus]);

  return (
    <StyledTable style={{ height: "320px" }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>User</th>
            <th>User Id</th>
            <th>Project</th>
            <th>Date</th>
            <th>Type of Project</th>
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
                <td>{item?.user_name}</td>
                <td>{item?.user_id}</td>
                <td>{item?.project_name}</td>
                <td>{item?.date}</td>
                <td>
                  {item?.type_of_project === 'research' ? (
                    <CustomTag color={'yellow'} bordered={'true'} title={'Research'} />
                  ) : item?.type_of_project === 'development' ? (
                    <CustomTag color={'grey'} bordered={'true'} title={'Development'} />
                  ) : item?.type_of_project === 'project' ? (
                    <CustomTag color={'blue'} bordered={'true'} title={'Project'} />
                  ) : item?.type_of_project === 'testing' ? (
                    <CustomTag color={'green'} bordered={'true'} title={'Testing'} />
                  ) : item?.type_of_project === 'hosting' ? (
                    <CustomTag color={'orange'} bordered={'true'} title={'Hosting'} />
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
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

export const ProjectTask = () => {
  const [dataSource, setDataSource] = useState([]);

  const dispatch = useDispatch();

  const AllProjectTask = useSelector(selectAllProjectTask);

  useEffect(() => {
    dispatch(getProjectTask());
  }, []);

  useEffect(() => {
    setDataSource(AllProjectTask);
  }, [AllProjectTask]);
  
  return (
    <StyledTable style={{ height: "320px" }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Profile</th>
            <th>Role</th>
            <th>User</th>
            <th>Start</th>
            <th>High Priority</th>
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
                <td>
                  {item?.role_name === 'Training' ? (
                    <CustomTag color={'yellow'} bordered={'true'} title={'Training'} />
                  ) : item?.role_name === 'TL' ? (
                    <CustomTag color={'orange'} bordered={'true'} title={'TL'} />
                  ) : item?.role_name === 'Employee' ? (
                    <CustomTag color={'blue'} bordered={'true'} title={'Employee'} />
                  ) :
                    item?.role_name === 'ProjectHead' ? (
                      <CustomTag color={'green'} bordered={'true'} title={'ProjectHead'} />
                    ) : null}
                </td>
                <td>{item?.userName}</td>
                <td>{item?.start_date}</td>
                <td>{item?.high_priority_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
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

export const ProjectListBar = () => {
  const dispatch = useDispatch();

  const AllNewProject = useSelector(selectAllNewProject);

  useEffect(() => {
    dispatch(getNewProject());
  }, []);

  useEffect(() => {

    const completedProjectCount = AllNewProject?.map((item) => item.completedProjectCount) || [];
    const totalProjectCount = AllNewProject?.map((item) => item.totalProjectCount) || [];
    const year = AllNewProject?.map((item) => item.year) || [];

    setChartOptions(prevOptions => ({
      ...prevOptions,
      series: [
        {
          name: "Total Project",
          data: totalProjectCount,
          // data: [15,24],
        },
        {
          name: "Completed Project",
          data: completedProjectCount,
          // data: [19,14],
        },
      ],
      xaxis: {
        categories: year,
        // categories: [2000,2001],
      },
    }));
  }, [AllNewProject]);

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
    title: {
      text: "Yearly Product List",
    },
    fill: {
      opacity: 1,
    },
  });

  return (
    <div>
      <div id="doubleChart">
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

export const ProjectEndTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const dispatch = useDispatch();

  const AllProjectEnd = useSelector(selectAllProjectEnd);

  useEffect(() => {
    dispatch(getProjectEnd());
  }, []);

  useEffect(() => {
    setDataSource(AllProjectEnd);
  }, [AllProjectEnd]);

  return (
    <StyledTable style={{ height: "320px" }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Project</th>
            <th>Type</th>
            <th>Date</th>
            <th>Duration End</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.project_name}</td>
                <td>{item?.project_type}</td>
                <td>{item?.date}</td>
                <td>{item?.durationdate}</td>
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