import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomModal } from "../../../../../components/CustomModal";
import { IoIosPersonAdd } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import Flex from "../../../../../components/Flex";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { THEME } from "../../../../../theme";
import { ViewInterviewDetails } from "./ViewInterviewDetails";
import { useDispatch, useSelector } from "react-redux";
import { HrInterviewForm } from "./HrInterviewForm";
import { toast } from "react-toastify";
import {
  getHRRound,
  getHRRoundError,
  getHRRoundStatus,
  selectAllHRRound,
} from "../../RecruitmentSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { OfferForm } from "../../Offer/Partials/OfferForm";
import { SvgIcons } from "../../../../../Images";
import Button from "../../../../../components/Form/CustomButton";
import { HrInterviewCancelForm } from "./HrInterviewCancelForm";

export const HrInterviewTable = () => {
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
    dispatch(getHRRound());
  }, []);

  const AllHRRound = useSelector(selectAllHRRound);
  const HRRoundStatus = useSelector(getHRRoundStatus);
  const HRRoundError = useSelector(getHRRoundError);

  useEffect(() => {
    setDataSourse(AllHRRound);
  }, [AllHRRound]);

  const UpdateHrDetails = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Hr Interview");
    setModalContent(
      <HrInterviewForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateHrInterviewrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const ViewHrDetail = (record) => {
    setModalTitle("View Hr Interview Details");
    setModalContent(
      <ViewInterviewDetails
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        HrInterviewrecord={record}
      />
    );
    showModal();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const AddOffer = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Offer Letter");
    setModalContent(
      <OfferForm
        AddOfferDetails={record}
        updatetrigger={trigger}
        FormExternalClose={FormExternalClose}
        formname={"AddOfferLetter"}
        handleOk={handleOk}
        formReset={formReset}
      />
    );
    showModal();
  };

  const CancelGD = (record) => {
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
      <HrInterviewCancelForm
        CancelRecord={record}
        formname={"CancelTaskAssign"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updatetrigger={trigger}
      />
    );
    showModal();
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
      title: "InterviewerName",
      dataIndex: "employeeName",
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
            {record.approvalType === "completed" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Completed"}
              />
            )}

            {record.approvalType === "scheduled" && (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Scheduled"}
              />
            )}

            {record.approvalType === "cancelled" && (
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
                ViewHrDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>

            {record?.approvalType === "scheduled" && (
              <TableIconHolder
                color={THEME.orange}
                size={"22px"}
                onClick={() => {
                  UpdateHrDetails(record);
                }}
              >
                <Tooltip placement="top" title={"Edit HR Details"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit HR Details" />
                </Tooltip>
              </TableIconHolder>
            )}

            {record?.approvalType === "scheduled" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  AddOffer(record);
                }}
              >
                <Tooltip placement="top" title={"Add Offers"}>
                  <img
                    src={SvgIcons.assign}
                    width={22}
                    alt="Add Offers"
                  />
                </Tooltip>
              </TableIconHolder>
            )}

            {record?.approvalType === "scheduled" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  CancelGD(record);
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

  if (HRRoundStatus === "loading") {
    content = <CommonLoading />;
  } else if (HRRoundStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.candidateId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (HRRoundStatus === "failed") {
    content = <h2>{HRRoundError}</h2>;
  }
  return (
    <Fragment>
      <CustomRow
        style={{ background: "#dae1f3", padding: "12px", paddingBottom: "8px" }}
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
