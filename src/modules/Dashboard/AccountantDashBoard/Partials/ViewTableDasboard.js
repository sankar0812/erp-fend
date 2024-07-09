import { useEffect, useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { StyledTable } from "../../AdminDashboard/style";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import {
  getAssetsBalance,
  getClientCount,
  getExpenseTypes,
  getInvoice,
  selectAllAssetsBalance,
  selectAllClientCount,
  selectAllExpenseTypes,
  selectAllInvoice,
} from "./AccountantSlice";
import { base } from "../../../../utils/request";

export const InvoiceDash = ({ AllInvoiceDashList }) => {
  return (
    <StyledTable style={{height:"260px"}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Invoice Id</th>
            <th>Invoice Date</th>
            <th>Client Name</th>
            <th>Bill Amt</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {AllInvoiceDashList?.length > 0 ? (
            AllInvoiceDashList?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${base}${item?.clientProfile}`}
                    alt=""
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{item?.invoice_id}</td>
                <td>{item.invoice_date}</td>
                <td>{item?.client_name}</td>
                <td>{item?.amount}</td>
                <td>{item?.balance}</td>
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

export const ReceiptsDash = ({ AllReceiptsList }) => {
  return (
    <StyledTable style={{height:"260px"}}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Invoice No</th>
            <th>Payment Date</th>
            <th>Client Name</th>
            <th>Bill Amt</th>
            <th>Balance</th>
            <th>Received Amt</th>
            <th>Payement Type</th>
          </tr>
        </thead>
        <tbody>
          {AllReceiptsList?.length > 0 ? (
            AllReceiptsList?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.invoice_id}</td>
                <td>{item.payment_date}</td>
                <td>{item?.client_name}</td>
                <td>{item?.amount}</td>
                <td>{item?.balance}</td>
                <td>{item?.received_amount}</td>
                <td>
                  {item?.payment_type === "Cash" && (
                    <CustomTag
                      title={"Cash"}
                      bordered={"true"}
                      color={"success"}
                    />
                  )}

                  {item?.payment_type === "Cheque" && (
                    <CustomTag
                      title={"Cheque"}
                      bordered={"true"}
                      color={"yellow"}
                    />
                  )}

                  {item?.payment_type === "OnlineTransaction" && (
                    <CustomTag
                      title={"Online Transaction"}
                      bordered={"true"}
                      color={"blue"}
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
export const MaintenanceInvoicesDash = ({ AllMaintenances }) => {
  return (
    <StyledTable style={{ height: "230px" }}>
      <table >
        <thead>
          <tr>
            <th>No</th>
            <th>Invoice No</th>
            <th>Client Name</th>
            <th>Total Amt</th>
          </tr>
        </thead>
        <tbody>
          {AllMaintenances?.length > 0 ? (
            AllMaintenances?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.maintenance_invoice_id}</td>
                <td>{item?.client_name}</td>
                <td>{item?.total}</td>
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

export const PieChart = () => {

  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseTypes());
  }, []);

  const AllExpenseTypes = useSelector(selectAllExpenseTypes);

  useEffect(() => {
    if (AllExpenseTypes?.length > 0) {
      setDataSource(AllExpenseTypes);
    }
  }, [AllExpenseTypes]);

  useEffect(() => {
    const expense = dataSource?.map((item) => item?.expense) || [];
    const categories =
      dataSource?.map((item) => item?.category) || [];

    const options = {
      series: expense,
      chart: {
        width: 490,
        type: "pie",
      },
      labels: categories,
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      title: {
        text: "Types of Expense",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chartElement = document.querySelector("#pieCharts");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [dataSource]);

  return <div id="pieCharts" />;

};

export const LineChart = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientCount());
  }, []);

  const AllClientCount = useSelector(selectAllClientCount);

  useEffect(() => {
    if (AllClientCount?.length > 0) {
      setDataSource(AllClientCount);
    }
  }, [AllClientCount]);

  useEffect(() => {
    const currentCount = dataSource?.map((item) => item?.currentcount) || [];
    const previousCount = dataSource?.map((item) => item?.previouscount) || [];
    const options = {
      series: [
        {
          name: "Current Year",
          data: currentCount,
        },
        {
          name: "Previous Year",
          data: previousCount,
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: {
          format: "MMMM", // Format to display the month
        },
      },
      title: {
        text: "Client Count",
        style: {
          fontSize: "16px",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#line"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [dataSource]);

  return <div id="line" />;
};

export const AssetsChart = () => {
  const [dataSources, setDataSources] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetsBalance());
  }, []);

  const AllAssetsBalance = useSelector(selectAllAssetsBalance);

  useEffect(() => {
    setDataSources(AllAssetsBalance);
  }, [AllAssetsBalance]);

  useEffect(() => {
    const assets = dataSources?.map((item) => item?.count) || [];
    const accessoriesName =
      dataSources?.map((item) => item?.accessories_name) || [];
    const colors = dataSources?.map((item) => item?.color) || [];

    const options = {
      series: assets,
      chart: {
        width: 460,
        type: "pie",
      },
      labels: accessoriesName,
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      title: {
        text: "Assets Balance",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#263238",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chartElement = document.querySelector("#pieChart");

    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [dataSources]);

  return <div id="pieChart" />;
};

export const AccountsBarChart = () => {
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoice());
  }, []);

  const AllInvoice = useSelector(selectAllInvoice);

  useEffect(() => {
    setDataSource(AllInvoice);
  }, [AllInvoice]);

  const [chartData, setChartData] = useState({
    series: [],
    chart: {
      // type: "bar",
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
      colors: ["transparent"],
    },
    title: {
      text: "Invoice Count",
    },
    xaxis: {
      categories: [],
    },
    fill: {
      opacity: 1,
    },
  });

  useEffect(() => {
      const currentCount = dataSource?.map((item) => item?.currentcount) || [];
      const previousCount = dataSource?.map((item) => item?.previouscount) || [];
      const monthh = dataSource?.map((item) => item?.month) || [] ;
      let month = monthh; 
      // Cloning month array
      // const trymonth = dataSource[0]?.month
      // const mon = month.map((month) => month?.substring(0, 3));

      setChartData({
        ...chartData,
        series: [
          {
            name: "Current Year",
            data: currentCount,
          },
          {
            name: "Previous Year",
            data: previousCount,
            color: "#FF4560",
          },
        ],
        xaxis: {
          // categories: [...trymonth],
          categories: month,
          // categories: [
          //   "Jan",
          //   "Feb",
          //   "Mar",
          //   "Apr",
          //   "May",
          //   "Jun",
          //   "Jul",
          //   "Aug",
          //   "Sep",
          //   "Oct",
          //   "Nov",
          //   "Dec",
          // ],
        },
      });
  }, [dataSource]);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData}
        series={chartData?.series || []}
        type="bar"
        height={350}
      />
    </div>
  );
};

export const AccountCurrectedBarChart = () => {
  const dispatch = useDispatch()
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    dispatch(getInvoice());
  }, []);

  const AllInvoice = useSelector(selectAllInvoice);

  useEffect(() => {
    setDataSource(AllInvoice);
  }, [AllInvoice]);

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

  console.log(dataSource,'kkkk');

  useEffect(() => {
      const currentCount = dataSource?.map((item) => item?.currentcount) || [];
      const previousCount = dataSource?.map((item) => item?.previouscount) || [];
      const monthh = dataSource?.map((item) => item?.month) || [] ;
      let month = monthh; 

    setChartOptions({
      ...chartOptions,
      series: [
        // {
        //   name: "Present",
        //   data: presentCount,
        // },
        {
          name: "Total Working Days",
          data: currentCount,
          color: "#FEB019",
        },
        {
          name: "Absent",
          data: previousCount,
          color: "#FF4560",
        },
      ],
      xaxis: {
        categories: monthh,
      },
    });
  }, [dataSource]);

  return (
    <div>
      {/* <h2 style={{ textAlign: "center" }}>Employee Attendance Overview</h2> */}
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions?.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};