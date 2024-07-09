import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import Button from "../../../../components/Form/CustomButton";
import Flex from "../../../../components/Flex";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomInputNumber } from "../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomCardView } from "../../../../components/CustomCardView";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { getClientProfile, getProjecttype, selectProjectType, viewclientprofile } from "../../ClientSlice";
import { getInvoice, getinvoiceView } from "../../../HRM/Accounts/Invoice/invoiceSlice";

export const AddReceipt = ({ FormExternalClosee }) => {

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [invoiceData, setInvoiceData] = useState([])

    const ViewProjecttype = useSelector(selectProjectType)

    const Allinvoiceview = useSelector(getinvoiceView)

    useEffect(() => {
        dispatch(getInvoice())
    }, [])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }


    const handleCancel = () => {
        setIsModalOpen(false);

    }

    const ClientDetails = useSelector(viewclientprofile)

    useEffect(() => {
        dispatch(getClientProfile())
    }, [])


    const onFinish = (values) => {

        const record = { ...values, paymentDate: selectedDate }

        const newValues = {
            clientId: record.clientId,
            paymentDate: record.paymentDate,
            amount: record.amount,
            balance: record.balance,
            received_amount: record.received_amount,
            paymentType: record.paymentType,

        }
        AddReceipt(newValues);
    };

    const AddReceipt = (values) => {
        request.post(`${APIURLS.POSTRECEIPTS}`, values)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("RECEIPTS Added Successfully")
                    form.resetFields();
                    // FormExternalClosee()
                }
            })
            .catch(function (error) {
                toast.error("Adding Failed");
            });
    }

    const onReset = () => {
        form.resetFields()
    };


    const payementtype = [
        {
            label: 'Cash',
            value: 'Cash',
        },
        {
            label: 'Cheque',
            value: 'Cheque',

        },
        {
            label: 'Online Transactions',
            value: 'Online Transactions',

        }
    ]

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };
    const Invoiceoptions = Allinvoiceview?.map((item) => ({
        label: `${item.clientName} InvoiceNo (${item.invoiceId}) `,
        value: item.invoiceId
    }))

    // invoice id Find
    const handleChange = (key) => {
        const InvoiceID = Allinvoiceview?.find((item) => item.invoiceId === key)
        setInvoiceData(InvoiceID)
    }

    useEffect(() => {
        form.setFieldsValue({ invoiceId: invoiceData?.invoiceId })
        form.setFieldsValue({ amount: invoiceData?.amount })
        form.setFieldsValue({ balance: invoiceData?.balance })

    }, [invoiceData])



    return (
        <CustomCardView width={'1000'}>
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
                        duration: dayjs(),
                    }
                }
                onFinish={onFinish}
                autoComplete="off"
            >
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={24}>
                        <CustomPageTitle Heading={'Client Receipt:'} />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomSelect
                            name={"clientId"}
                            label={"Invoice Details"}
                            placeholder={"Enter Invoice details"}
                            options={Invoiceoptions}
                            onChange={handleChange}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Invoice details!",
                                },
                            ]}
                        />
                        <CustomInput name={'invoiceId'} display={'none'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDatePicker
                            name={"payementDate"}
                            label={"Payment Date"}
                            onChange={handleOnChange}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Your Payment Date!",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber
                            label={"Bill Amount"}
                            placeholder={"Bill Amount"}
                            name={"amount"}
                            disabled
                        // options={serviceId}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber
                            label={"Balance"}
                            placeholder={"Balance"}
                            name={"balance"}
                            disabled
                        // options={serviceId}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber
                            label={"Received Amount"}
                            placeholder={"Enter Received Amount"}
                            name={"received_amount"}
                        // options={serviceId}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect
                            label={"Payment Type"}
                            name={"paymentType"}
                            placeholder={'Select Payement Type'}
                            options={payementtype}
                        // onChange={handleFindId}
                        />
                    </Col>
                </CustomRow>
                <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
                    <Button.Primary text={"Save"} htmlType={"submit"} />
                    <Button.Danger
                        text={"Reset"}
                        icon={<BiReset style={{ marginRight: "5px" }} />}
                        onClick={() => onReset()}
                    />
                </Flex>

                <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} width={400} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

            </Form>
        </CustomCardView>

    );
};