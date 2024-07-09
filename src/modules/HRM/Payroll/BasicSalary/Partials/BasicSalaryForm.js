import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../components/CustomRow';
import { CustomInput } from '../../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import dayjs from "dayjs";
import { CustomSelect } from '../../../../components/Form/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getSalary } from '../../PayrollSlice';
import { getInitialEmployee, selectAllInitialEmployee } from '../../../EmployeeDetails/EmployeeSlice';
import request from '../../../../utils/request'; 
import { toast } from 'react-toastify';
import { APIURLS } from '../../../../utils/ApiUrls';
import { CustomInputNumber } from '../../../../components/Form/CustomInputNumber';

const BasicSalaryForm = ({ FormExternalClose, formReset, formname }) => {

    const ADD_SALARY_URL = 'salary/save'

    // ----- Define Form
    const [form] = Form.useForm();

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInitialEmployee())
    }, [])

    const employeeDetails = useSelector(selectAllInitialEmployee)

    const AllEmployee = employeeDetails?.map((empdetails) => ({
        label: `${empdetails.userName}`,
        value: `${empdetails.userName}`
    }));


    const SetEmployeeID = (value) => {
        const SelectedSalary = employeeDetails?.find((mem) => mem.userName === value)
        form.setFieldsValue({ employeeId: SelectedSalary?.employeeId })
    }



    const onFinish = (values) => {
        const newValues = { ...values, salaryDate: selectedDate }
        AddSalary(newValues)

    }


    const onFinishFailed = () => {

    }

    const onReset = () => {
        form.resetFields();
    };

    const handleDate = (e) => {
        setSelectedDate(e)
    }

    const AddSalary = (values) => {
        request.post(`${APIURLS.POSTBASICSALARY}`, values)
            .then(function (response) {
                toast.success("Added Basic Salary")
                form.resetFields();
                FormExternalClose()
                dispatch(getSalary())
            })
            .catch(function (error) {
                toast.error(" Failed");
            });
    }

    return (
        <Fragment>
            <Form
                form={form}
                name={formname}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <CustomRow space={[24, 24]}>
                    <Col span={24} md={12}>
                        <CustomInput label={'Entered By'} name={'enteredBy'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker onChange={handleDate} name={'salaryDate'} label={'Salary Date'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect options={AllEmployee} label={'Employee Name'} name={'userName'} onChange={SetEmployeeID} />
                        <CustomInput name={'employeeId'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber label={'Salary Amount'} name={'salaryAmount'} />
                    </Col>
                </CustomRow>
                <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
                    {/* {record ? ( */}
                    {/* <>
                            <Button.Primary text={'Update'} htmlType={'submit'} />
                            <Button.Danger text={'Cancel'} onClick={() => FormExternalClose()} />
                        </> */}
                    {/* ) : ( */}
                    <>
                        <Button.Success text={'Submit'} htmlType={'submit'} />
                        <Button.Danger text={'Reset'} onClick={() => onReset()} />
                    </>
                    {/* )} */}
                </Flex>
            </Form>
        </Fragment>
    )
}

export default BasicSalaryForm