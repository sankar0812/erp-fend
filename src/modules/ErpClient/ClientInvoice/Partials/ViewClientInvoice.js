import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../components/CustomRow';
import { Col, Tooltip } from 'antd';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { FiEye } from 'react-icons/fi';
import { ClientInvoice } from './ClientInvoice';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import { useParams } from 'react-router-dom';
import request from '../../../../utils/request';
import { APIURLS } from '../../../../utils/ApiUrls/Client';
import { selectCurrentId } from '../../../Auth/authSlice';
import { IoIosPrint } from "react-icons/io";
import { TableIconHolder } from '../../../../components/Form/Styled';
import { PrintClientInvoice } from './PrintClientInvoice';

export const ViewClientInvoice = () => {

  const [dataSource, setDataSource] = useState([])
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch()

  const { id } = useParams()

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const ClientID = useSelector(selectCurrentId);

  useEffect(() => {
    GetInvoiceClient()
  }, [])

  const GetInvoiceClient = () => {
    request.get(`${APIURLS.GET_CLIENT_INDIVIDUAL_INCOICE}/${ClientID}`)
      .then(function (response) {
        setDataSource(response.data?.invoiceDetails)
      })
      .catch(function (error) { });
  }

  // ===== Modal Functions Start =====
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    FormRest()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest()
  };

  // ===== Modal Functions ends =====

  const TableColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceId",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.invoiceId)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.invoiceId).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Received",
      dataIndex: "received",
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center={"true"} gap={'20px'}>
            <Tooltip title={'View Invoice'}>
              <TableIconHolder >
              <FiEye onClick={() => viewInvoice(record)} color='blue' />
              </TableIconHolder>
            </Tooltip>
            <Tooltip title={'Print Invoice'}>
            <TableIconHolder>
              <IoIosPrint onClick={() => PrintInvoicePage(record)} color='red' />
              </TableIconHolder>
            </Tooltip>
          </Flex>
        );
      },
    },
  ]

  const viewInvoice = (record) => {
    setModalTitle('View Invoice');
    setModalContent(<ClientInvoice invoicerecord={record} />);
    showModal()
  }

  const PrintInvoicePage = (record) => {
    setModalTitle('Print Invoice');
    setModalContent(<PrintClientInvoice record={record} />);
    showModal()
  }

  const handleInvoiceConfirm = (record) => {

  }
  const handleInvoiceCancel = (record) => {

  }


  // ===== Other Functions=====
  const FormRest = () => {
    setFormReset(formReset + 1);
  };
  const FormExternalClose = () => {
    handleOk();
  };
  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  // let content;

  // if (allClientInvoiceStatus === 'loading') {
  //   content = <CommonLoading />
  // } else if (allClientInvoiceStatus === 'succeeded') {
  //   const rowKey = (dataSource) => dataSource.invoiceId;
  //   content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  // } else if (allClientInvoiceStatus === 'failed') {
  //   content = <h2>
  //     {allClientInvoiceError}
  //   </h2>
  // }

  const rowKey = (dataSource) => dataSource.invoiceId;

  return (
    <div>
      <CustomPageTitle Heading={"Invoice Details"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <CustomPageFormTitle Heading={"Invoice"} />
          <CustomInputSearch
            placeholder={"search by Invoice Number ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
      </CustomRow>
      {/* {content} */}
      <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
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
