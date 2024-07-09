import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomPageFormTitle, CustomPageTitle, } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { getInvoice, getInvoiceError, getInvoiceStatus, getinvoiceView } from "../invoiceSlice";
import { AddInvoice } from "./AddInvoice";
import { CustomPopconfirm } from "../../../../../components/CustomPopConfirm";
import { MdDelete } from "react-icons/md";
import request from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { CustomDateRangePicker } from "../../../../../components/Form/CustomDateRangePicker";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { ViewPrint } from "./ViewPrint";


export const ViewInvoice = () => {

    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);  // Search bar
    const [loading, setLoading] = useState(false)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [dateRange, setDateRange] = useState([]);  // Search Date filter

    const dispatch = useDispatch()

    const Allinvoiceview = useSelector(getinvoiceView)
    const ViewInvoiceStatus = useSelector(getInvoiceStatus)
    const ViewInvoiceError = useSelector(getInvoiceError)

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest();
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    useEffect(() => {
        setDataSource(Allinvoiceview)
    }, [Allinvoiceview])
    console.log(dataSource, 'dataSourcessssssssss');
    useEffect(() => {
        dispatch(getInvoice())
    }, [])

    // Delete invoice bill 

    const handleConfirm = (record) => {
        DeleteInvoicebill(record)
    }

    const dummycancel = () => {

    }

    const DeleteInvoicebill = (record) => {
        request.delete(`${APIURLS.DELETEINVOICE}/${record.invoiceId}`)
            .then((response) => {
                toast.info("Deleted Successfully")
                dispatch(getInvoice())
                setLoading(true)


            }).catch(error => {
                setLoading(false)
                toast.error("Failed")
            });
    };
    // ============

    //=======================Post Date filter =====================================

    const SearchReportdate = (values) => {
        request.post(`${APIURLS.POSTIVOICEVIEW}`, values)
            .then(function (response) {
                toast.success('Date Search')
                // form.resetFields();
                setDataSource(response.data)

            })
            .catch(function (error) {
                toast.error('Failed')

            });
    }
    const handleDatepost = () => {
        const Datevalues = {
            startDate: dateRange?.start_date,
            endDate: dateRange?.end_date
        }
        SearchReportdate(Datevalues)
    }
    console.log(dataSource, 'ddd');
    const handleDateRangeChange = (date) => {
        setDateRange(date);
    };

    const FormExternalClose = () => {
        handleOk();
        dispatch(getInvoice())
    };

    const ViewInvoice = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("View Invoices");
        setModalContent(
            <ViewPrint
                formname={"ViewInvoice"}
                FormExternalClosee={FormExternalClose}
                formReset={formReset}
                record={record}
                ViewEditTrigger={trigger}
            />
        );
        showModal();
    }

    const EditInvoice = (record) => {
        console.log(record,'rrr');
        setTrigger(trigger + 1)
        setModalTitle("Update Invoices");
        setModalContent(
            <AddInvoice
                formname={"AddInvoices"}
                FormExternalClosee={FormExternalClose}
                formReset={formReset}
                invoiceRecord={record}
                ViewEditTrigger={trigger}
            />
        );
        showModal();
    };

    const handlenavigate = (record) => {
        navigate(`/AddInvoice`)
    };

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'invoiceDate',
        },
        {
            title: "Client Name",
            dataIndex: "clientName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.clientName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.clientName).includes(value.toUpperCase())
                );
            },
        },
        // {
        //     title: "Project Name",
        //     dataIndex: "projectName",

        // },
        {
            title: "Bill No",
            dataIndex: "invoiceId",
        },
        {
            title: "Bill Amount",
            dataIndex: "amount",
        },
        {
            title: "Received Amount",
            dataIndex: "received",
        },
        {
            title: 'Payement Type',
            render: (record) => {
                return (
                    <Fragment>
                        {record?.paymentType === 'Cash' && <CustomTag title={'Cash'}
                            bordered={"true"} color={"success"} />}

                        {record?.paymentType === 'Cheque' && <CustomTag title={'Cheque'}
                            bordered={"true"} color={"yellow"} />}

                        {record?.paymentType === 'OnlineTransaction' && <CustomTag title={'Online Transaction'}
                            bordered={"true"} color={"blue"} />}
                    </Fragment>
                )
            }
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={() => ViewInvoice(record)} >
                            <FaFilePdf />
                        </TableIconHolder>
                        {/* {
                            record && record?.invoiceStatus === true ?
                                (<>

                                    <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => EditInvoice(record)} >
                                        <FiEdit />
                                    </TableIconHolder>
                                </>) : null
                        } */}
                        {/* <CustomPopconfirm
                            record={record}

                            confirm={handleConfirm}
                            cancel={dummycancel}
                            title={"Delete the invoices"}
                            description={"Are you sure to delete this Invoice bill?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdDelete loading={loading} />
                            </TableIconHolder>
                        </CustomPopconfirm> */}

                    </Flex>
                );
            },
        },
    ];

    let content;

    if (ViewInvoiceStatus === 'loading') {
        content = <CommonLoading />
    } else if (ViewInvoiceStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.invoiceId;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
        })} />
    } else if (ViewInvoiceStatus === 'failed') {
        content = <h2>{ViewInvoiceError}</h2>
    }



    return (
        <Fragment>
            <CustomPageTitle Heading={"View Invoices"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomDateRangePicker
                        onChange={handleDateRangeChange}
                        name={'range'}
                        value={dateRange}
                        rules={[{ required: true, message: 'Please Select the Date' }]}
                    />
                    <ButtonStandard.Primary text={'search'} onClick={() => handleDatepost()} />
                </Col>
                <Col span={24} md={14}>
                    <CustomRow space={[24, 24]}>
                        <Col span={24} md={16}></Col>
                        <Col span={24} md={8} style={{ float: "right" }}>
                            <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                                <Button.Primary
                                    style={{ borderRadius: "6px" }}
                                    icon={<FiPlus style={{ fontSize: "20px" }} />}
                                    text={"Add"}
                                    onClick={handlenavigate}
                                />
                            </Flex>
                        </Col>
                    </CustomRow>
                </Col>
            </CustomRow>

            {content}
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={1200}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    );
};
