import { Col, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { CustomSelect } from '../../../../components/Form/CustomSelect';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import dayjs from 'dayjs';
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import request from '../../../../utils/request';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';
import { getDepartmentRole, selectAllDepartmentRole } from '../../../HRM/Recruitments/RecruitmentSlice';
import { allprojectHeadDetails, getProjectHeadDetails } from '../../ProjectSlice';
import { RANDDURLS } from '../../../../utils/ApiUrls/RandD';
import { getManagementApprovedProjects } from '../DevelopmentSlice';


export const AssigningProjects = ({ researchRecord, FormExternalClose, formReset }) => {

    const dispatch = useDispatch();

    const [employeeOption, setEmployeeOption] = useState([])
    const [selectedCreatedDate, setSelectedCreatedDate] = useState(dayjs().format('YYYY-MM-DD'))

    useEffect(() => {
        form.resetFields(["employeeName", "employeeId", "departmentName", "departmentId"])
    }, [formReset])

    useEffect(() => {
        dispatch(getDepartmentRole());
    }, []);

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    useEffect(() => {

        
        if (researchRecord?.date !== null) {
            const dateFormat = "YYYY-MM-DD";
            const DOB = new Date(researchRecord?.date);
            form.setFieldsValue({date:dayjs(DOB)})
        }
    
        setSelectedCreatedDate(researchRecord?.date)
        
        if (researchRecord) {
            let findObject = []
            let emplOption = []
            form.setFieldsValue(researchRecord)
            form.setFieldsValue({ employeeName: researchRecord.userName })
            if (researchRecord.departmentName) {
                findObject = AllDepartmentRole?.find(
                    (item) => item.departmentId === researchRecord.departmentId
                );
                //                 emplOption = findObject?.departmentDetails?.map((value) => ({
                //                     label: value.userName,
                //                     value: value.employeeId,
                //                 }));

                //                 setEmployeeOption(emplOption);
            }

        }
    }, [researchRecord])

    const AllDepartmentRole = useSelector(selectAllDepartmentRole);
    const AllProjectHead = useSelector(allprojectHeadDetails)

    const ProjectHeadOptions = AllProjectHead?.map((pro) => ({ label: pro.employeeName, value: pro.employeeId }))

    const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
        label: emp.departmentName,
        value: emp.departmentId,
    }));

    const [form] = Form.useForm();

    const handleDeptChange = (e) => {
        form.setFieldsValue({ employeeName: null });
        form.setFieldsValue({ employeeId: null });
        form.setFieldsValue({ departmentId: e })
        const findObject = AllDepartmentRole?.find(
            (item) => item.departmentId === e
        );
        const emplOption = findObject?.departmentDetails?.map((value) => ({
            label: value.userName,
            value: value.employeeId,
        }));
        setEmployeeOption(emplOption)
    }

    const handleEmpChange = (value) => [
        form.setFieldsValue({ employeeId: value })
    ]

    const handleDate = (date) =>{
        setSelectedCreatedDate(date)
    }

    const onReset = () => {
        form.resetFields()
    }


    const onFinish = (values) => {
        const NewVal = {...values,date : selectedCreatedDate}
        updateResearchDev(NewVal)
    }
    const updateResearchDev = (values) => {
        request.put(`${RANDDURLS.PUT_ASSIGN_PROJECT}${researchRecord?.researchDevelopmentId}`, values)
            .then(resp => {
                toast.success('Assigned Project Successfully !')
                dispatch(getManagementApprovedProjects())
                FormExternalClose()
            })
            .catch(error => console.log(error, 'error'))
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
                initialValue={{date : dayjs()}}
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
                            disabled
                        />
                        <CustomInput display={'none'} name={'projectId'} />
                        <CustomInput display={'none'} name={'researchId'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker label={'Date'} placeholder={'date'} onChange={handleDate}
                            name={'date'} 
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Date !",
                                },
                            ]}
                            />

                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect onChange={handleDeptChange} options={DepartmentRoleOptions || []} label={'Department Name'} placeholder={'Select Department Name'}
                            name={'departmentName'} />
                        <CustomInput display={'none'} label={'Dept Id'} name={'departmentId'} />
                    </Col>
                    {/* <Col span={24} md={12}>
                        <CustomSelect onChange={handleEmpChange} options={employeeOption} label={'Employee Name'} placeholder={'employee name'}
                            name={'employeeName'} />
                        <CustomInput display={'none'} label={'Emp Id'} name={'employeeId'} />
                    </Col> */}
                    <Col span={24} md={12}>
                        <CustomSelect onChange={handleEmpChange} options={ProjectHeadOptions || []} label={'Project Head'} placeholder={'Select Project Head'}
                            name={'employeeName'} />
                        <CustomInput display={'none'} label={'Emp Id'} name={'employeeId'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput disabled label={'Type of Project'} placeholder={'type of project'}
                            name={'typeOfProject'} />
                    </Col>

                </CustomRow>
                <Flex center={"true"} gap={'20px'} style={{ margin: '10px' }}>

                    {researchRecord ?
                        <>

                            <Button.Primary text={"Update"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Cancel"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => FormExternalClose()}
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
