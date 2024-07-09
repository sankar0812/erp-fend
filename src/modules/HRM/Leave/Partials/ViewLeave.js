import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomModal } from "../../../../components/CustomModal";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { CustomRow } from "../../../../components/CustomRow";
import { Col } from "antd";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { LeaveForm } from "./LeaveForm";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { THEME } from "../../../../theme";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { TableIconHolder } from "../../../../components/CommonStyled";
import {
  getLeave,
  getLeaveDetailsError,
  getLeaveDetailsStatus,
  selectLeaveDetails,
} from "../../EmployeeDetails/EmployeeSlice";
import { CommonLoading } from "../../../../components/CommonLoading";
import { logDOM } from "@testing-library/react";
import { base } from "../../../../utils/request";

const ViewLeave = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ===== Modal Functions Start =====

  useEffect(() => {
    dispatch(getLeave());
  }, []);

  const InitialEmployeeDetails = useSelector(selectLeaveDetails);
  const InitialEmployeeStatus = useSelector(getLeaveDetailsStatus);
  const InitialEmployeeError = useSelector(getLeaveDetailsError);

  useEffect(() => {
    setDataSource(InitialEmployeeDetails);
  }, [InitialEmployeeDetails]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
    FormRest();
  };

  const EditEmployeeLeave = (record) => {
    setModalTitle("Staff Leave");
    setModalContent(
      <LeaveForm
        formname={"EditEmployeeLeaveForm"}
        FormExternalCloseee={FormExternalClose}
        leaveRecord={record}
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
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return <img
          src={`${base}${profile}`}
          alt="Staff"
          width="50"
          height="50"
          style={{ borderRadius: "50%", objectFit:"cover" }}
        />
      }

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
      title: "From Date",
      dataIndex: "date",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
    },
    {
      title: "Total Day",
      dataIndex: "totalDay",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      render: (record, i) => {
        return (
          <Fragment>
            <div style={{textAlign:"center"}}>
            <CustomTag bordered={"true"} color={"success"} title={record} />
            </div>
          </Fragment>
        );
      },
    },
    {
      title: "Status",
      // dataIndex: "statusLevel",
      render: (record, i) => {
        return (
          <Fragment>
            {record.leavetype === "pending" && (
              <CustomTag
                bordered={"true"}
                color={"warning"}
                title={"Pending"}
              />
            )}

            {record.leavetype === "rejected" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}

            {record.leavetype === "approved" && (
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
            {record.leavetype === "pending" && (
              <TableIconHolder color={THEME.blue} size={"22px"}>
                <FiEdit onClick={() => EditEmployeeLeave(record)} />
              </TableIconHolder>
            )}
          </Flex>
        );
      },
    },
  ];

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  let content;

  if (InitialEmployeeStatus === "loading") {
    content = <CommonLoading />;
  } else if (InitialEmployeeStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeLeaveId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (InitialEmployeeStatus === "failed") {
    content = <h2>{InitialEmployeeError}</h2>;
  }

  return (
    <div>
      <CustomPageTitle Heading={"Staff Leave"} />
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
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              {/* <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  // onClick={() => navigate("/addemployee")}
                  onClick={AddEmployeeLeave}
                />
              </Flex> */}
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>
      {/* <CustomStandardTable columns={TableColumn} data={dataSource} /> */}
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
};

export default ViewLeave;
