import { Card, Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomSelect } from '../../../../components/Form/CustomSelect';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import dayjs from 'dayjs';
import { CustomRadioButton } from '../../../../components/Form/CustomRadioButton';
import { CustomRow } from '../../../../components/CustomRow';
import { AllEmpandTraineeUnderDept, getAllEmpAndTraineeUnderDept } from '../AfterRandDSlice';
import { toast } from 'react-toastify';


export const TaskFormDev = ({ projectRecord, SetDynamicTable, formReset }) => {

  const dispatch = useDispatch()
  const [allDept, setAllDept] = useState([])
  const [allDeptTrainee, setAllDeptTrainee] = useState([])
  const [form] = Form.useForm();
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [selectedUpdatedDate, setSelectedUpdatedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [selectedEmp, setSelectedEmp] = useState({})
  const [selectedTrainee, setSelectedTrainee] = useState({})
  const [traineeorEmp, setTraineeOrEmp] = useState([])
  const [emptrigger, setEmpTrigger] = useState([])
  const [showEmporTrainee, setShowEmporTrainee] = useState(false)
  const [selectedDeptId, setSelectedDeptId] = useState([])
  const [selectedDeptDetails, setSelectedDeptDetails] = useState([])
  const [employeeDetailsOpt, setEmployeeDetailsOpt] = useState([])
  const [traineeDetailsOpt, setTraineeDetailsOpt] = useState([])
  const [mapemployeeOpt, setMapEmployeeOpt] = useState([])
  const [maptraineeOpt, setMapTraineeOpt] = useState([])

  const onReset = () => {
    form.resetFields()
  }

  useEffect(() => {
    dispatch(getAllEmpAndTraineeUnderDept())
  }, [])

  const AllEmpAndTraineeUnderDeptDetails = useSelector(AllEmpandTraineeUnderDept)

  // useEffect(() => {
  //   const empOptions = employeeDetailsOpt?.map((emp) => ({ label: emp?.userName, value: emp?.employeeId }))
  //   setMapEmployeeOpt(empOptions)
  //   const traineeOptions = traineeDetailsOpt?.map((tr) => ({ label: tr?.userName, value: tr?.traineeId }))
  //   setMapTraineeOpt(traineeOptions)
  // }, [employeeDetailsOpt,traineeDetailsOpt])


  const empOptions = employeeDetailsOpt
    ?.filter(emp => emp?.userName !== null)
    ?.map(emp => ({ label: emp?.userName, value: emp?.employeeId }));

  const traineeOptions = traineeDetailsOpt
    ?.filter(tr => tr?.userName !== null)
    ?.map(tr => ({ label: tr?.userName, value: tr?.traineeId }));


  // useEffect(() => {
  //   const SelectedDeptDetailsSetting = AllEmpAndTraineeUnderDeptDetails?.find((dep) => dep.departmentId === selectedDeptId);
  //   setSelectedDeptDetails(prevSelectedDeptDetails => {
  //     console.log(SelectedDeptDetailsSetting, 'SelectedDeptDetailsSetting');
  //     return SelectedDeptDetailsSetting;
  //   });
  // }, [AllEmpAndTraineeUnderDeptDetails, selectedDeptId]);

  useEffect(() => {
    setEmployeeDetailsOpt(selectedDeptDetails?.employeeDetails)
    setTraineeDetailsOpt(selectedDeptDetails?.traineeDetails)
  }, [selectedDeptDetails])

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

  // const deptOptions = [
  //   {
  //     label: 'Hold',
  //     value: 'hold',
  //     color: '#A4ABB6'
  //   },
  //   {
  //     label: 'Pending',
  //     value: 'Pending',
  //     color: '#FFB302'
  //   },
  //   {
  //     label: 'OnProcess',
  //     value: 'onProcess',
  //     color: '#2DCCFF'
  //   },
  //   {
  //     label: 'Todo',
  //     value: 'todo',
  //     color: '#FCE83A'
  //   },
  //   {
  //     label: 'Cancelled',
  //     value: 'Cancelled',
  //     color: '#FF3838'
  //   },
  //   {
  //     label: 'Completed',
  //     value: 'Completed',
  //     color: '#56F000'
  //   },
  // ]

  const TraineeOrEmp = [
    {
      label: 'Employee',
      value: 'Employee'
    },
    {
      label: 'Trainee',
      value: 'Trainee'
    },
  ]

  useEffect(() => {
    form.setFieldsValue({ employeeName: selectedEmp?.label })
  }, [selectedEmp, emptrigger])

  useEffect(() => {
    form.setFieldsValue({ traineeName: selectedTrainee?.label })
  }, [selectedTrainee, emptrigger])

  // useEffect(() => {
  //   if (selectedEmp) {
  //     form.setFieldsValue({ employeeName: selectedEmp?.label })
  //   } else if(selectedTrainee){
  //     form.setFieldsValue({ traineeName: selectedTrainee?.label })
  //   }
  // }, [selectedEmp, selectedTrainee])

  const deptOptions = projectRecord?.departmentDetails?.map((dep) => ({ label: dep?.departmentName, value: dep?.departmentId }))

  // const seenIds = new Set();

  // const deptOptions = projectRecord?.taskList?.reduce((options, dep) => {
  //   const departmentId = dep?.departmentId;
  //   if (departmentId && !seenIds.has(departmentId)) {
  //     options.push({ label: dep?.departmentName, value: departmentId });
  //     seenIds.add(departmentId);
  //   }
  //   return options;
  // }, []);

  // const empOptions = employeeDetailsOpt?.map((emp) => ({ label: emp?.userName, value: emp?.employeeId }))
  // const traineeOptions = traineeDetailsOpt?.map((tr) => ({ label: tr?.userName, value: tr?.traineeId }))

  // SELECT DEPT STARTS =========== >
  const handleSelectedDept = (val) => {

    setSelectedDeptId(val)

    setShowEmporTrainee(true)
    form.resetFields(['employeeId'])
    form.resetFields(['traineeName'])
    form.resetFields(['employeeName'])
    const SelectedDeptDetailsSetting = AllEmpAndTraineeUnderDeptDetails?.find((dep) => dep.departmentId == val);
    setSelectedDeptDetails(SelectedDeptDetailsSetting)

  }

  // SELECT DEPT ENDS =========== >

  const handleEmpChange = (e) => {

    // form.setFieldsValue({ departmentId: projectRecord.taskList[0].departmentId })
    form.setFieldsValue({ employeeReportId: projectRecord.taskList[0].employeeReportId })
    form.setFieldsValue({ employeeReportName: projectRecord.taskList[0].employeeReportName })

    const EmpName = empOptions?.find((emp) => emp.value === e)
    setSelectedEmp(EmpName)
    setSelectedTrainee([])
    setEmpTrigger(emptrigger + 1)

  }

  const handleTraineeChange = (e) => {

    // form.setFieldsValue({ departmentId: projectRecord.taskList[0].departmentId })
    form.setFieldsValue({ employeeReportId: projectRecord.taskList[0].employeeReportId })
    form.setFieldsValue({ employeeReportName: projectRecord.taskList[0].employeeReportName })

    const traineeName = traineeOptions?.find((emp) => emp.value === e)

    setSelectedTrainee(traineeName)
    setSelectedEmp([])
    setEmpTrigger(emptrigger + 1)
  }

  const handleTraineeOrEmp = (e) => {
    form.getFieldValue({ employeeId: null, traineeId: null })
    setTraineeOrEmp(e.target.value)
    if (traineeorEmp === 'Trainee') {
      form.resetFields(['employeeId'])
      form.resetFields(['traineeName'])
      // form.getFieldValue({ employeeId: null })
    }
    else if (traineeorEmp === 'Employee') {
      form.resetFields(['traineeId'])
      form.resetFields(['employeeName'])
      // form.getFieldValue({ traineeId: null })

    } else {
      console.log('check');
    }
  }

  const handleStartDate = (date) => {
    setSelectedStartDate(date)
  }

  const handleUpdatedDate = (date) => {
    setSelectedUpdatedDate(date)
    // const StartDateConst = form.getFieldsValue("startDate")
    // console.log(StartDateConst,'StartDateConst');
    // if ( selectedUpdatedDate < selectedStartDate) {
    //   toast.error("From Date Can't Be Greater than Deadline Date")
    // }
  }
  const onFinish = (values) => {
    const newval = { ...values, startDate: selectedStartDate, updated: selectedUpdatedDate, employeeName: values?.traineeName || values?.employeeName, projectStatus: "pending" }

    if ( selectedUpdatedDate < selectedStartDate) {
      toast.info("From Date Can't Be Greater than Deadline Date")
    }
    else{
      SetDynamicTable(newval)
      form.resetFields()
      setTraineeOrEmp([])
    }
  }
  return (
    <Card>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          startDate : dayjs(),
          updated : dayjs(),

        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>

          <Col span={24} md={8}>
            <CustomSelect options={deptOptions || []} onChange={handleSelectedDept} label={'Select Department'} name={'departmentId'}
              rules={[
                {
                  required: true,
                  message: 'Please Select Type ',
                }
              ]}
            />
          </Col>
          {
            showEmporTrainee ? (<>
              <Col span={24} md={4}>
                <CustomRadioButton options={TraineeOrEmp} onChange={handleTraineeOrEmp} label={'Select'} name={'traineeoremp'}
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Type ',
                    }
                  ]}
                />
              </Col>
            </>) : null
          }
          <Col span={24} md={12}>

            {
              traineeorEmp === 'Employee' ? (<>
                <CustomSelect onChange={handleEmpChange} options={empOptions || []} label={'Employee Name'} placeholder={'Select Employee'}
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Employee',
                    }
                  ]}
                  name={'employeeId'} />
                <CustomInput label={'Employee '} name={'employeeName'} display={'none'} />
              </>) :
                traineeorEmp === 'Trainee' ?
                  (
                    <>
                      <CustomSelect onChange={handleTraineeChange} options={traineeOptions || []} label={'Trainee Name'} placeholder={'Select Trainee'}
                        name={'traineeId'}
                        rules={[
                          {
                            required: true,
                            message: 'Please Select Trainee ',
                          }
                        ]}
                      />
                      <CustomInput label={'Trainee '} name={'traineeName'} display={'none'} />
                    </>
                  )
                  : null
            }

            {/* <CustomInput label={'Department id'} name={'departmentId'} /> */}
            <CustomInput label={'Employee report ID'} name={'employeeReportId'} display={'none'} />
            <CustomInput label={'Employee Reportee'} name={'employeeReportName'} display={'none'} />
            {/* <CustomInput label={'Employee '} name={'employeeName'} /> */}
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Label'} placeholder={'label'}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Label ',
                }
              ]}

              name={'label'} />

          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Category'} placeholder={'category'}
              name={'category'} />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker onChange={handleStartDate} label={'Start Date'} placeholder={'select'}
              name={'startDate'}
              rules={[
                {
                  required: true,
                  message: 'Please Select Start Date ',
                }
              ]} />

          </Col>
          <Col span={24} md={12}>
            <CustomSelect options={priority} tag label={'Priority'} placeholder={'priority'}
              name={'priority'} />

          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Comments'} placeholder={'comments'}
              name={'comments'} />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Summary'} placeholder={'summary'}
              name={'summary'} />

          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker onChange={handleUpdatedDate} label={'Deadline Date Date'} placeholder={'type'}
              name={'updated'}
              rules={[
                {
                  required: true,
                  message: 'Please Select Deadline Date ',
                }
              ]} />
          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Type'} placeholder={'type'}
              name={'type'} />
          </Col>

          <Col span={24} md={12}>
            {/* <CustomSelect options={status} tag label={'Project Status'} placeholder={'Status'}
              name={'projectStatus'} /> */}
          </Col>

          <Col span={24} md={24}>
            <Flex center={'true'} style={{ margin: '10px' }} gap={'20px'}>

              <Button.Primary text={"Add"} htmlType={"submit"} />
              <Button.Danger
                text={"Cancel"}
                icon={<BiReset style={{ marginRight: "5px" }} />}
                onClick={() => onReset()}
              />
            </Flex>
          </Col>
        </CustomRow>
      </Form>
    </Card>
  )
}
