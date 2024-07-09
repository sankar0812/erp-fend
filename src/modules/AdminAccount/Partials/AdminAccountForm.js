import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../components/CustomRow";
import Button from "../../../components/Form/CustomButton";
import Flex from "../../../components/Flex";
import { CustomInput } from "../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { CustomUpload } from "../../../components/Form/CustomUpload";
import { useDispatch } from "react-redux";
import request, { base } from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import { CustomInputPassword } from "../../../components/Form/CustomInputPassword";
import { getAdminAccount } from "../AdminAccountSlice";
import { setCredentials } from "../../Auth/authSlice";


export const AdminAccountForm = ({ FormExternalClosee, adminprofdetails, updatetrigger, GetAdminDetails }) => {


    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [formReset, setFormReset] = useState(0);
    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [updateFormData, setUpdateFormData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [button, setButton] = useState('Submit');

    useEffect(() => {
        if (adminprofdetails) {
            setAdminAccount()
        }
    }, [updateFormData, adminprofdetails, updatetrigger, ImageInitialValue])

    const setAdminAccount = () => {
        form.setFieldsValue({
            name: adminprofdetails?.name,
            email: adminprofdetails?.email,
            password: adminprofdetails?.password,
            confirmPassword: adminprofdetails?.confirmPassword
        })
        form.setFieldsValue({ image: ImageInitialValue })
    }

    useEffect(() => {
        if (adminprofdetails?.image?.length > 0) {
            setImageInitialValue(
                [{
                    uid: '1',
                    name: 'example.jpg',
                    status: 'done',
                    url: `${base}${adminprofdetails?.image}`,
                }],
            )
        }
        else {
            setImageInitialValue([]);
        }
        setUpdateFormData(adminprofdetails)
    }, [adminprofdetails])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
        FormRest()
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    }

    const onFinish = (values) => {
        const formData = new FormData()
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('confirmPassword', values.confirmPassword);

        if (values?.image[0].originFileObj) {
            values.image.forEach((file) => {
                formData.append(`image`, file.originFileObj);
            });
        }
        UpdateAdminAccount(formData, adminprofdetails?.id)
    }

    const UpdateAdminAccount = (values, id) => {
        request.put(`${APIURLS.PUTADMINACCOUNT}${id}/`, values, config)
            .then(function (response) {
                toast.info("Admin Account Updated Successfully")
                FormExternalClosee()
                GetAdminDetails()
                // dispatch(setCredentials(response.data));
                console.log(response.data,'responseresponse');
                return response.data;
            })
            .catch(function (error) {
                if (error.response.status && error.response.status === 400) {
                    toast.warn("The Passwords are mismatching")
                }
                else {
                    toast.error("Failed")
                }
            });
    }

    const onReset = () => {
        form.resetFields()
    };

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return (
        <Form
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <CustomRow space={[12, 12]}>

                <Col span={24} md={12}>
                    <CustomInput
                        name={"name"}
                        label={"Name"}
                        placeholder={"Enter Name"}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Company Name !",
                            },
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInput
                        label={"Email ID"}
                        placeholder={"Enter Email ID"}
                        name={"email"}
                        type={"email"}
                        disabled={true}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Email ID !",
                            },
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomInputPassword
                        label={"Password"}
                        placeholder={"Enter Password"}
                        name={"password"}
                        type={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Password !",
                            },
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>
                    <CustomInputPassword
                        label={"Confirm Password"}
                        placeholder={"Enter Password"}
                        name={"confirmPassword"}
                        type={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Password !",
                            },
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomUpload form={form} label={'Upload Photo'}
                        name={'image'} listType='picture-card' maxCount={1} initialValue={ImageInitialValue}
                        rules={[
                            {
                                required: true,
                                message: "Please Upload Profile Pic !",
                            },
                        ]}
                    />
                </Col>

            </CustomRow>

            <Flex center={'true'} gap={'20px'} style={{ marginTop: "20px" }}>
                <Button.Primary text={'Submit'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={() => FormExternalClosee()} />
            </Flex>

        </Form>

    );
};