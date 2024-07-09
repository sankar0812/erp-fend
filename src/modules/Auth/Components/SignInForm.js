import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Spin } from "antd";
import Flex from "../../../components/Flex";
import { Col } from "antd";
import { CustomRow } from "../../../components/CustomRow";
import { CustomInput } from "../../../components/Form/CustomInput";
import ButtonStandard from "../../../components/Form/CustomStandardButton";
import { CustomInputPassword } from "../../../components/Form/CustomInputPassword";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import BckImg1 from "../../../Images/bglogin1.png";
import { LoadingOutlined } from "@ant-design/icons";

const InputWrapper = styled.div`
  padding-bottom: 25px;
`;
const Header = styled.div`
  color: #fff;
  margin-bottom: 20px;
`;
const StyledIcons = styled.div`
  .gqUfcP {
    border-radius: 50%;
  }

  & svg {
    font-size: 20px;
  }
`;

// ---------- LoginDesign Style --------

const LoginDesign = styled.div`
  height: 100vh;
  /* text-align: center; */
  background-color: #fff;
  .left_imge {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 15px;
    position: relative;
    z-index: 1;
    & img {
      width: 100%;
    }
  }
  & h1 {
    font-size: 30px;
    font-weight: 800;
    color: #000;
    margin: 80px 0 20px 0;
  }
  & h3 {
    font-size: 20px;
    color: #a7a2b4;
    margin-right: 15px;
  }

  .btn_md {
    margin: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media screen and (max-width: 500px) {
      display: flow-root;
    }
  }

  @media screen and (max-width: 770px) {
    .left_side {
      display: none;
    }
  }

`;

const SignInForm = ({ handleSignIn, isLoading }) => {
  const [check, setCheck] = useState(false);

  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  const location = useLocation();
  const { email, Password } = location.state || {};

  useEffect(() => {
    form.setFieldsValue({ email: email });
    form.setFieldsValue({ password: Password });
  }, []);

  const navigate = useNavigate();

  const onChange = () => {
    setCheck(!check);
  };

  const [form] = Form.useForm();

  const Navigatee = () => {
    navigate("/register");
  };

  const URLS = "superAdmin/login";

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const details = jwt_decode(credentialResponse.credential);
    const email = details.email;
    const givenname = details.given_name;

    navigate("/password", {
      state: { email, givenname },
    });
  };

  const onFinish = (values) => {
    handleSignIn(values);
  };

  const onFinishFailed = () => {};
  useEffect(() => {
    if (user.login_status === "Success") {
      navigate(`/viewprofile`);
    }
  }, []);

  return (
    <LoginDesign>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow style={{ backgroundColor: "#f8fcff" }}>
          <Col
            span={24}
            md={12}
            style={{ backgroundColor: "#f8fcff", height: "100vh" }}
            className="left_side"
          >
            <div className="left_imge">
              <img src={BckImg1} />
            </div>
          </Col>
          <Col
            span={24}
            md={12}
            style={{
              backgroundColor: "#fff",
              margin: "auto",
              padding: "0 25px",
              height: "100vh",
            }}
          >
            <h1>Welcome to ERP</h1>
            {/* <Flex aligncenter={true}>
              <h3>Admin account</h3>
            </Flex>
            <Flex style={{}} className="btn_md">
              <ButtonStandard.Blue text={"Admin"} />
              <ButtonStandard.Pink text={"Employee"} />
              <ButtonStandard.Orange text={"Client"} />
              <ButtonStandard.Green text={"Manager"} />
            </Flex> */}
            <h1>Sign in</h1>
            <CustomRow space={[12, 12]} style={{ marginTop: "10px" }}>
              <Col span={24} md={14} lg={14}>
                <CustomInput
                  placeholder={"Email"}
                  name={"email"}
                  type={"email"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Email !",
                    },
                  ]}
                />
              </Col>
              <Col span={24} md={14} lg={14} style={{ marginTop: "10px" }}>
                <CustomInputPassword
                  placeholder={"Password"}
                  type={"password"}
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Password !",
                    },
                  ]}
                />
              </Col>
              <Col span={24} md={14} lg={14} style={{ margin: "30px 0" }}>
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "30px",
                      width: "60px",
                      marginTop: "3px",
                    }}
                  >
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 40,
                          }}
                          spin
                        />
                      }
                    />
                  </div>
                ) : (
                  <ButtonStandard.BlueLogin
                    text={"Login"}
                    htmlType={"submit"}
                  />
                )}
              </Col>
              <Col span={24} md={24} style={{ margin: "30px 0" }}></Col>
            </CustomRow>
          </Col>
        </CustomRow>
      </Form>
    </LoginDesign>
  );
};

export default SignInForm;
