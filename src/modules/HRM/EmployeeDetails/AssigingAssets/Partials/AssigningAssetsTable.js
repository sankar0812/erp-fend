import React, { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import { useDispatch } from "react-redux";
import Flex from "../../../../../components/Flex";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import Button from "../../../../../components/Form/CustomButton";
import { FiEdit, FiPlus } from "react-icons/fi";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { AssigningAssetsForm } from "./AssigningAssetsForm";
import { useNavigate } from "react-router-dom";
import {
  getAssignAssetsView,
  getAssignAssetsViewError,
  getAssignAssetsViewStatus,
  selectAllAssignAssetsView,
} from "../../../Accounts/AccountsSlice";
import { useSelector } from "react-redux";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { base } from "../../../../../utils/request";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { SvgIcons } from "../../../../../Images";
import { ViewAssigningAssets } from "./ViewAssigningAssets";

export const AssigningAssetsTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [widthsize, setWidthSize] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAssignAssetsView());
  }, []);

  const AllAssignAssetsView = useSelector(selectAllAssignAssetsView);
  const AllAssignAssetsViewStatus = useSelector(getAssignAssetsViewStatus);
  const AllAssignAssetsViewErrors = useSelector(getAssignAssetsViewError);
  // const Employeeid = useSelector(selectCurrentId);

  useEffect(() => {
    setDataSource(AllAssignAssetsView);
  }, [AllAssignAssetsView]);

  // const GetEmpComplaints = () => {
  //   request
  //     .get(`${APIURLS.GETEMPCOMPLAINTS}${Employeeid}`)
  //     .then(function (response) {
  //       setDataSource(response.data);
  //     })
  //     .catch(function (error) {});
  // };

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

  const UpdateAssigningAssets = (record) => {
    setWidthSize(800);
    setTrigger(trigger + 1);
    setModalTitle("Update Assigning Assets");
    setModalContent(
      <AssigningAssetsForm
        FormExternalClosee={FormExternalClose}
        formname={"editAssigningAssets"}
        formReset={formReset}
        Assetsrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  const ViewAssigningAsset = (record) => {
    setWidthSize(800);
    setModalTitle("View Assigning Assets");
    setModalContent(
      <ViewAssigningAssets
        formname={"View Assigning Assets"}
        formReset={formReset}
        AssigningAssetsrecord={record}
      />
    );
    showModal();
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Profile",
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
      title: "Name",
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
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "Date",
      dataIndex: "assetsDate",
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                ViewAssigningAsset(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>
            <TableIconHolder
              color={THEME.orange}
              size={"22px"}
              onClick={() => {
                UpdateAssigningAssets(record);
              }}
            >
              <Tooltip placement="top" title={"Edit Assigning Assets"}>
                <img
                  src={SvgIcons.editIcon}
                  width={22}
                  alt="edit Task Assign"
                />
              </Tooltip>
            </TableIconHolder>
          </Flex>
        );
      },
    },
  ];

  let content;

  if (AllAssignAssetsViewStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllAssignAssetsViewStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource?.assetsId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllAssignAssetsViewStatus === "failed") {
    content = <h2>{AllAssignAssetsViewErrors}</h2>;
  }

  return (
    <div>
      <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"Assigning Assets"} />
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
          {/* <CustomPageFormTitle Heading={"Complaints"} /> */}
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
                  onClick={() => navigate(`/AddAssigningAssets`)}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>
      {/* <CustomStandardTable columns={columns} data={dataSource} /> */}
      {content}
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
