import { Col } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { TbEye } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomModal } from '../../../../../components/CustomModal';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import Flex from '../../../../../components/Flex';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { getResignation, getResignationError, getResignationStatus, selectAllResignation } from '../ResignationSlice';

const EmployeeResignationTable = () => {
  const dispatch = useDispatch()

  const [dataSource, setDataSource] = useState([])
  const [searchTexts, setSearchTexts] = useState([]);   // search bar

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


  const AllResignations = useSelector(selectAllResignation)
  const ViewResignationsStatus = useSelector(getResignationStatus)
  const ViewResignationsError = useSelector(getResignationError)

  useEffect(() => {
    setDataSource(AllResignations)
  }, [AllResignations])

  useEffect(() => {
    dispatch(getResignation())
  }, [])

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const ViewReson = ({ viewdesrec }) => {
    return (
      <Flex flexstart={'true'} style={{padding:'20px 10px'}}>
        <h1>{viewdesrec}</h1>
      </Flex >
    )
  }
  const HandleClickReason = (record) => {
    setModalTitle("View Reason");
    setModalContent(
      <ViewReson
        formname={"View Description"}
        viewdesrec={record}
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
      title: 'Employee Name',
      dataIndex: 'user_name',
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.user_name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.user_name).includes(value.toUpperCase())
        );
      },
    },
    {
      title: 'Emp Id',
      dataIndex: 'user_id',

    },
    {
      title: "Resignation Id",
      dataIndex: "resignations_id",
    },
    {
      title: "Type",
      dataIndex: "Resignation",
    },
    {
      title: "Resignations Date",
      dataIndex: "resignations_date",
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <TbEye onClick={() => HandleClickReason(record)} />
          </Flex>
        );
      },

    }
  ]
  let content;



  if (ViewResignationsStatus === 'loading') {
    content = <CommonLoading />
  } else if (ViewResignationsStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} />
  } else if (ViewResignationsStatus === 'failed') {
    content = <h2>{ViewResignationsError}</h2>
  }

  return (
    <Fragment>
      <Flex>
        <CustomPageTitle Heading={"View Resignations"} />
      </Flex>

      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"Employee"} />
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        <Col span={24} md={14}>
        </Col>
      </CustomRow>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={400}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  )
}

export default EmployeeResignationTable