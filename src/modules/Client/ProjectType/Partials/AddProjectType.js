import { Col, ColorPicker, Form, Spin } from 'antd'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { CustomPageFormSubTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomInput } from '../../../../components/Form/CustomInput'
import Label from '../../../../components/Form/Label'
import { APIURLS } from '../../../../utils/ApiUrls/Hrm'
import request from '../../../../utils/request'
import { getProjecttype } from '../../ClientSlice'
import { useDispatch } from 'react-redux'

const AddProjectType = ({ ViewaddTrigger, FormClose, ViewEditTrigger, setProjectTo, projectTypeRecord, handleupdate, handleupdatee, FormCloseSecond, FormCloseThird }) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [colorHex, setColorHex] = useState("#fff");
    const [formatHex, setFormatHex] = useState("hex");

    // const hexString = useMemo(
    //     () => (typeof colorHex === "string" ? colorHex : colorHex.toHexString()),
    //     [colorHex]
    // );

    const hexString = useMemo(
        () => (colorHex && typeof colorHex.toHexString === "function" ? colorHex.toHexString() : colorHex),
        [colorHex]
    );
    

    useEffect(() => {
        form.setFieldsValue(projectTypeRecord)
        setColorHex(projectTypeRecord?.color)
    }, [projectTypeRecord, ViewEditTrigger, ViewaddTrigger])

    const onFinish = (values) => {
        const newValue = {
            ...values,
            color: hexString,
        };
        if (projectTypeRecord) {
            UpdateProjectType(newValue)
        }
        else {
            AddProjectType(newValue)
        }

    }
    const [loading, setLoading] = useState(false);

    const AddProjectType = (values) => {
        if (setLoading) {
            setLoading(true);

        }

        request.post(`${APIURLS.POSTPROJECTTYPE}`, values)
            .then(function (response) {

                if (response.status === 200) {
                    setLoading(false);
                    toast.success("Project Type Added Successfully");
                    form.resetFields();
                    dispatch(getProjecttype())
                    if (setProjectTo) {
                        setProjectTo(response.data.projectTypeId);
                    }

                    if (FormClose) {
                        FormClose();
                    }
                    if (handleupdatee) {
                        handleupdatee()
                    }
                    if (FormCloseSecond) {
                        FormCloseSecond()
                    }
                    if (FormCloseThird) {
                        FormCloseThird()
                    }
                }
            })
            .catch(function (error) {
                toast.error("Failed to add project type. Please try again.");

                // Handle other error-related tasks if needed

            })

    };
    const UpdateProjectType = (values) => {
        request.put(`${APIURLS.PUTPROJECTTYPE}/${projectTypeRecord?.projectTypeId}`, values)
            .then(function (response) {
                toast.success("Project Type Updated Successfully")
                form.resetFields();
                if (handleupdate) {
                    handleupdate()
                }
            })
            .catch(function (error) {
                toast.error("Updated Failed");
            });
    }


    const onReset = () => {
        form.resetFields()
        if (projectTypeRecord) {
            handleupdate()

        }

    };
    return (
        <Fragment>
            {/* {projectTypeRecord ? null : <CustomPageTitle Heading={'Add Project Type'} />} */}
            {/* <FormLoadingIndicator active={loading} /> */}
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
                    {projectTypeRecord ? null : <Col span={24} md={24}><CustomPageTitle Heading={'Add Project Type'} /></Col>}

                    <Col span={24} md={24}>
                        <CustomInput
                            name={"projectType"}
                            label={"project Type"}
                            placeholder={"Enter project Type"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter project Type!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24}>
                        <Label>Select Colour </Label><br />
                        <ColorPicker
                            format={formatHex}
                            value={colorHex}
                            onChange={setColorHex}
                            onFormatChange={setFormatHex}
                        />&nbsp;
                        HEX: <span>{hexString}</span>
                    </Col>
                    <Col></Col>
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

export default AddProjectType