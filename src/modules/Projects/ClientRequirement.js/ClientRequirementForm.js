import { Col, Form } from 'antd';
import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker';
import { CustomSelect } from '../../../components/Form/CustomSelect';
import { CustomTextArea } from '../../../components/Form/CustomTextArea';
import Flex from '../../../components/Flex';
import Button from '../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';

export const ClientRequirementForm = ({ projectTypeRecord }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const onReset = () => {
        form.resetFields()
    }

    const status = [
        {
            label: 'Approved',
            value: 'Approved'
        },
        {
            label: 'Rejected',
            value: 'Rejected'
        },
    ]
    const onFinish = () => {

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
                        <CustomDatePicker label={'Date'}
                            name={'date'} onChange={handleOnChange}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect options={status} label={'Project Status'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Features'} placeholder={'Features'}
                            name={'features'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Duration'} placeholder={'Features'}
                            name={'duration'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomTextArea label={'Skill & Description'}
                            name={'skillsAndDescription'} />
                    </Col>

                </CustomRow>
                <Flex center={"true"} style={{ margin: '10px' }}>

                    {projectTypeRecord ?
                        <>

                            <Button.Primary text={"Update"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Cancel"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => onReset()}
                            />

                        </>
                        : <>
                            <Button.Success text={"Add"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Reset"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => onReset()}
                            />
                        </>
                    }
                </Flex>

                {/* {loading ? <Spin /> :null} */}
            </Form>
        </Fragment>
    )
}
