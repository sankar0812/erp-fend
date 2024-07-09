import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import Button from '../../../../components/Form/CustomButton';
import Flex from '../../../../components/Flex';
import { CustomTextArea } from '../../../../components/Form/CustomTextArea';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import request from '../../../../utils/request';
import { CustomRow } from '../../../../components/CustomRow';
import { CustomRadioButton } from '../../../../components/Form/CustomRadioButton'
import { toast } from 'react-toastify';
import { selectCurrentRoleName } from '../../../Auth/authSlice';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';


export const ReasonForHoldModal = ({ close, TransferedData, trigger, GetTaskDetails ,GetTaskDetailsForEmp }) => {

    const [form] = Form.useForm()
    const [eligibleToDrag, setEligibleToDrag] = useState(false)

    useEffect(() => {
        form.resetFields()
    }, [trigger])

    const CurrentRole = useSelector(selectCurrentRoleName)

    useEffect(() => {
        if (CurrentRole === USER_ROLES.EMPLOYEE || CurrentRole === USER_ROLES.TRAINEE ) {
            setEligibleToDrag(true)
            GetTaskDetailsForEmp()
        }
        else {
            setEligibleToDrag(false)
            GetTaskDetails()
        }
    }, [])

    const onFinish = (value) => {
        const newVal = { ...value, projectStatus: 'hold' }
        AddReason(newVal)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const AddReason = (newVal) => {
        request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, newVal)
            .then(function (response) {
                // toast.info("Changed Project Status Successfully")
                if(eligibleToDrag){
                    GetTaskDetailsForEmp()
                }
                else {
                    GetTaskDetails()
                }
                close()
            })
            .catch(function (error) {
                // if (error.response.status && error.response.status === 400) {
                //     toast.error(error.response?.data)
                // }
                // else {
                //     toast.error('Failed')
                // }
            })
    }

    return (
        <Form
            name='ReasonHoldModal'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <CustomTextArea label={'Reason For Hold'} name={'holdReson'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Reason For Hold ',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Add'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} />
            </Flex>
        </Form>
    )
}

export const ReasonForCancellationModal = ({ close, TransferedData, trigger, GetTaskDetails ,GetTaskDetailsForEmp}) => {

    const [form] = Form.useForm()
    const [eligibleToDrag, setEligibleToDrag] = useState(false)

    useEffect(() => {
        form.resetFields()
    }, [trigger])

    const CurrentRole = useSelector(selectCurrentRoleName)

    useEffect(() => {
        if (CurrentRole === USER_ROLES.EMPLOYEE || CurrentRole === USER_ROLES.TRAINEE ) {
            setEligibleToDrag(true)
            GetTaskDetailsForEmp()
        }
        else {
            setEligibleToDrag(false)
            GetTaskDetails()
        }
    }, [])

    const onFinish = (value) => {
        const newVal = { ...value, projectStatus: 'cancelled' }
        AddReason(newVal)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const AddReason = (newVal) => {
        request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, newVal)
            .then(function (response) {
                // toast.info("Changed Project Status Successfully")
                if(eligibleToDrag){
                    GetTaskDetailsForEmp()
                }
                else {
                    GetTaskDetails()
                }
                close()
            })
            .catch(function (error) {
                // if (error.response.status && error.response.status === 400) {
                //     toast.error(error.response?.data)
                // }
                // else {
                //     toast.error('Failed')
                // }
            })
    }

    return (
        <Form
            name='ReasonCancellationModal'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <CustomTextArea label={'Reason For Cancellation'} name={'cancellationReason'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Reason For Cancellation ',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Add'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} />
            </Flex>
        </Form>
    )
}

export const ChangeStatusModal = ({ record, close, GetTaskDetails ,trigger}) => {

    const [form] = Form.useForm()
    const [radioValue, setRadioValue] = useState([])

    useEffect(() => {
        form.setFieldsValue(record)
    }, [record,trigger])

    const radiooptions = [
        {
            label: 'Pending',
            value: 'pending',
        },
        {
            label: 'Todo',
            value: 'todo',
        },
        {
            label: 'On Process',
            value: 'onprocess',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
        {
            label: 'Hold',
            value: 'hold',
        },
        {
            label: 'Cancelled',
            value: 'cancelled',
        },
    ]

    const handleStatusRadio = (e) => {
        setRadioValue(e.target.value)
    }

    const onReset = () => {
        close()
    }

    const onFinish = (value) => {
        ChangeStatus(value)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const ChangeStatus = (value) => {

        request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${record?.taskListId}`, value)
            .then(function (response) {
                toast.info("Changed Project Status Successfully")
                close()
                GetTaskDetails()
            })
            .catch(function (error) {
                // if (error.response.status && error.response.status === 400) {
                //     toast.error(error.response?.data)
                // }
                // else {
                //     toast.error('Failed')
                // }
            })
    }

    return (
        <Form
            name='ChangeStatusModal'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={8}>
                    <Flex spacearound={'true'} gap={'20px'}>

                        <CustomRadioButton label={'Tick The Status'} name={'projectStatus'} options={radiooptions} onChange={handleStatusRadio}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter The Project Updated Status ',
                                }
                            ]}
                        />
                    </Flex>
                </Col>

                <Col span={24} md={16}>
                    {
                        radioValue === 'hold' ? (<CustomTextArea label={'Reason For Hold'} name={'holdReson'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Reason For Hold ',
                                }
                            ]}
                        />) : null
                    }
                    {
                        radioValue === 'cancelled' ? (<CustomTextArea label={'Reason For Cancellation'} name={'cancellationReason'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Reason For Cancellation ',
                                }
                            ]}
                        />) : null
                    }
                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Update'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}
