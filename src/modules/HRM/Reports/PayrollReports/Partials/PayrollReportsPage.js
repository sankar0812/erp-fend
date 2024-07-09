import React, { Fragment, useEffect, useState } from 'react'
import { Col, Form } from 'antd';
import { CustomRow } from '../../../../../components/CustomRow';
import dayjs from 'dayjs';
import {CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonStandard from '../../../../../components/Form/CustomStandardButton';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { getPayrollReports, getPayrollReportsError, getPayrollReportsStatus, selectPayrollReports } from '../../ReportsSlice';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker';
import { toast } from 'react-toastify';
import Flex from '../../../../../components/Flex';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import request from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';


export const PayrollReportsPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState([])
    const [selectedMonth, setselectedMonth] = useState(null);
    const [searchTexts, setSearchTexts] = useState([]);

    const handleSearchs = (value) => {
        setSearchTexts(value);
      };
    
    const selectDateChange = (dates) => {
        if (dates) {
            setselectedMonth(dates);
            GetPayrollDetails(dates);
        }
    };

    const GetPayrollDetails = (selectedMonth) => {

        const [year, month] = selectedMonth.split('-');
        const send = {
            department: 'Payroll',
            month: month,
            year: year,
        }
        request.get(`${APIURLS.GETPAYROLLREPORTS}`, { params: send })
            .then(function (response) {
                setDataSource(response.data)
                toast.success("Details Fetched Successfully . . . ");

            })
            .catch(function (error) {
                console.error(error);
            })
    };


    const onFinish = (values) => {
        const record = { ...values, month: selectedMonth, year: selectedMonth }

        GetPayrollDetails(record)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        dispatch(getPayrollReports())
    }, [])

    const PayrollReportsDetails = useSelector(selectPayrollReports)
    const PayrollReportsStatus = useSelector(getPayrollReportsStatus)
    const PayrollError = useSelector(getPayrollReportsError)

    useEffect(() => {
        setDataSource(PayrollReportsDetails)
    }, [PayrollReportsDetails])

    const TableColumn = [
        {
            title: 'Sl No',
            render: (item, value, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'paymentDate',
        },
        {
            title: 'Department',
            dataIndex: 'departmentName',
            filteredValue: searchTexts ? [searchTexts] : null,  
            onFilter: (value, record) => {
                return (
                    String(record.departmentName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.departmentName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: 'Staff Name',
            dataIndex: 'employeeName',
        },
        {
            title: 'Basic Salary ',
            dataIndex: 'salaryAmount',
        },
        {
            title: 'Allowance',
            dataIndex: 'allowance',
        },
        {
            title: 'Net Pay',
            dataIndex: 'netPay',
        }
    ];

    let content;

    if (PayrollReportsStatus === 'loading') {
        content = <CommonLoading />
    } else if (PayrollReportsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.salaryTypeListId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })} />
    } else if (PayrollReportsStatus === 'failed') {
        content = <h2>
            {PayrollError}
        </h2>
    }

    const handleRowClick = (record) => {
        navigate(`/payslip/${record.employeeId}`)
      };

    return (
        <Fragment>
            <CustomPageTitle Heading={'Payroll Report'} /><br />
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
                        from_date: dayjs(),
                        to_date: dayjs(),
                    }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

                <CustomRow space={[24, 24]}>

                    <Col span={24} md={12}>
                        {/* <b>Choose</b>&nbsp;&nbsp;
                    </Col>
                    <Col span={24} md={9}> */}
                        <CustomDatePicker picker={'month'} name={'month&year'} onChange={selectDateChange} />
                    </Col>
                    <Col span={24} md={12} style={{textAlign:'flex-end'}}>
                        <ButtonStandard.Primary text={'Add Payroll'} style={{ marginRight: '10px' }} onClick={() => navigate(`/payroll`)} />
                    </Col>
                </CustomRow>

            </Form>

            <Flex spacearound={"true"} gap={"20px"} style={{marginTop:'7px'}}>
                <CustomInputSearch 
                    placeholder={"Search by Department"}
                    value={searchTexts}
                    onChange={(e) => handleSearchs(e.target.value)}
                />
            </Flex>

            <div style={{ marginTop: '7px' }}>
                {content}
            </div>
        </Fragment >
    )
}

