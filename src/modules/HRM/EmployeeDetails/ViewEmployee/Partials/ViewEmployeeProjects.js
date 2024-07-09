import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomCardView } from "../../../../../components/CustomCardView";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { CustomTag } from "../../../../../components/Form/CustomTag";

export const ViewEmployeeProjects = () => {
  const [dataSource, setDataSource] = useState([]);
  const [employees, setEmployees] = useState([]);
 
  const { id } = useParams();

  useEffect(() => {
    GetEmployeeProjects();
  }, []);

  const GetEmployeeProjects = () => {
    request
      .get(`${APIURLS.GETEMPLOYEEPROJECTS}${id}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const projectId = dataSource?.map((item) => item?.project_id)

  // console.log(projectId);

  // useEffect(() => {
  //   GetEmployees();
  // }, []);

  // console.log(dataSource);
  
  // const GetEmployees = () => {
  //   request
  //   .get(`${APIURLS.GETPROJECTSEMPLOYEE}${dataSource?.project_id}`)
  //   .then(function (response) {
  //     setEmployees(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };
  // console.log(employees,'kkkk');

  return (
    <Fragment>
      <CustomRow space={[24, 24]}>
        {dataSource?.map((item) => {
          return (
            <Col span={24} md={12} lg={8} key={item?.project_id}>
              <CustomCardView>
                <p style={{ textAlign: "center", fontSize: "18px" }}>
                  {item?.project_name}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0px",
                    flexWrap:"wrap"
                  }}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <img
                      src={`${base}${item?.profile}`}
                      width={50}
                      height={50}
                      alt=""
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <p style={{ fontSize: "16px", padding: "5px 0px" }}>
                        {item?.user_name}
                      </p>
                      <p style={{ fontSize: "16px", padding: "5px 0px" }}>
                        {item?.user_id}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.type_of_project === "research" && (
                      <CustomTag
                        bordered={"true"}
                        color={"warning"}
                        title={item.type_of_project}
                      />
                    )}

                    {item.type_of_project === "development" && (
                      <CustomTag
                        bordered={"true"}
                        color={"purple"}
                        title={item.type_of_project}
                      />
                    )}

                    {item.type_of_project === "project" && (
                      <CustomTag
                        bordered={"true"}
                        color={"processing"}
                        title={item.type_of_project}
                      />
                    )}

                    {item.type_of_project === "testing" && (
                      <CustomTag
                        bordered={"true"}
                        color={"orange"}
                        title={item.type_of_project}
                      />
                    )}

                    {item.type_of_project === "hosting" && (
                      <CustomTag
                        bordered={"true"}
                        color={"success"}
                        title={"Completed"}
                      />
                    )}
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap" }}
                >
                  <p style={{ fontSize: "16px", padding: "10px 0px" }}>
                    Project Start Date :
                  </p>
                  <p style={{ fontSize: "16px", padding: "10px 0px" }}>
                    {item?.date}
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap" }}
                >
                  <p style={{ fontSize: "16px", padding: "10px 0px" }}>
                    Project End Date :
                  </p>
                  <p style={{ fontSize: "16px", padding: "10px 0px" }}>
                    {item?.durationdate}
                  </p>
                </div>
                {/* <div>
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
                </div> */}
              </CustomCardView>
            </Col>
          );
        })}
      </CustomRow>
    </Fragment>
  );
};
