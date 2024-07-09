import styled from "styled-components";
import holidayImg from "../../../Images/holiday.jpg"
import announcement from "../../../Images/announce.jpg"

export const StyledSaleCardRight = styled.div`
  /* margin-top: 10px; */
  /* height: 400px; */
  width: 100%;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  background-color: #fff;
  border-radius: 10px;
  overflow: auto;
  padding: 10px;
  height: 100%;

  table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th{
  color: #000;
}

td, th {
  /* border: 1px solid #dddddd; */
  text-align: left;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */

table thead {
    position: sticky;
    top: -1px;
    background-color: #f0f0f0;
  }

  table thead th {
    z-index: 1;
  }

  table th, table td {
    padding: 15px;
  }
`;

export const StyledCardManagerDash = styled.div`
 border-radius: 1rem !important;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  /* height: 100%; */
  position: relative;
  background-image: url(${holidayImg});
  background-size: cover;
  background-position: center;


  & h2 {
    color: #fff;
    font-size: 20px !important;
    padding-bottom: 5px;
  }

  & h1 {
    font-size: 16px !important;
    color: #fff !important;
  }

  & p {
    color: #fff !important;
  }
`

export const StyledCardAnnouncement = styled.div`
border-radius: 1rem !important;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  padding: 50px 20px;
  /* height: 100%; */
  position: relative;
  background-image: url(${announcement});
  background-size: cover;
  background-position: center;


  & h2 {
    color: #fff;
    font-size: 20px !important;
    padding-top: 5px;
  }

  & h1 {
    font-size: 16px !important;
    color: #fff !important;
  }

  & p {
    color: #fff !important;
  }
`

export const StyledCardDash = styled.div`
  border-radius: 1rem !important;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
  background: ${(props) =>props.backgroundcolor || "#fff"}; // Use the background color from props
  padding: 30px 20px;
  height: 100%;
  position: relative;


  & h2 {
    /* color: #545454; */
    color: #fff;
    font-size: 24px !important;
    padding-top: 10px;
  }

  & h1 {
    font-size: 18px !important;
    /* color: #52c41a !important; */
    color: #fff !important;
  }

  & svg {
    font-size: 25px;
    /* color: #ff3594; */
    color: #fff;
  }

  & p {
    font-size: 10px !important;
  }
  div {
    position: absolute;
    opacity: 0.5;
    right: 0;
    bottom: 0;
  }
`;

export const StyledTable = styled.div`
overflow: auto;
 table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th{
  color: #000;
}

td, th {
  /* border: 1px solid #dddddd; */
  text-align: left;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */

table thead {
    position: sticky;
    top: -1px;
    background-color: #f0f0f0;
    z-index: 1;
  }

  table thead th {
    z-index: 1;
  }

  table th, table td {
    padding: 15px;
  }
`