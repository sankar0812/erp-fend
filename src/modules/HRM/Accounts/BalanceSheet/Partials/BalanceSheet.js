import React, { useEffect } from "react";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import Flex from "../../../../../components/Flex";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { StyledTable } from "../style";
import { useDispatch } from "react-redux";
import { getBalanceSheet, selectAllBalanceSheet } from "../../AccountsSlice";
import { useSelector } from "react-redux";

export const BalanceSheet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalanceSheet());
  }, []);

  const AllBalancesheet = useSelector(selectAllBalanceSheet);

  console.log(AllBalancesheet, "AllBalancesheet");

  const data = [
    {
      credit: 100,
      debit: 200,
    },
    {
      credit: 100,
      debit: 200,
    },
    {
      credit: 100,
      debit: 200,
    },
    {
      credit: 100,
      debit: 200,
    },
    {
      credit: 100,
      debit: 200,
    },
  ];

  const totalCredit = AllBalancesheet?.reduce((acc, curr) => acc + curr.credit, 0);
  const totalDebit = AllBalancesheet?.reduce((acc, curr) => acc + curr.debit, 0);

  return (
    <div>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"Balance Sheet"} />
      </Flex>
      <StyledTable>
        <table>
          {/* <tr>
            <th
              style={{
                background: "#1F497D",
                color: "#fff",
                padding: "25px",
                fontSize: "20px",
              }}
              colSpan={6}
            >
              For Years Ended March 31, 2017 and 2016
            </th>
          </tr> */}
          <tr
            style={{
              background: "#1F497D",
              color: "#fff",
              padding: "25px",
              fontSize: "20px",
            }}
          >
            <th style={{ padding: "15px", fontSize: "16px" }} rowSpan={2}>
              Description
            </th>
            <th style={{ padding: "15px", fontSize: "16px" }} colSpan={2}>
              2017
            </th>
          </tr>
          <tr
            style={{
              background: "#1F497D",
              color: "#fff",
              padding: "25px",
              fontSize: "20px",
            }}
          >
            <td style={{ textAlign: "center" }}>Credit</td>
            <td style={{ textAlign: "center" }}>Debit</td>
          </tr>

          {AllBalancesheet?.map((item) => (
            <tr
              style={{
                background: "#C6D9F0",
                color: "#000",
              }}
              key={item.id}
            >
              <td style={{ fontSize: "16px" }}>{item?.category}</td>
              <td style={{ fontSize: "16px" }}>{item?.credit}</td>
              <td style={{ fontSize: "16px" }}>{item?.debit}</td>
            </tr>
          ))}

          <tr
          style={{
            background: "#C6D9F0",
            color: "#000",
          }}>
            <td style={{ fontSize: "16px" }}>Total</td>
            <td style={{ fontSize: "16px" }}>
              {totalCredit}
            </td>
            <td style={{ fontSize: "16px" }}>
              {totalDebit}
            </td>
          </tr>
        </table>
      </StyledTable>
    </div>
  );
};
