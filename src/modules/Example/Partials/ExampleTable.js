import React, { Fragment, useState } from 'react'
import Flex from '../../../components/Flex'
import { AiOutlineEye } from "react-icons/ai";
import { THEME } from '../../../theme';
import { FiEdit, FiPlus } from "react-icons/fi";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { CustomModal } from '../../../components/CustomModal'
import { ExampleForm } from './ExampleForm';
import { ExampleViewCompayData } from './ExampleViewCompayData';
import { toast } from 'react-toastify';
import { CustomTable } from '../../../components/Form/CustomTable';
import { CustomTag } from '../../../components/Form/CustomTag';
import { TableIconHolder } from '../../../components/CommonStyled';
import { CustomPageFormTitle } from '../../../components/CustomPageTitle';
import CustomInputSearch from '../../../components/Form/CustomInputSearch';
import { CustomRow } from '../../../components/CustomRow';
import { Col } from 'antd';
import Button from '../../../components/Form/CustomButton';

export const ExampleTable = ({AddNewCompany}) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [searchTexts, setSearchTexts] = useState([]);


    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormExternalClose = () => {
        handleOk();
    }

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const UpdateCompany = () => {
        setModalTitle("Update Company");
        setModalContent(<ExampleForm formname={'UpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewCompanyDetails = () => {
        setModalTitle("View Company");
        setModalContent(<ExampleViewCompayData formname={'UpdateForm'} FormExternalClose={FormExternalClose} formReset={formReset} />);
        showModal();
    };

    const ViewCompany = () => {
        toast.success('You Click Active')
    }

    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Product Name',
            dataIndex: 'productname',
        },
        {
            title: 'Status',
            render: (record, i) => {
                return (
                    <Fragment>
                        <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
                        <CustomTag bordered={"true"} color={'error'} title={'In - Active'} />
                    </Fragment>
                );
            },
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.PRIMARY_PURPLE} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellAlert />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.red} size={'22px'} onClick={ViewCompany}>
                            <HiOutlineBellSlash />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.green} size={'22px'} onClick={ViewCompanyDetails}>
                            <AiOutlineEye />
                        </TableIconHolder>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={UpdateCompany}>
                            <FiEdit />
                        </TableIconHolder>
                        {/* <Popconfirm
                        title="Delete the Product"
                        description="Are you sure to delete this Product?"
                        onConfirm={() => confirm(record)}
                        onCancel={cancel}
                        icon={
                          <QuestionCircleOutlined size={'30'}
                            style={{
                              color: 'red',
                            }}
                          />
                        }
                        placement="topLeft"
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button.Danger text={<DeleteOutlined />} />
                      </Popconfirm> */}
                    </Flex>
                );
            },
        },
    ]

    const data = [{
        key: '1',
        productname: 'Coin'
    }]

    return (
        <Fragment>
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" ,alignItems:'baseline'}}>
                    <CustomPageFormTitle Heading={"User"} />
                    <CustomInputSearch
                        placeholder={"search ..."}
                        value={searchTexts}
                        // onChange={(e) => handleSearchs(e.target.value)}
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
                                    onClick={AddNewCompany}
                                />
                            </Flex>
                        </Col>
                    </CustomRow>
                </Col>
            </CustomRow>
            <CustomTable columns={TableColumn} data={data} />

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
