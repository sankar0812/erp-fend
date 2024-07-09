import { Col, Tooltip } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi';
import { ImCancelCircle } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommonLoading } from '../../../../components/CommonLoading';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { CustomModal } from '../../../../components/CustomModal';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { CustomRow } from '../../../../components/CustomRow';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import { THEME } from '../../../../theme';
import { APIURLS } from '../../../../utils/ApiUrls/Client';
import request from '../../../../utils/request';
import { getClientForm, getlientFormError, getlientFormStatus, viewClientForm } from '../../ErpClientSlice';
import { CheckOutlined } from '@ant-design/icons';
import { CustomTag } from '../../../../components/Form/CustomTag';
import EditClientForm from './EditClientForm';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../../Auth/authSlice';
import { BsThreeDots } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import ViewClientFormModal from './ViewClientFormModal';

const ViewClientForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [dataSource, setDataSource] = useState([])

    const [searchTexts, setSearchTexts] = useState([]);  // Search bar
    const [trigger, setTrigger] = useState(0)
    const [projectStatus, setProjectStatus] = useState('');  // aproval/reject use

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [widthValue, setWidthValue] = useState("")


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);

    };

console.log(dataSource ,'CLI');
    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const EnteringId = useSelector(selectCurrentId)

    useEffect(() => {
        GetClientRequirement()
    }, [])

    const GetClientRequirement = () => {
        request.get(`${APIURLS.GET_CLIENT_ADDED_REQUIREMENTS}${EnteringId}`)
            .then(function (response) {
                setDataSource(response?.data)
            })
            .catch(function (error) {
            })
    }

    const handlenavigate = () => {
        navigate(`/addrequirement`)
    }

    const handlerequire = () => {
        dispatch(getClientForm())
        handleOk()
    }

    const EditForm = (record) => {
        setTrigger(trigger + 1)
        setWidthValue(600)
        setModalTitle("Update Requirements");
        setModalContent(
            <EditClientForm
                record={record}
                ViewEditTrigger={trigger}
                handlerequire={handlerequire}
            />
        );
        showModal();
    };

    const ViewProDetails = (record) => {
        setWidthValue(800)
        setModalTitle("View Requirement Details");
        setModalContent(
            <ViewClientFormModal
                ClientReqRecord={record}
            />
        );
        showModal();
    };

    const Putrejection = (record) => {
        setTrigger(trigger + 1)

        const newStatus = projectStatus === 'approved' ? 'Rejected' : 'approved';
        setProjectStatus(newStatus);
        const projectvalues = {
            projectStatus: newStatus
        }
        request
            .patch(`${APIURLS.PATCHAPROVAL}/${record?.clientFormId}`, projectvalues)
            .then((response) => {
                if (response.status === 200) {
                    toast.info(`${newStatus === 'approved' ? 'Approved' : 'Rejected'} Successfully`);
                    if (handlerequire) {
                        handlerequire()
                    }
                }

            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    toast.warn(error.response.data)
                }
                else {
                    toast.error('Failed')
                }
            })

    };

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.projectName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.projectName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',

        },
        // {
        //     title: 'Skills & Description',
        //     dataIndex: 'skillsAndDescription',

        // },
        // {
        //     title: 'Features',
        //     dataIndex: 'features',

        // },
        {
            title: "View Details",
            render: (record) => {
                return (
                    <Flex center={"true"}>
                        <Tooltip title={'View Details'}>
                            <TableIconHolder color='blue'>
                                <FaEye onClick={() => ViewProDetails(record)} />
                            </TableIconHolder>
                        </Tooltip>
                    </Flex>
                )
            }
        },
        {
            title: 'ProjectStatus',
            dataIndex: 'projectStatus',
            render: (record, i) => {
                return (
                    <Fragment>
                        {record === 'approved' && (
                            <CustomTag
                                bordered={"true"}
                                color={"success"}
                                title={"Approved"}
                            />
                        )}

                        {record === 'Rejected' && (
                            <CustomTag
                                bordered={"true"}
                                color={"error"}
                                title={"Rejected"}
                            />
                        )}
                        {record === "pending" && (
                            <CustomTag
                                bordered={"true"}
                                color={"yellow"}
                                title={"pending"}
                            />
                        )}
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        {
                            record?.projectStatus === "pending" ?
                                (<>
                                    <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => EditForm(record)} >
                                        <FiEdit />
                                    </TableIconHolder>
                                </>)
                                : <BsThreeDots />

                        }

                    </Flex>
                );
            },
        }
    ]

    const rowKey = (dataSource) => dataSource.clientId;


    return (
        <Fragment>
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomPageFormTitle Heading={"Project Name"} />
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
                                    onClick={handlenavigate}
                                />
                            </Flex>
                        </Col>
                    </CustomRow>
                </Col>
            </CustomRow>
            <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} />
            {/* {content} */}
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={widthValue}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    )
}

export default ViewClientForm