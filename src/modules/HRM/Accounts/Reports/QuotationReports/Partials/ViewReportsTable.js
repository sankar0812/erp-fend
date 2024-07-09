import { Col, Form } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { FcPrint } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { CommonLoading } from '../../../../../../components/CommonLoading';
import { TableIconHolder } from '../../../../../../components/CommonStyled';
import { CustomModal } from '../../../../../../components/CustomModal'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../../components/CustomRow';
import Flex from '../../../../../../components/Flex';
import CustomInputSearch from '../../../../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../../../../components/Form/CustomStandardTable';
import { THEME } from '../../../../../../theme';
import { getquotation, getquotationError, getquotationStatus, viewquotation } from '../../../Quotation/quotationSlice';
import { ReportQuotationViewPrint } from './ReportQuotationViewPrint';



const ViewQuotationReportsTable = () => {

    const dispatch = useDispatch()


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);  // Search bar

    const Allquotation = useSelector(viewquotation)
    const AllquotationStatus = useSelector(getquotationStatus)
    const AllquotationError = useSelector(getquotationError)

    useEffect(() => {
        setDataSource(Allquotation)
    }, [Allquotation])

console.log(Allquotation,'Allquotation');
    useEffect(() => {
        dispatch(getquotation())
    }, [])


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleprintview = (record) => {
        setModalTitle("Quotation Print");
        setModalContent(<ReportQuotationViewPrint record={record} />);
        showModal();
    }

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
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
        {
            title: 'Quotation No',
            dataIndex: 'quotationId',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Bill Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Action',
            dataIndex: 'status',
            render: (text, record, index) => {
                return (
                    <Flex center={"true"}>
                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => handleprintview(record)} >
                            <FcPrint />
                        </TableIconHolder>
                    </Flex>

                )
            },
        },

    ]
    let content;

    if (AllquotationStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllquotationStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.quotation_id;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
        })} />
    } else if (AllquotationStatus === 'failed') {
        content = <h2>{AllquotationError}</h2>
    }

    return (
        <Fragment>
            <CustomPageTitle Heading={"Quotation Reports"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={12}>
                    <Flex>
                        <CustomPageFormTitle Heading={"Client Name"} />
                        <CustomInputSearch
                            placeholder={"search ..."}
                            value={searchTexts}
                            onChange={(e) => handleSearchs(e.target.value)}
                        />
                    </Flex>
                </Col>
            </CustomRow>
            {content}
            <CustomModal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}

export default ViewQuotationReportsTable