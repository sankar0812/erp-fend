import React, { Fragment, useEffect, useState } from "react";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentForm } from "./AppointmentForm";
import { ViewAppointment } from "./ViewAppointment";
import { THEME } from "../../../../../theme";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { AiOutlineEye } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { toast } from "react-toastify";
import Flex from "../../../../../components/Flex";
import { getAppointment, getAppointmentError, getAppointmentStatus, selectAllAppointment } from "../../RecruitmentSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { SvgIcons } from "../../../../../Images";

export const AppointmentTable = () => {
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
    dispatch(getAppointment());
  }, []);

  const AllAppointment = useSelector(selectAllAppointment);
  const AppointmentStatus = useSelector(getAppointmentStatus);
  const AppointmentError = useSelector(getAppointmentError);

  useEffect(() => {
    setDataSourse(AllAppointment);
  }, [AllAppointment]);

  const UpdateAppointmentDetails = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Appointment Details");
    setModalContent(
      <AppointmentForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateAppointmentrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const VieweAppointmentDetail = (record) => {
    setModalTitle("View Appointment Details");
    setModalContent(
      <ViewAppointment
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        viewAppointmentrecord={record}
      />
    );
    showModal();
  };

  const ViewCandidatee = () => {
    toast.success("You Click Active");
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
      title: "Position",
      dataIndex: "position",
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
                VieweAppointmentDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>
          </Flex>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      userName: "Coin",
      position: "Coin",
      date: "53453434",
    },
  ];

  let content;

  if (AppointmentStatus === "loading") {
    content = <CommonLoading />;
  } else if (AppointmentStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.candidateId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (AppointmentStatus === "failed") {
    content = <h2>{AppointmentError}</h2>;
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
