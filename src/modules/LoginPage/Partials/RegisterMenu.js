import React, { useState } from 'react'
import { StyledLoginLeft, StyledRegisterMenu } from './style'
import { StyledLogin } from './style'
import { CustomCardView } from '../../../components/CustomCardView'
import { Col, Form } from 'antd'
import { CustomRow } from '../../../components/CustomRow'
import { CustomInput } from '../../../components/Form/CustomInput'
import { CustomCheckBox } from '../../../components/Form/CustomCheckBox'
import log from '../../../Images/login_image.jpg'
import Flex from '../../../components/Flex'
import ButtonStandard from '../../../components/Form/CustomStandardButton'
import { CustomInputPassword } from '../../../components/Form/CustomInputPassword'
import { toast } from 'react-toastify'
import request from '../../../utils/request'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Form/CustomButton'

const RegisterMenu = () => {

    const [form] = Form.useForm()

    const [check, setCheck] = useState(false)

    const navigate = useNavigate()

    const Navigatee = () => {
        navigate('/signin')
    }

    const onChange = () => {
        setCheck(!check)
    }

    const URLS = 'user/withrole'
    const onFinish = values => {
        HandlePostPerson(values)
    }
    const HandlePostPerson = (values) => {
        request.post(`${URLS}`, values).then((response) => {
            // if (response.status === 201) {
                form.resetFields();
                toast.success('Your Profile Added Successfully')
                navigate('/signin')
            // }
            // else {
                // form.resetFields();
                // toast.warning('Email Id Already exists!')
            // }
        }).catch(error => {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data) {
                        toast.warn(error.response.data?.email[0]);
                    }
                } else {
                    toast.error('Something Went Wrong');
                }
            } else if (error.request) {
                console.log(error.request);
                toast.error('Request Error');
            } else {
                console.log('Error', error.message);
                toast.error('Connection Error');
            }
        });
    }

    const onFinishFailed = () => {

    }

    return (
        <StyledRegisterMenu>
            <CustomCardView>
                <Form
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
                    <CustomRow>
                        <Col span={24} md={10}>
                            {/* <img src={log} alt='log' /> */}
                            <StyledLoginLeft>
                                ERP !!!
                            </StyledLoginLeft>
                        </Col>
                        <Col span={24} md={14}>
                            <StyledLogin>
                                <CustomRow space={[12, 12]}>
                                    <Col span={24} md={24}>
                                        <CustomInput placeholder={'Name'} name={'username'}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter Name !',
                                                }
                                            ]}
                                        />
                                    </Col>

                                    <Col span={24} md={24}>
                                        <CustomInput placeholder={'Email ID'} type={'email'} name={'email'}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter Email ID !',
                                                }
                                            ]}
                                        />
                                    </Col>

                                    <Col span={24} md={24}>
                                        <CustomInputPassword placeholder={'Password'} type={'password'} 
                                        name={'password'}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter Password!',
                                                }
                                            ]} />

                                    </Col>
                                    {/* <Col span={24} md={24}><br/>
                                        <Flex style={{ marginTop: "10px" }}>
                                            <CustomCheckBox label={'by signing up , I confirm to proceed'} onChange={onChange} checked={check} />
                                        </Flex>
                                    </Col>
                                    */}
                                    <Flex style={{ marginTop: '10px' }}>
                                        <ButtonStandard.Primary className={'ant-btn'} text={'Sign Up'} htmlType={'submit'} />
                                        <div style={{ marginTop: "10px" }} >or</div> &nbsp; &nbsp;
                                        <Button.Primary text={'Sign In'} onClick={Navigatee} style={{ height: '33px' }} />
                                    </Flex>

                                </CustomRow>
                            </StyledLogin>
                        </Col>
                    </CustomRow>
                </Form>
            </CustomCardView>
        </StyledRegisterMenu>
    )
}

export default RegisterMenu