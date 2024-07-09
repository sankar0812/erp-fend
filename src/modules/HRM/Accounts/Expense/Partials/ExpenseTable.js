import React, { useEffect, useState } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";
import Flex from "../../../../../components/Flex";
import Label from "../../../../../components/Form/Label";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { FiEdit } from "react-icons/fi";
import { THEME } from "../../../../../theme";
import { AddExpense } from "./AddExpense";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import {
  getExpense,
  getExpenseError,
  getExpenseStatus,
  selectAllExpense,
} from "../../AccountsSlice";
import { useSelector } from "react-redux";

export const ExpenseTable = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTexts, setSearchTexts] = useState([]); //---------Seach Bar --------
  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  const AllExpense = useSelector(selectAllExpense);
  const AllExpenseStatus = useSelector(getExpenseStatus);
  const AllExpenseError = useSelector(getExpenseError);

  useEffect(() => {
    setDataSource(AllExpense);
  }, [AllExpense]);

  const EditExpense = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Expense Details");
    setModalContent(
      <AddExpense
        formname={"UpdateForm"}
        FormExternalClosess={FormExternalClose}
        formReset={formReset}
        Expenserecord={record}
        updateTrigger={trigger}
      />
    );
    showModal();
  };
  
  const AddNewExpense = () => {
    setModalTitle("Add Expense");
    setModalContent(
      <AddExpense
        FormExternalClosess={FormExternalClose}
        formname={"AddTask"}
        handleOk={handleOk}
        formReset={formReset}
      />
    );
    showModal();
  };


  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Expense Name",
      dataIndex: "expenseName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Expense Type",
      dataIndex: "expenseType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: (record, purchase) => {
        return (
          <>
            <Flex flexstart={"true"} gap={"15px"}>
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  EditExpense(record);
                }}
              >
                <FiEdit />
              </TableIconHolder>
              <Flex end={"true"}></Flex>
            </Flex>
          </>
        );
      },
    },
  ];
  
  let content;

  if (AllExpenseStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllExpenseStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.expenseId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllExpenseStatus === "failed") {
    content = <h2>{AllExpenseError}</h2>;
  }

  return (
    <div>
      <CustomPageTitle Heading={"View Expense"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Expense"}
            style={{ marginRight: "10px" }}
            onClick={AddNewExpense}
          />
        </Flex>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            {/* <CustomTable columns={columns} data={data} /> */}
            {content}
          </Col>
          <CustomModal
            isVisible={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={1000}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </div>
  );
};
