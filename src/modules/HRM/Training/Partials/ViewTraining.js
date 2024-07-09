import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { Col } from "antd";
import { CustomCardView } from "../../../../components/CustomCardView";
import { Details, EmpDetails, EmpView } from "../../EmployeeDetails/Style";
import request, { base } from "../../../../utils/request";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { useParams } from "react-router-dom";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomLableBack } from "../../../../components/CustomLableBack";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import Flex from "../../../../components/Flex";

export const ViewTrainingDetails = () => {
  const id = useParams();
  
  const [traineeRecord, setTraineeRecord] = useState([])

  useEffect(() => {
    GetViewTrainee();
  }, []);

  const GetViewTrainee = () => {
    request
      .get(`${APIURLS.GETTRAINEEDETAIL}${id?.id}/`)
      .then(function (response) {
        setTraineeRecord(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Fragment>
    <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Trainee"} />
      </Flex>
    <EmpView>
      <CustomRow space={[12, 12]}>
        {/* Employee Information */}

        <Col span={24} md={24}>
          <CustomCardView>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={10}>
                <EmpDetails>
                  <CustomRow>
                    <Col span={24} md={12}>
                      <img
                        src={`${base}${traineeRecord?.profile}`}
                        alt="img"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    </Col>
                    <Col span={24} md={12}>
                      <div style={{ marginLeft: "20px" }}>
                        <p
                          style={{
                            fontWeight: "900",
                            fontSize: "22px",
                            color: "#000",
                            padding:"7px 0px"
                          }}
                        >
                          {traineeRecord?.userName}
                        </p>
                        <p style={{padding:"5px 0px"}}>Department :{traineeRecord?.departmentName}</p>
                        <p style={{padding:"5px 0px"}}>UserId :{traineeRecord?.userId}</p>
                      </div>
                    </Col>
                    <Col span={24} md={23} sm={23}>
                      <CustomRow space={[12, 12]} style={{ marginTop: "18px" }}>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Phone :</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">
                            {traineeRecord?.mobileNumber}
                          </p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Email:</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">{traineeRecord?.email}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Gender:</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">{traineeRecord?.gender}</p>
                        </Col>
                      </CustomRow>
                    </Col>
                  </CustomRow>
                </EmpDetails>
              </Col>
              <Col span={24} md={14}>
                <Details>
                  <CustomRow style={{ position: "relative" }} space={[12, 12]}>
                    <Col span={24} md={23} sm={23}>
                      <CustomRow space={[12, 12]}>
                        {/* <Col span={24} md={11} sm={11}>
                          <p className="para">Phone :</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">
                            {traineeRecord?.mobileNumber}
                          </p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Email:</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">{traineeRecord?.email}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Gender:</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">{traineeRecord?.gender}</p>
                        </Col> */}
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Birthday:</p>
                        </Col>
                        <Col span={24} md={13} sm={13}>
                          <p className="paraBlue">
                            {traineeRecord?.dateOfBirth}
                          </p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Address:</p>
                        </Col>
                        <Col
                          span={24}
                          md={13}
                          sm={13}
                          style={{ width: "100%" }}
                        >
                          <p className="paraBlue">{traineeRecord?.address}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">City:</p>
                        </Col>
                        <Col
                          span={24}
                          md={13}
                          sm={13}
                          style={{ width: "100%" }}
                        >
                          <p className="paraBlue">{traineeRecord?.city}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">State:</p>
                        </Col>
                        <Col
                          span={24}
                          md={13}
                          sm={13}
                          style={{ width: "100%" }}
                        >
                          <p className="paraBlue">{traineeRecord?.state}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Country:</p>
                        </Col>
                        <Col
                          span={24}
                          md={13}
                          sm={13}
                          style={{ width: "100%" }}
                        >
                          <p className="paraBlue">{traineeRecord?.country}</p>
                        </Col>
                        <Col span={24} md={11} sm={11}>
                          <p className="para">Trainee Status:</p>
                        </Col>
                        <Col
                          span={24}
                          md={13}
                          sm={13}
                          style={{ width: "100%",paddingLeft:"25px" }}
                        >
                          {traineeRecord?.traineeStatus === "started" && (
                            <CustomTag
                              bordered={"true"}
                              color={"success"}
                              title={"started"}
                            />
                          )}

                          {traineeRecord?.traineeStatus === "completed" && (
                            <CustomTag
                              bordered={"true"}
                              color={"gold"}
                              title={"completed"}
                            />
                          )}

{traineeRecord?.traineeStatus === "cancelled" && (
                            <CustomTag
                              bordered={"true"}
                              color={"error"}
                              title={"Cancelled"}
                            />
                          )}
                        </Col>
                      </CustomRow>
                    </Col>
                  </CustomRow>
                </Details>
              </Col>
            </CustomRow>
          </CustomCardView>
        </Col>
      </CustomRow>
    </EmpView>
    </Fragment>
  );
};
