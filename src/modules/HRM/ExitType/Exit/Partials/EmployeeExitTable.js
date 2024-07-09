import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Form, Popconfirm, Tooltip } from "antd";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { FiEdit, FiPlus } from "react-icons/fi";
import EmployeeExit from "./EmployeeExit";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../../../../../theme";

import { useNavigate } from "react-router-dom";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import {
  getResignation,
  selectAllResignation,
} from "../../Resignation/ResignationSlice";
import {
  getEmployeeExit,
  getEmployeeExitError,
  getEmployeeExitStatus,
  selectAllEmployeeExit,
} from "./ExitSlice";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { base } from "../../../../../utils/request";
import { SvgIcons } from "../../../../../Images";
import { ViewEmpExit } from "./ViewEmpExit";
import { LiaCertificateSolid } from "react-icons/lia";

const EmployeeExitTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTexts, setSearchTexts] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const [trigger, setTrigger] = useState(0);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // FormRest();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  // const AddUserDetails = () => {
  //     setTrigger(trigger + 1)
  //     setModalTitle("Add Exit Type");
  //     setModalContent(
  //         <EmployeeExit trigger={trigger} FormExternalClose={FormExternalClose} />
  //     );
  //     showModal();
  // };

  const EditExitEmp = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Edit Exit Type");
    setModalContent(
      <EmployeeExit
        updateRecord={record}
        formname={"AddEmployeeComplaintForm"}
        FormExternalCloseee={FormExternalClose}
      />
    );
    showModal();
  };

  const ViewExitEmp = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("View Exit Type");
    setModalContent(
      <ViewEmpExit
        ViewEmpRecord={record}
        formname={"ViewExitForm"}
      />
    );
    showModal();
  };

  useEffect(() => {
    dispatch(getEmployeeExit());
  }, []);

  const AllEmployeeExit = useSelector(selectAllEmployeeExit);
  const EmployeeExitStatus = useSelector(getEmployeeExitStatus);
  const EmployeeExitError = useSelector(getEmployeeExitError);

  useEffect(() => {
    setDataSource(AllEmployeeExit);
  }, [AllEmployeeExit]);

  const EditExperience = (record) => {
    navigate(`/exitExperience/${record?.employeeId}`)
  }

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit:"cover" }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.employee_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.employee_name).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            {/* <TableIconHolder
              color={THEME.orange}
              size={"22px"}
              onClick={() => {
                EditExitEmp(record);
              }}
            >
              <Tooltip placement="top" title={"Edit Exit"}>
                <img src={SvgIcons.editIcon} width={22} alt="Edit Exit" />
              </Tooltip>
            </TableIconHolder> */}
            <TableIconHolder
              color={THEME.orange}
              size={"22px"}
              onClick={() => {
                ViewExitEmp(record);
              }}
            >
              <Tooltip placement="top" title={"View Exit"}>
                <img src={SvgIcons.viewIcon} width={22} alt="View Exit" />
              </Tooltip>
            </TableIconHolder>
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
          </Flex>
        );
      },
    },
  ];

  console.log(dataSource);

  let content;

  if (EmployeeExitStatus === "loading") {
    content = <CommonLoading />;
  } else if (EmployeeExitStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (EmployeeExitStatus === "failed") {
    content = <h2>{EmployeeExitError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageTitle Heading={"Exit"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"Exit"} />
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
                  // onClick={AddUserDetails}
                  onClick={() => {
                    navigate("/employeeExit");
                  }}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
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

export default EmployeeExitTable;
