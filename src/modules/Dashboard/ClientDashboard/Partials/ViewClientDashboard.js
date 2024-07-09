import React, { Fragment, useEffect, useState } from "react";
import {
  CustomPageFormSubTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import { Col, Collapse } from "antd";
import Flex from "../../../../components/Flex";
import { SvgIcons } from "../../../../Images";
import { StyledCardDash } from "../../PLDashboard/style";
import { AllProjectStatus, CurrentPayment, Demoe, ProjectStatus, QuatationApproval, WorkingEmployees } from "./ClientDashData";
import { CustomCardView } from "../../../../components/CustomCardView";
import { selectCurrentId, selectCurrentRoleId } from "../../../Auth/authSlice";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { useSelector } from "react-redux";
import { Counterss } from "../../Counterss";

export const ViewClientDashboard = () => {

    const [dataSource, setDataSource] = useState([]);
    const clientId = useSelector(selectCurrentId);
    const RoleId = useSelector(selectCurrentRoleId);

    useEffect(() => {
        GetCardData();
      }, []);
    
      const GetCardData = () => {
        request
          .get(`${APIURLS.GETCLIENTDASHCARD}${clientId}`)
          .then(function (response) {
            setDataSource(response.data);
          })
          .catch(function (error) {
            console.log(error, "error");
          });
      };

  const clientCardData = [
    {
      key: "1",
      rate: dataSource?.projectCount ? dataSource?.projectCount : 0,
      icon: SvgIcons.Employee,
      p: "Total Project",
      backgroundColor: "linear-gradient(135deg,#289cf5,#4f8bb7)",
    },
    {
      key: "2",
      rate: dataSource?.completed ? dataSource?.completed : 0,
      icon: SvgIcons.Absent,
      p: "Completed Project",
      backgroundColor:
        "linear-gradient(135deg, rgb(35, 189, 184) 0, rgb(101, 169, 134) 100%)",
    },
  ];

  return (
    <Fragment>
      <CustomPageTitle Heading={"Client DASHBOARD"} />
      <CustomRow space={[12, 12]}>
        {clientCardData?.map((item, i) => (
          <Col span={24} md={12} key={i} lg={12}>
            <StyledCardDash backgroundcolor={item?.backgroundColor}>
              <h1>{item?.p} </h1>
              <Flex>
                <img src={item?.icon} alt="" />
              </Flex>
              {/* <h2>{item?.rate}</h2> */}
              <Counterss target={item?.rate}/>
            </StyledCardDash>
          </Col>
        ))}

        <Col span={24} md={11}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Project Status Details"} />
            <AllProjectStatus />
          </CustomCardView>
        </Col>

        <Col span={24} md={13}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Current Month Payment"} />
            <CurrentPayment />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Working Employees"} />
            <WorkingEmployees />
          </CustomCardView>
        </Col>

        <Col span={24} md={12}>
          <CustomCardView>
            <CustomPageFormSubTitle Heading={"Quatation Approval"} />
            <QuatationApproval />
          </CustomCardView>
        </Col>

      </CustomRow>
    </Fragment>
  );
};
