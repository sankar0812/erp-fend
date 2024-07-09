import { Col, Form } from 'antd'
import dayjs from 'dayjs'
import React, { Fragment, useEffect } from 'react'
import { BiReset } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { APIURLS } from '../../../../utils/ApiUrls/Client'
import request from '../../../../utils/request'


const EditClientForm = ({ handlerequire, record,ViewEditTrigger }) => {

    const [form] = Form.useForm();

console.log(record,'ttttttttt');
    const onReset = () => {
        handlerequire()
    }
    useEffect(() => {
        form.setFieldsValue(record)
    }, [record,ViewEditTrigger])

    const onFinish = (values) => {

        UpdatedClientForm(values);
    };

    const UpdatedClientForm = (values) => {
        request.put(`${APIURLS.PUTCLIENTFORMREQUIREMENT}${record?.projectId}`, values)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Updated Successfully")
                    form.resetFields();
                    if (handlerequire) {
                        handlerequire()

                    }
                }
            })
            .catch(function (error) {
                toast.error("Updated Failed");
            });
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
                            disabled
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Date'}
                            name={'date'}
                            disabled
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomTextArea label={'Skill & Description'}
                            name={'skillsAndDescription'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Features'}
                            name={'features'} />
                    </Col>
                </CustomRow>
                <Flex center={"true"} style={{ margin: '10px' }}>

                    <Button.Primary text={"Update"} htmlType={"submit"} />
                    <Button.Danger
                        text={"Cancel"}
                        icon={<BiReset style={{ marginRight: "5px" }} />}
                        onClick={() => onReset()}
                    />
                </Flex>

                {/* {loading ? <Spin /> :null} */}
            </Form>
        </Fragment>
    )
}

export default EditClientForm