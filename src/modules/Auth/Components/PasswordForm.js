import React, { useEffect, useState } from 'react';
import { CustomCardView } from '../../../components/CustomCardView';
import { Col, Form, Typography } from 'antd';
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import Flex from '../../../components/Flex';
import ButtonStandard from '../../../components/Form/CustomStandardButton';
import { CustomInputPassword } from '../../../components/Form/CustomInputPassword';
import { toast } from 'react-toastify';
import request from '../../../utils/request';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledRegisterMenu } from '../../LoginPage/Partials/style';
import { CustomPageTitle } from '../../../components/CustomPageTitle';
import { CustomOtp } from '../../../components/Form/CustomOtp';


const PasswordForm = () => {
    const [form] = Form.useForm();
    const [showOtpField, setShowOtpField] = useState(false);
    const [tOtp, seTOtp] = useState('');
    const [otpButtonLabel, setOtpButtonLabel] = useState('Generate OTP');
    const [otpData, setOtpData] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const { email, givenname } = location.state || {};

    const [isMobileNumberVerified, setIsMobileNumberVerified] = useState(false);
    const [isMobileNumberVerifieds, setIsMobileNumberVerifieds] = useState(false);

    useEffect(() => {
        form.setFieldsValue({ email: email });
        form.setFieldsValue({ name: givenname });
    }, []);

    const URLS = 'user/register';
    const get_number = 'user/send_otp_for_verify_phone_number';
    const verify_number = 'user/verify_phone_number';
    const regenerate_otp = 'user/regenerate_otp_phone_number';

    const onFinish = (values) => {
        HandlePostPerson(values);
    };

    const getNumber = async (values) => {
        const phoneNumber = values.mobile_number;

        try {
            let response;
            if (otpButtonLabel === 'Generate OTP') {
                response = await request.get(`${get_number}/${phoneNumber}/`, values);

                if (response.status === 201) {
                    toast.success('Number Verified Successfully');
                }

                if (response.status === 400 && response.data.error === 'Mobile number already added') {
                    throw new Error('Mobile number already added');
                }
            } else {
                response = await request.patch(`${regenerate_otp}/${phoneNumber}/`, values);

                if (response.status === 201) {
                    form.resetFields();
                    toast.success('OTP Sent Successfully');
                    setShowOtpField(true);
                }

                if (
                    response.status === 400 &&
                    response.data.error === 'Maximum OTP generation attempts exceeded. Please try again later.'
                ) {
                    throw new Error('Maximum OTP generation attempts exceeded. Please try again later.');
                }
            }

            setShowOtpField(true);
            setOtpButtonLabel('Regenerate OTP');
            setOtpData(response.data);

            // toast.success('OTP Sent Successfully');
        } catch (error) {
            toast.error('Something Went Wrong');
        }
    };

    const handleFinish = (values) => {
        verifyNumber(values);
    };

    const verifyNumber = async (values) => {
        const phoneNumber = values.mobile_number;
        const Otp = values.otp;

        try {
            const response = await request.post(`${verify_number}/${phoneNumber}/`, {
                otp: Otp,
            });

            if (response.status === 200) {
                setIsMobileNumberVerified(true); // OTP verified successfully
                toast.success("Number Verified Successfully");
                setShowOtpField(false);
                setIsMobileNumberVerifieds(true)
            } else {
                setIsMobileNumberVerified(false); // OTP verification failed
                toast.error("Wrong OTP");
            }

        } catch (error) {
            console.error(error);
            setIsMobileNumberVerified(false); // OTP verification failed
            toast.error("Wrong OTP");
        }
    };

    const HandlePostPerson = (values) => {
        request
            .post(`${URLS}`, values)
            .then((response) => {
                if (response.status === 201) {
                    form.resetFields();
                    toast.success('Your Profile Added Successfully');
                    navigate('/signin', {
                        state: { email },
                    });
                } else {
                    form.resetFields();
                    toast.warning('Email Id Already exists!');
                }
            })
            .catch((error) => {
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
    };

    const onFinishFailed = () => { };

    // useEffect(() => {
    //     form.setFieldsValue({ otp: otpData?.otp });
    // }, [otpData]);

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
                    autoComplete="off"
                >
                    <br></br>
                    <Flex center={"true"}>
                        <CustomPageTitle Heading={'Enter Details'} />
                    </Flex>
                    <CustomRow space={[24, 24]}>
                        <Col span={24} md={24}>
                            <CustomRow space={[24, 24]}>
                                <Col span={24} md={24}>
                                    <CustomInput
                                        label={'Name'}
                                        placeholder={'Name'}
                                        name={'name'}
                                        disabled
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Name !',
                                            },
                                        ]}
                                    />
                                </Col>

                                <Col span={24} md={24}>
                                    <CustomInput
                                        label={'Email'}
                                        placeholder={'Email ID'}
                                        type={'email'}
                                        name={'email'}
                                        disabled
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Email ID !',
                                            },
                                        ]}
                                    />
                                </Col>
                                <Col span={24} md={24}>
                                    <CustomInput
                                        label={'Mobile No'}
                                        name={'mobile_number'}
                                        placeholder={'Enter Phone No'}
                                        maxLength={10}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    // rules={[
                                    //   {
                                    //     required: true,
                                    //     message: 'Please enter Phone Number!',
                                    //   },
                                    //   {
                                    //     min: 10,
                                    //     message: 'Phone Number must be at least 10 characters!'
                                    //   }
                                    // ]}
                                    />

                                    {isMobileNumberVerified ? (
                                        <Typography.Text style={{ color: 'green', marginLeft: '10px' }}>
                                            &#10004; Verified
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text style={{ color: 'red', marginLeft: '10px' }}>
                                            &#10008; Not Verified
                                        </Typography.Text>
                                    )}
                                </Col>
                                {showOtpField && (
                                    <Col span={24} md={8}>         
                                        <CustomOtp label={'Fill your OTP here 👇'}  name={'otp'}  maxLength={6}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }} 
                                        />
                                    </Col>
                                )}
                                <Col span={24} md={24}>
                                    <Flex>
                                        {isMobileNumberVerifieds ?
                                  null
                                     :       <ButtonStandard.Primary
                                     text={otpButtonLabel}
                                     onClick={() => getNumber(form.getFieldsValue())}
                                     // disabled={isMobileNumberVerifieds}
                                 />
                                        }
                                       
                                        {showOtpField && (
                                            <ButtonStandard.Primary
                                                text={'Verify OTP'}
                                                onClick={(value) => handleFinish(form.getFieldsValue())}
                                            />
                                        )}
                                    </Flex>
                                </Col>

                                <Col span={24} md={24}>
                                    <CustomInputPassword
                                        label={'Password'}
                                        placeholder={'Password'}
                                        type={'password'}
                                        name={'password'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter Password!',
                                            },
                                            // {
                                            //   min: 8, // Minimum password length
                                            //   message: 'Password must be at least 8 characters long',
                                            // },
                                            // {
                                            //   pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
                                            //   message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)',
                                            // },
                                        ]}
                                    />
                                </Col>
                                <Flex>{/* or connect with */}</Flex>
                            </CustomRow>
                            <br></br>
                            <Flex center={"true"}>
                                <ButtonStandard.Primary text={'Login'} htmlType={'submit'} />
                            </Flex>
                        </Col>
                    </CustomRow>
                </Form>
            </CustomCardView>
        </StyledRegisterMenu>
    );
};

export default PasswordForm;
