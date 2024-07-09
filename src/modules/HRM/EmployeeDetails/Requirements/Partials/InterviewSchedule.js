import React, { useEffect, useState } from 'react'
import Flex from '../../../../../components/Flex'
import Button from '../../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../../../components/Form/CustomInputNumber'
import { useDispatch } from 'react-redux'

import { CustomPageFormSubTitle } from '../../../../../components/CustomPageTitle'
import { CustomUpload } from '../../../../../components/Form/CustomUpload'
import { CustomTimePicker } from '../../../../../components/Form/CustomTimePicker'


export const InterviewShedule = () => {


    // ----- Define Form
    const [form] = Form.useForm();

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [joinDate, setJoinDate] = useState(dayjs().format('YYYY-MM-DD'));

    // =======  Get Selected Time =======
    const [inTime, setInTime] = useState(null)
    const [outTime, setOutTime] = useState(null)
    const dispatch = useDispatch();

    const intvname = [
        {
            label: 'HR1',
            value: 'HR1'
        },
        {
            label: 'HR2',
            value: 'HR2'
        }
    ]

    const candidatename = [
        {
            label: 'EMP1',
            value: 'EMP1'
        },
        {
            label: 'EMP2',
            value: 'EMP2'
        },
        {
            label: 'EMP3',
            value: 'EMP3'
        },

    ]

    const intvtype = [
        {
            label: 'HR',
            value: 'HR'
        },
        {
            label: 'Technical',
            value: 'Technical'
        }
    ]

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

    // ===== Modal Functions End =====

    const onChangeStartTime = (time) => {
        setInTime(time);
    }

    const onChangeEndTime = (time) => {
        setOutTime(time);
    }

    useEffect(() => {
        form.resetFields();
    }, [form])

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (e) => {
        setSelectedDate(e);
    };

    const handleJoinChange = (e) => {
        setJoinDate(e);
    };

    // const UpdateInterviewSchedule = (values) => {
    //     request.put(`employees/edit/${updateEmployeeRecord?.employee_id}`, values)
    //         .then(function (response) {
    //             dispatch(getAllEmployee());
    //             dispatch(getNotification())
    //             FormExternalClose();
    //             form.resetFields();
    //             toast.info('Employee Details Updated Successfully')
    //         })
    //         .catch(error => {})
    // }

    // const AddInterviewSchedule = (values) => {
    //     request.post('employees/save', values)
    //         .then(function (response) {
    //             dispatch(getAllEmployee());
    //             dispatch(getNotification())
    //             FormExternalClose();
    //             form.resetFields();
    //             toast.success('Employee Details Added Successfully')
    //         })

    //         .catch(error => {})
    // }

    const onFinish = (values) => {
        const newValues = { ...values, date: selectedDate, dateOfJoining: joinDate }
        // if (updateEmployeeRecord) {
        //     UpdateInterviewSchedule(newValues);
        // }
        // else {
        //     AddInterviewSchedule(newValues);
        // }
    };
    const onFinishFailed = (errorInfo) => {
    };

    return (
        <Form
            form={form}
            // name={formname}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow space={[12, 12]}>
                <Col span={24} md={12}>
                    <CustomSelect label={'Interviewer Name'} placeholder={'Enter Interviewer Name'} name={'interviewerName'} options={intvname}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Interviewer Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Interviewer Contact'} placeholder={'Enter Interviewer Contact'} name={'interviewerContact'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Interviewer Contact !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Candidate Name'} placeholder={'Select Candidate Name'} name={'candidateID'} options={candidatename}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Candidate Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={'Date'}
                        name={'date'}
                        onChange={handleJoinChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTimePicker use12Hours={false} label={'Start Time'} name={'startTime'} placeholder={'Enter Start Time'} onChange={onChangeStartTime}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Start Time !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTimePicker use12Hours={false} label={'End Time'} name={'endTime'} placeholder={'Enter End Time'} onChange={onChangeEndTime}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter End Time !',
                            }
                        ]}
                    />
                </Col>
                {/* 
                <Col span={24} md={12}>
                    <CustomInput label={'Interview Format'} name={'interviewFormat'} placeholder={'Enter Interview Format'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Interview Format !',
                            }
                        ]}
                    />
                </Col> */}

                <Col span={24} md={12}>
                    <CustomSelect label={'Interview Type'} name={'interviewType'} placeholder={'Enter Interview Type'} options={intvtype}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Interview Type !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Cancellation Reason'} placeholder={'Enter Cancellation Reason'} name={'cancellationReason'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Cancellation Reason !',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>

                <Button.Success text={'Submit'} htmlType={'submit'} />
                <Button.Danger text={'Reset'} onClick={() => onReset()} />

            </Flex>

        </Form>
    )
}
