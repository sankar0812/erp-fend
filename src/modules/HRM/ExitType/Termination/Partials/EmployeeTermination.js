import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialEmployee, selectAllInitialEmployee } from '../../../EmployeeDetails/EmployeeSlice'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import dayjs from "dayjs";

const EmployeeTermination = () => {

    const [form] = Form.useForm()

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

    const dispatch = useDispatch()

    const onFinish = (values) => {
        const newValues = {...values,date:selectedDate}
    }

    const onFinishFailed = () => {

    }

    const onReset = () => {
        form.resetFields();
    };

    const handleDate = (e) => {
        setSelectedDate(e)
    }


    useEffect(() => {
        dispatch(getInitialEmployee())
    }, [])


    const SelectEmp = useSelector(selectAllInitialEmployee)

    const AllEmployee = SelectEmp?.map((empdetails) => ({
        label: `${empdetails.userName}`,
        value: `${empdetails.userName}`
    }));

    return (
        <Fragment>
            <CustomCardView>
                <CustomPageTitle Heading={"Termination"} />
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
                    <CustomRow space={[24, 24]}>
                        <Col span={24} md={12}>
                            <CustomSelect label={'Name'} name={'userName'} options={AllEmployee}  />
                        </Col>
                        <Col span={24} md={12}>
                            <CustomInput label={'Role'} name={'role'} />
                        </Col>
                        
                        <Col span={24} md={12}>
                            <CustomDatePicker label={'Date'} name={'date'} onChange={handleDate} />
                        </Col>
                        <Col span={24} md={12}>
                            <CustomTextArea label={'Reason'} name={'reason'} />
                        </Col>
                    </CustomRow>
                    <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                        {/* {record ? ( */}
                        {/* <>
                            <Button.Primary text={'Update'} htmlType={'submit'} />
                            <Button.Danger text={'Cancel'} onClick={() => FormExternalClose()} />
                        </> */}
                        {/* ) : ( */}
                        <>
                            <Button.Success text={'Submit'} htmlType={'submit'} />
                            <Button.Danger text={'Reset'} onClick={() => onReset()} />
                        </>
                        {/* )} */}
                    </Flex>
                </Form>
            </CustomCardView>
        </Fragment>
    )
}

export default EmployeeTermination