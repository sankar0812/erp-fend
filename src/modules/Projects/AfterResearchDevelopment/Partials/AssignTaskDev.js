import { Col, Form, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker';
import { CustomSelect } from '../../../../components/Form/CustomSelect';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { THEME } from '../../../../theme';
import { FiDelete, FiEdit } from 'react-icons/fi';
import request from '../../../../utils/request';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { TaskFormDev } from './TaskFormDev';



export const AssiginingTaskDev = ({projectRecord ,formReset,Close,getProjectDetails,GetTaskDetailsByRole}) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [updatedDate, setUpdatedDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [completedDate, setCompletedDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [dynamicTableData, setDynamicTableData] = useState([])
  const [editProduct, setEditProduct] = useState({}) //state to set table row in the product form
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    form.setFieldsValue(projectRecord)
    const date = dayjs(projectRecord.date)
    form.setFieldsValue({ date: date })
    setDynamicTableData(projectRecord.taskList)
  }, [projectRecord, formReset])

  const HandleEdit = (record, index) => {
    const newValus = {
      ...record,
      key: index + 1
    }

    setEditProduct(newValus)
    setShowDelete(true)

  }

  const onSubmit = () => {
    form.submit();
  }

  const onProductTabRowDelete = (index) => {

    // -----------------------  Delete Row Function
    // const newArray = dynamicTableData.filter(product => product.item !== record.item);
    // setDynamicTableData(newArray)
    // console.log('sikeeee');
    // ======================================

    const newArr = [];

    for (let i = 0; i < dynamicTableData.length; i++) {
      if (i !== index) {
        newArr.push(dynamicTableData[i]);
      }
    }
    if (projectRecord) {
      setDynamicTableData(newArr)
    }
    else {
      setDynamicTableData(newArr)
    }
  };

  const ProductColumns = [
    {
      title: '#',
      render: (text, record, index) => {

        return (
          (
            index != 0 &&
            <Flex aligncenter={"true"} gap={'20px'} style={{ alignItems: 'center' }}>
              <h4>{index + 1}</h4>
              <Flex>
                {/* <a href="#section1">
                  <TableIconHolder color={THEME.blue} size={'20px'} onClick={() => HandleEdit(record)}>
                    <Tooltip title={'Edit'}>
                      <FiEdit />
                    </Tooltip>
                  </TableIconHolder>
                </a> */}
                <Popconfirm
                  title="Confirmation"
                  description="Are You Sure About Removing This Added Task ?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onProductTabRowDelete(index)}
                >
                  {
                    !showDelete &&
                    <TableIconHolder color={THEME.red} size={'20px'}>
                      <Tooltip title={"Remove"}>
                        <FiDelete />
                      </Tooltip>
                    </TableIconHolder>
                  }
                </Popconfirm>
              </Flex>
            </Flex>
          )
        );
      },
    },
    {
      title: (
        <p>Reportee&nbsp;Name</p>
      ),
      render: (record) => {
        return (
          <p> {record.employeeReportName} (Assignee)</p>
        )
      }
    },
    {
      title: (
        <p>Employee&nbsp;Name</p>
      ),
      dataIndex: 'employeeName'
    },
    {
      title: (
        <p>Label</p>
      ),
      dataIndex: 'label',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
    },
    // {
    //   title: (
    //     <p>Project&nbsp;Key</p>
    //   ),
    //   dataIndex: 'projectKey',
    // },
    {
      title: (
        <p>Summary</p>
      ),
      dataIndex: 'summary',
    },
    {
      title: (
        <p>Updated Date</p>
      ),
      dataIndex: 'updated',
    },
    {
      title: (
        <p>Type</p>
      ),
      dataIndex: 'type',
    }
  ]


  const SetDynamicTable = (value) => {

    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        // If prev is not an array, create a new array with the current and new value
        return [prev, { ...value, key: 0 }];
      }
      // If prev is an array, create a new array with the previous elements and the new value
      // return [...prev, value];
      const maxKey = Math.max(...prev.map(item => item.key), 0);
      return [...prev, { ...value, key: maxKey + 1 }];
    });

  }

  const SetDynamicEditTable = (value) => {
    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        // If prev is not an array, create a new array with the current and new value
        return [{ ...value, key: 0 }];
      }

      const rowIndexToUpdate = dynamicTableData.findIndex((item) => item.item === value.item);

      if (rowIndexToUpdate !== -1) {
        // Create a copy of the previous array
        const updatedDynamicTable = [...prev];
        // Update the values for the row at the specified index
        updatedDynamicTable[rowIndexToUpdate] = { ...value };
        return updatedDynamicTable;
      }
      // Find the index of the row to update based on the key
      // If the row doesn't exist, simply add it to the end of the array
      const maxKey = Math.max(...prev.map((item) => item.key), 0);
      return [...prev, { ...value, key: maxKey + 1 }];
    });

  };


  const projectStatusOptions = [
    {
      label: `Completed`,
      value: 'completed',
      color: 'green',
    },
    {
      label: 'Cancelled',
      value: 'cancelled',
      color: 'red'
    }
  ]

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  const handleUpdatedDateChange = (date) => {
    setUpdatedDate(date);
  };
  const handleCompletedDateChange = (date) => {
    setCompletedDate(date);
  };

  const onReset = () => {
    form.resetFields()
  }

  const status = [
    {
      label: 'Approved',
      value: 'Approved'
    },
    {
      label: 'Rejected',
      value: 'Rejected'
    },
    {
      label: 'Todo',
      value: 'Todo'
    },
    {
      label: 'Cancelled',
      value: 'Cancelled'
    },
    {
      label: 'Pending',
      value: 'Pending'
    },
    {
      label: 'Completed',
      value: 'Completed'
    },
  ]

  const AssigningTaskPost = (value) => {

    request.put(`${APIURLS.PUT_PROJECT_DETAILS}${projectRecord?.taskId}`, value)
      .then(function (response) {
        toast.success("Assigned Project Task Details Successfully")
        Close()
        dispatch(getProjectDetails())
        GetTaskDetailsByRole()
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

  const onFinish = (values) => {

    const NewVal = { ...values, taskList: dynamicTableData }

    AssigningTaskPost(NewVal)
  }

  const onFinishFailed = () => {

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
        initialValues={
          {
            date: dayjs(),

          }

        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomInput
              name={"projectName"}
              label={"Project Name"}
              placeholder={"Enter Project Name"}
              disabled={'true'}
            />
            <CustomInput display={'none'} name={"projectId"} label={"Project id"} />
            <CustomInput display={'none'} name={"taskId"} label={"task id"} />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker label={'Date'}
              name={'date'} onChange={handleOnChange} disabled={'true'}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomSelect options={projectStatusOptions} tag label={'Project Status'} placeholder={'Status'} disabled={'true'}
              name={'projectStatus'} />

          </Col>
          <Col span={24} md={12}>
            <CustomInput label={'Type of Project'} placeholder={'type'} disabled={'true'}
              name={'typeOfProject'} />
          </Col>
        </CustomRow>
      </Form>

      <div style={{ margin: '20px' }}>
        <TaskFormDev SetDynamicTable={SetDynamicTable} SetDynamicEditTable={SetDynamicEditTable} projectRecord={projectRecord} formReset={formReset} />
      </div>

      <CustomStandardTable columns={ProductColumns} data={dynamicTableData} />

      <Flex center={"true"} style={{ margin: '10px' }}>

        {projectRecord ?
          <>
            <Button.Primary text={"Update"} onClick={onSubmit} />
            <Button.Danger
              text={"Cancel"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={() => onReset()}
            />

          </>
          : <>
            <Button.Success text={"Add"} onClick={onSubmit} />
            <Button.Danger
              text={"Reset"}
              icon={<BiReset style={{ marginRight: "5px" }} />}
              onClick={() => onReset()}
            />
          </>
        }
      </Flex>
    </Fragment>
  )
}
