import React, { Fragment, useEffect, useState } from 'react'
import { CustomTable } from '../../../../../components/Form/CustomTable'
import Flex from '../../../../../components/Flex';
import { FiEdit } from 'react-icons/fi';
import { CustomModal } from '../../../../../components/CustomModal';
import { UpdateAttendanceForm } from './UpdateAttendanceForm';

export const EditTable = ({ data,FormRest }) => {


    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setDataSource(data)
    }, [data])

    const [trigger, setTrigger] = useState(0)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTrigger(trigger + 1)
    };

    const FormExternalClose = () => {
        handleOk();
        setTrigger(trigger + 1)
    };

    const columns = [
        {
            title: <h4>SL No</h4>,
            render: (text, record, index) => {
                return (
                    <span>{index + 1}</span>
                )
            }
        },
        {
            title: <h4>Employee&nbsp;Id</h4>,
            dataIndex: 'employeeId',
            render: (text, record) => {
                return (
                    <span>{text} </span>
                )
            }
        },
        {
            title: <h4>Employee&nbsp;Name</h4>,
            dataIndex: 'userName',
            render: (text, record) => {
                return (
                    <span>{text}&nbsp; <span style={{ color: 'lightskyblue' }}>[ {record.designationName} ]</span></span>
                )
            }
        },

        {
            title: <h4>Department</h4>,
            render: (text, record) => {
                return (
                    <span>{record?.departmentName}</span>
                )
            }
        },
        {
            title: <h4>Role</h4>,
            dataIndex: 'roleType',
            render: (text, record) => {
                return (
                    <span>{text}</span>
                )
            }
        },
        {
            title: 'Attendance',
            children: [
                {
                    title: 'Status',
                    dataIndex: 'attstatus',
                    render: (text, record) => {
                        return (
                            <Fragment>
                                {
                                    text ? <h3 style={{ color: 'Green' }}> Present</h3> : <h3 style={{ color: 'Red' }}>Absent</h3>
                                }
                            </Fragment>
                        )
                    }
                },
                {
                    title: <h4>In&nbsp;Time</h4>,
                    dataIndex: 'intime',
                    render: (text, record) => {
                        return (
                            <Fragment>
                                {text}
                            </Fragment>
                        )
                    }
                },
                {
                    title: <h4>Out&nbsp;Time</h4>,
                    dataIndex: 'outtime',
                    render: (text, record) => {
                        return (
                            <Fragment>
                                {text}
                            </Fragment>
                        )
                    }
                },
            ]
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        <FiEdit color='#27aaea' onClick={() => UpdateAttendance(record)} />
                    </Flex>
                );
            },
        }
    ]

    const UpdateAttendance = (record) => {
        setTrigger(trigger + 1)
        setModalTitle('Update Attendance');
        setModalContent(<UpdateAttendanceForm FormExternalClosee={FormExternalClose} formname={'editAttendance'} FormRest={FormRest} record={record} updatetrigger={trigger} />);
        showModal()
    }

    return (
        <Fragment>
            <CustomTable columns={columns} data={dataSource} rowKey={item => item.employeeId} />


            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment >
    )
}
