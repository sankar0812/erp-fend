import { Col, Form } from 'antd'
import React, { Fragment } from 'react'
import { BiReset } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { CustomRow } from '../../../../../../components/CustomRow'
import Flex from '../../../../../../components/Flex'
import Button from '../../../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../../../components/Form/CustomInput'
import { CustomTextArea } from '../../../../../../components/Form/CustomTextArea'
import { APIURLS } from '../../../../../../utils/ApiUrls/Hrm'
import request from '../../../../../../utils/request'
const AddTermsForm = ({projectTypeRecord,handlegetTerms}) => {
    console.log(projectTypeRecord,'projectTypeRecord');
    const [form] = Form.useForm();
    const onFinish = (values) => {
        if (projectTypeRecord) {
            UpdatedTerms(values)
        }
        else {
            AddTerms(values)
        }
    }
    const AddTerms = (values) => {
        request.post(`${APIURLS.POSTTERMS}`, values)
            .then(function (response) {
                    toast.success("Terms Added Successfully");
                    form.resetFields();
                    if(handlegetTerms){
                        handlegetTerms()
                    }
            })
            .catch(function (error) {
                toast.error("Failed to add terms. Please try again.");
            })
    };
    const UpdatedTerms = (values) => {
        request.put(`${APIURLS.PUTTERMS}/${projectTypeRecord?.maintenanceTermsId}`, values)
            .then(function (response) {
                toast.success("Updated Successfully")
                form.resetFields();
                // if (handleupdate) {
                //     handleupdate()
                // }
            })
            .catch(function (error) {
                toast.error("Updated Failed");
            });
    }
    const onReset = () => {
        form.resetFields()
        // if (projectTypeRecord) {
        //     handleupdate()
        // }
    };
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
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <CustomRow space={[12, 12]}>
                       <Col span={24} md={24}>
                            <CustomInput
                                name={"title"}
                                label={"Title"}
                                placeholder={"Enter Title Name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Title Name!",
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={24} md={24}>
                            <CustomTextArea
                                name={"terms"}
                                label={"Terms Name"}
                                placeholder={"Enter Terms Name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Terms Name!",
                                    },
                                ]}
                            />
                        </Col>
                    </CustomRow>
                    <Flex center={'true'} style={{ margin: '10px' }} gap={'15px'}>
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
                </Form>
        </Fragment>
  )
}
export default AddTermsForm