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
import { CustomUpload } from '../../../../../components/Form/CustomUpload'
import { CustomSelect } from '../../../../../components/Form/CustomSelect'


export const GroupDiscussion = () => {


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

    const taskpriority =[
        {
            label:'Low',
            value:'Low'
        },
        {
            label:'Medium',
            value:'Medium'
        },
        {
            label:'High',
            value:'High'
        },

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

    const handleDate = (e) => {
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
                    <CustomInput label={'Interviewer Name'} placeholder={'Enter Interviewer Name'} name={'interviewerName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Interviewer Name !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Interviewer Contact'} placeholder={'Enter Interviewer Contact'} name={'interviewerContact'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Interviewer Contact !',
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
                        onChange={handleDate}
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
                    <CustomTimePicker use12Hours={false} label={'Time'} name={'time'} placeholder={'Enter Time'} onChange={onChangeStartTime}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Start Time !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Feedback'} placeholder={'Enter Comment'} name={'feedback'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Feedback !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Candidate Questions'} placeholder={'Enter Candidate Questions'} name={'candidateQuestions'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Candidate Questions !',
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
