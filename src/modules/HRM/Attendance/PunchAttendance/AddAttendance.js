import { Card, Col, message, Pagination, Progress, Steps } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { CustomPopconfirm } from "../../../../components/CustomPopConfirm";
import { CustomRow } from "../../../../components/CustomRow";
import Flex from "../../../../components/Flex";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectCurrentRoleName,
} from "../../../Auth/authSlice";
import { ViewAttendance } from "./ViewAteendance";

export const PunchBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  margin: 20px 0px;
  padding: 13px;
  & h1 {
    line-height: 20px;
    font-family: "arial";
    margin: 0;
    color: black;
    font-size: 12px;
  }
  & h2 {
    color: #8e8e8e !important;
    font-size: 16px;
  }
  & p {
    color: #8e8e8e !important;
    font-size: 14px;
  }
`;
export const RoundBox = styled.div`
  /* position: relative; */
  background-color: #f9f9f9;
  border: 5px solid #e3e3e3;
  font-size: 18px;
  height: 120px;
  width: 120px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    display: flex;
    /* position: absolute; */
  }
`;
export const TotalHrs = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  padding: 14px;
  margin: 5px 0px;
  & h2 {
    line-height: 20px;
    font-family: "arial";
    margin: 0;
    color: #000000bd;
    font-size: 13px;
  }
`;
export const Main = styled.div`
  .btnborder {
    border-radius: 25px !important;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    margin-left: 10px;
    /* font-size:30px !important; */
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const AddAttendance = () => {
  const [todayDate, setTodayDate] = useState([]); // AttedancePunch Get Response
  const [punchClick, setPunchClick] = useState("Punch In");
  const [attendances, setAttendances] = useState("PunchIn");
  const [nextDay, setNextDay] = useState([]);
  const [totalHrs, setTotalHrs] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [currentData, setCurrentData] = useState(0);

  const { id } = useParams();

  const RoleName = useSelector(selectCurrentRoleName);
  const RoleId = useSelector(selectCurrentRoleId); // emp id
  const EmployeeId = useSelector(selectCurrentId); // emp id
  const TodayAttendance = todayDate[todayDate.length - 1]; // Today Details Attendance

  const AddPunch = (value) => {
    const currentTime = new Date().toLocaleTimeString();
    request
      .post(`${APIURLS.PostAttendance}`, value) // Punch In (Post)
      .then(function (response) {
        if (response.status === 200) {
          setAttendances("PunchIn"); //  Value(punchIn/punchOut) send
          setPunchClick("Punch Out"); // label show
          setCurrentData(currentTime);
          if (GetPunch) {
            GetPunch();
          }
          message.success("Attendance entry Added successfully");
        }
      })
      .catch((error) => {
        message.error(
          // "Today, you are allowed only one attendance check-in. Please make sure to attend tomorrow as well."
          error?.response.data
        );
      });
  };

  useEffect(() => {
    const lastAttendance = todayDate[todayDate.length - 1];
    const current = new Date();
    if (current) {
      if (lastAttendance?.punch_out === false) {
        setPunchClick("Punch Out");
        setAttendances("PunchOut");
      }
    }
    if (lastAttendance?.punch_in === false) {
      setPunchClick("Punch In");
      setAttendances("PunchIn");
    }
  }, [todayDate]);

  useEffect(() => {
    GetPunch();
  }, []);

  const GetPunch = (value) => {
    const attendance = "employeeattendance";
    if (RoleName === "Training") {
      request
        .get(`attendance/${id}/${RoleId}`, {
          params: { attendance: attendance },
        })
        .then(function (response) {
          setTodayDate(response.data);
          setNextDay(response.data);
          setViewData(response.data);
        })
        .catch((error) => {
          console.error("Failed:", error);
        });
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      request
        .get(`attendance/${id}/${RoleId}`, {
          params: { attendance: attendance },
        })
        .then(function (response) {
          setTodayDate(response.data);
          setNextDay(response.data);
          setViewData(response.data);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };

  const PUNCHOUT = nextDay.map((item) => {
    return {
      title: `Punch In  ${item.in_time}    (${item.in_date}) `, //  punchout steps card using
      description: `Punch Out ${item.out_time}`,
    };
  });

  const EditPunch = (values) => {
    const EmployeeListId = todayDate[todayDate.length - 1];
    request
      .put(`${APIURLS.PUTATT}/${EmployeeListId?.employee_att_id}`, values) // punch Out (Edit)
      .then(function (response) {
        if (response.status === 200) {
          setAttendances("PunchOut");
          setPunchClick("Punch In");
          if (GetPunch) {
            GetPunch();
          }
          message.success("Attendance entry Updated successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed");
      });
  };

  const handlebtn = () => {
    let PunchValues;

    if (RoleName === "Training") {
      PunchValues = {
        traineeId: id,
        attendance: "PunchIn",
      };
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      PunchValues = {
        employeeId: id,
        attendance: "PunchIn",
      };
    }
    // const PunchValues = {
    //   employeeId: id,
    //   attendance: "PunchIn",
    // };

    const EditPunchValues = {
      attendance: "PunchOut",
    };

    if (punchClick === "Punch In") {
      AddPunch(PunchValues); //>>>>>>>>>>>>>> Add Post Request
    } else if (punchClick === "Punch Out") {
      EditPunch(EditPunchValues); //>>>>>>>>>>>>>>  Edit  Put Request
    }
  };
  const stepsPerPage = 3;

  const [current, setCurrent] = useState(0);

  const handlePaginationChange = (page) => {
    setCurrent(page - 1);
  };

  const dummycancel = ()=>{
    
  }
  //==============Total Hrs =====================================//

  useEffect(() => {
    GetTotalHrs();
  }, []);

  const GetTotalHrs = (values) => {
    if (RoleName === "Training") {
      request
        .get(`${APIURLS.GETTOTALHRSATT}/${id}/${RoleId}`, values)
        .then(function (response) {
          setTotalHrs(response.data);
        })
        .catch((error) => {
          console.log(error, "hhhhhh");
        });
    } else if (
      RoleName === "Employee" ||
      RoleName === "TL" ||
      RoleName === "ProjectHead"
    ) {
      request
        .get(`${APIURLS.GETTOTALHRSATT}/${id}/${RoleId}`, values)
        .then(function (response) {
          setTotalHrs(response.data);
        })
        .catch((error) => {
          console.log(error, "czc");
        });
    }
  };

  return (
    <Fragment>
      <Main>
        <CustomRow space={[24, 24]}>
          <Col span={24} md={24} lg={12}>
            <Card>
              <Flex gap={"10px"}>
                <h1 style={{ color: "black", fontSize: "18px" }}>Time Sheet</h1>
                <h1 style={{ color: "#8e8e8e", fontSize: "18px" }}>
                  {TodayAttendance?.in_date}
                </h1>
              </Flex>
              <PunchBox>
                <CustomRow>
                  <Col span={24} md={12}>
                    <h1>Punch In at</h1>
                    <br></br>
                    <h2>
                      {TodayAttendance?.in_date}&nbsp;&nbsp;
                      {TodayAttendance?.in_time}
                    </h2>
                  </Col>
                  <Col span={24} md={12}>
                    <div style={{ float: "right" }}>
                      <h1>Employee Name & Id</h1>
                      <br></br>
                      <h2>{TodayAttendance?.user_name}</h2>
                      <br />
                      <p>{totalHrs?.user_id}</p>
                    </div>
                  </Col>
                </CustomRow>
              </PunchBox>

              <div style={{ margin: "auto" }}>
                <RoundBox>
                  <span>{TodayAttendance?.working_hour || 0}&nbsp;hrs</span>
                </RoundBox>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "20px 0px",
                }}
              >
                <CustomPopconfirm
                  confirm={handlebtn}
                  cancel={dummycancel}
                  title={"PunchIn / PunchOut"}
                  description={`Are you sure to ${punchClick}?`}
                  okText={"Yes"}
                  cancelText={"No"}
                >
                  <ButtonStandard.Primary
                    text={punchClick}
                    className="btnborder"
                  />
                </CustomPopconfirm>
              </div>

              <Flex spaceevenly={"true"}>
                <TotalHrs>
                  <h1>Working Hrs</h1>
                  <h2>{TodayAttendance?.working_hour}</h2>
                </TotalHrs>
              </Flex>
            </Card>
          </Col>
          <Col span={24} md={24} lg={12}>
            <CustomRow space={[24, 24]}>
              <Col span={24} md={24} lg={24}>
                <Card style={{ rowGap: "20px" }}>
                  <h1 style={{ color: "black", fontSize: "18px" }}>
                    Statistics
                  </h1>
                  <TotalHrs>
                    <Flex spacebetween="true">
                      <h2>Today</h2>
                      <h2>{totalHrs?.to_day}hrs</h2>
                    </Flex>
                    {/* <Progress percent={50} size="small" /> */}
                  </TotalHrs>
                  <TotalHrs>
                    <Flex spacebetween="true">
                      <h2>This Week</h2>
                      <h2>{totalHrs?.weekly_working_hour}hrs</h2>
                    </Flex>
                    {/* <Progress percent={80} size="small" /> */}
                  </TotalHrs>
                  <TotalHrs>
                    <Flex spacebetween="true">
                      <h2>This Month</h2>
                      <h2>{totalHrs?.monthly_working_hour}hrs</h2>
                    </Flex>
                    {/* <Progress percent={70} size="small" /> */}
                  </TotalHrs>
                </Card>
              </Col>
              <Col span={24} md={24} lg={24}>
                <Card>
                  <h1 style={{ color: "black", fontSize: "18px" }}>
                    Total Activity
                  </h1>
                  <Steps
                    current={current}
                    direction="vertical"
                    items={PUNCHOUT.slice(
                      current * stepsPerPage,
                      (current + 1) * stepsPerPage
                    )}
                  />
                  <Pagination
                    current={current + 1}
                    total={PUNCHOUT.length}
                    pageSize={stepsPerPage}
                    showSizeChanger={false}
                    onChange={handlePaginationChange}
                  />
                </Card>
              </Col>
            </CustomRow>
          </Col>
        </CustomRow>
      </Main>
      <ViewAttendance
        roleId={RoleId}
        id={EmployeeId}
        viewData={viewData}
        setViewData={setViewData}
      />
    </Fragment>
  );
};

export default AddAttendance;
