import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartment,
  getDepartmentError,
  getDepartmentStatus,
  selectAllDepartment,
} from "../../EmployeeSlice";
import { CommonLoading } from "../../../../../components/CommonLoading";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../components/CustomModal";
import { FiEdit, FiPlus } from "react-icons/fi";
import { AddDepartmentModal } from "../../ViewEmployee/Partials/AddEmployeeModals";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";

const ViewDepartments = () => {
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

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const AllDepartmentDetails = useSelector(selectAllDepartment);
  const AllDepartmentStatus = useSelector(getDepartmentStatus);
  const AllDepartmentError = useSelector(getDepartmentError);

  useEffect(() => {
    setDataSource(AllDepartmentDetails);
  }, [AllDepartmentDetails]);

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const UpdateDepartments = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Departments");
    setModalContent(
      <AddDepartmentModal
        FormExternalClosee={FormExternalClose}
        formname={"editdepartments"}
        formReset={formReset}
        departmentrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const AddEmployeeDepartmentDetails = () => {
    setModalTitle("Add Staff Department");
    setModalContent(
      <AddDepartmentModal
        formname={"AddStaffDepartment"}
        FormExternalCloses={FormExternalClose}
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
      title: "Department",
      dataIndex: "departmentName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.departmentName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.departmentName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Color",
      // dataIndex: "color",
      render: (record) => {
        return (
          <Flex>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: `${record.color}`,
              }}
            ></div>&nbsp;
            <div>{record.color}</div>
          </Flex>
        );
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <FiEdit onClick={() => UpdateDepartments(record)} />
          </Flex>
        );
      },
    },
  ];
  let content;

  if (AllDepartmentStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllDepartmentStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.departmentId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllDepartmentStatus === "failed") {
    content = <h2>{AllDepartmentError}</h2>;
  }

  return (
    <div>
      <CustomPageTitle Heading={"Staff Departments"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Department"} />
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
                  onClick={AddEmployeeDepartmentDetails}
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
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
};

export default ViewDepartments;
