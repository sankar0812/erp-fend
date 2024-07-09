import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomModal } from '../../../../components/CustomModal'
import { FiEdit, FiPlus } from 'react-icons/fi'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomRow } from '../../../../components/CustomRow'
import { Col } from 'antd'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import CustomInputSearch from '../../../../components/Form/CustomInputSearch'
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import { CommonLoading } from '../../../../components/CommonLoading'
import { PromotionForm } from './PromotionForm'
import { getPromotion, getPromotionError, getPromotionStatus, selectAllPromotions } from '../PromotionSlice'
import ViewDescriptionPromotion from './ViewDescriptionPromotion'
import { FaEye } from "react-icons/fa";

const ViewPromotions = () => {

    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [widthme, setWidthMe] = useState('')
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0)
    const dispatch = useDispatch()

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
        FormRest()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();
    };

    useEffect(() => {
        dispatch(getPromotion())
    }, [])

    const AllPromotionDetails = useSelector(selectAllPromotions)
    const AllPromotionStatus = useSelector(getPromotionStatus)
    const AllPromotionError = useSelector(getPromotionError)

    const UpdatePromotion = (record) => {
        setTrigger(trigger + 1)
        setWidthMe(800)
        setModalTitle('Update Promotion Details');
        setModalContent(<PromotionForm FormExternalClosee={FormExternalClose} formname={'editpromotions'} formReset={formReset} promotionrecord={record} updatetrigger={trigger} />);
        showModal()
    }

    const ViewDescriptionModal = (record) => {
        setWidthMe(500)
        setModalTitle('View Description');
        setModalContent(<ViewDescriptionPromotion promotionrecord={record} />);
        showModal()
    }

    useEffect(() => {
        setDataSource(AllPromotionDetails)
    }, [AllPromotionDetails])

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Promoted By",
            dataIndex: "promotions_by",
        },
        {
            title: "Staff Name",
            dataIndex: "user_name",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.user_name)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.user_name).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Role Type",
            dataIndex: "role_type",
        },
        {
            title: "View Description",
            render: (record) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        <FaEye onClick={() => ViewDescriptionModal(record)} />
                    </Flex>
                );
            },
        },
        // {
        //     title: 'Action',
        //     render: (record) => {
        //         return (
        //             <Flex center={"true"} gap={'10px'}>
        //                 <FiEdit onClick={() => UpdatePromotion(record)} />
        //             </Flex>
        //         );
        //     },
        // },
    ]

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const AddPromotion = () => {
        setModalTitle("Add Promotions");
        setWidthMe(800)
        setModalContent(
            <PromotionForm
                formname={"AddPromotionForm"}
                FormExternalClose={FormExternalClose}
            />
        );
        showModal();
    };

    let content;

    if (AllPromotionStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllPromotionStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.promotions_id;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllPromotionStatus === 'failed') {
        content = <h2>
            {AllPromotionError}
        </h2>
    }

    return (
        <div>
            <CustomPageTitle Heading={"Promotion Details"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <CustomPageFormTitle Heading={"Promotions"} />
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
                                    onClick={AddPromotion}
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
                width={widthme}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </div>
    )
}

export default ViewPromotions