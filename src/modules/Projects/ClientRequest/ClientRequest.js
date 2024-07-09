import React, { useEffect, useState } from 'react'
import { CustomPageTitle } from '../../../components/CustomPageTitle'
import CustomInputSearch from '../../../components/Form/CustomInputSearch'
import { CustomRow } from '../../../components/CustomRow';
import { Col, Popconfirm, Tag, Tooltip } from 'antd';
import { CustomModal } from '../../../components/CustomModal';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import Flex from '../../../components/Flex';
import { TableIconHolder } from '../../../components/CommonStyled';
import { THEME } from '../../../theme';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { ClientRequestForm } from './ClientRequestForm';
import AddClientForm from '../../ErpClient/ClientRequireForm/Partials/AddClientForm';
import { AssiginingTask } from '../ProjectAssigningTask/AssiginingTask';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Form/CustomButton';
import { allClientRequest, getClientRequest } from '../../Client/ClientSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { FaEye, FaRegCalendarCheck } from "react-icons/fa";
import { CustomPopconfirm } from '../../../components/CustomPopConfirm';
import { BsThreeDots } from 'react-icons/bs';
import ViewClientRequestModal from './ViewClientRequestModal';

export const ViewClientRequest = () => {
  const [searchTexts, setSearchTexts] = useState('');
  const dispatch = useDispatch()
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [formReset, setFormReset] = useState(0);
  useEffect(() => {
    dispatch(getClientRequest())
  }, [])

  const AllClientRequest = useSelector(allClientRequest)

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
    dispatch(getClientRequest())
  };

  const handleSearchs = (value) => {
    setSearchTexts(value)
  };

  const EditClientRequest = (record) => {
    setModalTitle("Client Request");
    setFormReset(formReset + 1)
    setModalContent(
      <AddClientForm ProjectRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalClose={FormExternalClose} formReset={formReset}/>
      // <AssiginingTask clientRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalCloseee={FormExternalClose}/>
    );
    showModal();
  };

  const handleAdd = () => {
    setModalTitle("Add Client Request");
    setFormReset(formReset + 1)
    setModalContent(
      <ClientRequestForm formname={"EditEmployeeLeaveForm"} FormExternalClose={FormExternalClose} formReset={formReset}/>
    );
    showModal();
  }

  const ViewProDetails = (record) => {
    setModalTitle("View Client Request");
    setModalContent(
      <ViewClientRequestModal formname={"ViewClientRequestForm"} FormExternalClose={FormExternalClose} ClientReqRecord={record} />
    );
    showModal();
  }

  const handleConfirm = (value) => {
    const newValues = {
      projectStatus: 'approved',

    }
    request.put(`clientRequirement/details/edit/${value.projectId}`, newValues)
      .then(resp => {
        toast.success("Project Approved")
        dispatch(getClientRequest())
      })
      .catch(error => console.log(error, 'error'))
  }
  const handleReject = (value) => {
    const newValues = {
      projectStatus: 'rejected'
    }
    request.put(`clientRequirement/details/edit/${value.projectId}`, newValues)
      .then(resp => {
        toast.success("Project Rejected")
        dispatch(getClientRequest())
      })
      .catch(error => console.log(error, 'error'))
  }
  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Type",
      dataIndex: "projectType",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "View Details",
      render: (record) => {
        return (
          <Flex center={"true"}>
            <TableIconHolder color='blue'>
              <FaEye onClick={() => ViewProDetails(record)} />
            </TableIconHolder>
          </Flex>
        )
      }
    },
    {
      title: "Status",
      render: (record, index) => {
        return (
          <>
            {
              record?.projectStatus === 'pending' && <Tag color="yellow">Not Confirmed</Tag>
            }
            {
              record?.projectStatus === 'approved' && <Tag color="green">Approved</Tag>
            }
            {
              record?.projectStatus === 'rejected' && <Tag color="red">Rejected</Tag>
            }
          </>
        )
      }
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            {
              record.projectStatus === "pending" && record.projectType === null ?
                (
                  <>
                    <TableIconHolder color={THEME.blue} size={"22px"}>
                      <FiEdit onClick={() => EditClientRequest(record)} />
                    </TableIconHolder>
                  </>
                )
                : record.projectStatus === "pending" && record.projectType !== null ? (
                  <CustomPopconfirm
                    title="Reject/Approve the Project!"
                    confirm={() => handleConfirm(record)}
                    cancel={() => handleReject(record)}
                    okText="Approve"
                    cancelText="Reject"
                  >
                    <TableIconHolder color={THEME.green} size={"22px"}>
                      <FaRegCalendarCheck />
                    </TableIconHolder>
                  </CustomPopconfirm>
                ) :
                  (
                    record.projectStatus === "approved" || record.projectStatus === "rejected" ?
                      <BsThreeDots />
                      : null
                  )
            }
          </Flex>
        );
      }
    }
  ];

  const rowKey = (AllClientRequest) => AllClientRequest.clientId;

  return (
    <div>
      <CustomPageTitle Heading={"Client Request"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col span={24} md={10}>
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        <Col span={24} md={14} >
          <Flex flexend={'true'}>
            <Button.Primary
              style={{ borderRadius: "6px" }}
              icon={<FiPlus style={{ fontSize: "20px" }} />}
              text={"Add"}
              onClick={handleAdd}
            />
          </Flex>
        </Col>
      </CustomRow>
      <CustomStandardTable columns={TableColumn} data={AllClientRequest} rowKey={rowKey}/>
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
