import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import Flex from "../../../../../components/Flex";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomModal } from "../../../../../components/CustomModal";
import { FiEdit } from "react-icons/fi";
import {
  getSalaryTraineeError,
  getSalaryTraineeStatus,
  getTraineeSalary,
  selectAllTraineeSalary,
} from "../../PayrollSlice";
import { useSelector } from "react-redux";
import { UpdateBasicSalary } from "../../ViewBasicSalary/Partials/UpdateBasicSalary";
import { base } from "../../../../../utils/request";

export const TraineeViewBasicSalary = () => {
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
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  useEffect(() => {
    dispatch(getTraineeSalary());
  }, []);

  const AllBasicSalaryDetails = useSelector(selectAllTraineeSalary);
  const AllBasicSalaryStatus = useSelector(getSalaryTraineeStatus);
  const AllBasicSalaryError = useSelector(getSalaryTraineeError);

  useEffect(() => {
    setDataSource(AllBasicSalaryDetails);
  }, [AllBasicSalaryDetails]);

  const UpdateBasicSalaryy = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Baic Salary ");
    setModalContent(
      <UpdateBasicSalary
        FormExternalClosee={FormExternalClose}
        formname={"editbasicsalary"}
        formReset={formReset}
        updateTraineeBasicrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  // {
  //     AllBasicSalaryDetails..map((item, index) => (
  // }
  const TableColumn = [
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
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          );
        },
      },
    {
      title: "Department Name",
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
      title: "Staff Name",
      dataIndex: "userName",
    },
    {
      title: "Basic Amount",
      dataIndex: "salaryAmount",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <FiEdit onClick={() => UpdateBasicSalaryy(record)} />
          </Flex>
        );
      },
    },
  ];

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  let content;

  if (AllBasicSalaryStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllBasicSalaryStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.salaryTypeListId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllBasicSalaryStatus === "failed") {
    content = <h2>{AllBasicSalaryError}</h2>;
  }

  return (
    <div>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"View Basic Salary Details"} />
      </Flex>
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px 0px" }}
      >
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"Search"} />
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        <Col span={24} md={8}></Col>
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
