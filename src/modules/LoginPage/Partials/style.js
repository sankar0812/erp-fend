import styled from "styled-components";
import { THEME } from "../../../theme";
import log from "../../../Images/login_image.jpg";

export const StyledLoginMenu = styled.div`
  max-width: 600px;
  margin-top: 100px !important;
  margin: auto;

  & img {
    width: 100%;
    border-radius: 10px 0px 0px 10px;

    @media screen and (max-width: 768px) {
      display: none !important;
    }
  }

  .dDHQxW {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 5px 5px;
    margin: auto;
    max-width: 100%;
    padding: 0px !important;
    border-radius: 10px;
  }

  .cOGUEI {
    margin: auto;
    padding: 0px !important;
  }
`;

export const StyledRegisterMenu = styled.div`
  max-width: 600px;
  margin-top: 100px !important;
  margin: auto;

  & img {
    width: 100%;
    border-radius: 10px 0px 0px 10px;

    @media screen and (max-width: 768px) {
      display: none !important;
    }
  }

  .cOGUEI {
    margin: auto;
    padding: 0px !important;
  }

  .dDHQxW {
    background: #e3f1ff;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 5px 5px;
    margin: auto;
    max-width: 100%;
    padding: 0px !important;
    border-radius: 10px;
  }
`;

export const StyledLogin = styled.div`
  padding: 20px;
  .ant-btn {
    height: 32px !important;
  }
`;
export const StyledConnect = styled.div`
  border-radius: 30px !important;
`;
export const StyledLoginLeft = styled.div`
  /* background: ${THEME.primary_2}; */
  /* background-image: url(${log}); */
  background-image: url(${log});
  background-size: cover;
  margin: auto;
  display: flex;
 height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px !important;
  color: #fff;
  font-size: 20px;

  & p {
    /* margin: auto; */
    /* justify-content: center;
    display: flex;
    font-family:"Space Mono", sans-serif !important;
    background-color: ${THEME.primary_2}; ;
    align-items: center;
    text-align: center;
    height: 400px;
    font-size: 20px; */
  }
`;
