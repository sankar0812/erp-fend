import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../components/CustomRow";
import Button from "../../../components/Form/CustomButton";
import Flex from "../../../components/Flex";
import { CustomTextArea } from "../../../components/Form/CustomTextArea";
import { CustomInput } from "../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { CustomUpload } from "../../../components/Form/CustomUpload";
import { useDispatch, useSelector } from "react-redux";
import request, { base } from "../../../utils/request";
import { CustomPageFormSubTitle } from "../../../components/CustomPageTitle";
import { CustomCardView } from "../../../components/CustomCardView";
import { CustomInputNumber } from "../../../components/Form/CustomInputNumber";
import { getBusinessProfile, selectAllBusinessProfile } from "../BusinessSlice";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";


export const BusinessProfile = ({ updatetrigger,FormExternalClosee }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [formReset, setFormReset] = useState(0);
    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [SignatureInitialValue, setSignatureInitialValue] = useState([]);
    const [updateFormData, setUpdateFormData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [button, setButton] = useState('Submit');
    const [businessDetails, setBusinessDetails] = useState({})

    useEffect(() => {
        if (businessDetails) {
            setBusinessProfile()
        }
    }, [updateFormData, businessDetails, updatetrigger])

    const setBusinessProfile = () => {
        form.setFieldsValue({
            companyName: businessDetails?.companyName,
            address: businessDetails?.address,
            pincode: businessDetails?.pincode,
            state: businessDetails?.state,
            country: businessDetails?.country,
            location: businessDetails?.location,
            phoneNumber1: businessDetails?.phoneNumber1,
            phoneNumber2: businessDetails?.phoneNumber2,
            gstNo: businessDetails?.gstNo,
            taxNo: businessDetails?.taxNo,
            email: businessDetails?.email,
            bankName: businessDetails?.bankName,
            accountNo: businessDetails?.accountNo,
            ifscCode: businessDetails?.ifscCode,
            branchName: businessDetails?.branchName,
            holderName: businessDetails?.holderName,
        })
        form.setFieldsValue({ ifscCode: businessDetails?.ifscCode })
        form.setFieldsValue({ profile: ImageInitialValue })
        form.setFieldsValue({ signature : SignatureInitialValue })
    }

    useEffect(() => {
        dispatch(getBusinessProfile())
    }, [])

    const selectedBusinessProfile = useSelector(selectAllBusinessProfile)

    useEffect(() => {
        setBusinessDetails(selectedBusinessProfile)
    }, [selectedBusinessProfile])

    useEffect(() => {
        if (businessDetails?.companyName && businessDetails?.companyName.length > 0) {
            setButton('Update')
        }
        else {
            setButton('Submit')
        }
    }, [businessDetails])

    useEffect(() => {
        if (selectedBusinessProfile?.url?.length > 0) {
            setImageInitialValue(
                [{
                    uid: '1',
                    name: 'example.jpg',
                    status: 'done',
                    url: `${base}${businessDetails?.url}`,
                }],
            )
        }
        else {
            setImageInitialValue([]);
        }
        setUpdateFormData(businessDetails)
    }, [businessDetails,updatetrigger])

    useEffect(() => {
        if (selectedBusinessProfile?.signature?.length > 0) {
            setSignatureInitialValue(
                [{
                    uid: '1',
                    name: 'example.jpg',
                    status: 'done',
                    url: `${base}${businessDetails?.signature}`,
                }],
            )
        }
        else {
            setSignatureInitialValue([]);
        }
        setUpdateFormData(businessDetails)
    }, [businessDetails,updatetrigger])

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
        if (businessDetails?.companyName && businessDetails?.companyName.length > 0) {
            const formData = new FormData()
            formData.append('companyName', values.companyName);
            formData.append('address', values.address);
            formData.append('pincode', values.pincode);
            formData.append('state', values.state);
            formData.append('country', values.country);
            formData.append('location', values.location);
            formData.append('phoneNumber1', values.phoneNumber1);
            formData.append('phoneNumber2', values.phoneNumber2);
            formData.append('gstNo', values.gstNo);
            formData.append('taxNo', values.taxNo);
            formData.append('email', values.email);
            formData.append('bankName', values.bankName);
            formData.append('accountNo', values.accountNo);
            formData.append('ifscCode', values.ifscCode);
            formData.append('branchName', values.branchName);
            formData.append('holderName', values.holderName);

            if (values?.profile[0].originFileObj) {
                values.profile.forEach((file) => {
                    formData.append(`profile`, file.originFileObj);
                });
            }

            if (values?.signature[0].originFileObj) {
                values.signature.forEach((file) => {
                    formData.append(`signature`, file.originFileObj);
                });
            }

            UpdateBusinessProfile(formData, businessDetails?.companyId);
        }
        else {
            const formData = new FormData()
            formData.append('companyName', values.companyName);
            formData.append('address', values.address);
            formData.append('pincode', values.pincode);
            formData.append('state', values.state);
            formData.append('country', values.country);
            formData.append('location', values.location);
            formData.append('phoneNumber1', values.phoneNumber1);
            formData.append('phoneNumber2', values.phoneNumber2);
            formData.append('gstNo', values.gstNo);
            formData.append('taxNo', values.taxNo);
            formData.append('email', values.email);
            formData.append('bankName', values.bankName);
            formData.append('accountNo', values.accountNo);
            formData.append('ifscCode', values.ifscCode);
            formData.append('branchName', values.branchName);
            formData.append('holderName', values.holderName);

            if (values?.profile && values.profile.length > 0) {
                values.profile.forEach((file) => {
                    formData.append(`profile`, file.originFileObj);
                });
            }

            if (values?.signature && values.signature.length > 0) {
                values.signature.forEach((file) => {
                    formData.append(`signature`, file.originFileObj);
                });
            }

            AddBusinessProfile(formData);
        }

    };

    const AddBusinessProfile = (values) => {
        request.post(`${APIURLS.POSTBUSINESSPROFILE}`, values)
            .then(function (response) {
                toast.success("Business Profile Added Successfully")
                dispatch(getBusinessProfile())
                FormExternalClosee()
                if (response?.status === 200) {
                    setButton('Update')
                }
                else {
                    setButton('Submit')
                }
            })
            .catch(function (error) {
                if (error.response.status && error.response.status === 400) {
                  toast.error(error.response?.data)
                }
                else {
                  toast.error('Failed')
                }
              });
    }

    const UpdateBusinessProfile = (values, id) => {
        request.put(`${APIURLS.PUTBUSINESSPROFILE}${id}/`, values, config)
            .then(function (response) {
                toast.info("Business Profile Updated Successfully")
                FormExternalClosee()
                dispatch(getBusinessProfile())
            })
            .catch(function (error) {
                if (error.response.status && error.response.status === 400) {
                    toast.error(error.response?.data)
                  }
                  else{
                    toast.error('Failed')
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
                            name={"companyName"}
                            label={"Company Name"}
                            placeholder={"Enter Company Name"}
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
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Email ID !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"phoneNumber1"}
                            label={"Phone Number"}
                            placeholder={"Enter Phone Number"}
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
                                    message: "Please Enter Mobile Number !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"phoneNumber2"}
                            label={"Alternative Number"}
                            placeholder={"Enter Alterative Number"}
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
                                    message: "Please Enter Alterative Number !",
                                },
                            ]}
                        />
                    </Col>


                    <Col span={24} md={12}>
                        <CustomInput
                            name={"location"}
                            label={"Location"}
                            placeholder={"Enter Location"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Location !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"state"}
                            label={"State"}
                            placeholder={"Enter state"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter State !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"country"}
                            label={"Country"}
                            placeholder={"Enter country"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Country !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber
                            name={"pincode"}
                            label={"Pincode"}
                            placeholder={"Enter Pincode"}
                            maxLength={6}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Pincode !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"gstNo"}
                            label={"GST No"}
                            placeholder={"Enter GST no"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter GST no !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"taxNo"}
                            label={"Tax No"}
                            placeholder={"Enter Tax no"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Tax no !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomTextArea
                            label={"Address"}
                            name={"address"}
                            placeholder={"Enter Address"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Address !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} label={'Upload Photo'}
                            name={'profile'} listType='picture-card' maxCount={1} initialValue={ImageInitialValue}  accept='.png,.jpeg,.jpg' 
                            rules={[
                                {
                                    required: true,
                                    message: "Please Upload Profile Pic !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomUpload form={form} label={'Upload Signature'}
                            name={'signature'} listType='picture-card' maxCount={1} initialValue={SignatureInitialValue}  accept='.png,.jpeg,.jpg' 
                            rules={[
                                {
                                    required: true,
                                    message: "Please Upload Signature !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={24}>
                        <CustomPageFormSubTitle Heading={'Bank Details :'} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"bankName"} accountNo
                            label={"Bank Name"}
                            placeholder={"Enter Bank Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Bank Name !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber
                            name={"accountNo"}
                            label={"Account Number"}
                            placeholder={"Enter Account Number"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Account Number !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"ifscCode"}
                            label={"IFSC Code"}
                            placeholder={"Enter IFSC Code"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter IFSC Code !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"branchName"}
                            label={"Branch Name"}
                            placeholder={"Enter Branch Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Branch Name !",
                                },
                            ]}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"holderName"}
                            label={"Account Holder Name"}
                            placeholder={"Enter Account Holder Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Account Holder Name !",
                                },
                            ]}
                        />
                    </Col>

                </CustomRow>

                <Flex center={'true'} gap={'20px'} style={{ marginTop: "20px" }}>
                    {
                        button === 'Submit' && (<Button.Primary text={'Submit'} htmlType={'submit'} />)
                    }
                    {
                        button === 'Submit' && (<Button.Danger text={'Cancel'} onClick={() => onReset()} />)
                    }
                    {
                        button === 'Update' && (<Button.Primary text={'Update'} htmlType={'submit'} />)
                    }

                </Flex>

        </Form>

    );
};