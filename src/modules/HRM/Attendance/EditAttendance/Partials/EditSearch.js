import React, { useEffect, useState } from 'react'
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import { Col, Form } from 'antd';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomSelect } from '../../../../../components/Form/CustomSelect';
import { attendancetype } from '../../../../../components/SampleData';
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker';
import dayjs from "dayjs";


export const EditSearch = ({ handleChange, shiftOpt, setResetAll, changeSendDate }) => {

    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [selectedAtt, setSelectedAtt] = useState("Regular")
    const [shiftOption, setShiftOption] = useState([])

    const handleDate = (date, datestring) => {
        setSelectedDate(date);
        changeSendDate(date)
    };

    useEffect(() => {
        if(shiftOpt?.length != 0){

            const shiftOption = shiftOpt?.map((item) => ({
                label: item?.shiftType,
                value: item?.shiftId
            }))
            setShiftOption(shiftOption)
        }

    }, [shiftOpt])

    // const shiftOption = shiftOpt?.map((item) => ({
    //     label: item?.shiftType,
    //     value: item?.shiftId
    // }))

    const AttendanceOnChange = (val) => {
        setSelectedAtt(val);

        if (val === attendancetype[0].value) {
            // form.resetFields({'shiftOpt': shiftOption})
            form.resetFields(['shiftOpt']);
        }
    }

    const onFinish = (values) => {
        const newValue = {
            ...values, attendanceDate: selectedDate
        }
        handleChange(newValue)
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Added Failed");
    };

    const onReset = () => {
        form.resetFields()
        setSelectedAtt("Regular")
        setResetAll(prev => prev + 1)
    }

    return (
        <Form
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={
                {
                    attendanceDate: dayjs(),
                    attenType: attendancetype[0].value
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <CustomRow space={[24, 24]}>
                <Col span={24} md={12}>
                    <CustomDatePicker
                        label={"Attendance Date"}
                        name={"attendanceDate"}
                        onChange={handleDate}
                        rules={[
                            {
                                required: true,
                                message: "Please Enter Date !",
                            },
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>
                    <CustomSelect placeholder={'Attendance Type'} name={'attenType'} options={attendancetype} onChange={(val) => AttendanceOnChange(val)} label={'Attendance Type'} />
                </Col>
                {
                    selectedAtt === attendancetype[1].value && (
                        <Col span={24} md={12}>
                            <CustomSelect name={'shiftOpt'} options={shiftOption} label={'Select Shift'}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Select Shift !",
                                    },
                                ]} />
                        </Col>
                    )
                }

            </CustomRow>
            <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
                <Button.Primary text={"Search"} htmlType={"submit"} />
                <Button.Danger
                    text={"Reset"}
                    onClick={() => onReset()}
                />
            </Flex>
        </Form>
    )
}