import React, { useEffect, useState } from "react";
import { CustomPageFormSubTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { useParams } from "react-router-dom";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request, { base } from "../../../../../utils/request";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import styled from "styled-components";
import { SvgIcons } from "../../../../../Images";

const StyledLine = styled.div`
  button {
    background-color: #2d4979;
    color: #fff;
    padding: 7px 25px;
    margin: 10px 0px;
    border: 2px solid #51c0ac;
    border-radius: 3px;
    font-size: 18px;
  }
  .row {
    margin-top: 30px;
  }
  .column1 {
    padding-left: 50px;
  }
  .heading {
    color: #000;
    font-size: 20px;
  }
  .para {
    padding: 10px 0px;
  }
  li {
    font-size: 16px;
    margin-left: 30px;
  }
  .companyImg {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export const ViewHiringDetails = () => {
  const [hiring, setHiring] = useState();
  const [searchTexts, setSearchTexts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    GetHiring();
  }, []);

  const GetHiring = () => {
    request
      .get(`${APIURLS.GETHIRING}/${id}`)
      .then(function (response) {
        setHiring(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };
  
  return (
    <CustomCardView style={{height: "auto"}}>
      <StyledLine>
        <CustomPageFormSubTitle
          Heading={"View Hiring Details"}
          style={{ fontSize: "20px", padding: "10px 0px" }}
        />

        <CustomRow
          space={[24, 24]}
          style={{
            background: "#2D4979",
            padding: "12px 0px",
          }}
        >
          <Col span={24} md={1}></Col>
          <Col span={24} md={10}>
            <button>Job Search</button>
          </Col>
        </CustomRow>
        <div className="row">
          <CustomRow space={[24, 24]}>
            <Col span={24} md={12} style={{display:"flex", alignItems:"center"}}>
              <div className="column1">
                <div style={{ padding: "0px 0px 30px 0px" }}>
                  <p className="heading">{hiring?.jobTitle}</p>
                </div>
                <div className="para">
                  <p className="heading">Posted on:</p>
                  <p
                    style={{
                      padding: "10px 0px",
                      fontSize: "16px",
                      paddingLeft: "10px",
                    }}
                  >
                    {hiring?.posted}
                  </p>
                </div>
                <div className="para">
                  <p className="heading">Closing on:</p>
                  <p
                    style={{
                      padding: "10px 0px",
                      fontSize: "16px",
                      paddingLeft: "10px",
                    }}
                  >
                    {hiring?.closing}
                  </p>
                </div>
                <div className="para">
                  <p className="heading">Contact email:</p>
                  <p
                    style={{
                      padding: "10px 0px",
                      fontSize: "16px",
                      paddingLeft: "10px",
                    }}
                  >
                    {hiring?.email}
                  </p>
                </div>
              </div>
            </Col>

            <Col span={24} md={12}>
              <CustomCardView style={{ background: "#F7F7F7" }}>
                <div style={{ padding: "10px" }}>
                  <img
                    className="companyImg"
                    src={`${base}${hiring?.profile}`}
                    alt=""
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "20px 0px",
                      color: "#000",
                    }}
                  >
                    <img src={SvgIcons.company} alt="view" />
                    <p style={{ fontSize: "18px" }}>COMPANY NAME</p>
                  </div>
                  <a href="#">{hiring?.companyName}</a>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "20px 0px",
                      color: "#000",
                    }}
                  >
                    <img src={SvgIcons.location} alt="view" />
                    <p style={{ fontSize: "18px" }}>ADDRESS</p>
                  </div>
                  <a href="#">{hiring?.companyAddress}</a>
                </div>
                {/* <div>
                  <div style={{display:"flex",gap:"10px",padding:"20px 0px",color:"#000"}}>
                    <img src={SvgIcons.website} alt="view" />
                    <p style={{fontSize:"18px"}}>WEBSITE</p>
                  </div>
                  <a href="#">{hiring?.companyName}</a>
                </div> */}
              </CustomCardView>
            </Col>
            
            <Col span={24} md={24}>
              <div className="column1">
                <div className="para">
                  <p className="heading">Brief description :</p>
                  {hiring?.briefList.map((item, index) => {
                    return (
                      <ul key={index}>
                        <li>{item.briefDescription}</li>
                      </ul>
                    );
                  })}
                  {/* <ul style={{marginLeft:"30px"}}>
                    <li>sdzffd</li>
                    <li>sdzffd</li>
                    <li>sdzffd</li>
                  </ul> */}
                </div>

                <div className="para">
                  <p className="heading">Prefferd Skills:</p>
                  {hiring?.preferredList.map((item, index) => {
                    return (
                      <ul key={index}>
                        <li>{item.preferredSkills}</li>
                      </ul>
                    );
                  })}

                  <p
                    style={{
                      paddingTop: "20px",
                      fontSize: "18px",
                      color: "#000",
                    }}
                  >
                    {hiring?.requests}
                  </p>
                </div>
              </div>
            </Col>

            
          </CustomRow>
        </div>
      </StyledLine>
    </CustomCardView>
  );
};
