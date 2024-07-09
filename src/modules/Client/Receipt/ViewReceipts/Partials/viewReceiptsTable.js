import { Col } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomModal } from '../../../../../components/CustomModal';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable'
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import request from '../../../../../utils/request';
import { getReceipts, getreceiptsError, getreceiptsStatus, viewreceipts } from '../../../ClientSlice';


const ViewReceiptsTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);  // Search bar

   // ======  Modal Open ========
   const [isModalOpen, setIsModalOpen] = useState(false);

   // ======  Modal Title and Content ========
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState(null);

   // ----------  Form Reset UseState ---------
   const [formReset, setFormReset] = useState(0);
   const [trigger, setTrigger] = useState(0);

   

   const Allreceipts = useSelector(viewreceipts)
   const ViewReceiptsStatus = useSelector(getreceiptsStatus)
   const ViewReceiptsError = useSelector(getreceiptsError)


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
    const handleupdate = ()=>{
        handleOk()
        dispatch(getReceipts())
    }


    const handlenavigate = (record) => {
        navigate(`/AddReceipts`)
        showModal();
    };

    useEffect(() => {
        setDataSource(Allreceipts)
    }, [Allreceipts])

    useEffect(() => {
        dispatch(getReceipts())
    }, [])

 

    const handleConfirm = (record) => {
        DeleteProjectType(record)
    }


    const DeleteProjectType = (record) => {
        request.delete(`${APIURLS.DELETEPROJECTTYPE}/${record.projectTypeId}`)
            .then((response) => {
                toast.info("Deleted Successfully")
                dispatch(getReceipts())


            }).catch(error => {
                toast.error("Failed")
            });
    };

    const handleRowClick = (record) => {
        navigate(`/ViewClientReceipts/${record?.client_id}`)
      };
    

    const columns =[
        {
            title: "SI No",
            render: (value, item, index) => index + 1, 
        },
        // {
        //     title:'Receipt No',
        //     dataIndex:'receipt_id',
        // },
        {
            title:'Client Name',
            dataIndex:'client_name',
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.client_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.client_name).includes(value.toUpperCase())
                );
            },
        },
        //  {
        //     title:'Payment Type',
        //     dataIndex:'payment_type',
        // },
        // {
        //     title:'Received Amount',
        //     dataIndex:'received_amount',
        // },
        // {
        //     title:'Balance',
        //     dataIndex:'balance',
        // },        
    ]
    let content;

    if (ViewReceiptsStatus === 'loading') {
        content = <CommonLoading />
    } else if (ViewReceiptsStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.client_id;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })} />
    } else if (ViewReceiptsStatus === 'failed') {
        content = <h2>{ViewReceiptsError}</h2>
    }
  return (
    <div>
    <Fragment>
            <CustomPageTitle Heading={"View Receipts"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomPageFormTitle Heading={"Client Name"} />
                    <CustomInputSearch
                        placeholder={"search ..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
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
                width={450}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    </div>
  )
}

export default ViewReceiptsTable