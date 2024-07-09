import { Col } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { FiEdit, FiPlus } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommonLoading } from '../../../../components/CommonLoading';
import { TableIconHolder } from '../../../../components/CommonStyled';
import { CustomModal } from '../../../../components/CustomModal';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle';
import { CustomPopconfirm } from '../../../../components/CustomPopConfirm';
import { CustomRow } from '../../../../components/CustomRow';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';
import CustomInputSearch from '../../../../components/Form/CustomInputSearch';
import { CustomStandardTable } from '../../../../components/Form/CustomStandardTable'
import { THEME } from '../../../../theme';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import request from '../../../../utils/request';
import { getProjecttype, getProjectTypeError, getProjectTypeStatus, selectProjectType } from '../../ClientSlice';
import AddProjectType from './AddProjectType';

const ViewProjectType = () => {

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

   

   const AllProjectView = useSelector(selectProjectType)
   const ViewProjectStatus = useSelector(getProjectTypeStatus)
   const ViewProjectError = useSelector(getProjectTypeError)


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
        dispatch(getProjecttype())
    }

    const EditProjectType = (record) => {
        setTrigger(trigger + 1)
        setModalTitle("Update Project Type");
        setModalContent(
            <AddProjectType
                projectTypeRecord={record}
                ViewEditTrigger={trigger}
                handleupdate={handleupdate}
            />
        );
        showModal();
    };

    const handlenavigate = (record) => {
        // navigate(`/AddProjectType`)

        setTrigger(trigger + 1)
        setModalContent(
            <AddProjectType
                ViewaddTrigger={trigger}
                handleupdatee={handleupdate}
            />
        );
        showModal();
    };
    useEffect(() => {
        setDataSource(AllProjectView)
    }, [AllProjectView])

    useEffect(() => {
        dispatch(getProjecttype())
    }, [])

    // Delete Project Type bill 

    const handleConfirm = (record) => {
        DeleteProjectType(record)
    }


    const DeleteProjectType = (record) => {
        request.delete(`${APIURLS.DELETEPROJECTTYPE}/${record.projectTypeId}`)
            .then((response) => {
                toast.info("Deleted Successfully")
                dispatch(getProjecttype())


            }).catch(error => {
                toast.error("Failed")
            });
    };

    const dummycancel =()=>{

    }
    
    const columns =[
        {
            title: "SI No",
            render: (value, item, index) => index + 1, 
        },
        {
            title:'Project type',
            dataIndex:'projectType',
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.projectType)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.projectType).includes(value.toUpperCase())
                );
            },
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        {/* <TableIconHolder color={THEME.green} size={'22px'} >
                            <AiOutlineEye />
                        </TableIconHolder> */}

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => EditProjectType(record)} >
                            <FiEdit />
                        </TableIconHolder>
                        <CustomPopconfirm
                            record={record}
                            confirm={handleConfirm}
                            cancel={dummycancel}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the Project Type"}
                            description={"Are you sure to delete this Project Type ?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdDelete />
                            </TableIconHolder>
                        </CustomPopconfirm>

                    </Flex>
                );
            },
        },
    ]
    let content;

    if (ViewProjectStatus === 'loading') {
        content = <CommonLoading />
    } else if (ViewProjectStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.projectTypeId;
        content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
        })} />
    } else if (ViewProjectStatus === 'failed') {
        content = <h2>{ViewProjectError}</h2>
    }
  return (

    <Fragment>
            <CustomPageTitle Heading={"View Project Type"} />
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", paddingTop: "12px" }}
            >
                <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
                    <CustomPageFormTitle Heading={"Project Type"} />
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

  )
}

export default ViewProjectType