import { Card, Checkbox, Col } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../../components/CustomRow'
import Flex from '../../../../../components/Flex'
import { CustomCheckBox } from '../../../../../components/Form/CustomCheckBox'
import { CustomInputNumber } from '../../../../../components/Form/CustomInputNumber'
import { CustomSelect } from '../../../../../components/Form/CustomSelect'


export const FooterInvoice = ({ BalanceOnChange,checkedbalance, invoiceRecord, payType, setPayType, 
    HandleCheQueChage, TotalBalance, setRoundDecimalValue, RoundOffChecked, 
    round, proTabSecondaryData,trigger }) => {

    const [disRoundOff, setDisRoundOff] = useState(false)

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

    const handleSelectChange = (value) => {
        if (value === 'Cheque' || value === 'OnlineTransaction') {
            setDisRoundOff(true)
            TotalBalance();
        }
        else {
            setDisRoundOff(false)

        }

        setPayType(value);
        HandleCheQueChage(value);

    }

    useEffect(() => {
        if (payType === 'Cheque' || payType === 'OnlineTransaction') {
            setDisRoundOff(true)
        }
        else {
            setDisRoundOff(false)

        }
    }, [payType])


    const handleRoundChecked = (e) => {
        RoundOffChecked(e.target.checked)
        const num = proTabSecondaryData[0].sub_total;
        const newInteger = parseInt(num);
        const newDecimal = (num - newInteger).toFixed(2).substr(1);
        setRoundDecimalValue(newDecimal);
    }

    const balanceCheck = (e) => {
        TotalBalance(e.target.checked)
    }

    const HandleOnchange = (val) => {
        BalanceOnChange(val)
    }
    return (
        <Fragment>
            <Card>
                <CustomRow gutter={[24, 24]} >
                    {/* <Card> */}
                    <Col md={6} span={24}>
                        <CustomSelect label={'Payment Type'} name={'paymentType'}
                            options={paymentTypeoptions}
                            onChange={handleSelectChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Payment Type!',
                                },
                            ]}
                        />
                    </Col>
                    {/* </Card> */}
                    <Col md={8} span={24}></Col>
                    <Col md={10} span={24}>

                        <CustomRow space={[24, 24]}>
                            <Col span={24} md={12}>
                                <Flex aligncenter={"true"}>
                                    {/* <Label style={{ paddingTop: '30px' }}>Total&nbsp;:</Label>&nbsp;&nbsp;&nbsp; */}
                                    <CustomInputNumber label={'Total Quantity'} disabled name={'totalQuantity'} />
                                </Flex>
                            </Col>
                            <Col span={24} md={12}>
                                <CustomInputNumber label={'Total Tax Amt'} disabled name={'taxAmount'} />
                            </Col>
                            <Col span={24} md={24}>
                                <Flex end={"true"}>
                                    <CustomInputNumber label={'Sub Total'} disabled name={'sub_total'} />
                                </Flex>

                            </Col>
                        </CustomRow>
                    </Col>
                    <Col lg={10} md={10} span={24}>
                    </Col>
                    <Col lg={14} md={20} span={24}>
                        <CustomRow gutter={[12, 12]}>
                            <Col span={24}>
                                <CustomRow gutter={[24, 24]}>
                                    <Col sm={12} span={24} style={{
                                        display: 'flex',
                                        alignItems: 'end',
                                        }}>
                                        <CustomRow gutter={[24, 24]}>
                                            <Col lg={16} span={12}>
                                                <Checkbox label={'Round Off'} onChange={handleRoundChecked}
                                                    name={'round_off'}  checked={round}    />
                                            </Col>

                                            <Col lg={8} span={12}>
                                                <CustomInputNumber precision={2} name={'roundOffAmount'} placed={'end'} disabled />
                                            </Col>
                                        </CustomRow>
                                    </Col>
                                    <Col sm={12} span={24}>
                                        <CustomInputNumber precision={2} name={'amount'} label={'Total'} placed={'end'} display={'none'} disabled />
                                    </Col>
                                </CustomRow>
                            </Col>
                            <Col span={24}>
                                <CustomRow gutter={[12, 12]}>
                                    <Col sm={6} span={0}></Col>

                                    <Col sm={6} span={6} style={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                                        <CustomRow gutter={[12, 12]}>
                                            <Col span={12}>
                                            </Col>
                                            <Col span={12}>
                                                {/* <CustomCheckBox name={'recevied_status'} disabled={disRoundOff}
                                                 onChange={balanceCheck} checked={checkedbalance}  /> */}
                                            </Col>
                                        </CustomRow>-
                                    </Col>
                                    <Col md={12} span={18}>
                                     
                                        {/* {payType === 'Cheque' || payType === 'OnlineTransaction' ?
                                            <CustomInputNumber
                                                precision={2}
                                                name={'received'}
                                                label={'Received'}
                                                placed={'end'}
                                                onChange={(val) => HandleOnchange(val)}
                                                disabled
                                            /> : */}
                                            <CustomInputNumber
                                                precision={2}
                                                name={'received'}
                                                label={'Received'}
                                                placed={'end'}
                                                onChange={(val) => HandleOnchange(val)}
                                                disabled={invoiceRecord}

                                            />
                                            {/* } */}
                                      
                                    </Col>
                                </CustomRow>
                            </Col>
                            <Col span={24}>
                                <CustomRow gutter={[12, 12]}>
                                    <Col sm={6} span={0}></Col>

                                    {/* <Col sm={6} span={6} style={{ display: 'flex', width: '100%', alignItems: 'center', }}>
                                        <CustomRow gutter={[12, 12]}>
                                            <Col span={12}>
                                            </Col>
                                            <Col span={12}>
                                            </Col>
                                        </CustomRow>
                                    </Col> */}

                                    <Col md={12} span={18}>
                                        <CustomInputNumber
                                            precision={2}
                                            name={'balanceAmount'}
                                            label={'Balance'}
                                            placed={'end'}
                                            disabled
                                        />
                                    </Col>
                                </CustomRow>
                            </Col>
                        </CustomRow>

                    </Col >
                </CustomRow >
                <Flex flexend={'true'} gap={'10px'}>


                </Flex>
            </Card>
        </Fragment>
    )
}