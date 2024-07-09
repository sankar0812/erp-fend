import { Col, Form } from "antd";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import { toast } from "react-toastify";
import Flex from "../../../../components/Flex";
import { CustomRow } from "../../../../components/CustomRow";
import Button from "../../../../components/Form/CustomButton";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { allEmpUnderDeptDetails, getEmpUnderDepartmentDetails } from "../../ProjectSlice";
import { useSelector } from "react-redux";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { getTrainingByDept, selectAllTrainingByDept } from "../../../HRM/Training/TrainingSlice";
import { CustomRadioButton } from "../../../../components/Form/CustomRadioButton";

export const EditTaskDetails = ({ taskrecord, close, GetTaskDetails, trigger }) => {
    console.log(taskrecord, 'taskrecordtaskrecord');

    const dispatch = useDispatch()

    const [form] = Form.useForm()
    const [empDetails, setEmpDetails] = useState([])
    const [traineeDetails, setTraineeDetails] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [selectedCompletedDate, setSelectedCompletedDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [selectedUpdatedDate, setSelectedUpdatedDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [selectedCreatedDate, setSelectedCreatedDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [traineeorEmp, setTraineeOrEmp] = useState([])
    // const [taskRadio, setTaskRadio] = useState(false)

    // useEffect(() => {
    //     form.resetFields(['startDate'])
    // }, [trigger, taskrecord])

    useEffect(() => {
        dispatch(getEmpUnderDepartmentDetails())
    }, [taskrecord])

    useEffect(() => {
        dispatch(getTrainingByDept())
    }, [taskrecord])

    const EmpUnderDept = useSelector(allEmpUnderDeptDetails)
    const AllDepartmentTrainess = useSelector(selectAllTrainingByDept)

    const onReset = () => {
        close()
    }
    useEffect(() => {
        form.setFieldsValue({ employeeName: selectedEmployee?.label })
    }, [selectedEmployee])

    const priority = [
        {
            label: `High`,
            value: 'high',
            color: 'red',
        },
        {
            label: 'Medium',
            value: 'medium',
            color: 'orange'
        },
        {
            label: 'Low',
            value: 'low',
            color: 'yellow'
        }
    ]
    // useEffect(() => {
    //     if (taskrecord && taskrecord?.roleName === 'Training') {
    //         setTaskRadio(true)
    //     }
    // }, [taskrecord])

    useEffect(() => {
        if (taskrecord) {
            setTaskDetails()
        }
    }, [taskrecord, trigger])

    const setTaskDetails = () => {
        const dateFormat = 'YYYY/MM/DD';

        if (taskrecord?.startDate !== null) {
            const taskDate = new Date(taskrecord?.startDate);
            const taskDatee = dayjs(taskDate).format(dateFormat);
            form.setFieldsValue({ startDate: dayjs(taskDatee, dateFormat), })
        }

        if (taskrecord?.startDate !== null) {
            const updatedDate = new Date(taskrecord?.updated);
            const updatedDatee = dayjs(updatedDate).format(dateFormat);
            form.setFieldsValue({ updated: dayjs(updatedDatee, dateFormat), })
        }

        if (taskrecord && taskrecord?.roleName === 'TL') {
            setTraineeOrEmp("Employee")
            form.setFieldsValue({ roleName: 'Employee' })
        }
        else {
            setTraineeOrEmp(taskrecord?.roleName)
            form.setFieldsValue({ roleName: taskrecord?.roleName })
        }

        form.setFieldsValue({
            category: taskrecord?.category,
            departmentName: taskrecord?.departmentName,
            summary: taskrecord?.summary,
            priority: taskrecord?.priority,
            type: taskrecord?.type,
            label: taskrecord?.label,
            comments: taskrecord?.comments,
            employeeReportId: taskrecord?.employeeReportId,
            employeeReportName: taskrecord?.employeeReportName,
            projectKey: taskrecord?.projectKey,
            departmentId: taskrecord?.departmentId,
            employeeId: taskrecord?.employeeId,
            cancellationReason: taskrecord?.cancellationReason,
            holdReason: taskrecord?.holdReason,
            projectKey: taskrecord?.projectKey,
            projectStatus: taskrecord?.projectStatus,
            traineeId: taskrecord?.traineeId,
            // roleName : taskrecord?.roleName,
        })
        form.setFieldsValue({ employeeName: taskrecord?.employeeName })
    }

    const EmployeeOptions = EmpUnderDept?.find((val) => val?.departmentId === taskrecord?.departmentId)
    const TraineeOptions = AllDepartmentTrainess?.find((val) => val?.departmentId === taskrecord?.departmentId)

    const TraineeOrEmp = [
        {
            label: 'Employee',
            value: 'Employee'
        },
        {
            label: 'Trainee',
            value: 'Training'
        },
    ]
    useEffect(() => {
        setEmpDetails(EmployeeOptions)
    }, [EmployeeOptions])

    useEffect(() => {
        setTraineeDetails(TraineeOptions)
    }, [TraineeOptions])

    const EmpUnderDetails = empDetails?.departmentDetails?.map((item) => ({ label: item?.userName, value: item?.employeeId }))
    const TraineeUnderDetails = traineeDetails?.departmentDetails?.map((item) => ({ label: item?.userName, value: item?.traineeId }))

    const handleEmp = (emp) => {
        const SelectedEmpOptions = EmpUnderDetails?.find((val) => val.value === emp)
        setSelectedEmployee(SelectedEmpOptions)
    }

    const handleTraineeOrEmp = (e) => {
        setTraineeOrEmp(e.target.value)
        if (traineeorEmp === 'Training') {
            // setTaskRadio(false)
            // form.resetFields(['employeeId'])
        }
        else {
            // setTaskRadio(false)
            // form.resetFields(['traineeId'])
        }
    }

    const handleStartDate = (date) => {
        setSelectedStartDate(date)
    }

    const handleCreatedDate = (date) => {
        setSelectedCreatedDate(date)
    }

    const handleCompletedDate = (date) => {
        setSelectedCompletedDate(date)
    }

    const handleUpdatedDate = (date) => {
        setSelectedUpdatedDate(date)
    }

    const onFinish = (value) => {
        const newvalue = {
            ...value, startDate: selectedStartDate, updated: selectedUpdatedDate,
            created: selectedCompletedDate,
        }
        console.log(newvalue, 'newvaluenewvalue');
        EditTask(newvalue)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const EditTask = (value) => {

        request.put(`${APIURLS.PUT_TASK_DETAILS}${taskrecord?.taskListId}`, value)
            .then(function (response) {
                toast.info("Updated Task Details Successfully")
                close()
                GetTaskDetails()
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
            name='EditTaskDetails'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                startDate: dayjs(),
                updated: dayjs(),
                completedDate: dayjs(),
                created: dayjs(),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={12}>

                    <CustomInput label={'Category'} name={'category'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Category ',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>

                    <CustomInput label={'Department'} name={'departmentName'} disabled={'true'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Department ',
                            }
                        ]}
                    />
                    <CustomInput label={'Department'} name={'departmentId'} display={'none'} />
                </Col>

                <Col span={24} md={4}>

                    <CustomRadioButton options={TraineeOrEmp} onChange={handleTraineeOrEmp} label={'Select'} name={'roleName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select Employee / Trainee',
                            }
                        ]}
                    />
         </Col>
         <Col span={24} md={8}>
                    {
                        traineeorEmp === 'Employee' ?
                            (<>
                                <CustomSelect label={'Employee Name'} name={'employeeId'} options={EmpUnderDetails || []} onChange={handleEmp}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter The Employee Name ',
                                        }
                                    ]}
                                />
                            </>) :
                            traineeorEmp === 'Training' ?
                                (<>
                                    <CustomSelect label={'Trainee Name'} name={'traineeId'} options={TraineeUnderDetails || []} onChange={handleEmp}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter The Trainee Name ',
                                            }
                                        ]}
                                    />
                                </>) : null
                    }
                    <CustomInput label={'Employee'} name={'employeeName'} display={'none'} />
       
                    </Col>
                <Col span={24} md={12}>

                    <CustomSelect options={priority} tag label={'Priority'} placeholder={'priority'}
                        name={'priority'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Select the Priority',
                            }
                        ]} />

                </Col>

                {/* <Col span={24} md={12}>

                    <CustomInput label={'Type'} name={'type'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Type ',
                            }
                        ]}
                    />

                </Col> */}

                <Col span={24} md={12}>

                    <CustomInput label={'Employee Report Name'} name={'employeeReportName'} disabled={'true'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Employee Report Name ',
                            }
                        ]}
                    />
                    <CustomInput label={'Employee Report Name'} name={'employeeReportId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>

                    <CustomInput label={'Project Status'} name={'projectStatus'} disabled={'true'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Project Status ',
                            }
                        ]}
                    />
                </Col>

                <Col span={24} md={12}>

                    <CustomInput label={'Project Key'} name={'projectKey'} disabled={'true'} />
                    <CustomInput label={'Employee Report Name'} name={'employeeReportId'} display={'none'} />
                </Col>

                <Col span={24} md={12}>

                    <CustomDatePicker label={'Start Date'} name={'startDate'} onChange={handleStartDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Start Date ',
                            }
                        ]}
                    />

                </Col>

                {/* <Col span={24} md={12}>

                    <CustomDatePicker label={'Created Date'} name={'created'} onChange={handleCreatedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Created Date ',
                            }
                        ]}
                    />

                </Col> */}
                {/* 
                <Col span={24} md={12}>

                    <CustomDatePicker label={'Completed Date'} name={'completedDate'} onChange={handleCompletedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Completed Date ',
                            }
                        ]}
                    />

                </Col> */}

                <Col span={24} md={12}>

                    <CustomDatePicker label={'Deadline Date'} name={'updated'} onChange={handleUpdatedDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Updated Date ',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>

                    <CustomTextArea label={'Summary'} name={'summary'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Summary',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>

                    <CustomTextArea label={'Comments'} name={'comments'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Comments',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={12}>

                    <CustomTextArea label={'Label'} name={'label'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Label',
                            }
                        ]}
                    />

                </Col>
                {
                    taskrecord && taskrecord?.cancellationReason ? (
                        <Col span={24} md={12}>
                            <CustomTextArea
                                label={'Cancellation Reason'}
                                name={'cancellationReason'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter The Cancellation Reason ',
                                    },
                                ]}
                            />
                        </Col>
                    ) : null
                }

                {
                    taskrecord && taskrecord?.holdReason ? (
                        <Col span={24} md={12}>
                            <CustomTextArea
                                label={'Hold Reason'}
                                name={'holdReason'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter The Hold Reason',
                                    },
                                ]}
                            />
                        </Col>
                    ) : null
                }
            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Primary text={'Update'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form >
    )
}
