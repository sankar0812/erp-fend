import { Col } from 'antd';
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommonLoading } from '../../../../../../components/CommonLoading';
import { TableIconHolder } from '../../../../../../components/CommonStyled';
import { CustomCardView } from '../../../../../../components/CustomCardView';
import { CustomModal } from '../../../../../../components/CustomModal';
import { CustomPageTitle } from '../../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../../components/CustomRow';
import Flex from '../../../../../../components/Flex';
import { CustomInput } from '../../../../../../components/Form/CustomInput';
import ButtonStandard from '../../../../../../components/Form/CustomStandardButton';
import { CustomStandardTable } from '../../../../../../components/Form/CustomStandardTable';
import Label from '../../../../../../components/Form/Label';
import { THEME } from '../../../../../../theme';
import { AddQuotation } from '../../AddQuotaions/Partials/AddQuotation';
import { getquotation, getquotationError, getquotationStatus, viewquotation } from '../../quotationSlice';

const ViewQuotationTable = () => {
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTexts, setSearchTexts] = useState([]);   //---------Seach Bar --------
    const [dataSource,setDataSource] = useState([])
    const [trigger,setTrigger] = useState(0)

    const nevigate = useNavigate();
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Allquotation = useSelector(viewquotation)
    const AllquotationStatus = useSelector(getquotationStatus)
    const AllquotationError = useSelector(getquotationError)

    useEffect(() => {
        setDataSource(Allquotation)
    }, [Allquotation])


    useEffect(() => {
        dispatch(getquotation())
    }, [])

    const handleViewQuotation = ()=>{
        dispatch(getquotation())
        handleOk()
    }
    const EditQuotation = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Quotation Details");
        setModalContent(<AddQuotation quotationrecord={record} quotationTrigger={trigger} handleViewQuotation={handleViewQuotation} />);
        showModal();
    };

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };


    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Date",
            dataIndex: "date",

        },
        {
            title: "Client name",
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
        {
            title: "Company Name",
            dataIndex: "companyName",
        },
        {
            title: "Project type",
            dataIndex: "projectType",
        },
        {
            title: "Bill No",
            dataIndex: "quotationId",
        },
        {
            title: "Bill Amount",
            dataIndex: "amount",
        },
        {
            title:'Action',
            render: (record,purchase) => {
                return (
                    <>
                     <Flex flexstart={'true'}  gap={'15px'} >
                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { EditQuotation(record) }}>
                            <FiEdit />
                        </TableIconHolder>
                        <Flex end={'true'} >
                    </Flex>
                    </Flex>
                   
                    </>
                   
                )
            }
        }
    ]
    let content;

    if (AllquotationStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllquotationStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.employeeId;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            //   onClick: () => handleRowClick(record),
        })} />
    } else if (AllquotationStatus === 'failed') {
        content = <h2>{AllquotationError}</h2>
    }

    return (
        <div>
            <CustomPageTitle Heading={'View Quotation'} />
            <CustomCardView>
                <Flex end={"true"} >
                    <ButtonStandard.Primary text={'Add Quotation'} style={{ marginRight: '10px' }} onClick={() => nevigate(`/AddQuotation`)} />
                </Flex>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
                    <Label style={{ marginRight: '20px' }}>Search by Client Name :</Label>
                    <CustomInput
                        value={searchTexts}
                        placeholder="Search by Client Name"
                        onSearch={handleSearchs}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </div>
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={24}>
                        {content}
                    </Col>
                    <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
                </CustomRow>

            </CustomCardView >
        </div>
    )
}

export default ViewQuotationTable