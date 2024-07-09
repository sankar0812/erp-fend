import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiringForm } from "./HiringForm";
import { ViewHiringDetails } from "./ViewHiringDetails";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomModal } from "../../../../../components/CustomModal";
import Flex from "../../../../../components/Flex";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { SvgIcons } from "../../../../../Images";
import { FiPlus } from "react-icons/fi";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  getHiring,
  getHiringError,
  getHiringStatus,
  selectAllHiring,
} from "../../RecruitmentSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";

export const HiringTable = ({ AddNewHiring }) => {
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

  const navigate = useNavigate();

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
    dispatch(getHiring());
  }, []);

  const AllHiring = useSelector(selectAllHiring);
  const HiringStatus = useSelector(getHiringStatus);
  const HiringError = useSelector(getHiringError);

  useEffect(() => {
    setDataSourse(AllHiring);
  }, [AllHiring]);

  const UpdateHiring = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Hiring Details");
    setModalContent(
      <HiringForm
        formname={"UpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateHiringrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  // const ViewHiringDetail = () => {
  //   setModalTitle("View Hiring Details");
  //   setModalContent(
  //     <ViewHiringDetails
  //       formname={"UpdateForm"}
  //       FormExternalClose={FormExternalClose}
  //       formReset={formReset}
  //       HiringViewrecord={record}
  //     />
  //   );
  //   showModal();
  // };

  const ActiveDetail = (record) => {
    request
      .put(`${APIURLS.PUTHIRINGACTIVE}${record.hiringId}`)
      .then(function (response) {
        toast.success("Status Changed Successfully");
        dispatch(getHiring());
      })
      .catch(function (error) {
        console.error(error, "check");
      });
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
      title: "Job Title",
      dataIndex: "jobTitle",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.jobTitle).toLowerCase().includes(value.toLowerCase()) ||
          String(record.jobTitle).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "PostedOn",
      dataIndex: "posted",
    },
    {
      title: "ClosedOn",
      dataIndex: "closing",
    },
    {
      title: "EmailId",
      dataIndex: "email",
    },
    {
      title: "Status",
      render: (record, i) => {
        return (
          <Fragment>
            {record.status === true && (
              <CustomTag bordered={"true"} color={"success"} title={"Active"} />
            )}

            {record.status === false && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"In-Active"}
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
            {record.status === false && (
              <TableIconHolder
                color={THEME.green}
                size={"22px"}
                onClick={() => {
                  ActiveDetail(record);
                }}
              >
                <Tooltip placement="top" title={"active"}>
                  <img src={SvgIcons.activeIcon} alt="active" />
                </Tooltip>
              </TableIconHolder>
            )}
            {record.status === true && (
              <TableIconHolder
                color={THEME.green}
                size={"22px"}
                onClick={() => {
                  ActiveDetail(record);
                }}
              >
                <Tooltip placement="top" title={"inActive"}>
                  <img src={SvgIcons.inActiveIcon} alt="inActive" />
                </Tooltip>
              </TableIconHolder>
            )}
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                ViewHiringDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} alt="view" />
              </Tooltip>
            </TableIconHolder>

            <TableIconHolder
              color={THEME.blue}
              size={"22px"}
              onClick={() => {
                UpdateHiring(record);
              }}
            >
              <Tooltip placement="top" title={"edit"}>
                <img src={SvgIcons.editIcon} alt="edit" />
              </Tooltip>
            </TableIconHolder>
          </Flex>
        );
      },
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     jobTitle: "Coin",
  //     postedOn: "Coin",
  //     closedOn: "53453434",
  //     date: "albin@gmail.com",
  //   },
  // ];

  let content;

  if (HiringStatus === "loading") {
    content = <CommonLoading />;
  } else if (HiringStatus === "succeeded") {
    const rowKey = (dataSourse) => dataSourse.hiringId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSourse}
        rowKey={rowKey}
      />
    );
  } else if (HiringStatus === "failed") {
    content = <h2>{HiringError}</h2>;
  }

  const AddHiring = () => {
    navigate("/add_hiring");
  };

  const ViewHiringDetail = (record) => {
    navigate(`/view_hiring/${record.hiringId}`);
  };

  return (
    <Fragment>
      <CustomRow
        style={{
          background: "#dae1f3",
          padding: "12px",
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
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={() => {
                    AddHiring();
                  }}
                />
              </Flex>
            </Col>
          </CustomRow>
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
