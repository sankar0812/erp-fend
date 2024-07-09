import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CustomStandardTable } from '../../../../../../components/Form/CustomStandardTable';
import { getInvoice, getinvoiceView } from '../../../Invoice/invoiceSlice';
import { CustomModal } from '../../../../../../components/CustomModal';
import { TableIconHolder } from '../../../../../../components/CommonStyled';
import { THEME } from '../../../../../../theme';
import InvoiceEntryPay from './InvoiceEntryPay';
import { IoReceiptOutline } from 'react-icons/io5';
import Flex from '../../../../../../components/Flex';
import ViewReceiptsPrint from './ViewReceiptsPrint';
import { FaCcAmazonPay } from 'react-icons/fa';

const InvoicePayTable = ({ record, handleTableGet, initialData }) => {

    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState(""); 

    const [modalContent, setModalContent] = useState(null);
    const [dataSource, setDataSource] = useState([])
    
    const [trigger, setTrigger] = useState(0)
    const [width, setWidth] = useState(0)
    const [hideData, setHideData] = useState(true)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Allinvoiceview = useSelector(getinvoiceView)

    useEffect(() => {
        dispatch(getInvoice())
    }, [])

    useEffect(() => {
        setDataSource(record)
    }, [record])


    const handleupdate = () => {
        handleTableGet()
        handleOk()
    }
    
    const onEditDetails = (record) => {
        // setHideData(record.key)
        setTrigger(trigger + 1)
        setWidth(700)
        setModalContent(<InvoiceEntryPay record={record} handleupdate={handleupdate} payTrigger={trigger} setHideData={setHideData} initialData={initialData} />)
        setModalTitle("Paying Amount");
        showModal();
    }
    const onReceiptsPrint = (record) => {
        setWidth(900)
        setModalContent(<ViewReceiptsPrint receiptrecord={record} handleupdate={handleupdate} />)
        showModal();
    }


    // const filteredData = dataSource?.filter(obj => obj.invoiceId !== null && obj.paymentDate !== null && obj.amount !== 0 && obj.balance !== 0);
//    console.log(filteredData,'filteredData');

    const columns = [

        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Invoice No',
            dataIndex: 'invoiceId',
        },
        {
            title: 'Payment Date',
            dataIndex: 'paymentDate',
        },

        {
            title: 'Bill Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                const lastIndexForInvoice = dataSource.reduce((acc, curr) => {
                    if (curr.invoiceId === record.invoiceId) {
                        return curr;
                    }
                    return acc;
                }, null);
    
                const isLastObject = record === lastIndexForInvoice;
                
                return (
                    <Flex gap={'5px'}>


                  {isLastObject  && (
                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => onEditDetails(record)}>
                            <FaCcAmazonPay />
                        </TableIconHolder>
                    )}
                    
                        <TableIconHolder color={THEME.yellow} size={'22px'} onClick={() => onReceiptsPrint(record)}>
                            <IoReceiptOutline />
                        </TableIconHolder>
                    </Flex>
                );
            },
        }


    ]

const rowKey = (dataSource) => dataSource?.receiptId

    return (
        <div>
            <CustomStandardTable columns={columns} data={dataSource || []} rowKey={rowKey}/>
            <CustomModal width={width} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default InvoicePayTable