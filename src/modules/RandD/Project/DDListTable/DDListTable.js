import React, { useState } from "react";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  MdLabelImportant,
  MdMenu,
  MdOutlineArrowCircleRight,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { VscMention } from "react-icons/vsc";
import { IoIosArrowDropup } from "react-icons/io";
import Flex from "../../../../components/Flex";
import Button from "../../../../components/Form/CustomButton";
import { FiPlus } from "react-icons/fi";
import { CustomModal } from "../../../../components/CustomModal";
import { TaskListAdd } from "./TaskListAdd";

export const DDListTable = () => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);

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

  const FormExternalClose = ()=>{
      handleOk()
  }

  const FormCancelRest = () => {
    setFormReset(formReset + 1)
}


  // const FormCancelRest = () => {
  //     setFormReset(formReset + 1)
  // }

  const TableColumn = [
    {
      //   title: "Key",
      title: (
        <Space>
          <InfoCircleOutlined />
          Key
        </Space>
      ),
      render: (value, item, index) => index + 1,
    },
    {
      title: (
        <Space>
          <HiOutlineMenuAlt2 />
          Summary
        </Space>
      ),
      dataIndex: "summary",
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
      title: (
        <Space>
          <MdOutlineArrowCircleRight />
          Status
        </Space>
      ),
      dataIndex: "status",
    },
    {
      title: (
        <Space>
          <MdMenu />
          Category
        </Space>
      ),
      dataIndex: "category",
    },
    {
      title: (
        <Space>
          <VscMention />
          Assignee
        </Space>
      ),
      dataIndex: "assignee",
    },
    {
      title: (
        <Space>
          <MdOutlineCalendarMonth />
          Due Date
        </Space>
      ),
      dataIndex: "dueDate",
    },
    {
      title: (
        <Space>
          <IoIosArrowDropup />
          Priority
        </Space>
      ),
      dataIndex: "priority",
    },
    {
      title: (
        <Space>
          <MdLabelImportant />
          Labels
        </Space>
      ),
      dataIndex: "labels",
    },
    {
      title: (
        <Space>
          <MdOutlineCalendarMonth />
          Created
        </Space>
      ),
      dataIndex: "created",
    },
    {
      title: (
        <Space>
          <MdOutlineCalendarMonth />
          Updated
        </Space>
      ),
      dataIndex: "updated",
    },
    {
      title: (
        <Space>
          <VscMention />
          Reporter
        </Space>
      ),
      dataIndex: "reporter",
    },
  ];

  //   const handleSearchs = (value) => {
  //     setSearchTexts(value);
  //   };

  const data = [
    {
      id: "1",
      summary: "Albin",
      status: "High",
      category: "sdfas",
      assignee: "Colin",
      dueDate: "20-2-23",
      priority: "sdgfg",
      labels: "dfgdfg",
      created: "20-2-23",
      updated: "20-2-23",
      reporter: "power",
    },
  ];

  const AddNewTask = () => {
    console.log("sadfadfas");
    setModalTitle("Add Candidate");
    setModalContent(
      <TaskListAdd
        FormExternalClose={FormExternalClose}
        formname={"AddTask"}
        handleOk={handleOk}
        formReset={formReset}
      />
    );
    showModal();
  };

  

  return (
    <div>
      {/* <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          /> */}
      <CustomStandardTable columns={TableColumn} data={data} />
      <Flex style={{ marginRight: "-30px", justifyContent: "start" }}>
        <Button.Primary
          style={{ borderRadius: "6px" }}
          icon={<FiPlus style={{ fontSize: "20px" }} />}
          text={"Create"}
          onClick={AddNewTask}
        />
      </Flex>
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
