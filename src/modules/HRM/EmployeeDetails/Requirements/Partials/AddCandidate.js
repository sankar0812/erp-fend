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


export const AddCandidateForm = () => {


    // ----- Define Form
    const [form] = Form.useForm();

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [joinDate, setJoinDate] = useState(dayjs().format('YYYY-MM-DD'));

    const dispatch = useDispatch();

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

    useEffect(() => {
        form.resetFields();
    }, [form])

    const gender = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },
        {
            label: "Others",
            value: "others"
        }
    ]

    const maritalstatus = [
        {
            label: "Single",
            value: "single"
        },
        {
            label: "Married",
            value: "married"
        },
        {
            label: "Others",
            value: "others"
        }
    ]

    const onReset = () => {
        form.resetFields();
    };

    const handleOnChange = (e) => {
        setSelectedDate(e);
    };

    const handleJoinChange = (e) => {
        setJoinDate(e);
    };

    // const UpdateEmployee = (values) => {
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

    // const AddCandidate = (values) => {
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
                    <CustomInput label={'Candidate Name '} placeholder={'Enter Candidate Name'} name={'firstName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Candidate First Name !',
                            }
                        ]}
                    />
                </Col>

                {/* <Col span={24} md={12}>
                    <CustomInput label={'Last Name'} placeholder={'Enter Last Name'} name={'lastName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Candidate Last Name !',
                            }
                        ]}
                    />
                </Col> */}

                <Col span={24} md={12}>
                    <CustomInput label={'Email ID'} placeholder={'Enter Email ID'} name={'emailId'} type={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Email ID !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect label={'Gender'} name={'gender'} placeholder={'Enter Gender'} options={gender}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Gender !',
                            }
                        ]} />
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
                    <CustomDatePicker
                        label={'Date Of Birth'}
                        name={'dateofBirth'}
                        onChange={handleOnChange}
                        value={selectedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Date of Birth !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber
                        label={'Mobile Number'}
                        name={'mobileNumber'}
                        placeholder={'Mobile Number'}
                        maxLength={10}
                        minLength={10}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Mobile Number !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'City'} name={'city'} placeholder={'Enter City'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter City !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Country !',
                            }
                        ]} />
                </Col>
                <Col span={24} md={12}>
                    <CustomSelect label={'Marital Status'} name={'maritalStatus'} placeholder={'Enter Marital Status'} options={maritalstatus}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Marital Status !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Country !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Work Experience'} name={'workExperience'} placeholder={'Enter Work Experience'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Work Experience !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Branch'} name={'branch'} placeholder={'Enter Branch'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Branch !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Skill Details'} name={'skillDetails'} placeholder={'Enter Skill Details'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Skill Details !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Education'} name={'education'} placeholder={'Enter Education Details'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Education Details !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'College'} name={'college'} placeholder={'Enter College Details'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter College Details !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'CGPA'} name={'cgpa'} placeholder={'Enter CGPA'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter CGPA !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput label={'Job Role'} name={'jobRole'} placeholder={'Enter Job Role'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Job Role !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputNumber label={'Salary Expectations'} name={'salaryExpectations'} placeholder={'Enter Job Role'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Salary Expectations !',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomTextArea label={'Address'} name={'address'} placeholder={'Enter Address'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Address !',
                            }
                        ]} />
                </Col>

                <Col span={24} md={12}>
                    <Flex>
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Resume'} name={'resume'} rules={[
                            { required: true, message: 'Please Upload Resume !' }
                        ]} />
                        <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Cover Letter'} name={'coverLetter'} rules={[
                            { required: true, message: 'Please Upload Cover Letter !' }
                        ]} />
                    </Flex>

                </Col>

                {/* <Col span={24} md={12}>
                    <CustomUpload form={form} listType='picture-card' maxCount={1} label={'Upload Degree Certificate Here'} name={'coverLetter'} rules={[
                        { required: true, message: 'Please Upload Image!' }
                    ]} />
                </Col> */}
            </CustomRow>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>

                <Button.Success text={'Submit'} htmlType={'submit'} />
                <Button.Danger text={'Reset'} onClick={() => onReset()} />

            </Flex>

        </Form>
    )
}
