import React, { useEffect, useState } from 'react'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { CustomCardView } from '../../../../../components/CustomCardView'
import Flex from '../../../../../components/Flex'
import ButtonStandard from '../../../../../components/Form/CustomStandardButton'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import { CustomModal } from '../../../../../components/CustomModal'
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable'
import { CommonLoading } from '../../../../../components/CommonLoading'
import { AddExpenseType } from './AddExpenseType'
import { getExpenseType, getExpenseTypeError, getExpenseTypeStatus, selectAllExpenseType } from '../../AccountsSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { THEME } from '../../../../../theme'
import { FiEdit } from 'react-icons/fi'
import { TableIconHolder } from '../../../../../components/CommonStyled'

const ExpenseTypeTable = () => {

    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formReset, setFormReset] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [trigger, setTrigger] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpenseType());
      }, []);
    
      const AllExpenseType = useSelector(selectAllExpenseType);
      const AllExpenseTypeStatus = useSelector(getExpenseTypeStatus);
      const AllExpenseTypeError = useSelector(getExpenseTypeError);

      useEffect(() => {
        setDataSource(AllExpenseType);
      }, [AllExpenseType]);

    const showModal = () => {
        setIsModalOpen(true);
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

    const AddNewExpenseType = () => {
        setModalTitle("Add Expense Type");
        setModalContent(
          <AddExpenseType
            FormExternalCloses={FormExternalClose}
            formname={"AddExpenseType"}
          />
        );
        showModal();
      };

      const EditExpenseType = (record) => {
        setTrigger(trigger + 1);
        setModalTitle("Update Expense Type");
        setModalContent(
          <AddExpenseType
            formname={"UpdateForm"}
            FormExternalCloses={FormExternalClose}
            formReset={formReset}
            ExpenseTyperecord={record}
            updateTrigger={trigger}
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
          title: "Expense Type",
          dataIndex: "expenseType",
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
                      EditExpenseType(record);
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

    if (AllExpenseTypeStatus === "loading") {
      content = <CommonLoading />;
    } else if (AllExpenseTypeStatus === "succeeded") {
      const rowKey = (dataSource) => dataSource.expenseTypeId;
      content = (
        <CustomStandardTable
          columns={columns}
          data={dataSource}
          rowKey={rowKey}
        />
      );
    } else if (AllExpenseTypeStatus === "failed") {
      content = <h2>{AllExpenseTypeError}</h2>;
    }
  return (
    <div>
      <CustomPageTitle Heading={"View Expense Type"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Expense Type"}
            style={{ marginRight: "10px" }}
            onClick={AddNewExpenseType}
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
            width={500}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </div>
  )
}

export default ExpenseTypeTable