import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OfferForm } from "./OfferForm";
import { ViewOfferDetails } from "./ViewOfferDetails";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import Flex from "../../../../../components/Flex";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { AiOutlineEye } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomModal } from "../../../../../components/CustomModal";
import { toast } from "react-toastify";
import { getOffer, getOfferError, getOfferStatus, selectAllOffer } from "../../RecruitmentSlice";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { SvgIcons } from "../../../../../Images";
import { AppointmentForm } from "../../Appointment/Partials/AppointmentForm";
import Button from "../../../../../components/Form/CustomButton";
import { OfferCancelForm } from "./OfferCancelForm";

export const OfferTable = () => {
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
    dispatch(getOffer());
  }, []);

  const AllOffer = useSelector(selectAllOffer);
  const OfferStatus = useSelector(getOfferStatus);
  const OfferError = useSelector(getOfferError);

  useEffect(() => {
    setDataSourse(AllOffer);
  }, [AllOffer]);

  const UpdateOfferDetails = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Offer Details");
    setModalContent(
      <OfferForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateOfferrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const VieweOfferDetail = (record) => {
    setModalTitle("View Offer Details");
    setModalContent(
      <ViewOfferDetails
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        viewOfferrecord={record}
      />
    );
    showModal();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const AddAppointment = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Add Appointment");
    setModalContent(
      <AppointmentForm
        AddAppointments={record}
        updatetrigger={trigger}
        FormExternalClose={FormExternalClose}
        formname={"AddAppointment"}
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
      <OfferCancelForm
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
      title: "Joining Date",
      dataIndex: "joiningDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
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
                VieweOfferDetail(record);
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
                  UpdateOfferDetails(record);
                }}
              >
                <Tooltip placement="top" title={"edit offer Details"}>
                  <img src={SvgIcons.editIcon} width={22} alt="edit offer Details" />
                </Tooltip>
              </TableIconHolder>
            )}

            {record?.approvalType === "scheduled" && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  AddAppointment(record);
                }}
              >
                <Tooltip placement="top" title={"Add Appointment"}>
                  <img
                    src={SvgIcons.assign}
                    width={22}
                    alt="Add Appointment"
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
  //     joiningDate: "Coin",
  //     expiryDate: "53453434",
  //   },
  // ];

  let content;

  if (OfferStatus === "loading") {
    content = <CommonLoading />;
  } else if (OfferStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.candidateId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (OfferStatus === "failed") {
    content = <h2>{OfferError}</h2>;
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
