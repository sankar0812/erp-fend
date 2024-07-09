import React, { useEffect, useState } from 'react'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { CustomInput } from '../../../components/Form/CustomInput'
import { CustomRow } from '../../../components/CustomRow'
import { Col, Form } from 'antd'
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker'
import dayjs from 'dayjs'
import { CustomTextArea } from '../../../components/Form/CustomTextArea'
import { CustomSelect } from '../../../components/Form/CustomSelect'
import { CustomInputNumber } from '../../../components/Form/CustomInputNumber'
import { CustomAddSelect } from '../../../components/Form/CustomAddSelect'
import { CustomModal } from '../../../components/CustomModal'
import request from '../../../utils/request'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { CustomCardView } from '../../../components/CustomCardView'



export const CustomerAndClientForm = ({ formname }) => {

    // ----- Define Form
    const [form] = Form.useForm();


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



    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
    };

    const onFinishFailed = (errorInfo) => {
        toast.error('Please Fill The Details');
    };

    return (
        <CustomCardView>
            <Form

                name={formname}
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
                        <CustomInput label={'Name'} placeholder={'Enter Name'} name={'name'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Title !',
                                }
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomSelect label={'Gender'} name={'gender'} placeholder={'Enter Gender'} options={gender}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Gender !',
                                }
                            ]} />
                    </Col>


                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Phone Number 1'} name={'phoneNo1'} placeholder={'Phone Number 1'}
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
                                    message: 'Please enter Phone Number 1 !',
                                },
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Phone Number 2'} name={'phoneNo2'} placeholder={'Phone Number 2'}
                            maxLength={10}
                            minLength={10}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please enter Phone Number 2 !',
                        //     },
                        // ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'Email ID'} placeholder={'Enter EmailID'} name={'email'} type={'email'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Title !',
                                }
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomDatePicker
                            label={'Date'}
                            name={'date'}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Date !',
                                }
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'City'} name={'city'} placeholder={'Enter City'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter City !',
                                }
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'State'} name={'state'} placeholder={'Enter State'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter State !',
                                }
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'Country'} name={'country'} placeholder={'Enter Country'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Country !',
                                }
                            ]} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomTextArea label={'Address'} name={'address'} placeholder={'Enter Address'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Address !',
                                }
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput label={'Referal'} name={'formType'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Form Type !',
                                }
                            ]}
                        />
                        <CustomInput name={'formTypeId'} display={'none'} />
                    </Col>

                </CustomRow>
                <Flex gap={'20px'} center={"true"} margin={'20px 0'}>

                    {/* <>
                        <Button.Primary text={'Update'} htmlType={'submit'} />
                        <Button.Danger text={'Cancel'} onClick={() => FormExternalClose()} />
                    </> */}

                    <>
                        <Button.Success text={'Submit'} htmlType={'submit'} />
                        <Button.Danger text={'Reset'} onClick={() => onReset()} />
                    </>

                </Flex>

            </Form>
        </CustomCardView>
    )
}
