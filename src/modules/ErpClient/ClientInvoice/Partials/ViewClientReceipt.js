import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../components/CustomRow';
import { Col, Tag } from 'antd';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { CustomModal } from '../../../../components/CustomModal';
import Flex from '../../../../components/Flex';
import { FiEye } from 'react-icons/fi';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { THEME } from '../../../../theme';
import { AiOutlineFileExcel } from 'react-icons/ai';
import { BsClipboardCheck } from 'react-icons/bs';
import { ClientInvoice } from './ClientInvoice';
import { getClientError, getClientInvoice, getClientStatus, viewErpClientInvoice } from '../../ErpClientSlice';
import { getBusinessProfile, selectAllBusinessProfile } from '../../../BusinessProfile/BusinessSlice';
import { CommonLoading } from '../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import { useParams } from 'react-router-dom';
import request from '../../../../utils/request';
import { APIURLS } from '../../../../utils/ApiUrls/Client';
import { selectCurrentId } from '../../../Auth/authSlice';
import ClientReceiptPrint from './ClientReceiptPrint';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { IoReceiptOutline } from 'react-icons/io5';

export const ViewClientReceipt = () => {

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

  // const allClientInvoice = useSelector(viewErpClientInvoice)
  // const allClientInvoiceStatus = useSelector(getClientStatus)
  // const allClientInvoiceError = useSelector(getClientError)

  // const businessProfile = useSelector(selectAllBusinessProfile)

  // useEffect(() => {
  //   getInfos()
  // }, [])

  // console.log(allClientInvoice,'allClientInvoice');
  //   useEffect(() => {
  //     setDataSource(allClientInvoice)
  //   }, [allClientInvoice])

  // const getInfos = () => {
  //   dispatch(getClientInvoice())
  //   dispatch(getBusinessProfile())
  // }

  const ClientID = useSelector(selectCurrentId);

  useEffect(() => {
    GetReceiptClient()
  }, [])

  const GetReceiptClient = () => {
    request.get(`${APIURLS.GET_INDIVIDUAL_CLIENT_RECEIPT}/${ClientID}`)
      .then(function (response) {
        setDataSource(response.data?.clientDetails)
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
      dataIndex: "paymentDate",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Bill Amount",
      dataIndex: "amount",
    },
    {
      title: "Received Amount",
      dataIndex: "receivedAmount",
    },
    {
      title: "Balance Amount",
      dataIndex: "balance",
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <Flex center={"true"} gap={'20px'}>
            <TableIconHolder color={THEME.yellow} size={'22px'} onClick={() => onReceiptsPrint(record)}>
              <IoReceiptOutline />
            </TableIconHolder>
          </Flex>
        );
      },
    },
  ]

  const onReceiptsPrint = (record) => {
    setModalContent(<ClientReceiptPrint receiptrecord={record} />)
    showModal();
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
      <CustomPageTitle Heading={"Receipt Details"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <CustomPageFormTitle Heading={"Receipt"} />
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
        width={900}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  )
}
