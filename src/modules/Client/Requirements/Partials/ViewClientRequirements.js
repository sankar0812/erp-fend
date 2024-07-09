import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { Col } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../components/Flex";
import { CustomModal } from "../../../../components/CustomModal";
import Button from "../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomPageFormTitle, CustomPageTitle, } from "../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { getClientProfile, getClientProfileError, getrequirementsStatus, getRequiremts, viewrequirements } from "../../ClientSlice";
import { TableIconHolder } from "../../../../components/CommonStyled";
import { THEME } from "../../../../theme";
import { toast } from "react-toastify";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { AddClientRequirements } from "./AddClientRequirements";
import { CheckOutlined } from '@ant-design/icons';
import { ImCancelCircle } from 'react-icons/im'
import { CustomTag } from "../../../../components/Form/CustomTag";
import { BsThreeDots } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import ViewClientRquirementModal from "./ViewClientRequirementModal";


export const ViewClientRequiremets = () => {

    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]); // Search Bar
    const [projectStatus, setProjectStatus] = useState(''); // approval status use

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const dispatch = useDispatch()

    const requiremnts = useSelector(viewrequirements)
    const ViewRequirementStatus = useSelector(getrequirementsStatus)
    const ViewRequireError = useSelector(getClientProfileError)

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
        setDataSource(requiremnts)
    }, [requiremnts])

    useEffect(() => {
        dispatch(getRequiremts())
    }, [])

    const handlerequire = () => {
        dispatch(getRequiremts())
    }

    const Putrejection = (record) => {
        setTrigger(trigger + 1)

        const newStatus = projectStatus === 'approved' ? 'rejected' : 'approved';
        setProjectStatus(newStatus);

        const projectvalues = {
            projectStatus: newStatus
        }
        
        request
            .patch(`${APIURLS.PUTAPROVAL}/${record?.projectId}`, projectvalues)
            .then((response) => {
                if (response.status === 200) {
                    toast.info(`${newStatus === 'approved' ? 'Approved' : 'Rejected'} Successfully`);
                    if (handlerequire) {
                        handlerequire()
                    }
                }

            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    toast.warn(error.response.data)
                }
                else {
                    toast.error('Failed')
                }
            })

    };

    const FormExternalClose = () => {
        handleOk();
        dispatch(getClientProfile())
        handlerequire()
    };

    const EditRequirements = (record) => {
        setModalTitle("Update Client Requirement");
        setModalContent(
            <AddClientRequirements
                formname={"AddClientRequirementProfileForm"}
                FormExternalClosee={FormExternalClose}
                formReset={formReset}
                requireRecord={record}
            />
        );
        showModal();
    };

    const ViewProDetails = (record) => {
        setModalTitle("View Requirement");
        setModalContent(
            <ViewClientRquirementModal
                formname={"ViewRequirement"}
                FormExternalClosee={FormExternalClose}
                formReset={formReset}
                ClientReqRecord={record}
            />
        );
        showModal();
    };

    const handlenavigate = (record) => {
        navigate(`/AddClientsRequiremets`)
    };


    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "project Name",
            dataIndex: "projectName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.projectName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.projectName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Duration",
            dataIndex: "duration",
        },
        // {
        //     title: 'Skills & Description',
        //     dataIndex: 'skillsAndDescription',

        // },
        // {
        //     title: 'Features',
        //     dataIndex: 'features',

        // },
        {
            title: "View Details",
            render: (record) => {
                return (
                    <Flex center={"true"}>
                        <TableIconHolder color='blue'>
                            <FaEye onClick={() => ViewProDetails(record)} />
                        </TableIconHolder>
                    </Flex>
                )
            }
        },
        {
            title: 'Status',
            // dataIndex: 'status',
            render: (record, i) => {
                return (
                    <>
                        {/* {record.status === true &&
                        <CustomTag
                            bordered={"true"}
                            color={"success"}
                            title={"Moved R&D"}
                        />
                    } */}
                        {record.projectStatus === 'rejected' ?
                            (
                                <CustomTag
                                    bordered={"true"}
                                    color={"error"}
                                    title={"Rejected"}
                                />
                            )
                            :
                            record.projectStatus === 'pending' ?
                                (
                                    <CustomTag
                                        bordered={"true"}
                                        color={"yellow"}
                                        title={"Pending"}
                                    />
                                )
                                :
                                record.projectStatus === 'approved' ?
                                    (
                                        <CustomTag
                                            bordered={"true"}
                                            color={"success"}
                                            title={"Approved"}
                                        />
                                    )
                                    :
                                    null
                        }
                    </>
                )
            }

        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>
                        {
                            record.projectStatus === 'pending' ?
                                (<TableIconHolder color={THEME.blue} size={'22px'} onClick={() => EditRequirements(record)} >
                                    <FiEdit />
                                </TableIconHolder>):
                                (<BsThreeDots />)
}


                    </Flex>
                );
            },
        },
    ];

    let content;

    if (ViewRequirementStatus === 'loading') {
        content = <CommonLoading />
    } else if (ViewRequirementStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.projectId;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
            //   onClick: () => handleRowClick(record),
        })} />
    } else if (ViewRequirementStatus === 'failed') {
        content = <h2>{ViewRequireError}</h2>
    }

    return (
        <Fragment>
            <CustomPageTitle Heading={"Client Requirements"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomPageFormTitle Heading={"Project Name"} />
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
            {/* <CustomStandardTable
        columns={columns}
        data={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      /> */}
            {content}
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    );
};
