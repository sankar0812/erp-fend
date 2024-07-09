import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import Button from '../../../../../components/Form/CustomButton';
import Flex from '../../../../../components/Flex';
import { CustomInput } from '../../../../../components/Form/CustomInput';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomCheckBox } from '../../../../../components/Form/CustomCheckBox';
import { CustomTimePicker } from '../../../../../components/Form/CustomTimePicker';
import dayjs from 'dayjs'
import request from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';

export const UpdateAttendanceForm = ({ FormExternalClosee, FormRest, record, updatetrigger, formname }) => {

  // ----- Define Form
  const [form] = Form.useForm();

  const [status, setStatus] = useState(null)
  const [inTimeSet, setInTimeSet] = useState(null)
  const [outTimeSet, setOutTimeSet] = useState(null)

  const [attendanceData, setAttendanceData] = useState({})

    // useEffect(() => {
    //   form.resetFields();
    // }, [form, updatetrigger]);


  useEffect(() => {
    if(record){
      setAttendanceData(record);    
      setStatus(record?.attstatus)
    }
  }, [record, updatetrigger, form]);


  useEffect(() => {
    setInTimeSet(attendanceData?.intime)
    setOutTimeSet(attendanceData?.outtime)

    if(attendanceData){
    const formattedInTime = attendanceData?.intime ? dayjs(attendanceData?.intime, 'HH:mm:A') : null
    const formattedOutTime = attendanceData?.outtime ? dayjs(attendanceData?.outtime, 'HH:mm:A') : null

    form.setFieldsValue(attendanceData)
      form.setFieldsValue({
        intime: formattedInTime,
        outtime: formattedOutTime,
        userName:attendanceData?.userName
      });
    }
  }, [attendanceData])
  

  useEffect(() => {
    if (!status) {
      form.resetFields(['intime'])
      form.resetFields(['outtime'])
      setInTimeSet('')
      setOutTimeSet('')
    }
  }, [status])


  const onFinish = (values) => {

    const newValue = {
      attstatus:values?.attstatus,
      employeeId:values?.employeeId,
      date:values?.date,
      intime: inTimeSet, 
      outtime: outTimeSet
    }

    postAttendance(newValue)
  };

  const postAttendance =(value)=>{
    request.put(`${APIURLS.PUTATT}/${record?.employeeId}/${record?.date}`,value)
    .then(function (response) {
      toast.info("Attendabnce Updated Successfully")
      FormRest();
    })
    .catch(function (error) { 
      console.log(error);
    });
  }

  const onFinishFailed = (value) => {
  };

  const onReset = () => {
    form.resetFields();
  };

  const statusChange = (e) => {
    setStatus(e.target.checked)
  }

  return (

    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      name={formname}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomInput
            name={"employeeId"}
            display={'none'}
            disabled={true}
          />

          <CustomInput label={'Employee Name'}
            name={"userName"}
            disabled={true}
          />
        </Col>

        <Col span={24} md={12}>
        <CustomInput label={'Date'}
            name={"date"}
            disabled={true}
          />
        </Col>

        <Col span={24} md={12}>
        <CustomInput label={'Phone Number'}
            name={"phoneNumber"}
            disabled={true}
          />
        </Col>

        <Col span={24} md={12}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>

            <h2 style={{ fontWeight: '600', fontSize: '14px', color: '#707070', lineHeight: '1.3' }}>Attendance Status</h2>

            <div style={{ paddingLeft: '10px' }}>
              <CustomCheckBox
                label={record && status ? <h3 style={{ color: 'Green' }}> Present</h3> : <h3 style={{ color: 'Red' }}>Absent</h3>}
                name={"attstatus"}
                onChange={(e) => statusChange(e)}
              />
            </div>
          </div>
        </Col>

        <Col span={24} md={12}>
          {
            status ? (
              <CustomTimePicker name={'intime'} label={'In - Time'}
                onChange={(_, date) => setInTimeSet(date)}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter In Time !!!',
                  },
                ]} />
             ) : (
               <CustomTimePicker name={'intime'} disabled={!status} label={'In - Time'}/>
             )
           }
        </Col>

        <Col span={24} md={12}>
          {
            status ? (
              <CustomTimePicker name={'outtime'} label={'Out - Time'}
                onChange={(_, date) => setOutTimeSet(date)}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter In Time !!!',
                  },
                ]} />
            ) : (
              <CustomTimePicker name={'outtime'} disabled={!status} label={'Out - Time'}/>
            )
          }
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        <Button.Primary text={"Update"} htmlType={"submit"} />
        <Button.Danger
          text={"Cancel"}
          onClick={() => FormExternalClosee()}
        />
      </Flex>
    </Form>
  )
}

