import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignation, getDesignationError, getDesignationStatus, selectAllDesignation } from '../../EmployeeSlice'
import { CommonLoading } from '../../../../../components/CommonLoading'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch'
import Button from '../../../../../components/Form/CustomButton'
import Flex from '../../../../../components/Flex'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { CustomModal } from '../../../../../components/CustomModal'
import { AddDesignationModal } from '../../ViewEmployee/Partials/AddEmployeeModals'
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable'

const ViewDesignations = () => {

  const [dataSource, setDataSource] = useState([])
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger,setTrigger] = useState(0)
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
    dispatch(getDesignation())
  }, [])

  const AllDesignationDetails = useSelector(selectAllDesignation)
  const AllDesignationStatus = useSelector(getDesignationStatus)
  const AllDesignationError = useSelector(getDesignationError)

  const UpdateDesignation = (record) => {
    setTrigger(trigger+1)
    setModalTitle('Designation');
    setModalContent(<AddDesignationModal FormExternalClosee={FormExternalClose} formname={'editdesignation'} formReset={formReset} designationrecord={record} updatetrigger={trigger} />);
    showModal()
  }

  useEffect(() => {
    setDataSource(AllDesignationDetails)
  }, [AllDesignationDetails])

  const TableColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: "Designation Name",
      dataIndex: "designationName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.designationName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.designationName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center={"true"} gap={'10px'}>
            <FiEdit onClick={() => UpdateDesignation(record)} />
          </Flex>
        );
      },
    },
  ]

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const AddEmployeeDesinationDetails = () => {
    setModalTitle("Add Staff Designation");
    setModalContent(
      <AddDesignationModal
        formname={"AddDesignationForm"}
        FormExternalCloses={FormExternalClose}
      />
    );
    showModal();
  };

  let content;

  if (AllDesignationStatus === 'loading') {
    content = <CommonLoading />
  } else if (AllDesignationStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.designationId;
    content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (AllDesignationStatus === 'failed') {
    content = <h2>
      {AllDesignationError}
    </h2>
  }

  return (
    <div>
      <CustomPageTitle Heading={"Staff Designation"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Designation"} />
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
                  onClick={AddEmployeeDesinationDetails}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
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

export default ViewDesignations