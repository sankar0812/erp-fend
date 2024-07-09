import React, { useEffect, useState } from "react";
import { CustomCardView } from "../../../components/CustomCardView";
import imagelogo from "../../../Images/ChatGPT-Logo.png";
import { BsFillSendFill } from "react-icons/bs";
import request, { base } from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import { useSelector } from "react-redux";
import { setProfile } from "../../Auth/authSlice";

export const ChatBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [valuess, setValue] = useState([]);

  const userProfile = useSelector(setProfile)

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    // setValue([...value, { values: inputValue }]);
    const newValue = {
      prompt: inputValue,
    };
    
    request
      .post(`${APIURLS.POSTAI}`, newValue)
      .then(function (response) {
        setValue(response?.data);
        setInputValue("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <CustomCardView
      style={{ height: "80vh", background: "#4F5C87", padding: "0px" }}
    >
      <div>
        {/* Header section */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            background: "#4D5783",
            padding: "22px 25px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <img
            src={`${base}${userProfile}`}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <p style={{ color: "#fff", fontSize: "28px",paddingTop:"12px" }}>Allen AI</p>
          </div>
        </div>

        {/* Chat section */}
        <div
          style={{
            height: "54vh",
            overflowY: "scroll",
            color: "#fff",
            padding: "25px",
          }}
        >
          {/* {valuess.map((item, index) => ( */}
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "end",
                  marginTop: "10px",
                }}
              >
                {/* You might want to change `image` to the actual source */}
                <img
                  src={`${base}${userProfile}`}
                  width={40}
                  height={40}
                  alt=""
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div
                    style={{
                      background: "#82CDDD",
                      color: "#000",
                      padding: "8px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>{valuess.userInput}</p>
                  </div>
                  {/* <p style={{ color: "#8797AF" }}>{valuess.time} pm, Today</p> */}
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px", marginTop: "10px", }}>
                <img
                  src={imagelogo}
                  width={40}
                  height={40}
                  alt=""
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div
                    style={{
                      background: "#82CDDD",
                      color: "#000",
                      padding: "8px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>{valuess?.gpt3Response}</p>
                  </div>
                  {/* <p style={{ color: "#8797AF" }}>8.40 pm, Today</p> */}
                </div>
              </div>
            </div>
          {/* ))} */}

        </div>

        {/* Typing section */}
        <div style={{ display: "flex", padding: "10px 25px" }}>
          <input
            placeholder="Please type your question...."
            type="text"
            style={{
              background: "#363D5B",
              border: "none",
              width: "92%",
              height: "62px",
              borderTopLeftRadius: "13px",
              borderBottomLeftRadius: "13px",
              paddingLeft: "10px",
              color: "#fff",
              outline: "none",
            }}
            onChange={handleChange}
            value={inputValue} // Bind input value to inputValue state
          />
          <div
            style={{
              color: "#fff",
              background: "#363D5B",
              width: "8%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderLeft: "1px solid #fff",
              borderTopRightRadius: "13px",
              borderBottomRightRadius: "13px",
            }}
            onClick={handleClick}
          >
            <BsFillSendFill size={30} />
          </div>
        </div>
      </div>
    </CustomCardView>
  );
};
