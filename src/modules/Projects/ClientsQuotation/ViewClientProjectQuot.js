import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../components/Flex';
import { TableIconHolder } from '../../../components/CommonStyled';
import { THEME } from '../../../theme';
import { FiEdit, FiEye } from 'react-icons/fi';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomRow } from '../../../components/CustomRow';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../components/CustomModal';
import { Col, Tooltip } from 'antd';
import { ClientProjectQuot } from './ClientProjectQuot';
import { AddQuotation } from '../../HRM/Accounts/Quotation/AddQuotaions/Partials/AddQuotation';
import { useDispatch } from 'react-redux';
import { allClientQuotation, clientQuotationError, clientQuotationStatus, getClientQuotation } from '../../Client/ClientSlice';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../components/CommonLoading';
import { CustomTag } from '../../../components/Form/CustomTag';
import { CustomPopconfirm } from '../../../components/CustomPopConfirm';
import { AiOutlineSelect } from 'react-icons/ai';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { APIURLS } from '../../../utils/ApiUrls/Client';
import { selectCurrentRole } from '../../Auth/authSlice';
import { USER_ROLES } from '../../../utils/UserRoles/UserRole';
import { AddClientQuotation } from '../../ErpClient/ClientQuotation/Partials/AddClientQuotation';
import { getBusinessProfile, selectAllBusinessProfile } from '../../BusinessProfile/BusinessSlice';
import { BsFileEarmarkPdfFill } from 'react-icons/bs';
import ViewReseachedPDF from '../ResearchDocumentation/ViewReseachedPDF';
import ClientResearchPDF from './ClientResearchedPDF';

export const ViewClientProjectQuot = () => {
  const [searchTexts, setSearchTexts] = useState('');
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClientQuotation())
  }, [])

  useEffect(() => {
    dispatch(getBusinessProfile())
  }, [])

  const AllClientQuotation = useSelector(allClientQuotation)
  const AllClientQuotationStatus = useSelector(clientQuotationStatus)
  const AllClientError = useSelector(clientQuotationError)
  const businessProfile = useSelector(selectAllBusinessProfile)

  const CurrentRole = useSelector(selectCurrentRole)
  useEffect(() => {
    setDataSource(AllClientQuotation)
  }, [AllClientQuotation])

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
    FormRest();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value)
  };

  const EditClientRequest = (record) => {
    setModalTitle("Client's Quotation");
    setTrigger(trigger + 1)
    setModalContent(
      // <ClientProjectQuot clientRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalCloseee={FormExternalClose} />
      <AddQuotation quotrecord={record} quottrigger={trigger} FormExternalClose={FormExternalClose} />
    );

    showModal();
  };

  const viewQuotation = (values) => {
    setModalTitle('View Quotation');
    setModalContent(<AddClientQuotation businessProfile={businessProfile} handleOk={handleOk} FormExternalClose={FormExternalClose} formname={'editQuotation'} formReset={formReset} quotationrecord={values} />);
    showModal()
  }


  const ViewReseachedPDFModal = (record) => {
    setTrigger(trigger + 1)
    setModalTitle('View Research PDF');
    setModalContent(<ClientResearchPDF allclientViewRecord={record} FormExternalClose={FormExternalClose} researchtrigger={trigger} />);
    showModal()
  }

  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.clientName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.clientName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Project Name",
      render: (value, record) => {
        return (
          <>
            {record?.quotationList[0]?.projectName}
          </>
        );
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
    },
    {
      title: "Project Status",
      render: (value, record) => {
        return (
          <Fragment>
            <Flex center={"true"}>
              {
                record?.quotationStatus === 'pending' ? (<>
                  <CustomTag color={'blue'} bordered={'true'} title={'PENDING'} />
                </>) :
                  record?.quotationStatus === 'approved' ? (<>
                    <CustomTag color={'green'} bordered={'true'} title={'APPROVED'} /></>) :

                    record?.quotationStatus === 'rejected' ? (<>
                      <CustomTag color={'red'} bordered={'true'} title={'REJECTED'} /></>) : null
              }
            </Flex>
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <Tooltip title={'View Quotation'}>
              <TableIconHolder color={THEME.blue} size={"22px"}>
                <FiEye onClick={() => viewQuotation(record)} color='blue' />
              </TableIconHolder>
            </Tooltip>
            {
              record?.quotationStatus === 'pending' && record?.quotationList[0]?.amount === 0 && CurrentRole !== USER_ROLES.ACCOUNTANT ? (
                <>
                  <Tooltip title={'Edit'}>
                    <TableIconHolder color={THEME.blue} size={"22px"}>
                      <FiEdit onClick={() => EditClientRequest(record)} />
                    </TableIconHolder>
                  </Tooltip>
                </>
              ) : (record?.quotationStatus === 'pending' && record?.quotationList[0]?.amount !== 0 && CurrentRole !== USER_ROLES.ACCOUNTANT ? (
                <>
                  <Tooltip title={'Edit'}>
                    <TableIconHolder color={THEME.blue} size={"22px"}>
                      <FiEdit onClick={() => EditClientRequest(record)} />
                    </TableIconHolder>
                  </Tooltip>
                  <Tooltip title={'Approve / Reject'}>
                    <TableIconHolder color={THEME.green} size={"22px"}>
                      <CustomPopconfirm
                        title="Reject/Approve the Project!"
                        confirm={() => handleConfirm(record)}
                        cancel={() => handleReject(record)}
                        okText="Approve"
                        cancelText="Reject"
                      >
                        <AiOutlineSelect />
                      </CustomPopconfirm>
                    </TableIconHolder>
                  </Tooltip>
                </>
              ) : null)
            }


            <Tooltip title={'View PDF'}>
              <TableIconHolder color={THEME.red} size={"22px"} >
                <BsFileEarmarkPdfFill color='red' onClick={() => ViewReseachedPDFModal(record)} />
              </TableIconHolder>
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const handleConfirm = (value) => {
    const newValues = {
      quotationStatus: 'approved'
    }
    request.put(`${APIURLS.PUT_CLIENT_QUOTATION_STATUS_CHANGE}${value.quotationId}`, newValues)
      .then(resp => {
        toast.success("Project Approved Successfully ! ")
        dispatch(getClientQuotation())
      })
      .catch(error => console.log(error, 'error'))
  }

  const handleReject = (value) => {
    const newValues = {
      quotationStatus: 'rejected'
    }
    request.put(`${APIURLS.PUT_CLIENT_QUOTATION_STATUS_CHANGE}${value.quotationId}`, newValues)
      .then(resp => {
        toast.success("Project Rejected Successfully !")
        dispatch(getClientQuotation())
      })
      .catch(error => console.log(error, 'error'))
  }

  let content;

  if (AllClientQuotationStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllClientQuotationStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.quotationId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllClientQuotationStatus === "failed") {
    content = <h2>{AllClientError}</h2>;
  }

  return (
    <div>
      <CustomPageTitle Heading={"Client's Quotation"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col span={24} md={10}>
          <CustomInputSearch
            placeholder={"search ..."}
            // onsearch={()=>console.log('sike')}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>

      </CustomRow>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={1000}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  )
}
