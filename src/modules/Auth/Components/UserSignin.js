import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "../../../components/Flex";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "../authSlice";
import request from "../../../utils/request";
import { toast } from "react-toastify";

export const Wrapper = styled(Flex)`
  height: 100vh;
  width: 100%;
  background: whitesmoke;
`;
const UserSignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data) => {
    setIsLoading(true);
    try {
      const authData = await request.post(`login`, {
        ...data,
      });
      console.log(authData, "authData");

      if (authData?.data !== "") {
        // initializeApp(authData?.data?.token) // pass the token to this function
        toast.success(`Login Successful, Welcome ${authData?.data?.roleName}`);
        dispatch(setCredentials(authData?.data));
        console.log(authData?.data,'incomingdata');
        navigate("/", { replace: true });
      } else {
        toast.error("UserName or Password is incorrect");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warn("UserName or Password is incorrect!");
        setIsLoading(false);
      } else {
        toast.error("Getting error while login, Please Login Again");
        setIsLoading(true);
      }
      console.error("Getting error while login", error);
    } finally {
      setIsLoading(false);
    }
  };
  const token = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token) {
      navigate("/signin");
    }
  }, [token]);
  return (
    <Wrapper column>
      <SignInForm handleSignIn={handleSignIn} isLoading={isLoading} />
    </Wrapper>
  );
};
export default UserSignin;
