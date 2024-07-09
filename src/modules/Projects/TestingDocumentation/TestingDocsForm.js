import { Col, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import Flex from '../../../components/Flex';
import Button from '../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import { CustomSelect } from '../../../components/Form/CustomSelect';
import { toast } from 'react-toastify';
import { RANDDURLS } from '../../../utils/ApiUrls/RandD';
import request from '../../../utils/request';
import { allprojectHeadDetails, getProjectHeadDetails } from '../ProjectSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllTestingDocuments } from '../AfterResearchDevelopment/AfterRandDSlice';
import { getDepartmentRole, selectAllDepartmentRole } from '../../HRM/Recruitments/RecruitmentSlice';



export const TestingDocsForm = ({ testrec, trigger, FormExternalCloseee }) => {
    console.log(testrec, 'testrectestrec');

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [headValue, setHeadValue] = useState([])
    const [deptValue, setDeptValue] = useState([])

    const onReset = () => {
        FormExternalCloseee()
    }

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    useEffect(() => {
        dispatch(getDepartmentRole())
    }, [])

    const AllDepartmentRole = useSelector(selectAllDepartmentRole);
    const AllProjectHead = useSelector(allprojectHeadDetails)

    const ProjectHeadOptions = AllProjectHead?.map((pro) => ({ label: pro.employeeName, value: pro.employeeId }))

    const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
    }));

    useEffect(() => {
        if (headValue) {
            form.setFieldsValue({ employeeId: headValue })
        }
    }, [headValue])

    useEffect(() => {
        if (deptValue) {
            form.setFieldsValue({ departmentId: deptValue })
        }
    }, [deptValue])

    useEffect(() => {
        if (testrec) {
            form.setFieldsValue({
                employeeId: testrec?.employeeId,
                userName: testrec?.userName,
                projectName: testrec?.projectName,
            })
        }
    }, [testrec, trigger])

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

    const handleProHead = (value) => {
        const FindProHead = AllProjectHead?.find((val) => val.employeeId === value)
        setHeadValue(FindProHead?.employeeId)
    }

    const handleHostDept = (value) => {
        const FindHostDept = AllDepartmentRole?.find((val) => val.departmentId === value)
        setDeptValue(FindHostDept?.departmentId)
    }

    const ChangeStatus = (value) => {
        console.log(value, 'DDDDDDDDD');

        request.put(`${RANDDURLS.PUT_ASSIGNING_PL_AFTER_TESTING}${testrec?.testingDocumentationId}`, value)
            .then(function (response) {
                toast.info("Assigned Project Lead Successfully !")
                dispatch(getAllTestingDocuments())
                FormExternalCloseee()
            })
            .catch(function (error) {
                if (error.response.status && error.response.status === 400) {
                    toast.error(error.response?.data)
                }
                else {
                    toast.error('Failed')
                }
            })
    }

    const onFinish = (value) => {
        ChangeStatus(value)
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
                initialValues={{}}
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
                            disabled={'true'}
                        />
                    </Col>

                    <Col span={24} md={12}>

                        <CustomSelect name={'userName'} label={'Select Project Head'} options={ProjectHeadOptions} onChange={handleProHead} disabled={"true"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Project Lead ',
                                }
                            ]}
                        />
                        <CustomInput name={'employeeId'} display={'none'}/>
                    </Col>

                    <Col span={24} md={12}>

                        <CustomSelect name={'departmentName'} label={'Select Department'} options={DepartmentRoleOptions} onChange={handleHostDept}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Department',
                                }
                            ]}
                        />
                        <CustomInput name={'departmentId'} />
                    </Col>

                    {/*                     
                    <Col span={24} md={12}>
                        <CustomSelect options={status} label={'Project Status'} />
                    </Col> */}

                </CustomRow>
                <Flex center={"true"} style={{ margin: '10px' }}>

                    <Button.Success text={"Add"} htmlType={"submit"} />
                    <Button.Danger
                        text={"Close"}
                        icon={<BiReset style={{ marginRight: "5px" }} />}
                        onClick={() => onReset()}
                    />
                </Flex>

            </Form>
        </Fragment>
    )
}
