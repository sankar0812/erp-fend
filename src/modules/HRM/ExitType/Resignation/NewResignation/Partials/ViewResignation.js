import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentId } from "../../../../../Auth/authSlice";
import request from "../../../../../../utils/request";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { CustomModal } from "../../../../../../components/CustomModal";
import CustomInputSearch from "../../../../../../components/Form/CustomInputSearch";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { THEME } from "../../../../../../theme";
import { TableIconHolder } from "../../../../../../components/CommonStyled";
import Flex from "../../../../../../components/Flex";
import { CustomPopconfirm } from "../../../../../../components/CustomPopConfirm";
import { MdDelete } from "react-icons/md";
import { CustomTag } from "../../../../../../components/Form/CustomTag";
import { FiEdit } from "react-icons/fi";
import {
  getResignation,
  getResignationError,
  getResignationStatus,
  selectAllResignation,
} from "../../ResignationSlice";
import { AddResignationForm } from "./AddResignationForm";
import { SvgIcons } from "../../../../../../Images";
import { ViewResignationDetails } from "./ViewResignationDetails";

export const ViewNewResignation = () => {
  const navigate = useNavigate();

  // const DEL_PARTY_URL = 'party/edit_party'
  // let api = useAxios();

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

  const AllResignations = useSelector(selectAllResignation);
  const ViewResignationsStatus = useSelector(getResignationStatus);
  const ViewResignationsError = useSelector(getResignationError);

  // useEffect(() => {
  //   setDataSource(AllResignations);
  // }, [AllResignations]);

  useEffect(() => {
    dispatch(getResignation());
  }, []);

  const ResignationFindId = useMemo(
    () => AllResignations?.filter((item) => item?.employeeId == Employeeid),
    [AllResignations, Employeeid]
  );

  useEffect(() => {
    if (ResignationFindId) {
      setDataSource(ResignationFindId);
    }
  }, [ResignationFindId]);

  // useEffect(() => {
  //   dispatch(getLeave())
  // }, [])

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
      <AddResignationForm
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

  const ViewResignation = (record) => {
    setModalTitle("view Resignation");
    setModalContent(
      <ViewResignationDetails
        resignationrecord={record}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
      />
    );
    showModal();
  };

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
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Date",
      dataIndex: "resignationsDate",
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

            {/*        <TableIconHolder color={THEME.blue} size={"22px"}>
              <FiEdit onClick={() => EditResignation(record)} />
            </TableIconHolder> */}

            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                ViewResignation(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>
            {record.type === "pending" && (
              <TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  EditResignation(record);
                }}
              >
                <Tooltip placement="top" title={"Edit Resignation"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit GD" />
                </Tooltip>
              </TableIconHolder>
            )}
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
          </Flex>
        );
      },
    },
  ];

  let content;



  if (ViewResignationsStatus === "loading") {
    content = <CommonLoading />;
  } else if (ViewResignationsStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeId;
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
