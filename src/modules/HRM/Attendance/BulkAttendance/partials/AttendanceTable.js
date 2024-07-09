import React, { useEffect, useState } from 'react'
import { Form } from 'antd';
import { CustomTable } from '../../../../../components/Form/CustomTable'
import { CustomInput } from '../../../../../components/Form/CustomInput';
import { Fragment } from 'react';
import { CustomCheckBox } from '../../../../../components/Form/CustomCheckBox';
import Button from '../../../../../components/Form/CustomButton';
import { CustomTimePicker } from '../../../../../components/Form/CustomTimePicker';
import dayjs from "dayjs";
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';


export const AttendanceTable = ({ data, shiftData, sendDate }) => {

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  const [dataSource, setDataSource] = useState([]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: <h4>SL&nbsp;No</h4>,
      render: (text, record, index) => {
        return (
          <span>{index + 1}</span>
        )
      }
    },
    {
      title: <h4>Employee&nbsp;Id</h4>,
      dataIndex: 'employeeId',
      render: (text, record) => {
        return (
          <>
            <span>{record.employeeId}</span>
            <CustomInput name={`employeeId${record.employeeId}`} display={'none'} />
          </>
        )
      }
    },
    {
      title: <h4>Employee&nbsp;Name</h4>,
      dataIndex: 'userName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phoneNumber',
    // },
    // {
    //   title: 'Role',
    //   dataIndex: 'roleType',
    // },
    {
      title: 'Status',
      render: (_, record) => {
        const isRowSelected = selectedRows.includes(record.employeeId);
        return (
          <Fragment>
            {isRowSelected ? <h3 style={{ color: 'Green' }}> Present</h3> : <h3 style={{ color: 'Red' }}>Absent</h3>}
          </Fragment>
        )
      }
    },
    {
      title: 'Attendance',
      children: [
        {
          title: 'Present',
          render: (_, record) => {
            const isRowSelected = selectedRows.includes(record.employeeId);
            return (
              <CustomCheckBox
                name={`attstatus${record.employeeId}`}
                checked={isRowSelected}
                onChange={() => handleActivate(record)}
              />
            );
          }
        },
        {
          title: 'In Time',
          render: (_, record) => {
            const isRowSelected = selectedRows.includes(record.employeeId);

            return (
              <Fragment>
                {
                  isRowSelected ? (
                    <CustomTimePicker width={150}
                      name={`intime${record.employeeId}`} onChange={(e) => handleInTime(e, record)}
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter In Time !!!',
                        },

                      ]} />
                  ) : (
                    <CustomTimePicker width={150}
                      name={`intime${record.employeeId}`} disabled={!isRowSelected} />
                  )
                }
              </Fragment>
            )
          }
        },
        {
          title: 'Out Time',
          render: (_, record) => {
            const isRowSelected = selectedRows.includes(record.employeeId);

            return (
              <Fragment>
                {
                  isRowSelected ? (
                    <CustomTimePicker width={150}
                      name={`outtime${record.employeeId}`} onChange={(e) => handleOutTime(e, record)}
                      rules={[
                        {
                          required: true,
                          message: 'Please Enter In Time !!!',
                        },

                      ]} />
                  ) : (
                    <CustomTimePicker width={150}
                      name={`outtime${record.employeeId}`} disabled={!isRowSelected} />
                  )
                }
              </Fragment>
            )
          }
        },
      ]
    },
  ]

  useEffect(() => {
    if (data) {
      setDataSource(data)
    }
  }, [data])

  const handleActivate = (record) => {

    if (selectedRows.includes(record.employeeId)) {
      // If the record.employeeId is in the selectedRows array, remove it using filter
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((item) => item !== record.employeeId)
      );

      // If the record.employeeId is in the selectedValue array, remove it using filter
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.filter((item) => item.id !== record.employeeId)
      );

      const fieldName = `attstatus${record.employeeId}`;
      form.setFieldsValue({ [fieldName]: true });

    } else {
      // If the record.employeeId is not in the selectedRows array, add it using spread operator
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, record.employeeId]);

      // If the record.employeeId is not in the selectedValue array, add it with the section value
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue,
        { id: record.employeeId, attstatus: "" }, // You can set the initial section value here.
      ]);
    }
  };

  const handleInTime = (value, record) => {

    if (selectedRows.includes(record.employeeId)) {

      // If the record.employeeId is in the selectedValue array, remove it using filter
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.filter((item) => item.id !== record.employeeId)
      );

      const fieldName = `intime${record.employeeId}`;
      form.setFieldsValue({ [fieldName]: value });

    } else {

      // If the record.employeeId is not in the selectedValue array, add it with the section value
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue,
        { id: record.employeeId, intime: "" }, // You can set the initial section value here.
      ]);
    }
  };

  const handleOutTime = (value, record) => {

    if (selectedRows.includes(record.employeeId)) {

      // If the record.employeeId is in the selectedValue array, remove it using filter
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.filter((item) => item.id !== record.employeeId)
      );

      const fieldName = `outtime${record.employeeId}`;
      form.setFieldsValue({ [fieldName]: value });

    } else {

      // If the record.employeeId is not in the selectedValue array, add it with the section value
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue,
        { id: record.employeeId, outtime: "" }, // You can set the initial section value here.
      ]);
    }
  };



  useEffect(() => {
    dataSource.forEach(record => {
      form.setFieldsValue({ [`employeeId${record.employeeId}`]: record.employeeId });
      form.setFieldsValue({ [`attstatus${record.employeeId}`]: record.attstatus });
      form.setFieldsValue({ [`intime${record.employeeId}`]: record.intime });
      form.setFieldsValue({ [`outtime${record.employeeId}`]: record.outtime });
    });
  }, [dataSource])


  useEffect(() => {
    dataSource.forEach(record => {

      if (!selectedRows.includes(record.employeeId)) {
        form.resetFields([`attstatus${record.employeeId}`]);
        form.resetFields([`intime${record.employeeId}`]);
        form.resetFields([`outtime${record.employeeId}`]);
      }
    });
  }, [selectedRows])


  const onFinish = (values) => {
    let result = {
      attendanceDate: sendDate,
      attendance: Object.entries(values)
        .filter(([key]) => key.startsWith('employeeId'))
        .map(([key, employeeId]) => {
          const index = key.match(/\d+/)[0];
          const attstatuskey = `attstatus${index}`;
          const intimekey = `intime${index}`;
          const outtimekey = `outtime${index}`;
          return {
            employeeId,
            attstatus: values[attstatuskey] !== undefined ? values[attstatuskey] : false,
            date: sendDate,
            intime: values[intimekey] !== undefined ? dayjs(values[intimekey]).format('h:mm A') : '',
            outtime: values[outtimekey] !== undefined ? dayjs(values[outtimekey]).format('h:mm A') : '',
          };
        }),
    };

    PostAttendance(result);

  };

  const PostAttendance = (value) => {
    request.post('attendance1/save', value)
      .then(response => {
        toast.success('Transaction Successs!')
        // form.resetFields()
        setSelectedRows([])
      })
      .catch(error => {
        console.log(error, 'error')
        if (error.response.status === 409) {
          toast.error(error.response.data)
        }
      })
  }

  const onFinishFailed = (errorInfo) => {};

  const ResetAttendance = () => {
    setSelectedRows([])
  }

  return (

    <Form
      form={form}
      name="attendance"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">

      {
        shiftData?.length != 0 && (
          <div>
            <span>{shiftData?.inTime}</span>
          </div>
        )
      }
      <CustomTable columns={columns} data={dataSource} rowKey={item => item.employeeId} />

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button.Success text={'Submit'} htmlType={'submit'} />
        <Button.Danger text={'Cancel'} onClick={ResetAttendance} />
      </div>
    </Form>
  )
}