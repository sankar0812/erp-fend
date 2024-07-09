import { Col, Form } from "antd"
import Button from "../../../../components/Form/CustomButton"
import Flex from "../../../../components/Flex"
import { CustomRow } from "../../../../components/CustomRow"
import request from "../../../../utils/request"
import { toast } from "react-toastify"
import { CustomMultiSelect } from "../../../../components/Form/CustomMultiSelect"
import { CustomSelect } from "../../../../components/Form/CustomSelect"
import { useDispatch, useSelector } from "react-redux"
import { allprojectHeadDetails, getProjectHeadDetails } from "../../ProjectSlice"
import { getDepartmentRole, selectAllDepartmentRole } from "../../../HRM/Recruitments/RecruitmentSlice"
import { useEffect, useState } from "react"
import { getAllProjectsForTesting, getApprovedRandDProjects, getApprovedTestingProjects } from "../AfterRandDSlice"
import { RANDDURLS } from "../../../../utils/ApiUrls/RandD"

export const AssigningDeptAndPLForDev = ({ devrecord, FormExternalClose, devtrigger }) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [maxDept, setMaxDept] = useState(false)

    // useEffect(() => {
    //     // form.setFieldsValue(devrecord)
    //     form.setFieldsValue({ departmentName: devrecord?.departmentList?.map((dept) => dept?.departmentName) })
    //     form.setFieldsValue({ departmentId: devrecord?.departmentList?.map((dept) => dept?.departmentId) })
    //     form.setFieldsValue({ userName: devrecord?.departmentList[0]?.userName })
    // }, [devrecord, devtrigger])

    useEffect(() => {
        form.resetFields()
    }, [devtrigger])

    useEffect(() => {
        if (maxDept === "true") {
            toast.info("Please Select Three or Less than 3 Departments")
        }
    }, [])

    useEffect(() => {
        dispatch(getDepartmentRole());
    }, []);

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    const AllDepartmentRole = useSelector(selectAllDepartmentRole);
    const AllProjectHead = useSelector(allprojectHeadDetails)

    const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
    }));

    const ProjectHeadOptions = AllProjectHead?.map((pro) => ({ label: pro.employeeName, value: pro.employeeId }))

    const handleDepartment = (value) => {
        if (value && value.length >= 3) {
            toast.info("Please Select Maximum of Three Departments");
        }
        else {
            console.log('NO');
        }
    };

    const onReset = () => {
        FormExternalClose()
    }

    const onFinish = (value) => {
        ChangeStatus(value)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const ChangeStatus = (value) => {
        const newval = { employeeId: value?.userName, departmentList: value?.departmentName || value?.departmentId }

        function transformData(newval) {
            const transformedArray = newval.departmentList.map(departmentId => ({
                departmentId,
                employeeId: value?.userName,
            }));

            return {
                departmentList: transformedArray,
                employeeId : value?.userName ,
            };
        }
        const transformedData = transformData(newval);

        request.put(`${RANDDURLS.PUT_ASSIGN_PROJECT_DEPT_PL_DEV}${devrecord?.projectAssigningId}`, transformedData)
            .then(function (response) {
                toast.info("Changed Project Status Successfully")
                FormExternalClose()
                dispatch(getApprovedRandDProjects())
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

    return (
        <Form
            name='AssignDeptForTesting'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={12}>

                    <CustomMultiSelect name={'departmentName'} label={'Select Department'} options={DepartmentRoleOptions} maxTagCount={3} onChange={handleDepartment}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Departments ',
                            },
                            {
                                validator: (_, value) => {
                                    if (value && value.length <= 3) { // Check if the number of selected options is less than or equal to 3
                                        setMaxDept(true)
                                        return Promise.resolve();

                                    }
                                    return Promise.reject('Please Select up to three Departments'); // Display error message if more than 3 options are selected

                                }
                            }
                        ]}
                    />
                </Col>


                <Col span={24} md={12}>

                    <CustomSelect name={'userName'} label={'Select Project Head'} options={ProjectHeadOptions}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Project Lead ',
                            }
                        ]}
                    />

                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Update'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}

export const AssigningPLforTesting = ({ devrecord, FormExternalClose, devtrigger }) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        form.resetFields()
    }, [devtrigger])

    useEffect(() => {
        dispatch(getDepartmentRole());
    }, []);

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    const AllProjectHead = useSelector(allprojectHeadDetails)

    const ProjectHeadOptions = AllProjectHead?.map((pro) => ({ label: pro.employeeName, value: pro.employeeId }))


    const onReset = () => {
        FormExternalClose()
    }

    const onFinish = (value) => {
        ChangeStatus(value)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const ChangeStatus = (value) => {

        request.put(`${RANDDURLS.PUT_ASSIGN_PL_FOR_TESTING}${devrecord?.projectDocumentationId}`, value)
            .then(function (response) {
                toast.info("Assigned Project Lead Successfully !")
                FormExternalClose()
                dispatch(getAllProjectsForTesting())
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

    return (
        <Form
            name='AssignPLforTesting'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={12}>

                    <CustomSelect name={'employeeId'} label={'Select Project Head'} options={ProjectHeadOptions}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Project Lead ',
                            }
                        ]}
                    />

                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Update'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}

export const AssigningDeptForTesting = ({ devrecord, FormExternalClose, devtrigger }) => {


    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        form.resetFields()
    }, [devtrigger])

    useEffect(() => {
        dispatch(getDepartmentRole());
    }, []);

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    const AllDepartmentRole = useSelector(selectAllDepartmentRole);
    const AllProjectHead = useSelector(allprojectHeadDetails)

    const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
    }));

    const ProjectHeadOptions = AllProjectHead?.map((pro) => ({ label: pro.employeeName, value: pro.employeeId }))

    const onReset = () => {
        FormExternalClose()
    }

    const onFinish = (value) => {
        ChangeStatus(value)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const ChangeStatus = (value) => {

        request.put(`${RANDDURLS.PUT_ASSIGN_PL_AND_DEPT_FOR_TESTING}${devrecord?.testingId}`, value)
            .then(function (response) {
                toast.info("Assigned Project Lead and Dept Successfully !")
                FormExternalClose()
                dispatch(getApprovedTestingProjects())
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

    return (
        <Form
            name='AssignPLforTesting'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={12}>

                    <CustomSelect name={'departmentId'} label={'Select Department'} options={DepartmentRoleOptions}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Department ',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>

                    <CustomSelect name={'employeeId'} label={'Select Project Head'} options={ProjectHeadOptions}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Project Lead ',
                            }
                        ]}
                    />

                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Update'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}