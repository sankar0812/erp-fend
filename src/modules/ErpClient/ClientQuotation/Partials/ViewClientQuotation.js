import React, { Fragment, useEffect, useState } from 'react'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import { Col, Tooltip } from 'antd'
import CustomInputSearch from '../../../../components/Form/CustomInputSearch'
import { FiEye } from 'react-icons/fi'
import { CustomModal } from '../../../../components/CustomModal'
import Flex from '../../../../components/Flex'
import { useDispatch, useSelector } from 'react-redux'
import { AddClientQuotation } from './AddClientQuotation'
import { allClientQuotationError, allClientQuotationStatus, getAllClientQuotationView, selectAllClientQuotation } from '../../ErpClientSlice'
import { CommonLoading } from '../../../../components/CommonLoading'
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm'
import request from '../../../../utils/request'
import { toast } from 'react-toastify'
import { THEME } from '../../../../theme'
import { AiOutlineFileExcel } from 'react-icons/ai';
import { BsClipboardCheck, BsFileEarmarkPdfFill } from 'react-icons/bs'
import { selectAllBusinessProfile } from '../../../BusinessProfile/BusinessSlice'
import { selectCurrentId, selectCurrentRole } from '../../../Auth/authSlice'
import { APIURLS } from '../../../../utils/ApiUrls/Client'
import { CustomTag } from '../../../../components/Form/CustomTag'
import { RejectedReasonModal } from './RejectedReasonModal'
import { TableIconHolder } from '../../../../components/CommonStyled'
import ViewClientResearchPDF from './ViewClientResearchPDF'
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole'

export const ViewClientQuotation = () => {

    const [dataSourceforclient, setDataSourceforClient] = useState([])
    const [dataSourceforadmin, setDataSourceforadmin] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);
    const [quotationDetails, setQuotationDetails] = useState([])
    const [trigger, setTrigger] = useState([])
    const [currentrole, setCurrentRole] = useState(false)

    const dispatch = useDispatch()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const CurrentRoleName = useSelector(selectCurrentRole)


    useEffect(() => {
        if (CurrentRoleName === USER_ROLES.CLIENT) {
            setCurrentRole(true)
        }
    }, [CurrentRoleName])

    useEffect(() => {
        dispatch(getAllClientQuotationView())
    }, [])


    useEffect(() => {
        GetClientQuotation()
    }, [])

    const allClientQuotation = useSelector(selectAllClientQuotation)
    const allClientQuotStatus = useSelector(allClientQuotationStatus)
    const allClientQuotError = useSelector(allClientQuotationError)

    const businessProfile = useSelector(selectAllBusinessProfile)

    const EnteringId = useSelector(selectCurrentId)

    useEffect(() => {
        setDataSourceforadmin(allClientQuotation)
    }, [allClientQuotation])

    // useEffect(() => {
    //     getQuot()
    // }, [])

    // const getQuot = () => {
    //     dispatch(getClientQuotation())
    //     dispatch(getBusinessProfile())
    // }

    const GetClientQuotation = () => {
        request.get(`${APIURLS.GET_CLIENT_QUOTATION}/${EnteringId}`)
            .then(function (response) {
                setQuotationDetails(response?.data)
            })
            .catch(function (error) {
            })
    }

    useEffect(() => {
        setDataSourceforClient(quotationDetails)
    }, [quotationDetails])

    // ===== Modal Functions Start =====
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };
    // ===== Modal Functions ends =====


    // ===== Other Functions=====
    const FormRest = () => {
        setFormReset(formReset + 1);
    };
    const FormExternalClose = () => {
        handleOk();
    };
    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const dummycancel = () => {

    }

    const viewQuotation = (values) => {
        setModalTitle('View Quotation');
        setModalContent(<AddClientQuotation businessProfile={businessProfile} handleOk={handleOk} FormExternalClose={FormExternalClose} formname={'editQuotation'} formReset={formReset} quotationrecord={values} />);
        showModal()
    }

    const TakeRejectedReason = (record) => {
        setModalTitle('View Quotation');
        setModalContent(<RejectedReasonModal quoterecord={record} FormExternalClose={FormExternalClose} GetClientQuotation={GetClientQuotation} />);
        showModal()
    }

    const ViewReseachedPDFModal = (record) => {
        setTrigger(trigger + 1)
        setModalTitle('View Research PDF');
        setModalContent(<ViewClientResearchPDF clientViewRecord={record} FormExternalClose={FormExternalClose} researchtrigger={trigger} />);
        showModal()
    }

    const handleQuotationConfirm = (record) => {
        console.log(record,'record');

        const newValue = {
            clientStatus: 'approved',
            roleName: CurrentRoleName
        }

        request.put(`${APIURLS.PUT_CLIENT_OR_ADMIN_CHANGING_STATUS}${record.quotation_id}`, newValue)
            .then(resp => {
                toast.success("Quotation Confirmed")
                GetClientQuotation()
                dispatch(getAllClientQuotationView())
            })
            .catch(error => { console.log(error, 'erorr') })
    }

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        // {
        //     title: "Quotation ID",
        //     dataIndex: "quotationId",
        // },
        // {
        //     title: "Client Name",
        //     dataIndex: "clientName",
        // },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Company Name",
            dataIndex: "companyName",
        },
        {
            title: "Product Name",
            render: (record) => {
                return (
                    <Fragment>
                        {
                            record?.quotationList[0]?.projectName
                        }
                    </Fragment>
                )
            },
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record?.quotationList[0]?.projectName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record?.quotationList[0]?.projectName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: 'Quotation Status',
            render: (value, record) => {
                return (
                    <Fragment>
                        <Flex center={"true"}>
                            {
                                record?.clientStatus === 'pending' ? (<>
                                    <CustomTag color={'blue'} bordered={'true'} title={'PENDING'} />
                                </>) :
                                    record?.clientStatus === 'approved' ? (<>
                                        <CustomTag color={'green'} bordered={'true'} title={'APPROVED'} /></>) :

                                        record?.clientStatus === 'rejected' ? (<>
                                            <CustomTag color={'red'} bordered={'true'} title={'REJECTED'} /></>) : null
                            }
                        </Flex>
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center={"true"} gap={'20px'}>
                        <Tooltip title={'View Quotation'}>
                            <TableIconHolder color='blue'>
                                <FiEye onClick={() => viewQuotation(record)} color='blue' />
                            </TableIconHolder>
                        </Tooltip>

                        {
                            record.clientStatus === "pending" &&
                            <>
                                <CustomPopconfirm
                                    record={record}
                                    confirm={() => handleQuotationConfirm(record)}
                                    cancel={dummycancel}
                                    title={"Confirm Quotation"}
                                    okText={'Confirm'}
                                    description={"Are you sure to confirm this Quotation?"}>
                                    <TableIconHolder color='green'>
                                        <BsClipboardCheck color={THEME.green} />
                                    </TableIconHolder>
                                </CustomPopconfirm>

                                <CustomPopconfirm
                                    record={record}
                                    confirm={() => TakeRejectedReason(record)}
                                    cancel={dummycancel}
                                    title={"Cancel Quotation"}
                                    okText={'Confirm'}
                                    description={"Are you sure to cancel this Quotation?"}>
                                    <TableIconHolder color='green'>
                                        <AiOutlineFileExcel color={THEME.red} />
                                    </TableIconHolder>
                                </CustomPopconfirm>
                            </>
                        }

                        <Tooltip title={'View PDF'}>
                            <TableIconHolder color='red'>
                                <BsFileEarmarkPdfFill color='red' onClick={() => ViewReseachedPDFModal(record)} />
                            </TableIconHolder>
                        </Tooltip>
                    </Flex>
                );
            },
        },
    ]

    let content;

    if (allClientQuotStatus === 'loading') {
        content = <CommonLoading />
    } else if (allClientQuotStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.quotationId;
        content = <CustomStandardTable columns={TableColumn} data={dataSourceforadmin} rowKey={rowKey} />
    } else if (allClientQuotStatus === 'failed') {
        content = <h2>
            {allClientQuotError}
        </h2>
    }

    const rowKey = (dataSource) => dataSource.quotationId;
    return (
        <div>
            <CustomPageTitle Heading={"Quotation Details"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <CustomPageFormTitle Heading={"Quotation"} />
                    <CustomInputSearch
                        placeholder={"search by Product  name..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>
            </CustomRow>

            {/* {content} */}
            {
                currentrole ? (<>
                    <CustomStandardTable columns={TableColumn} data={dataSourceforclient} rowKey={rowKey} />
                </>) : content
            }
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}
