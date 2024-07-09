import React, { Fragment, useRef } from "react";
import { CustomCardView } from "../../../components/CustomCardView";
import { CustomRow } from "../../../components/CustomRow";
import { Col } from "antd";
import logo from "../../../Images/IDAEUX LOGO.png";
import styled from "styled-components";
import { CustomPageTitle } from "../../../components/CustomPageTitle";
import Button from "../../../components/Form/CustomButton";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

const StyledLetter = styled.div`
  color: #000;
  .header {
    padding: 40px 80px;
    height: 180px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(
      to bottom,
      #add8e6 0%,
      #add8e6 17%,
      #add8e6 17%,
      #add8e6 33%,
      #add8e6 33%,
      #add8e6 67%,
      #add8e6 67%,
      #add8e6 83%,
      #add8e6 83%,
      #add8e6 100%
    );

    clip-path: polygon(
      0% 0%,
      0% 82.5%,
      1.69492% 84.3293%,
      3.38983% 86.1385%,
      5.08475% 87.9078%,
      6.77966% 89.6179%,
      8.47458% 91.25%,
      10.1695% 92.7862%,
      11.8644% 94.2098%,
      13.5593% 95.505%,
      15.2542% 96.6578%,
      16.9492% 97.6555%,
      18.6441% 98.487%,
      20.339% 99.1435%,
      22.0339% 99.6176%,
      23.7288% 99.9041%,
      25.4237% 100%,
      27.1186% 99.9041%,
      28.8136% 99.6176%,
      30.5085% 99.1435%,
      32.2034% 98.487%,
      33.8983% 97.6555%,
      35.5932% 96.6578%,
      37.2881% 95.505%,
      38.9831% 94.2098%,
      40.678% 92.7862%,
      42.3729% 91.25%,
      44.0678% 89.6179%,
      45.7627% 87.9078%,
      47.4576% 86.1385%,
      49.1525% 84.3293%,
      50.8475% 82.5%,
      52.5424% 80.6708%,
      54.2373% 78.8616%,
      55.9322% 77.0922%,
      57.6271% 75.3821%,
      59.322% 73.75%,
      61.017% 72.2138%,
      62.7119% 70.7902%,
      64.4068% 69.495%,
      66.1017% 68.3422%,
      67.7966% 67.3446%,
      69.4915% 66.513%,
      71.1864% 65.8565%,
      72.8814% 65.3824%,
      74.5763% 65.0959%,
      76.2712% 65%,
      77.9661% 65.0959%,
      79.661% 65.3824%,
      81.3559% 65.8565%,
      83.0509% 66.513%,
      84.7458% 67.3446%,
      86.4407% 68.3422%,
      88.1356% 69.495%,
      89.8305% 70.7902%,
      91.5254% 72.2138%,
      93.2203% 73.75%,
      94.9153% 75.3821%,
      96.6102% 77.0922%,
      98.3051% 78.8616%,
      100% 80.6708%,
      100% 0%
    );
    shape-outside: polygon(
      0% 0%,
      0% 82.5%,
      1.69492% 84.3293%,
      3.38983% 86.1385%,
      5.08475% 87.9078%,
      6.77966% 89.6179%,
      8.47458% 91.25%,
      10.1695% 92.7862%,
      11.8644% 94.2098%,
      13.5593% 95.505%,
      15.2542% 96.6578%,
      16.9492% 97.6555%,
      18.6441% 98.487%,
      20.339% 99.1435%,
      22.0339% 99.6176%,
      23.7288% 99.9041%,
      25.4237% 100%,
      27.1186% 99.9041%,
      28.8136% 99.6176%,
      30.5085% 99.1435%,
      32.2034% 98.487%,
      33.8983% 97.6555%,
      35.5932% 96.6578%,
      37.2881% 95.505%,
      38.9831% 94.2098%,
      40.678% 92.7862%,
      42.3729% 91.25%,
      44.0678% 89.6179%,
      45.7627% 87.9078%,
      47.4576% 86.1385%,
      49.1525% 84.3293%,
      50.8475% 82.5%,
      52.5424% 80.6708%,
      54.2373% 78.8616%,
      55.9322% 77.0922%,
      57.6271% 75.3821%,
      59.322% 73.75%,
      61.017% 72.2138%,
      62.7119% 70.7902%,
      64.4068% 69.495%,
      66.1017% 68.3422%,
      67.7966% 67.3446%,
      69.4915% 66.513%,
      71.1864% 65.8565%,
      72.8814% 65.3824%,
      74.5763% 65.0959%,
      76.2712% 65%,
      77.9661% 65.0959%,
      79.661% 65.3824%,
      81.3559% 65.8565%,
      83.0509% 66.513%,
      84.7458% 67.3446%,
      86.4407% 68.3422%,
      88.1356% 69.495%,
      89.8305% 70.7902%,
      91.5254% 72.2138%,
      93.2203% 73.75%,
      94.9153% 75.3821%,
      96.6102% 77.0922%,
      98.3051% 78.8616%,
      100% 80.6708%,
      100% 0%
    );
  }
  .toDetail {
    padding: 20px 80px;
    display: flex;
    justify-content: space-between;
  }
  p {
    font-size: medium;
  }
  .position {
    line-height: 30px;
  }
`;

export const OfferLetter = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomPageTitle Heading={"Offer Letter"} />
        <Button.Primary
          text={<AiFillPrinter style={{ fontSize: "30px" }} />}
          onClick={handlePrint}
        />
      </div>
      <CustomCardView>
        {/* <CustomRow space={[12, 12]}>
          <Col span={24}> */}
        <StyledLetter ref={componentRef}>
          <div className="header">
            <div>
              <img src={logo} width={70} alt="" />
            </div>
            <div>
              <p style={{ fontSize: "x-large" }}>IDEAUX TECH</p>
              <p>
                309 , Eden Brook , Rajakamangalam Road , Ramanputhur , Nagercoil
                , <br />
                Kanyakumari dist .
              </p>
            </div>
            <div style={{ marginTop: "15px" }}>
              <p>Phone : 9898989898</p>
              <p>Email : ideauxInfo@gmail.com</p>
            </div>
          </div>
          <div className="toDetail">
            <div>
              <p style={{ padding: "10px 0px" }}>To,</p>
              <p style={{ padding: "5px 0px" }}>Mr/Mrs.Sanjay</p>
              <p style={{ padding: "5px 0px" }}>Kolkata</p>
            </div>
            <div>
              <p style={{ padding: "10px 0px" }}>Date: 16/12/2023</p>
            </div>
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: "large" }}>
              OFFER LETTER
            </p>
            <div style={{ padding: "20px 80px" }}>
              <p>Dear [Candidate's Name],</p>
              <p
                style={{
                  textIndent: "50px",
                  lineHeight: "30px",
                  padding: "10px 0px",
                }}
              >
                We are delighted to extend an offer of employment for the
                position of [Job Title] at [Your Company Name]. After careful
                consideration of your qualifications and experience, we are
                confident that you will be a valuable addition to our team. In
                under the following term and conditions.
              </p>
              <div style={{ padding: "10px 0px" }}>
                {/* <p>1. Your Date of joining will be [Enter the date]</p>
                <p>1. Your Date of joining will be [Enter the date]</p> */}
                <p className="position">Position: [Job Title]</p>
                <p className="position">Department: [Department]</p>
                <p className="position">Location: [Office Location]</p>
                <p className="position">Start Date: [Proposed Start Date]</p>
              </div>
              <p style={{ padding: "10px 0px" }}>Compensation and Benefits:</p>
              <div style={{ padding: "10px 0px" }}>
                <p className="position">
                  1. Base Salary: [Specific Salary Amount]
                </p>
                <p className="position">
                  2. [Other Compensation Elements, if applicable]
                </p>
              </div>
              <p style={{ padding: "10px 0px" }}>Terms of Employment:</p>
              <p className="position" style={{ textIndent: "50px" }}>
                This offer is contingent upon the successful completion of [any
                necessary background checks, drug tests, etc.]. The employment
                relationship between you and [Your Company Name] is at-will,
                which means that either party may terminate the employment
                relationship at any time, with or without cause, and with or
                without notice.
              </p>
              <p
                className="position"
                style={{ textIndent: "50px", padding: "10px 0px" }}
              >
                We kindly request that you confirm your acceptance of this offer
                by [Acceptance Date], and we look forward to welcoming you to
                [Your Company Name]. If you have any questions or require
                additional information, please do not hesitate to contact [HR
                Contact Person] at [HR Contact Email/Phone].
              </p>
              <p
                className="position"
                style={{ textIndent: "50px", padding: "10px 0px" }}
              >
                Congratulations, and we look forward to a successful and
                productive working relationship.
              </p>
            </div>
          </div>
        </StyledLetter>
        {/* </Col>
        </CustomRow> */}
      </CustomCardView>
    </Fragment>
  );
};
