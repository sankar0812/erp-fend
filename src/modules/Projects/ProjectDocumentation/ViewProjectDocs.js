import React, { useState } from 'react'
import Flex from '../../../components/Flex';
import { TableIconHolder } from '../../../components/CommonStyled';
import { THEME } from '../../../theme';
import { FiEdit } from 'react-icons/fi';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomRow } from '../../../components/CustomRow';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { Col } from 'antd';
import { CustomStandardTable } from '../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../components/CustomModal';
import { ProjectDocsForm } from './ProjectDocsForm';

export const ViewProjectDocs = () => {
    const [searchTexts, setSearchTexts] = useState('');
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [formReset, setFormReset] = useState(0);

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
        setModalTitle("Project Documentation");
        setModalContent(
            // <ProjectDocsForm clientRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalCloseee={FormExternalClose} />
            <ProjectDocsForm clientRecord={record} formname={"EditEmployeeLeaveForm"} FormExternalCloseee={FormExternalClose} />
        );
        showModal();
    };

    const TableColumn = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Employee Name",
            dataIndex: "userName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.userName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Reason",
            dataIndex: "reason",
        },
        {
            title: "From Date",
            dataIndex: "date",
        },
        {
            title: "To Date",
            dataIndex: "toDate",
        },
        {
            title: "Total Day",
            dataIndex: "totalDay",
        },
        {
            title: "Action",
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={"10px"}>
                        {/* <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateParty(record) }}> */}
                        {/* {record?.leavetype === "pending" && ( */}
                        <TableIconHolder color={THEME.blue} size={"22px"}>
                            <FiEdit onClick={() => EditClientRequest(record)} />
                        </TableIconHolder>
                        {/* )} */}
                    </Flex>
                );
            },
        },
    ];
    return (
        <div>
            <CustomPageTitle Heading={"Project Documentation"} />
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
            <CustomStandardTable columns={TableColumn} data={[{}]} />
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
