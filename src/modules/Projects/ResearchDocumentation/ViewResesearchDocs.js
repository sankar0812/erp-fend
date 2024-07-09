import React, { useEffect, useState } from 'react'
import { TableIconHolder } from '../../../components/CommonStyled';
import Flex from '../../../components/Flex';
import { FiEdit } from 'react-icons/fi';
import { THEME } from '../../../theme';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomRow } from '../../../components/CustomRow';
import { Col, Popconfirm, Tag, Tooltip } from 'antd';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../components/CustomModal';
import { ResearchDocs } from './ResearchDocs';
import { CommonLoading } from '../../../components/CommonLoading';
import { useDispatch } from 'react-redux';
import { allresearchDevelopment, getResearchAndDev, projectError, projectStatus } from '../../Client/ClientSlice';
import { useSelector } from 'react-redux';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { CustomPopconfirm } from '../../../components/CustomPopConfirm';
import { BsThreeDots } from 'react-icons/bs';
import { FaPersonDotsFromLine } from "react-icons/fa6";

export const ViewResesearchDocs = () => {
    const dispatch = useDispatch()

    const [searchTexts, setSearchTexts] = useState('');
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [formReset, setFormReset] = useState(0);

    useEffect(() => {
        dispatch(getResearchAndDev())
    }, [])

    const researchStatus = useSelector(projectStatus);
    const researchError = useSelector(projectError);
    const allResearchDev = useSelector(allresearchDevelopment);
    
    console.log(allResearchDev,'allResearchDevallResearchDev');

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
        dispatch(getResearchAndDev())
    };

    const handleSearchs = (value) => {
        setSearchTexts(value)
    };

    const EditResearchDev = (record) => {
        setFormReset(formReset + 1);
        setModalTitle("Research Approval");
        setModalContent(
            <ResearchDocs researchRecord={record} FormExternalClose={FormExternalClose} formReset={formReset} />
        );
        showModal();
    };
    const handleConfirm = (value) => {
        const newValues = {
            projectStatus: 'approved'
        }
        
        // console.log(newValues,'newValuesnewValues');

        request.put(`research/details/edit/${value.researchId}`, newValues)
            .then(resp => {
                toast.success("Project Approved")
                dispatch(getResearchAndDev())
            })
            .catch(error => console.log(error, 'error'))
    }
    
    const handleReject = (value) => {
        const newValues = {
            projectStatus: 'rejected'
        }
        request.put(`research/details/edit/${value.researchId}`, newValues)
            .then(resp => {
                toast.success("Project Rejected")
                dispatch(getResearchAndDev())
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
            title: "Type of Project",
            dataIndex: "typeOfProject",
        },
        {
            title: 'Project Status',
            render: (record, index) => {
                return (
                    <><Flex center={'true'}>
                        {
                            record?.projectStatus === null && <Tag color="yellow">Not Confirmed</Tag>
                        }
                        {
                            record?.projectStatus === 'approved' && <Tag color="green">Approved</Tag>
                        }
                        {
                            record?.projectStatus === 'rejected' && <Tag color="red">Rejected</Tag>
                        }
                    </Flex>
                    </>
                )
            }
        },
        {
            title: "Action",
            render: (record, i) => {

                return (
                    <Flex center={"true"} gap={"10px"}>
                        {/* <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateParty(record) }}> */}

                        {record?.projectStatus === null ? (
                            <TableIconHolder color={THEME.blue} size={"22px"}>
                                <Tooltip title={'Assign Dept & PL'}>
                                    <FaPersonDotsFromLine onClick={() => EditResearchDev(record)} />
                                </Tooltip>
                            </TableIconHolder>

                        ) : null
                        }
                        {
                            (record.projectStatus === null && record.userName != null) &&
                            <TableIconHolder color={THEME.green} size={"22px"} >
                                {/* <Popconfirm */}
                                <CustomPopconfirm
                                    title="Reject/Approve the Project!"
                                    confirm={() => handleConfirm(record)}
                                    cancel={() => handleReject(record)}
                                    okText="Approve"
                                    cancelText="Reject"
                                >
                                    <FaRegCalendarCheck />
                                </CustomPopconfirm>
                            </TableIconHolder>
                        }
                        {record?.projectStatus === "approved" || record?.projectStatus === 'rejected' ?
                            (<>
                                <BsThreeDots />
                            </>) : null
                        }
                    </Flex>
                );
            },
        },
    ];
    let content;

    if (researchStatus === "loading") {
        content = <CommonLoading />;
    } else if (researchStatus === "succeeded") {
        const rowKey = (dataSource) => dataSource.researchId ;
        content = (
            <CustomStandardTable
                columns={TableColumn}
                data={allResearchDev}
                rowKey={rowKey}
            />
        );
    } else if (researchStatus === "failed") {
        content = <h2>{researchError}</h2>;
    }
    return (
        <div>
            <CustomPageTitle Heading={"Research Documentation"} />
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

            </CustomRow>
            {
                content
            }
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
