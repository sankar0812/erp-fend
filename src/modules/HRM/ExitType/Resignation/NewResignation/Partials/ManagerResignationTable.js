import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../../../Auth/authSlice";
import {
  getResignation,
  getResignationError,
  getResignationStatus,
  selectAllResignation,
} from "../../ResignationSlice";
import { useDispatch } from "react-redux";
import { ManagerResignationForm } from "./ManagerResignationForm";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import CustomInputSearch from "../../../../../../components/Form/CustomInputSearch";
import { CustomModal } from "../../../../../../components/CustomModal";
import { CustomTag } from "../../../../../../components/Form/CustomTag";
import Flex from "../../../../../../components/Flex";
import { TableIconHolder } from "../../../../../../components/CommonStyled";
import { THEME } from "../../../../../../theme";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { FiEdit } from "react-icons/fi";
import { SvgIcons } from "../../../../../../Images";
import { LiaCertificateSolid } from "react-icons/lia";
import { useNavigate } from "react-router";

export const ManagerResignationTable = () => {
  const Employeeid = useSelector(selectCurrentId);

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AllResignations = useSelector(selectAllResignation);
  const ViewResignationsStatus = useSelector(getResignationStatus);
  const ViewResignationsError = useSelector(getResignationError);

  useEffect(() => {
    setDataSource(AllResignations);
  }, [AllResignations]);

  useEffect(() => {
    dispatch(getResignation());
  }, []);

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

  const FormExternalClose = () => {
    handleOk();
    // dispatch(getLeave())
  };
  //=========== Edit Leave=======
  const EditResignation = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Edit Resignation");
    setModalContent(
      <ManagerResignationForm
        formname={"Edit Resignation"}
        resignationrecord={record}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  //================= Delete leave============

  const handleConfirm = (record) => {
    //   DeleteEmpLeave(record)
  };

  //   const DeleteEmpLeave = (record) => {
  //       request.delete(`${APIURLS.DELETEEMPLEAVE}/${record?.employeeLeaveId}`)
  //           .then((response) => {
  //               toast.info("Deleted Successfully")
  //               dispatch(getLeave())

  //           }).catch(error => {
  //               toast.error("Failed")
  //           });
  //   };

  const EditExperience = (record) => {
    navigate(`/experienceCertificate/${record?.employeeId}`)
  }

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Date",
      dataIndex: "resignationsDate",
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Status",
      // dataIndex: "statusLevel",
      render: (record, i) => {
        return (
          <Fragment>
            {record.type === "pending" && (
              <CustomTag
                bordered={"true"}
                color={"warning"}
                title={"Pending"}
              />
            )}

            {record.type === "rejected" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}

            {record.type === "approved" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Approval"}
              />
            )}
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            {/* <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateParty(record) }}> */}
            {/* <TableIconHolder color={THEME.blue} size={"22px"}>
                <FiEdit onClick={() => EditResignation(record)} />
              </TableIconHolder> */}
            {/*   
                      <CustomPopconfirm
                          record={record}
                          confirm={handleConfirm}
                          title={"Delete the Emp Leave List"}
                          description={"Are you sure to delete this Emp Leave?"}
                      >
                          <TableIconHolder color={THEME.red} size={"22px"}>
                              <MdDelete />
                          </TableIconHolder>
                      </CustomPopconfirm> */}

            {record.type === "pending" && (
              <TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  EditResignation(record);
                }}
              >
                <Tooltip placement="top" title={"Edit Approval"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit Approval" />
                </Tooltip>
              </TableIconHolder>
            )}
            {record.type === "approved" && (
              <TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  EditExperience(record);
                }}
              >
                <Tooltip placement="top" title={"Edit Experience"}>
                  {/* <img src={SvgIcons.editIcon} width={22} alt="edit Experience" /> */}
                  <LiaCertificateSolid/>
                </Tooltip>
              </TableIconHolder>
            )}
          </Flex>
        );
      },
    },
  ];

  let content;

  if (ViewResignationsStatus === "loading") {
    content = <CommonLoading />;
  } else if (ViewResignationsStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.resignationsId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (ViewResignationsStatus === "failed") {
    content = <h2>{ViewResignationsError}</h2>;
  }

  // const handleRowClick = (record) => {
  //   navigate(`/AddEmployeeLeave/${record.employeeId}`)
  // };

  return (
    <Fragment>
      <CustomPageTitle Heading={"View Resignation"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        {/* <Col span={24} md={14}>
              <CustomRow space={[24, 24]}>
                <Col span={24} md={16}></Col>
                <Col span={24} md={8} style={{ float: "right" }}>
                  <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                    <Button.Primary
                      style={{ borderRadius: "6px" }}
                      icon={<FiPlus style={{ fontSize: "20px" }} />}
                      text={"Add"}
                    //   onClick={AddEmployeeDetails}`
                    />
                  </Flex>
                </Col>
              </CustomRow>
            </Col> */}
      </CustomRow>
      {/* <CustomStandardTable
            columns={columns}
            data={dataSource}
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
