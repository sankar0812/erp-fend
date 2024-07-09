import React, { useEffect } from 'react'
import { Col, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import request from '../../../utils/request'
import { CustomInput } from '../../../components/Form/CustomInput'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { CustomRow } from '../../../components/CustomRow'
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker'
import { CustomSelect } from '../../../components/Form/CustomSelect'
import { CustomTextArea } from '../../../components/Form/CustomTextArea'
import { getInitialEmployee, selectAllInitialEmployee } from '../../EmployeeDetails/EmployeeSlice'


export const LeaveForm = () => {

    // ----- Define Form
    const [form] = useForm()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitialEmployee())
      }, [])
    
      const AllEmployeeDetails = useSelector(selectAllInitialEmployee)
    
      const AllEmployeeOptions = AllEmployeeDetails?.map((emp) => (
        {
          label: emp.employeeName,
          value: emp.employeeId
        }
      ))

    // useEffect(() => {
    //     form.setFieldsValue(rolerecord)
    // }, [rolerecord, updatetrigger, form])

    // const UpdateRoll = (values) => {
    //     request.put(`role/edit/${rolerecord?.roleId}`, values)
    //         .then(function (response) {
    //             toast.info('Roll Details Updated Successfully')
    //             FormExternalClose()
    //         })
    //         .catch(error => { })
    // }

    const AddRole = (value) => {
        request.post('role/save', value)
            .then(function (response) {
                // dispatch(getRole());
                // FormExternalClosee();
                form.resetFields();
                toast.success('Role Added Successfully')
            })
            .catch(error => { })
    }

    const onFinish = (values) => {

        // if (rolerecord) {
        //     UpdateRoll(values)
        // }
        // else {
        //     AddRole(values)
        // }
    }

    const onFinishFailed = (value) => {
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{ margin: '30px 0px' }}>
                <CustomRow>

                <Col span={24} md={12}>
                        <CustomSelect label={'Staff Name'} placeholder={'Staff Name'} options={AllEmployeeOptions}
                            name={'employeeId'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Staff Name ! ! !',
                                },

                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'approvedBy'} placeholder={'Approved By'}
                            name={'approvedBy'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Approved By ! ! !',
                                },

                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomDatePicker label={'date'} placeholder={'Enter Date'}
                            name={'date'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Date ! ! !',
                                },

                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomDatePicker label={'toDate'} placeholder={'Enter To Date'}
                            name={'toDate'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter To Date ! ! !',
                                },

                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomTextArea label={'reason'} placeholder={'Enter Reason'}
                            name={'reason'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Reason ! ! !',
                                },

                            ]} />
                    </Col>
                </CustomRow>

                <CustomInput name={'roleId'} display={'none'} />
            </div>
            <Flex gap={'20px'} center={"true"} margin={'20px 0'}>

                <Button.Success text={'Submit'} htmlType={'submit'} />
                <Button.Danger text={'Reset'} onClick={() => onReset()} />

            </Flex>

        </Form>
    )
}
