import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../components/CustomPageTitle'
import { CustomRow } from '../../../components/CustomRow'
import { Col, Popconfirm } from 'antd'
import CustomInputSearch from '../../../components/Form/CustomInputSearch'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { CustomTable } from '../../../components/Form/CustomTable'
import { CustomModal } from '../../../components/CustomModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CustomPopconfirm } from '../../../components/CustomPopConfirm'
import { TableIconHolder } from '../../../components/CommonStyled'
import { RiDeleteBinLine } from 'react-icons/ri'
import { THEME } from '../../../theme'
import AddUser from './AddUser'
import { getUserDetails, getUserError, getUserStatus, selectAllUser } from '../UserSlice'
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable'
import { CommonLoading } from '../../../components/CommonLoading'
import { CustomTag } from '../../../components/Form/CustomTag'
import { GrFormView } from 'react-icons/gr'
import { ViewUserDetails } from './ViewUserDetails'
import { HiOutlineBellAlert, HiOutlineBellSlash } from 'react-icons/hi2'
import request, { base } from '../../../utils/request'
import { toast } from 'react-toastify'
import { AiOutlineEye } from 'react-icons/ai'
import { APIURLS } from '../../../utils/ApiUrls/Hrm'

const ViewUserTable = () => {

    const [searchTexts, setSearchTexts] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formReset, setFormReset] = useState(0);
    const [dataSource, setDataSource] = useState([])
    const [trigger, setTrigger] = useState(0)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        dispatch(getUserDetails())
    }, [])

    const setUserDetails = useSelector(selectAllUser)
    const setUserDetailsStatus = useSelector(getUserStatus)
    const setUserDetailsError = useSelector(getUserError)

    useEffect(() => {
        setDataSource(setUserDetails)
    }, [setUserDetails])

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

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();

    };

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const handleRowClick = (record) => {
        navigate(`/userDetail/${record.userId}`)
    };

    const AddUserDetails = () => {
        setTrigger(trigger + 1)
        setModalTitle("Add Users Profile");
        setModalContent(
            <AddUser FormExternalClose={FormExternalClose} formname={'AddUserDetails'} triggerr={trigger} />
        );
        showModal();
    };

    const EditUserDetails = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Edit Users Profile");
        setModalContent(
            <AddUser FormExternalClosee={FormExternalClose} formname={'EditUserDetails'} updaterecord={record} updatetrigger={trigger} />
        );
        showModal();
    };

    const ViewUserDetailss = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("View Users Profile");
        setModalContent(
            <ViewUserDetails FormExternalClosee={FormExternalClose} formname={'ViewUserDetails'} viewrecord={record} updatetrigger={trigger} />
        );
        showModal();
    };


    const UserStatuss = (record) => {
        if (record.status === false || record.status === true) {
            request
                .put(`${APIURLS.STATUSUSER}${record.userId}`)
                .then(function (response) {

                    if (response.data === false) {
                        toast.success('You Click In-Active');
                    }
                    else {
                        toast.success('You Click Active');
                    }
                    dispatch(getUserDetails());
                })

                .catch(function (error) {
                });
        }
    }

    const TableColumn = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "url",
            render: (url) => {
              return <img
                src={`${base}${url}`}
                alt="Staff"
                width="50"
                height="50"
                style={{ borderRadius: "50%", objectFit:"cover" }}
              />
            }
          },
        {
            title: "Name",
            dataIndex: "username",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.username)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.username).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Email ID",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "roleType",
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
        },
    ]

    let content;

    if (setUserDetailsStatus === 'loading') {
        content = <CommonLoading />
    } else if (setUserDetailsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.userId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}/>
    } else if (setUserDetailsStatus === 'failed') {
        content = <h2>
            {setUserDetailsError}
        </h2>
    }

    return (
        <Fragment>
            <CustomPageTitle Heading={"Users Details"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "10px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: 'baseline' }}>
                    <CustomPageFormTitle Heading={"User"} />
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
                                    onClick={AddUserDetails}
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
        </Fragment>
    )
}

export default ViewUserTable