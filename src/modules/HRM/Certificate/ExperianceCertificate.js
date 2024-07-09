import React, { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import { CustomPageTitle } from "../../../components/CustomPageTitle";
import Button from "../../../components/Form/CustomButton";
import { CustomCardView } from "../../../components/CustomCardView";
import { AiFillPrinter } from "react-icons/ai";
import logo from "../../../Images/IDAEUX LOGO.png";
import { useParams } from "react-router";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../utils/request";

const StyledLetter = styled.div`
  color: #000;
  .header {
    padding: 40px 80px;
    height: 180px;
    display: flex;
    gap: 10px;
    justify-content: center;
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
  span{
 font-size: large;
  }
`;

export const ExperianceCertificate = () => {
  const componentRef = useRef();
  const { id } = useParams();
  const [experience, setExperience] = useState([])

  useEffect(() => {
    GetExperience();
  }, []);

  const GetExperience = () => {
    request
      .get(`${APIURLS.GETEXPERIENCE}${id}`)
      .then(function (response) {
        setExperience(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CustomPageTitle Heading={"Experiance Certificate"} />
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
            <img style={{objectFit:"cover"}} src={`${base}${experience[0]?.profile}`} width={40} height={40} alt="" />
            <p style={{ fontSize: "xx-large", color: "#2688E9" }}>
             {experience[0]?.companyName}
            </p>
          </div>
          <div style={{ marginTop: "50px" }}>
            <p style={{ textAlign: "center", fontSize: "large" }}>
              EXPERIENCE CERTIFICATE
            </p>
            <div style={{ padding: "20px 80px" }}>
              {/* <p className="position">Date: [Enter the date],</p> */}
              <p className="position">
                Subject: Experience certificate For <span>{experience[0]?.designationName}</span>,
              </p>
              <p
                className="position"
                style={{ padding: "10px 0px", textIndent: "20px" }}
              >
                We hereby certify that <span>{experience[0]?.userName}</span> has worked with us at
                 <span> {experience[0]?.companyName}</span> as a <span>{experience[0]?.designationName}</span> from <span> {experience[0]?.date}</span> to <span> {experience[0]?.noticeDate}</span>.
              </p>
              <p
                className="position"
                style={{ padding: "10px 0px", textIndent: "20px" }}
              >
                During his/her tenure with us, he/she has proved himself/herself
                and has been very hardworking and dedicated. We have noticed
                that with his/her timeline and dedication, the project went very
                well on time. He/she can be named among those who deserve
                excellent growth in the Accounts career. We wish him/her all
                success in all their future efforts.
              </p>
              <p
                className="position"
                style={{ padding: "10px 0px", textIndent: "20px" }}
              >
                We wish <span>{experience[0]?.userName}</span> continued success in their future
                endeavors.
              </p>
              <div style={{ display: "flex",gap:"5px", paddingTop:"50px" }}>
                <img style={{objectFit:"cover"}} src={`${base}${experience[0]?.profile}`} width={25} height={25} alt="" />
                <p style={{ fontSize: "large", color: "#2688E9",paddingTop:"1px" }}>
                {experience[0]?.companyName}
                </p>
              </div>
            </div>
          </div>
        </StyledLetter>
        {/* </Col>
      </CustomRow> */}
      </CustomCardView>
    </Fragment>
  );
};
