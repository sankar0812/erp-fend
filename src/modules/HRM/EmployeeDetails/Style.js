import styled from "styled-components";

export const EmpView = styled.div`
  .icon {
    font-size: 14px;
    background: #eee;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 7px;
    cursor: pointer;
  }

  .icon-places{
    position: absolute;
    right: 0;
    display: flex;
    gap: 10px;
  }
  
  .Add-icon {
    font-size: 14px;
    color: #fff;
    background: #0077b6;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    padding: 7px;
  }

  .cardheading {
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }
  .para {
    padding-left: 20px;
    color: #000;
    font-size: 100%;
    line-height: 20px;
  }
`;

export const EmpDetails = styled.div`
  display: flex;
  @media screen and (max-width: 766px) {
    justify-content: center;
    gap: 20px;
  }
  .paraBlue {
    color: #0d6efd;
    font-size: 100%;
    line-height: 25px;
  }
`;

export const Details = styled.div`
  border-left: 2px dashed #ccc;
  /* padding-left: 20px; */
  display: flex;
  gap: 80px;
  .paraBlue {
    padding-left: 20px;
    color: #0d6efd;
    font-size: 100%;
    line-height: 25px;
  }

  @media screen and (max-width: 766px) {
    border-left:none
  }
`;
export const Detail = styled.div`
  /* padding-left: 20px; */
  display: flex;
  gap: 80px;
  .paraBlue {
    padding-left: 20px;
    color: #0d6efd;
    font-size: 100%;
    line-height: 25px;
  }

  @media screen and (max-width: 766px) {
    border-left:none
  }
`;
export const StyledDetails = styled.div`

.paraBlue {
    color: #0d6efd;
    font-size: 100%;
    line-height: 25px;
    padding-left: 20px;
  }

  & img{
  padding-left: 10px;


}
 


`