import React, { useState } from 'react'
import { StyledConnect, StyledLogin, StyledLoginMenu } from './style'
import { CustomCardView } from '../../../components/CustomCardView'
import { Col, Form } from 'antd'
import { CustomRow } from '../../../components/CustomRow'
import { CustomInput } from '../../../components/Form/CustomInput'
import { CustomCheckBox } from '../../../components/Form/CustomCheckBox'
import log from '../../../Images/login_image.jpg'
import Flex from '../../../components/Flex'
import ButtonStandard from '../../../components/Form/CustomStandardButton'
import { CustomInputPassword } from '../../../components/Form/CustomInputPassword'


const LoginMenu = () => {

    const [form] = Form.useForm()
    const [check, setCheck] = useState(false)

    const onChange = () => {
        setCheck(!check)
    }

    const onFinish = () => {

    }

    const onFinishFailed = () => {

    }

    return (
        <StyledLoginMenu>
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
                    <CustomRow  >
                        <Col span={24} md={10}>
                            <img src={log} alt='log' />
                        </Col>
                        <Col span={24} md={14}>
                            <StyledLogin>
                                <CustomRow space={[12, 12]}>
                                    <Col span={24} md={24}>
                                        <CustomInput placeholder={'Email ID'} type={'email'} />
                                    </Col>

                                    <Col span={24} md={24}>
                                        <CustomInputPassword placeholder={'Password'} type={'password'} />
                                    </Col>
                                    <Col span={24} md={24}>
                                        <Flex>
                                            <CustomCheckBox label={'by signing up , I accept the terms'} onChange={onChange} checked={check}></CustomCheckBox>
                                        </Flex>

                                    </Col>
                                    <Flex style={{ marginTop: '10px' }}>
                                        <ButtonStandard.Primary text={'Sign In'} /> <div style={{ marginTop: "7px" }}>or &nbsp; <a href='/register'>Sign Up</a></div>
                                    </Flex>

                                </CustomRow>

                            </StyledLogin>
                        </Col>
                    </CustomRow>
                </Form>
            </CustomCardView>
        </StyledLoginMenu>
    )
}

export default LoginMenu