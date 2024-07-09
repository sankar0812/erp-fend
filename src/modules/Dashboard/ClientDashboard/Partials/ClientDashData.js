import { useEffect, useState } from "react";
import { StyledTable } from "../../AdminDashboard/style";
import { selectCurrentId, selectCurrentRoleId } from "../../../Auth/authSlice";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { useSelector } from "react-redux";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { AiOutlineInbox } from "react-icons/ai";
import { Avatar } from "antd";

export const AllProjectStatus = () => {
  const [dataSource, setDataSource] = useState([]);
  const ClientId = useSelector(selectCurrentId);

  useEffect(() => {
    GetProjectStatus();
  }, []);

  const GetProjectStatus = () => {
    request
      .get(`${APIURLS.GETCLIENTPROJECTSTATUS}${ClientId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const dummy = [
    {
      projectName: "Biiling",
      taskname: "Sale",
      status: true,
      details: "Completed",
    },
    {
      projectName: "Automation",
      taskname: "Purchase",
      status: false,
      details: "Completed",
    },
    {
      projectName: "AI",
      taskname: "Expense",
      status: false,
      details: "Completed",
    },
  ];

  return (
    <StyledTable style={{ height: '320px' }}>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Project Name</th>
            <th>Type Of Project</th>
            <th>Project Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.project_name}</td>
                <td>
                  {item?.type_of_project === "development" ? (
                    <CustomTag title={"development"} color={"green"} />
                  ) : item?.type_of_project === "research" ? (
                    <CustomTag title={"Research"} color={"gold"} />
                  ) : item?.type_of_project === "testing" ? (
                    <CustomTag title={"Testing"} color={"grey"} />
                  )
                    : item?.type_of_project === "project" ? (
                      <CustomTag title={"Project"} color={"processing"} />
                    )
                      : item?.type_of_project === "hosting" ? (
                        <CustomTag title={"Hosting"} color={"pink"} />
                      ) : null}
                </td>
                <td>
                  {item?.project_status === "pending" ? (
                    <CustomTag title={"Pending"} color={"processing"} />
                  ) : (
                    <CustomTag title={"Completed"} color={"success"} />
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

export const CurrentPayment = () => {
  const [dataSource, setDataSource] = useState([]);
  const ClientId = useSelector(selectCurrentId);

  useEffect(() => {
    GetCurrentPayment();
  }, []);

  const GetCurrentPayment = () => {
    request
      .get(`${APIURLS.GETCLIENTCURRENTPAYMENT}${ClientId}`)
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
            {/* <th>Project Name</th> */}
            <th>Payment Date</th>
            <th>Payment Type</th>
            <th>Amt</th>
            <th>Received Amt</th>
            <th>Bal</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* <td>{item?.projectName}</td> */}
                <td>{item?.paymentDate}</td>
                <td>
                  {item?.paymentType === "Cash" ? (
                    <CustomTag title={"Cash"} color={"green"} />
                  ) : item?.paymentType === "Cheque" ? (
                    <CustomTag title={"Cheque"} color={"gold"} />
                  )
                    : item?.paymentType === "OnlineTransaction" ? (
                      <CustomTag title={"OnlineTransaction"} color={"processing"} />
                    )
                      : null}
                </td>
                <td>{item?.amount}</td>
                <td>{item?.receivedAmount}</td>
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

export const WorkingEmployees = () => {

  const [dataSource, setDataSource] = useState([]);
  const ClientId = useSelector(selectCurrentId);

  useEffect(() => {
    GetWorkingEmployee();
  }, []);

  const GetWorkingEmployee = () => {
    request
      .get(`${APIURLS.GETCLIENTWORKEMP}${ClientId}`)
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
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.projectName}</td>
              <td>
                <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", display: "flex", alignItems: "center" }}>
                  {item.employees.map((employee, empIndex) => (
                    <Avatar key={empIndex} src={`${base}${employee.profile}`} />
                  ))}
                </Avatar.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
};

export const QuatationApproval = () => {

  const [dataSource, setDataSource] = useState([]);
  const ClientId = useSelector(selectCurrentId);

  useEffect(() => {
    GetQuatationApproval();
  }, []);

  const GetQuatationApproval = () => {
    request
      .get(`${APIURLS.GETQUATATIONAPPROVAL}${ClientId}`)
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
            <th>Project</th>
            <th>Client</th>
            <th>Client Status</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.project_name}</td>
              <td>{item.client_name}</td>
              <td>
                {item.client_status === 'rejected' ?
                  (
                    <CustomTag
                      bordered={"true"}
                      color={"error"}
                      title={"Rejected"}
                    />
                  )
                  :
                  item.client_status === 'pending' ?
                    (
                      <CustomTag
                        bordered={"true"}
                        color={"yellow"}
                        title={"Pending"}
                      />
                    )
                    :
                    item.client_status === 'approved' ?
                      (
                        <CustomTag
                          bordered={"true"}
                          color={"success"}
                          title={"Approved"}
                        />
                      )
                      :
                      null
                }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
};
