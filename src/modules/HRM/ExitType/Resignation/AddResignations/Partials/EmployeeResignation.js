import { Card, Col, Divider, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomRow } from '../../../../../../components/CustomRow'
import { CustomInput } from '../../../../../../components/Form/CustomInput'
import { CustomSelect } from '../../../../../../components/Form/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialEmployee, selectAllInitialEmployee } from '../../../../EmployeeDetails/EmployeeSlice'
import { CustomCardView } from '../../../../../../components/CustomCardView'
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker'
import { CustomPageFormSubTitle, CustomPageTitle } from '../../../../../../components/CustomPageTitle'
import { CustomTextArea } from '../../../../../../components/Form/CustomTextArea'
import Flex from '../../../../../../components/Flex'
import Button from '../../../../../../components/Form/CustomButton'
import dayjs from "dayjs";
import request from '../../../../../../utils/request'
import { toast } from 'react-toastify'
import { selectCurrentId } from '../../../../../Auth/authSlice'
import { APIURLS } from '../../../../../../utils/ApiUrls/Hrm'
import ButtonStandard from '../../../../../../components/Form/CustomStandardButton'
import UpdateResignations from './UpdateResignations'
import { CustomModal } from '../../../../../../components/CustomModal'

const EmployeeResignation = () => {

    const [form] = Form.useForm()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));  //  from date
    const [tooDate, setSelectedToDate] = useState(dayjs().format("YYYY-MM-DD"));     // to date
    const [resigDate, setResigDate] = useState(dayjs().format("YYYY-MM-DD"));     // resignation date
    const [trigger, setTrigger] = useState(0)


    const dispatch = useDispatch()
    const EmployeeeId = useSelector(selectCurrentId)          // Emp ID

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
        dispatch(getInitialEmployee())
    }, [])
    const AddResignations = (values) => {
        request.post(`${APIURLS.POSTRESINATIONS}`, values)
            .then(function (response) {
                toast.success("Added Employeee Resignation")
                form.resetFields();
                // FormExternalClose()
                dispatch(getInitialEmployee())
            })
            .catch(function (error) {
                toast.error(" Failed");
            });
    }


    const SelectEmp = useSelector(selectAllInitialEmployee)

    const AllEmployee = SelectEmp?.map((empdetails) => ({
        label: `${empdetails.userName}`,
        value: `${empdetails.userName}`
    }));

    const onFinish = (values) => {
        const newValues = { ...values, noticeDate: selectedDate, toDate: tooDate, resignationsDate: resigDate, employeeId: EmployeeeId }
        AddResignations(newValues);

    }

    const onFinishFailed = () => {

    }
    const HandleEdit = (record) => {
        setTrigger(trigger +1)
        setModalTitle("Update Resignations");
        setModalContent(
            <UpdateResignations
                formname={"UpdateResignations"}
                viewdesrec={record}
                UpdateTrigger={trigger}
            />
        );
        showModal();
    };

    return (
        <Fragment>

            <CustomPageTitle Heading={"Resignation"} />
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
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={8} >
                        <div style={{ margin: '50px 0px' }}>
                            <h3 style={{ fontSize: '18px' }}>Fill Resignations :</h3><br />
                            <p style={{ color: 'gray' }}>Resignations Date and Reason here (Notice From & To Date)</p>
                        </div>
                        <CustomRow space={[24, 24]}>
                            <Col span={24}>
                                <Card>
                                    <CustomPageFormSubTitle Heading={'Update Resignations :'} /><br />
                                    <Flex center={'true'}>
                                        <ButtonStandard.Primary text={'Update'} onClick={() => HandleEdit()} />
                                    </Flex>
                                </Card>
                            </Col>
                        </CustomRow>

                    </Col>

                    <Col span={24} md={16}>
                        <CustomCardView>
                            <CustomPageFormSubTitle Heading={'Resignations Details :'} /><br />
                            <CustomRow space={[24, 24]}>
                                <Col span={24} md={20}>
                                    <CustomDatePicker label={'Resignation Date'} name={'resignationsDate'}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Select a Resignation Date",
                                            },
                                        ]}
                                        onChange={handleResignationsDate} />
                                </Col>
                                <Col span={24} md={20}>
                                    <CustomInput label={'Type'} name={'type'} placeholder={'Type'} />
                                </Col>
                                <Col span={24} md={20}>
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
                                <Col span={24} md={20}>
                                    <CustomDatePicker label={'Notice To Date'} name={'toDate'}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Select a Notice To Date",
                                            },
                                        ]}
                                        onChange={handleToDate} />
                                </Col>

                            </CustomRow>
                        </CustomCardView>
                        <Divider />

                        <Card >

                            <CustomRow>
                                    <CustomPageFormSubTitle Heading={'Add Reason :'} />
                                <Col span={24} md={20}>
                                    <CustomTextArea  name={'reason'}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please Enter Reason",
                                            },
                                        ]}
                                    />
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
                        </Card>
                    </Col>

                </CustomRow>
            </Form>
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={600}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />

        </Fragment>
    )
}

export default EmployeeResignation