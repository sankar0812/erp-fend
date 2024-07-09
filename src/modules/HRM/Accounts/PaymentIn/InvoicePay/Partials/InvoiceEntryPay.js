import { Col, Form, message } from 'antd'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CustomRow } from '../../../../../../components/CustomRow'
import Flex from '../../../../../../components/Flex'
import Button from '../../../../../../components/Form/CustomButton'
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker'
import { CustomInput } from '../../../../../../components/Form/CustomInput'
import { CustomInputNumber } from '../../../../../../components/Form/CustomInputNumber'
import { CustomSelect } from '../../../../../../components/Form/CustomSelect'
import { APIURLS } from '../../../../../../utils/ApiUrls/Hrm'
import request from '../../../../../../utils/request'

const InvoiceEntryPay = ({ record, payTrigger, handleupdate ,setHideData,initialData,setInitialData}) => {

    const [form] = Form.useForm();
    const [payDate, setPayDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [minusValue,setMinusValue] = useState(false)
    const paymentTypeoptions = [
        {
            label: 'Cash',
            value: 'Cash'
        },
        {
            label: 'Cheque',
            value: 'Cheque'
        },
        {
            label: 'Online Transaction',
            value: 'OnlineTransaction',
        }
    ]
    const onReset = () => {
        handleupdate()
    }

    const AddPay = (values, key) => {
        request.post(`${APIURLS.POSTINVOICEPAY}`, values)
            .then(function (response) {
                if(response.status === 200){
                    form.resetFields();
                    toast.success("Successfully Paid.")
                    if (handleupdate) {
                        handleupdate()
                    }
            
                }
                   
            })
            .catch(function (error) {
                setHideData(false)
                // toast.error('Failed')
            })
    }

    useEffect(() => {
        form.resetFields()
    }, [payTrigger])

    useEffect(() => {
        // form.setFieldsValue(record)

        form.setFieldsValue({ invoiceId: record?.invoiceId })
        form.setFieldsValue({ invoiceDate: record?.paymentDate })
        form.setFieldsValue({ amount: record?.amount })
        form.setFieldsValue({ balance: record?.balance })

    }, [record, payTrigger])



    const handlePayDate = (date) => {
        setPayDate(date)
    }

//   =============Balance Change Fn ======================

    const handlePayingChange = () => {
        const balanceAmt = parseFloat(record?.balance) || 0;
        const PayingAmt = parseFloat(form.getFieldValue('receivedAmount')) || 0;

        let TotalSub = 0;

        if (!isNaN(balanceAmt) && !isNaN(PayingAmt)) {
            TotalSub = balanceAmt - PayingAmt;
        }

        if(PayingAmt > balanceAmt){
            setMinusValue(true)
            message.warning('Received Amount not greater than balance Amount!')
        }
        else{
            setMinusValue(false)

        }
        form.setFieldsValue({ 'balance': TotalSub.toString() });
    };

   //==============

    const onFinish = (values) => {
        const record = { ...values, paymentDate: payDate }
        const Newvalues = {
            paymentDate: record?.paymentDate,
            invoiceId: record?.invoiceId,
            invoiceDate: record?.invoiceDate,
            balance: record?.balance,
            receivedAmount: record?.receivedAmount,
            paymentType: record?.paymentType,

        }
        AddPay(Newvalues)
    };
    const onFinishFailed = (values) => {
      toast.warn('Please Fill the Details!')
    };

    return (
        <Fragment>
            <Form
                name="paymentIn"
                labelCol={{
                    span: 12,
                }}
                wrapperCol={{
                    span: 12,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <CustomRow space={[24, 24]} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col span={24} md={12}>
                        <CustomInput placeholder={'Invoice No'}
                            label={'Invoice No'}
                            name={'invoiceId'}
                            disabled
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput placeholder={'Date'}
                            label={'Bill Date'}
                            name={'invoiceDate'}
                            disabled
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput placeholder={'Bill Amount'}
                            label={'Bill Amount'}
                            name={'amount'}
                            disabled
                        />
                    </Col>
                    {/* <Col span={24} md={12}>
                        <CustomInput placeholder={'Received'}
                            label={'Received'}
                            name={'receivedAmount'}
                            disabled
                        />
                    </Col> */}
                    <Col span={24} md={12}>
                        <CustomInput placeholder={'Balance'}
                            label={'Balance'}
                            name={'balance'}
                            disabled

                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker placeholder={'Paying Date'}
                            label={'Paying Date'}
                            name={'paymentDate'}
                            onChange={handlePayDate}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Date!'
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber placeholder={'Paying Amount'}
                            label={'Paying Amount'}
                            name={'receivedAmount'}
                            onChange={handlePayingChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter amount!'
                                },
                            ]}

                        />
                    </Col>
                    <Col span={24} md={12} >
                        <CustomSelect label={'Payment Type'} name={'paymentType'}
                            options={paymentTypeoptions}
                            // onChange={handleSelectChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Payment Type!',
                                },
                            ]}
                        />
                    </Col>
                </CustomRow>
                <Flex center={"true"} gap={'20px'} w_100={"true"} style={{ padding: '20px' }}>
                    <Button.Primary htmlType={'submit'} text={'Submit'} disabled={minusValue} />
                    <Button.Danger text={'Cancel'} onClick={onReset} />
                </Flex>
            </Form>
        </Fragment>
    )
}

export default InvoiceEntryPay