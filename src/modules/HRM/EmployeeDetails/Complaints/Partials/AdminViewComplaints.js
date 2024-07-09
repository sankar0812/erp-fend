import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col, Tooltip } from 'antd';
import { CustomModal } from '../../../../../components/CustomModal';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { getComplaints, getComplaintsError, getComplaintsStatus, selectAllComplaints } from '../../../Complaints/ComplaintsSlice';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { base } from '../../../../../utils/request';
import { CustomTag } from '../../../../../components/Form/CustomTag';
import { AiOutlineFolderView } from 'react-icons/ai';
import { TableIconHolder } from '../../../../../components/CommonStyled';
import Flex from '../../../../../components/Flex';
import ViewAttachment from './ViewAttachment';
import { THEME } from '../../../../../theme';
import { SvgIcons } from '../../../../../Images';
import { AdminComplaintsView } from './AdminComplaintsView';

export const AdminViewComplaints = () => {
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
    dispatch(getComplaints())
  }, [])

  const AllComplaintsDetails = useSelector(selectAllComplaints)
  const AllComplaintsStatus = useSelector(getComplaintsStatus)
  const AllComplaintsError = useSelector(getComplaintsError)

  const ViewAttachmentModal = (record) => {
    setTrigger(trigger+1)
    setModalTitle('View Attachment');
    setModalContent(<ViewAttachment record={record} />);
    showModal()
  }

  const ViewComplaint = (record) => {
    setTrigger(trigger+1)
    setModalTitle('View Complaints');
    setModalContent(<AdminComplaintsView viewComplaints={record}/>);
    showModal()
  }

  useEffect(() => {
    setDataSource(AllComplaintsDetails)
  }, [AllComplaintsDetails])

  const TableColumn = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return <img
          src={`${base}${profile}`}
          alt="Staff"
          width="50"
          height="50"
          style={{ borderRadius: "50%", objectFit:"cover" }}
        />
      }

    },
    {
      title: 'User Id',
      dataIndex: 'userId'
    },
    {
      title: "Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      render: (record) => {
        return (
          <Fragment>
            <div style={{ textAlign: "center" }}>
              <CustomTag bordered={"true"} color={"success"} title={record} />
            </div>
          </Fragment>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'complaintsTitle'
    },
    {
      title: 'Date',
      dataIndex: 'complaintsDate'
    },
    {
      title: 'Against Name',
      dataIndex: 'complaintsAgainstName'
    },
    {
      title: 'Attachments',
      render: (record) => {
        return (
          <Fragment>
            <Flex center={'true'}>
              <Tooltip title={'View Attachment'}>
                <AiOutlineFolderView color='red' style={{ fontSize: '22px' }} onClick={()=>{ViewAttachmentModal(record)}} />
              </Tooltip>
            </Flex>
          </Fragment>
        )
      }
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
           <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                ViewComplaint(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>
          </Flex>
        );
      },
    },

  ]

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  // const AddEmployeeDesinationDetails = () => {
  //   setModalTitle("Add Staff Designation");
  //   setModalContent(
  //     <AddDesignationModal
  //       formname={"AddDesignationForm"}
  //       FormExternalCloses={FormExternalClose}
  //     />
  //   );
  //   showModal();
  // };

  let content;

  if (AllComplaintsStatus === 'loading') {
    content = <CommonLoading />
  } else if (AllComplaintsStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.complaintsId;
    content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
  } else if (AllComplaintsStatus === 'failed') {
    content = <h2>
      {AllComplaintsError}
    </h2>
  }

  return (
    <div>
      <CustomPageTitle Heading={"Employee Complaints"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomInputSearch
            placeholder={"search ..."}
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
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  )
}
