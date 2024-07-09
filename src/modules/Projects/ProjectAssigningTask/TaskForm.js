import { Card, Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomRow } from '../../../components/CustomRow'
import { CustomSelect } from '../../../components/Form/CustomSelect';
import { CustomInput } from '../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker';
import { useSelector } from 'react-redux';
import { getDepartmentRole, selectAllDepartmentRole } from '../../HRM/Recruitments/RecruitmentSlice';
import { useDispatch } from 'react-redux';
import Flex from '../../../components/Flex';
import Button from '../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import dayjs from 'dayjs';
import { CustomRadioButton } from '../../../components/Form/CustomRadioButton';
import { getTrainingByDept, selectAllTrainingByDept } from '../../HRM/Training/TrainingSlice';
import { toast } from 'react-toastify';

export const TaskForm = ({ projectRecord, SetDynamicTable, formReset }) => {
  console.log(projectRecord, 'TYTYTY');
  const dispatch = useDispatch()
  const [allDept, setAllDept] = useState([])
  const [allDeptTrainee, setAllDeptTrainee] = useState([])
  const [employeeOpt, setEmployeeOpt] = useState([])
  const [traineeOpt, setTraineeOpt] = useState([])
  const [form] = Form.useForm();
  const [selectedStartDate, setSelectedStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [selectedUpdatedDate, setSelectedUpdatedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [selectedEmp, setSelectedEmp] = useState({})
  const [selectedTrainee, setSelectedTrainee] = useState({})
  const [traineeorEmp, setTraineeOrEmp] = useState([])
  const [emptrigger, setEmpTrigger] = useState([])

  useEffect(() => {
    form.resetFields()
  }, [formReset])

  useEffect(() => {
    dispatch(getDepartmentRole());
  }, []);

  useEffect(() => {
    dispatch(getTrainingByDept())
  }, [])

  const findObject = allDept?.find(
    (item) => item.departmentId === projectRecord.taskList[0].departmentId
  );

  const AllDepartmentRole = useSelector(selectAllDepartmentRole);
  const AllDepartmentTrainess = useSelector(selectAllTrainingByDept)

  useEffect(() => {
    setAllDept(AllDepartmentRole)
  }, [AllDepartmentRole, emptrigger])

  useEffect(() => {
    setAllDeptTrainee(AllDepartmentTrainess)
  }, [AllDepartmentTrainess, emptrigger])

  useEffect(() => {

    const employeeOption = findObject?.departmentDetails?.map((value) => ({
      label: value.userName,
      value: value.employeeId,
    }));

    setEmployeeOpt(employeeOption)
  }, [projectRecord, allDept])

  useEffect(() => {
    const findObjectTrainee = allDeptTrainee?.find(
      (item) => item.departmentId === projectRecord.taskList[0].departmentId
    );

    const traineeOption = findObjectTrainee?.departmentDetails?.map((value) => ({
      label: value.userName,
      value: value.traineeId,
    }));
    setTraineeOpt(traineeOption)
  }, [projectRecord, allDeptTrainee])

  const onReset = () => {
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue({ employeeName: selectedEmp?.label })
  }, [selectedEmp, emptrigger])
  console.log(selectedEmp, 'selectedEmpselectedEmp');

  useEffect(() => {
    form.setFieldsValue({ traineeName: selectedTrainee?.label })
  }, [selectedTrainee, emptrigger])

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

  const status = [
    {
      label: 'Hold',
      value: 'hold',
      color: '#A4ABB6'
    },
    {
      label: 'Pending',
      value: 'Pending',
      color: '#FFB302'
    },
    {
      label: 'OnProcess',
      value: 'onProcess',
      color: '#2DCCFF'
    },
    {
      label: 'Todo',
      value: 'todo',
      color: '#FCE83A'
    },
    {
      label: 'Cancelled',
      value: 'Cancelled',
      color: '#FF3838'
    },
    {
      label: 'Completed',
      value: 'Completed',
      color: '#56F000'
    },
  ]

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



  // useEffect(() => {
  //   if (selectedEmp) {
  //     form.setFieldsValue({ employeeName: selectedEmp?.label })
  //   } else if(selectedTrainee){
  //     form.setFieldsValue({ employeeName: selectedTrainee?.label })
  //   }
  // }, [selectedEmp, selectedTrainee])


  const handleEmpChange = (e) => {

    form.setFieldsValue({ departmentId: projectRecord.taskList[0].departmentId })
    form.setFieldsValue({ employeeReportId: projectRecord.taskList[0].employeeReportId })
    form.setFieldsValue({ employeeReportName: projectRecord.taskList[0].employeeReportName })

    const EmpName = employeeOpt?.find((emp) => emp.value === e)
    setSelectedEmp(EmpName)
    console.log(EmpName, 'EmpNameEmpName');
    setSelectedTrainee([])
    setEmpTrigger(emptrigger + 1)

  }

  const handleTraineeChange = (e) => {

    form.setFieldsValue({ departmentId: projectRecord.taskList[0].departmentId })
    form.setFieldsValue({ employeeReportId: projectRecord.taskList[0].employeeReportId })
    form.setFieldsValue({ employeeReportName: projectRecord.taskList[0].employeeReportName })
    form.setFieldsValue({ projectStatus: projectRecord?.projectStatus })

    const traineeName = traineeOpt?.find((emp) => emp.value === e)

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
      console.log('checkkkkkkkkk');
    }
  }

  const handleStartDate = (date) => {
    setSelectedStartDate(date)
  }

  const handleUpdatedDate = (date) => {
    setSelectedUpdatedDate(date)
  }
  const onFinish = (values) => {
    console.log(values, 'valuesvaluesvaluesvalues');
    const newval = { ...values, startDate: selectedStartDate, updated: selectedUpdatedDate, employeeName: values?.traineeName || values?.employeeName, projectStatus: "pending" }

    if (selectedUpdatedDate < selectedStartDate) {
      toast.info("From Date Can't Be Greater than Deadline Date")
    }
    else {
      SetDynamicTable(newval)
      console.log(newval, 'newvalnewval');
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
          startDate: dayjs(),
          updated: dayjs(),
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>
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
          <Col span={24} md={8}>

            {
              traineeorEmp === 'Employee' ? (<>
                <CustomSelect onChange={handleEmpChange} options={employeeOpt || []} label={'Employee Name'} placeholder={'Select Employee'}
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
                      <CustomSelect onChange={handleTraineeChange} options={traineeOpt || []} label={'Trainee Name'} placeholder={'Select Trainee'}
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

            <CustomInput label={'Department id'} name={'departmentId'} display={'none'} />
            <CustomInput label={'Employee report ID'} name={'employeeReportId'} display={'none'} />
            <CustomInput label={'Employee Reportee '} name={'employeeReportName'} display={'none'} />
            {/* <CustomInput label={'projectStatus'} name={'projectStatus'} /> */}
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
              name={'startDate'} />

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
              name={'updated'} />
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
