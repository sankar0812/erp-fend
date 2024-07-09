import { Col, Form } from 'antd';
import dayjs from 'dayjs';
import React, { Fragment } from 'react'
import { useState } from 'react';
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker';
import { CustomSelect } from '../../../components/Form/CustomSelect';

export const ClientProjectQuot = () => {
    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

    

    const onFinish = (onfinishValue) => {
        console.log(onfinishValue);
    }
    return (
        <Fragment>
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
                        date: dayjs(),

                    }

                }
                onFinish={onFinish}
                autoComplete="off"
            >
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Client Id"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Company Id"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker label={'Date'}/>
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            label={"Project Type"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect label={'Status'} options={[]}/>
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            label={"Total Amount"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            label={"URL"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Project Name"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Project Name"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Project Name"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Project Name"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                </CustomRow>

            </Form>
        </Fragment>
    )
}
