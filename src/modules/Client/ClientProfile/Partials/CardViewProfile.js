import { Col } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CustomCardView } from "../../../../components/CustomCardView";
import { CustomRow } from "../../../../components/CustomRow";
import request, { base } from "../../../../utils/request";
import {
  Detail,
  Details,
  EmpDetails,
  EmpView,
} from "../../../HRM/EmployeeDetails/Style";
import { useParams } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import Button from "../../../../components/Form/CustomButton";
import { toast } from "react-toastify";
import Flex from "../../../../components/Flex";
import { CustomLableBack } from "../../../../components/CustomLableBack";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";

export const TitleBox = styled.div`
  text-align: center;

  & h2 {
    font-size: 28px;
    color: grey;
  }
`;

const CardViewProfile = ({ profilerecord }) => {
  const [detailget, setDetailsGet] = useState([]);

  const id = useParams();

  useEffect(() => {
    GetClientDetails();
  }, []);

  const GetClientDetails = () => {
    request
      .get(`${APIURLS.GETVIEWCLIENT}${id?.id}`)
      .then(function (response) {
        setDetailsGet(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ActiveStatus = (record) => {
    request
    .put(`${APIURLS.CLIENTSTATUS}${record.clientId}`)
    .then(function (response) {
      toast.success("Status Changed Successfully");
      GetClientDetails()
    })
    .catch(function (error) {
      console.error(error, "check");
    });
  };

  return (
    <Fragment>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Client Profile"} />
      </Flex>
      <EmpView>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            <CustomCardView>
              <CustomRow space={[12, 12]}>
                <Col span={24} md={10}>
                  <EmpDetails>
                    <CustomRow>
                      <Col span={24} md={12}>
                        <img
                          src={`${base}${detailget?.clientProfile}`}
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
                              fontSize: "25px",
                              color: "#000",
                            }}
                          >
                            {detailget?.clientName}
                          </p>
                          {/* <p>{detailget?.departmentName}</p>
                          <br />
                          <p>{detailget?.designationName}</p>
                          <br />
                          <p style={{ color: "#000" }}>
                            Staff ID : {detailget?.userId}
                          </p> */}
                        </div>
                      </Col>

                      <Col
                        span={24}
                        md={24}
                        style={{
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {detailget?.status === true && (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(detailget)}
                          >
                            In Active
                          </Button>
                        )}

                        {detailget?.status === false && (
                          <Button
                            type="primary"
                            onClick={() => ActiveStatus(detailget)}
                          >
                            Active
                          </Button>
                        )}
                      </Col>
                    </CustomRow>
                  </EmpDetails>
                </Col>
                <Col span={24} md={14}>
                  <Details>
                    <CustomRow
                      style={{ position: "relative" }}
                      space={[12, 12]}
                    >
                      <Col span={24} md={23} sm={23}>
                        <CustomRow space={[12, 12]}>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Phone :</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.phoneNumber}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Email:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.email}</p>
                          </Col>
                          <Col span={24} md={11} sm={11}>
                            <p className="para">Gender:</p>
                          </Col>
                          <Col span={24} md={13} sm={13}>
                            <p className="paraBlue">{detailget?.gender}</p>
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
                            <p className="paraBlue">{detailget?.address}</p>
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
                            <p className="paraBlue">{detailget?.city}</p>
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
                            <p className="paraBlue">{detailget?.state}</p>
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
                            <p className="paraBlue">{detailget?.country}</p>
                          </Col>
                        </CustomRow>
                      </Col>
                      {/* <div className="icon-places">
                        <GrEdit
                          className="icon"
                          onClick={() => {
                            EditInitialEmployee(id);
                          }}
                        />
                      </div> */}
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

export default CardViewProfile;
