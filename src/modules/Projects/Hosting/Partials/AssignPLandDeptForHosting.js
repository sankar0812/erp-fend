import { useDispatch } from "react-redux";
import { getDepartmentRole, selectAllDepartmentRole } from "../../../HRM/Recruitments/RecruitmentSlice";
import { allprojectHeadDetails, getProjectHeadDetails } from "../../ProjectSlice";
import { Col, Form } from "antd";
import Button from "../../../../components/Form/CustomButton";
import Flex from "../../../../components/Flex";
import { CustomRow } from "../../../../components/CustomRow";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import request from "../../../../utils/request";
import { RANDDURLS } from "../../../../utils/ApiUrls/RandD";
import { toast } from "react-toastify";
import { getAllProjectsForHosting } from "../../AfterResearchDevelopment/AfterRandDSlice";
import { CustomSelect } from "../../../../components/Form/CustomSelect";

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
console.log(value,'hostval');
        request.put(`${RANDDURLS.PUT_ASSIGN_PL_AND_DEPT_FOR_HOSTING}${devrecord?.hostingId}`, value)
            .then(function (response) {
                toast.info("Assigned Project Lead and Dept Successfully !")
                FormExternalClose()
                dispatch(getAllProjectsForHosting())
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
            name='AssignPLforHosting'
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