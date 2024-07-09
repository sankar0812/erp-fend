import React, { Fragment, useEffect, useState } from "react";
import { ViewCandidateDetails } from "./ViewCandidateDetails";
import { AddCandidateForm } from "./AddCandidateForm";
import { toast } from "react-toastify";
import { Col, Popover, Tooltip } from "antd";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import Flex from "../../../../../components/Flex";
import { FiEdit, FiPlus } from "react-icons/fi";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import Button from "../../../../../components/Form/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidate,
  getCandidateError,
  getCandidateStatus,
  selectAllCandidate,
} from "../../RecruitmentSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomRow } from "../../../../../components/CustomRow";
import { BsPersonFillAdd } from "react-icons/bs";
import { SheduleForm } from "../../InterviewSchedule/Partials/IntScheduleForm";
import request from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { SvgIcons } from "../../../../../Images";
import { CustomPopconfirm } from "../../../../../components/CustomPopConfirm";
import { CancelReasonForm } from "./CancelReasonForm";

export const CandidateTable = ({ AddNewCandidate }) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSourse, setDataSourse] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [width, setWidth] = useState(0)

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [searchTexts, setSearchTexts] = useState([]);

  const dispatch = useDispatch();

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
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  useEffect(() => {
    dispatch(getCandidate());
  }, []);

  const AllCandidate = useSelector(selectAllCandidate);
  const Candidatetatus = useSelector(getCandidateStatus);
  const CandidateError = useSelector(getCandidateError);

  useEffect(() => {
    setDataSourse(AllCandidate);
  }, [AllCandidate]);

  const UpdateCandidate = (record) => {
    setTrigger(trigger + 1);
    setWidth(1000)
    setModalTitle("Update Candidate");
    setModalContent(
      <AddCandidateForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateCandidaterecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const ViewCandidateDetail = (record) => {
    setModalTitle("View Candidate");
    setWidth(1000)
    setModalContent(
      <ViewCandidateDetails
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        viewCandidaterecord={record}
      />
    );
    showModal();
  };

  const AddNewShedule = (record) => {
    setTrigger(trigger + 1);
    setWidth(1000)
    setModalTitle("Add Interview Schedule");
    setModalContent(
      <SheduleForm
        AddNewRecord={record}
        updatetrigger={trigger}
        FormExternalClose={FormExternalClose}
        formname={"AddInterviewShedule"}
        handleOk={handleOk}
        formReset={formReset}
      />
    );
    showModal();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const getTitleByStatusLevel = (statusLevel) => {
    switch (statusLevel) {
      case "scheduled":
        return "Scheduled";
      case "taskAssign":
        return "Task Assignment";
      case "groupDiscussion":
        return "Group Discussion";
      case "hrRound":
        return "HR Round";
      case "offer":
        return "Offer";
      default:
        return "";
    }
  };

  const MoveCandidate = (record) => {
    const value = {
      employeeStatus: record?.workExperience,
    };
    console.log(value, "jj");
    request
      .put(`${APIURLS.PUTCANDIDATESTATUS}${record?.candidateId}`, value)
      .then(function (response) {
        console.log(response,"call");
        toast.success("Candidate Moved Successfully");
        dispatch(getCandidate());
      })
      .catch(function (error) {
      });
  };

  const RemoveCandidate = (record) => {
    setTrigger(trigger + 1);
    setWidth(600)
    setModalTitle("Cancelling Reason");
    setModalContent(
      <CancelReasonForm
        CancelRecord={record}
        formname={"CancelCandidate"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updatetrigger={trigger}
      />
    );
    showModal();
  }

  const dummycancel = () => {}

  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Candidate Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.candidateName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.candidateName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Email",
      dataIndex: "emailId",
    },
    {
      title: "Role",
      dataIndex: "jobRole",
    },
    {
      title: "Status",
      // dataIndex: "statusLevel",
      render: (record, i) => {
        return (
          <Fragment>
            {record.statusLevel === "pending" && (
              <CustomTag
                bordered={"true"}
                color={"warning"}
                title={"Pending"}
              />
            )}

            {/* {(record.statusLevel === "scheduled" || record.statusLevel === "taskAssign" || record.statusLevel === "groupDiscussion" || record.statusLevel === "hrRound" || record.statusLevel === "offer") && (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Scheduled"}
              />
            )} */}

            {[
              "scheduled",
              "taskAssign",
              "groupDiscussion",
              "hrRound",
              "offer",
            ].includes(record.statusLevel) && (
              <CustomTag
                bordered={true}
                color={"processing"}
                title={getTitleByStatusLevel(record.statusLevel)}
              />
            )}

            {record.statusLevel === "cancelled" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}

            {record.statusLevel === "appointed" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Appointed"}
              />
            )}

            {record.statusLevel === "Employee" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Employee"}
              />
            )}

            {record.statusLevel === "Training" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Trainee"}
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
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                ViewCandidateDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} alt="view" />
              </Tooltip>
            </TableIconHolder>

            {record.statusLevel === "pending" && (
              <TableIconHolder
              color={THEME.blue}
              size={"22px"}
              onClick={() => {
                UpdateCandidate(record);
              }}
            >
              <Tooltip placement="top" title={"edit"}>
                <img src={SvgIcons.editIcon} alt="edit" />
              </Tooltip>
            </TableIconHolder>
            )}

            {record.statusLevel === "pending" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  AddNewShedule(record);
                }}
              >
                <Tooltip placement="top" title={"add schedule"}>
                  <img src={SvgIcons.schedule} alt="add schedule" />
                </Tooltip>
              </TableIconHolder>
            )}

            {record.statusLevel === "appointed" && (
              <CustomPopconfirm
                record={record}
                confirm={() => MoveCandidate(record)}
                cancel={dummycancel}
                title={"Confirmation"}
                okText={"Yes"}
                // description={"Are you sure This Candidate Move to Trainee?"}
                description={
                  record.workExperience === 'fresher' ? "Are you sure This Candidate Move to Trainee?" : "Are you sure This Candidate Move to Employee?"
                }
              >
                <Tooltip placement="top" title={"Move to Staff"}>
                  <img src={SvgIcons.move} alt="Move to Staff" />
                </Tooltip>
              </CustomPopconfirm>
            )}

{/* {record.statusLevel === "appointed" && ( */}
              <CustomPopconfirm
                record={record}
                confirm={() => RemoveCandidate(record)}
                cancel={dummycancel}
                title={"Confirmation"}
                okText={"Yes"}
                description={"Are you sure This Candidate Remove?"}
              >
                <Tooltip placement="top" title={"Remove"}>
                  <img src={SvgIcons.cancelled} alt="Remove" />
                </Tooltip>
              </CustomPopconfirm>
            {/* )} */}
          </Flex>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      candidateName: "Coin",
      phoneNumber: "53453434",
      email: "albin@gmail.com",
      role: "react",
    },
  ];

  let content;

  if (Candidatetatus === "loading") {
    content = <CommonLoading />;
  } else if (Candidatetatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.candidateId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (Candidatetatus === "failed") {
    content = <h2>{CandidateError}</h2>;
  }

  return (
    <Fragment>
      <CustomRow style={{ background: "#dae1f3", padding: "12px" }}>
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"User"} />
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
                  onClick={AddNewCandidate}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>

      {/* <CustomTable columns={TableColumn} data={dataSourse} /> */}
      {content}

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={width}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
