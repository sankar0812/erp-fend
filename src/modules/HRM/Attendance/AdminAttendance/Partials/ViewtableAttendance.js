import { Col } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPageFormTitle, CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import Flex from "../../../../../components/Flex";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { base } from "../../../../../utils/request";
import { getAttendanceCount, getCountAttStatus, getCountAttStatusError, selectAllAttendance } from "../../AttendanceSlice";



export const ViewtableAttendance = () => {
   
    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);  // Search bar

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const countattendance = useSelector(selectAllAttendance)
    const AttendanceCountStatus = useSelector(getCountAttStatus)
    const AttendanceCountError = useSelector(getCountAttStatusError)

    useEffect(() => {
        dispatch(getAttendanceCount())
    }, [])


    useEffect(() => {
        setDataSource(countattendance)
    }, [countattendance])

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest();
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };


    const handleRowClick = (record) => {
        navigate(`/DailyAttendance/${record.employeeId}`)
    };
    const columns = [
        {
            title: "SI No",
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
            title: "Employee Name",
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
            title: "Department",
            dataIndex: "departmentName",
        },
        {
            title: "Present Days",
            dataIndex: "presentDays",
            render: (text, record) => (
                <span style={{ color: 'green' }}>{text}</span>
            ),
        },
        {
            title: "Absent Days",
            dataIndex: "absentDays",
            render: (text, record) => (
                <span style={{ color: 'red' }}>{text}</span>
            ),
        },
        {
            title: "Total Days",
            dataIndex: "totalDays",
            render: (text, record) => (
                <span style={{ color: 'blue' }}>{text}</span>
            ),
        },
    ];

    let content;

    if (AttendanceCountStatus === 'loading') {
        content = <CommonLoading />
    } else if (AttendanceCountStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.employeeId;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} style={{ cursor: 'pointer' }} onRow={(record) => ({
            onClick: () => handleRowClick(record),
        })} />
    } else if (AttendanceCountStatus === 'failed') {
        content = <h2>{AttendanceCountError}</h2>
    }
    return (
        <Fragment>
            <CustomPageTitle Heading={"Attendance"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomPageFormTitle Heading={"Employee Name"} />
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
    );
};
