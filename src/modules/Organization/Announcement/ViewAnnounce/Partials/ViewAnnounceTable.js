import React, { Fragment, useEffect, useState } from "react";
import { CustomModal } from "../../../../../components/CustomModal";
import { THEME } from "../../../../../theme";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../../components/Flex";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../../../utils/request";
import { Col } from "antd";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { AddAnnounceForm } from "../../AddAnnounce/Partials/AddAnnounceForm";
import {
  getAnnouncement,
  getAnnouncementError,
  getAnnouncementStatus,
  selectAllAnnouncement,
} from "../../announceSlice";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomPopconfirm } from "../../../../../components/CustomPopConfirm";
import { MdDelete } from "react-icons/md";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const AnnouncementTable = () => {
  const navigate = useNavigate();

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [trigger, setTrigger] = useState(0);
  const [searchTexts, setSearchTexts] = useState([]); // Search Bar

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);

  const AllAnnouncement = useSelector(selectAllAnnouncement);
  const AnnouncementStatus = useSelector(getAnnouncementStatus);
  const AnnouncementError = useSelector(getAnnouncementError);

  useEffect(() => {
    dispatch(getAnnouncement());
  }, []);

  useEffect(() => {
    setDataSource(AllAnnouncement);
  }, [AllAnnouncement]);

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

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
    dispatch(getAnnouncement());
  };

  // ===== Modal Functions End =====

  const UpdateAnnouncement = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Announcement");
    setModalContent(
      <AddAnnounceForm
        formname={"Announcement Update"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        updateAnnounceRecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  //   const ViewAnnouncementDetails = (record) => {
  //     setModalTitle("View Announcement");
  //     setModalContent(<ViewAnnoumcementModal viewannouncementrecord={record} />);
  //     showModal();
  //   };

  const AnnouncementStatusClick = (record) => {
    // if (record.status === false || record.status === true) {
        request
            .put(`announcement/or/${record.announcementId}`)
            .then(function (response) {
                dispatch(getAnnouncement());
                if (response.data === false) {
                    toast.success('You Click In-Active');
                }
                else {
                    toast.success('You Click Active');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    // } else {
    //     toast.warn('InActive');
    // }
  };

  const dummycancel =()=>{

  }
  // ============Delete=============

  const handleConfirm = (record) => {
    DeleteAnnounce(record);
  };

  const DeleteAnnounce = (record) => {
    request
      .delete(`${APIURLS.DELETEANNOUNCE}/${record.announcementId}`)
      .then((response) => {
        toast.info("Deleted Successfully");
        dispatch(getAnnouncement());
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Informed By",
      dataIndex: "informedBy",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.informedBy)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.informedBy).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Title For Announcement",
      dataIndex: "title",
    },
    {
      title: "From Date",
      dataIndex: "fromDate",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
    },
    {
      title: "Status",

      render: (record, i) => {
        return (
          <Fragment>
            {record.publish === "published" ? (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"Published"}
              />
            ) : (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"Un Published"}
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
            {record.published
             ? (
              <CustomPopconfirm
                title="Change The Status"
                description="Do you want to change the status into 'UnPublished'?"
                okText="Yes"
                cancelText="No"
                record={record}
                confirm={AnnouncementStatusClick}
                cancel={dummycancel}
              >
                <TableIconHolder color={THEME.red} size={"22px"}>
                  <HiOutlineBellSlash />
                </TableIconHolder>
              </CustomPopconfirm>
            ) : (
              <CustomPopconfirm
                title="Change The Status"
                description="Do you want to change the status into 'Published'?"
                okText="Yes"
                cancelText="No"
                record={record}
                confirm={AnnouncementStatusClick}
                cancel={dummycancel}
              > 
                <TableIconHolder color={THEME.PRIMARY_PURPLE} size={"22px"}>
                  <HiOutlineBellAlert />
                </TableIconHolder>
              </CustomPopconfirm>
            )}

            <TableIconHolder
              color={THEME.blue}
              size={"22px"}
              onClick={() => {
                UpdateAnnouncement(record);
              }}
            >
              <FiEdit />
            </TableIconHolder>

            <CustomPopconfirm
              record={record}
              confirm={handleConfirm}
              // cancel={handlePopConfrmCancel}
              title={"Delete the Client Profile"}
              description={"Are you sure to delete this Client Profile?"}
            >
              <TableIconHolder color={THEME.red} size={"22px"}>
                <MdDelete />
              </TableIconHolder>
            </CustomPopconfirm>
          </Flex>
        );
      },
    },
  ];

  let content;

  if (AnnouncementStatus === "loading") {
    content = <CommonLoading />;
  } else if (AnnouncementStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.announcementId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AnnouncementStatus === "failed") {
    content = <h2>{AnnouncementError}</h2>;
  }
  const handlenavigate = (record) => {
    navigate(`/AddAnnounce`);
  };
  return (
    <Fragment>
      <CustomPageTitle Heading={"View Announcements"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Informed By"} />
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
                  onClick={handlenavigate}
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
    </Fragment>
  );
};
