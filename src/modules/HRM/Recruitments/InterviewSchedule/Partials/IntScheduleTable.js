import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import Flex from "../../../../../components/Flex";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Popover, Tooltip } from "antd";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import Button from "../../../../../components/Form/CustomButton";
import { FiEdit, FiPlus } from "react-icons/fi";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomModal } from "../../../../../components/CustomModal";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import {
  getIntSchedule,
  getIntScheduleError,
  getIntScheduleStatus,
  selectAllIntSchedule,
} from "../../RecruitmentSlice";
import { ViewSheduleDetails } from "./ViewIntSheduleDetails";
import { SheduleForm } from "./IntScheduleForm";
import { IoIosPersonAdd } from "react-icons/io";
import { SvgIcons } from "../../../../../Images";
import { TaskAssignForm } from "../../TaskAssaining/Partials/TaskAssigningForm";
import { IntScheduleCancelForm } from "./IntScheduleCancelForm";

export const SheduleTable = ({ AddNewShedule }) => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSourse, setDataSourse] = useState([]);
  const [trigger, setTrigger] = useState(0);

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
    dispatch(getIntSchedule());
  }, []);

  const AllIntSchedule = useSelector(selectAllIntSchedule);
  const IntScheduleStatus = useSelector(getIntScheduleStatus);
  const IntScheduleError = useSelector(getIntScheduleError);

  useEffect(() => {
    setDataSourse(AllIntSchedule);
  }, [AllIntSchedule]);

  const UpdateIntSchedule = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Interview Schedule");
    setModalContent(
      <SheduleForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateIntSchedulerecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const ViewIntScheduleDetail = (record) => {
    setModalTitle("View Interview Schedule");
    setModalContent(
      <ViewSheduleDetails
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        viewIntScheduleRecord={record}
      />
    );
    showModal();
  };

  const AddTaskAssign = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Task Assigning");
    setModalContent(
      <TaskAssignForm
        AddTaskRecord={record}
        updatetrigger={trigger}
        FormExternalClose={FormExternalClose}
        formname={"AddTaskAssigning"}
        handleOk={handleOk}
        formReset={formReset}
      />
    );
    showModal();
  };

  const CancelIntSchedule = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Log Out");
    setModalContent(
      <div>
        <h1 style={{ fontSize: "1.2rem" }}>
          Are you Sure You Want cancel this candidate ?
        </h1>
        <br />
        <Flex style={{ justifyContent: "center", gap: "20px" }}>
          <Button.Success text={"Yes"} onClick={()=>{Signout(record)}} />
          <Button.Danger text={"Cancel"} onClick={handleOk} />
        </Flex>
      </div>
    );
    showModal();
  };

  const Signout = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Cancelling Reason");
    setModalContent(
      <IntScheduleCancelForm
        CancelRecord={record}
        formname={"CancelIntSchedule"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

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
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Interviewer Name",
      dataIndex: "interviewerName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      render: (record, i) => {
        return (
          <Fragment>
            {record.interviewType === "completed" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Completed"}
              />
            )}

            {record.interviewType === "scheduled" && (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Scheduled"}
              />
            )}

            {record.interviewType === "cancelled" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"Cancelled"}
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
                ViewIntScheduleDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>

            {record?.interviewType === "scheduled" && (
              <TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  UpdateIntSchedule(record);
                }}
              >
                <Tooltip placement="top" title={"edit schedule"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit schedule" />
                </Tooltip>
              </TableIconHolder>
            )}

            {record?.interviewType === "scheduled" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  AddTaskAssign(record);
                }}
              >
                <Tooltip placement="top" title={"Task Assign"}>
                  <img src={SvgIcons.assign} width={22} alt="Task Assign" />
                </Tooltip>
              </TableIconHolder>
            )}

            {record?.interviewType === "scheduled" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  CancelIntSchedule(record);
                }}
              >
                <Tooltip placement="top" title={"Cancel"}>
                  <img src={SvgIcons.cancel} width={22} alt="Cancel" />
                </Tooltip>
              </TableIconHolder>
            )}
          </Flex>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     userName: "Coin",
  //     interviewerName: "Coin",
  //     interviewType: "53453434",
  //     date: "albin@gmail.com",
  //   },
  // ];

  let content;

  if (IntScheduleStatus === "loading") {
    content = <CommonLoading />;
  } else if (IntScheduleStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.candidateId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (IntScheduleStatus === "failed") {
    content = <h2>{IntScheduleError}</h2>;
  }

  return (
    <Fragment>
      <CustomRow
        style={{
          background: "#dae1f3",
          padding: "12px",
          paddingBottom: "8px",
        }}
      >
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
        {/* <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={AddNewShedule}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col> */}
      </CustomRow>

      {/* <CustomTable columns={TableColumn} data={data} /> */}
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
