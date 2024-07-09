import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartment, getDepartmentError, getDepartmentStatus, getShift, getShiftError, getShiftStatus, selectAllDepartment, selectAllShift } from '../../EmployeeSlice'
import { CommonLoading } from '../../../../../components/CommonLoading'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle'
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import Flex from '../../../../../components/Flex'
import Button from '../../../../../components/Form/CustomButton'
import { CustomModal } from '../../../../../components/CustomModal'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { AddDepartmentModal, AddShiftModal } from '../../ViewEmployee/Partials/AddEmployeeModals'
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable'

export const ViewShift = () => {

  const [dataSource, setDataSource] = useState([])
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0)
  const dispatch = useDispatch()

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
    FormRest()
  };

  useEffect(() => {
    dispatch(getShift())
  }, [])

  const AllShiftDetails = useSelector(selectAllShift)
  const AllShiftStatus = useSelector(getShiftStatus)
  const AllShiftError = useSelector(getShiftError)

  useEffect(() => {
    setDataSource(AllShiftDetails)
  }, [AllShiftDetails])

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const UpdateShifts = (record) => {
    setTrigger(trigger + 1)
    setModalTitle('Update Shifts');
    setModalContent(<AddShiftModal FormExternalClosee={FormExternalClose} formname={'editshifts'} formReset={formReset} shiftrecord={record} updatetrigger={trigger} />);
    showModal()
  }

  const AddShiftDetails = () => {
    setModalTitle("Add Shifts");
    setModalContent(
      <AddShiftModal
        formname={"AddShifts"}
        FormExternalCloseee={FormExternalClose}
      />
    );
    showModal();
  };

  const TableColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: "Shift Type",
      dataIndex: "shiftType",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.shiftType)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.shiftType).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "In Time",
      dataIndex: "inTime",
    },
    {
      title: "Out Time",
      dataIndex: "outTime",
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center={"true"} gap={'10px'}>
            <FiEdit onClick={() => UpdateShifts(record)} />
          </Flex>
        );
      },
    },
  ]
  let content;

  if (AllShiftStatus === 'loading') {
    content = <CommonLoading />
  } else if (AllShiftStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.shiftId;
    content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (AllShiftStatus === 'failed') {
    content = <h2>
      {AllShiftError}
    </h2>
  }

  return (
    <div>
      <CustomPageTitle Heading={"Shifts"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        {/* <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Shifts"} />
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={AddShiftDetails}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col> */}

        <Flex spacearound={"true"} gap={"20px"}>
          <div style={{marginTop:'5px'}}>
            <CustomPageFormTitle Heading={"Shifts"} />
          </div>
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
          <Button.Primary
            style={{ borderRadius: "6px" }}
            icon={<FiPlus style={{ fontSize: "20px" }} />}
            text={"Add"}
            onClick={AddShiftDetails}
          />
        </Flex>

      </CustomRow>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  )
}
