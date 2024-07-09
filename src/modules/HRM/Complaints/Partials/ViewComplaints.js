import React, { useEffect, useState } from "react";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { Col, Tooltip } from "antd";
import Button from "../../../../components/Form/CustomButton";
import { FiEdit, FiPlus } from "react-icons/fi";
import { CustomModal } from "../../../../components/CustomModal";
import { ComplaintsForm } from "./ComplaintsForm";
import Flex from "../../../../components/Flex";
import { useDispatch, useSelector } from "react-redux";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../components/CommonLoading";
import { CustomLableBack } from "../../../../components/CustomLableBack";
import { TbEye } from "react-icons/tb";
import { ViewDescription } from "./ViewDescription";
import {
  getComplaints,
  getComplaintsError,
  getComplaintsStatus,
  selectAllComplaints,
} from "../ComplaintsSlice";
import { selectCurrentId, selectCurrentRoleId } from "../../../Auth/authSlice";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import { AiOutlineFolderView } from "react-icons/ai";
import ViewAttachment from "../../EmployeeDetails/Complaints/Partials/ViewAttachment";

export const ViewComplaints = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [widthsize, setWidthSize] = useState(0);

  const dispatch = useDispatch();

  const RoleId = useSelector(selectCurrentRoleId);
  const Employeeid = useSelector(selectCurrentId);

  useEffect(() => {
    GetEmpComplaints();
  }, []);

  const GetEmpComplaints = () => {
    request
      .get(`${APIURLS.GETEMPCOMPLAINTS}${Employeeid}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const UpdateComplaints = (record) => {
    setWidthSize(800);
    setTrigger(trigger + 1);
    setModalTitle("Update Complaint Details");
    setModalContent(
      <ComplaintsForm
        FormExternalClosee={FormExternalClose}
        formname={"editcomplaints"}
        formReset={formReset}
        complaintsrecord={record}
        updatetrigger={trigger}
        GetEmpComplaints={GetEmpComplaints}
      />
    );
    showModal();
  };

  const AddEmployeeComplaints = () => {
    setWidthSize(800);
    setModalTitle("Add Staff Complaints");
    setFormReset(formReset + 1);
    setModalContent(
      <ComplaintsForm
        formname={"AddEmployeeComplaintForm"}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        GetEmpComplaints={GetEmpComplaints}
      />
    );
    showModal();
  };

  const ViewAttachmentModal = (record) => {
    setWidthSize(500);
    setTrigger(trigger + 1);
    setModalTitle("View Attachment");
    setModalContent(<ViewAttachment record={record} />);
    showModal();
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    // {
    //   title: "User Id",
    //   dataIndex: "userId",
    // },
    // {
    //   title: "Name",
    //   dataIndex: "userName",
    //   filteredValue: searchTexts ? [searchTexts] : null,
    //   onFilter: (value, record) => {
    //     return (
    //       String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.userName).includes(value.toUpperCase())
    //     );
    //   },
    // },
    {
      title: "Complaints Title",
      dataIndex: "complaintsTitle",
    },
    {
      title: "Complaints Date",
      dataIndex: "complaintsDate",
    },
    {
      title: "Complaints Against Name",
      dataIndex: "complaintsAgainstName",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <AiOutlineFolderView
              color="red"
              style={{ fontSize: "24px" }}
              onClick={() => {
                ViewAttachmentModal(record);
              }}
            />
          </Flex>
        );
      },
    },
  ];

  const rowKey = (dataSource) => dataSource.complaintsId;

  return (
    <div>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"Staff Complaints"} />
      </Flex>

      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"Complaints"} />
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
                  // onClick={() => navigate("/addemployee")}
                  onClick={AddEmployeeComplaints}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
      {/* {content} */}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={widthsize}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </div>
  );
};
