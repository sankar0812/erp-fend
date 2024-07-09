import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Flex from '../../../../../components/Flex';
import { CustomLableBack } from '../../../../../components/CustomLableBack';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { CustomModal } from '../../../../../components/CustomModal';
import { FiEdit } from 'react-icons/fi';
import { getTraineePayroll, getTraineePayrollError, getTraineePayrollStatus, selectAllTraineePayroll } from '../../PayrollSlice';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { useSelector } from 'react-redux';
import { UpdatePayroll } from '../../ViewPayroll/Partials/UpdatePayroll';

export const TraineeViewPayroll = () => {
 
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

    useEffect(() => {
        dispatch(getTraineePayroll())
    }, [])

    const AllPayrollDetails = useSelector(selectAllTraineePayroll)
    const AllPayrollStatus = useSelector(getTraineePayrollStatus)
    const AllPayrollError = useSelector(getTraineePayrollError)

    const UpdatePayrolll = (record) => {
        setTrigger(trigger + 1)
        setModalTitle('Update Payroll ');
        setModalContent(<UpdatePayroll FormExternalClosee={FormExternalClose} formname={'editpayroll'} formReset={formReset} updateTraineepayrollrecord={record} updatetrigger={trigger} />);
        showModal()
    }

    useEffect(() => {
        setDataSource(AllPayrollDetails)
    }, [AllPayrollDetails])

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: "Payment Date",
            dataIndex: "paymentDate",
        },
        {
            title: "Department Name",
            dataIndex: "departmentName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.departmentName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.departmentName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Staff Name",
            dataIndex: "userName",
        },
        {
            title: "Basic Amount",
            dataIndex: "payrollAmount",
        },
        {
            title: "Allowance",
            dataIndex: "allowance",
        },
        {
            title: "Deductions",
            dataIndex: "deductions",
        },
        {
            title: "Net Pay",
            dataIndex: "netPay",
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        <FiEdit onClick={() => UpdatePayrolll(record)} />
                    </Flex>
                );
            },
        },
    ]

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    let content;

    if (AllPayrollStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllPayrollStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.payrollTypeId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllPayrollStatus === 'failed') {
        content = <h2>
            {AllPayrollError}
        </h2>
    }

    return (
        <div>
            <Flex>
                <CustomLableBack />
                <CustomPageTitle Heading={"View Trainee Payroll Details"} />
            </Flex>

            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "12px 0px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: 'baseline' }}>
                    <CustomPageFormTitle Heading={"Search"} />
                    <CustomInputSearch
                        placeholder={"search ..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>
                <Col span={24} md={8}>
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
