import { Card, Col, Divider, Form } from 'antd'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { CustomRow } from '../../../../../../components/CustomRow'
import { CustomInput } from '../../../../../../components/Form/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialEmployee, selectAllInitialEmployee } from '../../../../EmployeeDetails/EmployeeSlice'
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker'
import { CustomTextArea } from '../../../../../../components/Form/CustomTextArea'
import Flex from '../../../../../../components/Flex'
import Button from '../../../../../../components/Form/CustomButton'
import dayjs from "dayjs";
import request from '../../../../../../utils/request'
import { toast } from 'react-toastify'
import { selectCurrentId } from '../../../../../Auth/authSlice'
import { APIURLS } from '../../../../../../utils/ApiUrls/Hrm'

const UpdateResignations = ({ UpdateTrigger }) => {


    const [form] = Form.useForm()

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));  //  from date
    const [tooDate, setSelectedToDate] = useState(dayjs().format("YYYY-MM-DD"));     // to date
    const [resigDate, setResigDate] = useState(dayjs().format("YYYY-MM-DD"));     // resignation date
    const [UpdateData, setUpDateData] = useState([])                              // use update state


    const dispatch = useDispatch()
    const EmployeeeId = useSelector(selectCurrentId)           //  Emp ID


    const handleResignationsDate = (e) => {
        setResigDate(e)
    }

    const handleDate = (e) => {
        setSelectedDate(e)
    }

    const handleToDate = (e) => {
        setSelectedToDate(e)
    }

    const onReset = () => {
        form.resetFields();
    };


    useEffect(() => {
        const resignationsParam = 'resignationsview'
        request.get(`${APIURLS.RESIGNATIONVIEW}`, { params: { resignationsParam } })
            .then(function (response) {
                form.resetFields();
                setUpDateData(response.data)
            })
            .catch(function (error) {
            });

    }, [])

    const FindGetEmpResignations = UpdateData?.find(item => item?.employee_id == EmployeeeId)  //  Get Resignations Details Based on EmployeeId

    useEffect(() => {
        form.setFieldsValue(FindGetEmpResignations)
        const ResignationDate = new Date(FindGetEmpResignations?.resignations_date)
        const dateFormat = 'YYYY-MM-DD';
        const FrmDateee = dayjs(ResignationDate).format(dateFormat);

        form.setFieldsValue({
            resignations_date: dayjs(FrmDateee),
        })
    }, [FindGetEmpResignations, UpdateTrigger])


    const UpdateResignations = (values) => {
        request.put(`${APIURLS.PUTRESIGNATIONS}`, values)
            .then(function (response) {
                toast.success("Resignations Updated")
                form.resetFields();
                dispatch(getInitialEmployee())
            })
            .catch(function (error) {
                toast.error("Updation Failed");
            });
    }


    const SelectEmp = useSelector(selectAllInitialEmployee)

    const AllEmployee = SelectEmp?.map((empdetails) => ({
        label: `${empdetails.userName}`,
        value: `${empdetails.userName}`
    }));

    const onFinish = (values) => {
        const newValues = { ...values, noticeDate: selectedDate, toDate: tooDate, resignationsDate: resigDate, employeeId: EmployeeeId }
        UpdateResignations(newValues);
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
                        resignationsDate: dayjs
                    }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <CustomRow space={[24, 24]}>
                    <Col span={24} md={24}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'blue' }}>User ID :&nbsp;{FindGetEmpResignations?.user_id}</h3>
                    </Col>

                    <Col span={24} md={12}>
                        <CustomDatePicker label={'Resignation Date'} name={'resignationsDate'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Select a Resignation Date",
                                },
                            ]}
                            onChange={handleResignationsDate} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Type'} name={'type'} placeholder={'Type'} />
                    </Col>
                    {/* <Col span={24} md={12}>
                        <CustomDatePicker label={'Notice From Date'} name={'noticeDate'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Select a Notice From Date",
                                },
                            ]}
                            onChange={handleDate}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker label={'Notice To Date'} name={'toDate'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Select a Notice To Date",
                                },
                            ]}
                            onChange={handleToDate} />
                    </Col> */}

                    <Col span={24} md={12}>
                        <CustomTextArea label={'Reason'} name={'reason'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Reason",
                                },
                            ]}
                        />
                    </Col>

                </CustomRow>
                <Flex gap={'20px'} center={"true"} style={{ margin: '10px 0px' }}>

                    <Button.Primary text={'Update'} htmlType={'submit'} />
                    <Button.Danger text={'Cancel'} onClick={() => onReset()} />
                </Flex>
            </Form>

        </Fragment>
    )
}

export default UpdateResignations