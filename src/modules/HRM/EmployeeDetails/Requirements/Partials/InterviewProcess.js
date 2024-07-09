import React, { useEffect, useState } from 'react'
import Flex from '../../../../../components/Flex'
import Button from '../../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../../components/Form/CustomInput'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../../../components/Form/CustomTextArea'
import { CustomInputNumber } from '../../../../../components/Form/CustomInputNumber'
import { useDispatch } from 'react-redux'
import { CustomTimePicker } from '../../../../../components/Form/CustomTimePicker'
import { CustomSelect } from '../../../../../components/Form/CustomSelect'


export const InterviewProcess = () => {


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

    // const UpdateInterviewProcess = (values) => {
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

    // const AddInterviewProcess = (values) => {
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
        //     UpdateCandidate(newValues);
        // }
        // else {
        //     AddCandidate(newValues);
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
                    <CustomInput label={'Job Position'} placeholder={'Enter Job Position'} name={'jobPosition'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Job Position !',
                            }
                        ]}
                    />
                </Col>


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
                    <CustomDatePicker
                        label={'Start Date'}
                        name={'startDate'}
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
                    <CustomDatePicker
                        label={'End Date'}
                        name={'endDate'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date !',
                            }
                        ]}
                    />
                </Col>

                {/* <Col span={24} md={12}>
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
                    <CustomTextArea label={'Feedback'} placeholder={'Enter Feedback'} name={'feedback'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Feedback !',
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
