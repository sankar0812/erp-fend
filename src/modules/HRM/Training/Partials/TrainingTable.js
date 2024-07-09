import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrainingForm } from "./TrainingForm";
import { Col, Popconfirm, Tooltip } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../components/CustomRow";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CustomModal } from "../../../../components/CustomModal";
import Button from "../../../../components/Form/CustomButton";
import {
  getTraining,
  getTrainingError,
  getTrainingStatus,
  selectAllTraining,
} from "../TrainingSlice";
import { CommonLoading } from "../../../../components/CommonLoading";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { TableIconHolder } from "../../../../components/CommonStyled";
import { THEME } from "../../../../theme";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { FaExchangeAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { SvgIcons } from "../../../../Images";
import Flex from "../../../../components/Flex";
import { ViewTrainingDetails } from "./ViewTraining";
import { useNavigate } from "react-router-dom";
import { CustomPopconfirm } from "../../../../components/CustomPopConfirm";

const ViewTraining = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
    dispatch(getTraining());
  }, []);

  const AllTrainingDetails = useSelector(selectAllTraining);
  const AllTrainingStatus = useSelector(getTrainingStatus);
  const AllTrainingError = useSelector(getTrainingError);

  const UpdateTraining = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Training");
    setModalContent(
      <TrainingForm
        FormExternalClosee={FormExternalClose}
        formname={"training"}
        formReset={formReset}
        trainingrecord={record}
        updatetrigger={trigger}
      />
    );
    showModal();
  };

  useEffect(() => {
    setDataSource(AllTrainingDetails);
  }, [AllTrainingDetails]);

  const ActiveDetail = (record) => {
    request
      .put(`${APIURLS.STATUSTRAINING}${record.traineeId}`)
      .then(function (response) {
        toast.success("Status Changed Successfully");
        dispatch(getTraining());
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const TraineeStatus = (record) => {
    const value = {
      traineeStatus: "completed",
    };
    request
      .put(`${APIURLS.PUTTRAINEESTATUS}${record?.traineeId}`, value)
      .then(function (response) {
        toast.success("Trainee Moved Successfully");
        dispatch(getTraining());
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const TraineeCancelStatus = (record) => {
    const value = {
      traineeStatus: "cancelled",
    };
    request
      .put(`${APIURLS.PUTTRAINEESTATUS}${record?.traineeId}`, value)
      .then(function (response) {
        toast.success("Trainee Cancelled Successfully");
        dispatch(getTraining());
      })
      .catch(function (error) {
        console.error(error, "check");
      });
  };

  const ViewTraineeDetail = (record) => {
    navigate(`/viewTraining/${record.traineeId}`)
  }

  const TableColumn = [
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
      title: "Trainee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Status",
      render: (record, i) => {
        return (
          <Fragment>
            {record.traineeStatus === "started" && (
              <CustomTag
                bordered={"true"}
                color={"processing"}
                title={"started"}
              />
            )}

            {record.traineeStatus === "completed" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"completed"}
              />
            )}

            {record.traineeStatus === "cancelled" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}
          </Fragment>
        );
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            {record.traineeStatus === "started" && (
              <>
                {!record.status && (
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
                {record.status && (
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
                  color={THEME.orange}
                  size={"22px"}
                  onClick={() => {
                    UpdateTraining(record);
                  }}
                >
                  <Tooltip placement="top" title={"Edit Training"}>
                    <img src={SvgIcons.editIcon} width={22} alt="edit Training" />
                  </Tooltip>
                </TableIconHolder>
  
                <CustomPopconfirm
                  title="Change The Status"
                  description="Do you want to change this Trainee to 'STAFF'?"
                  okText="Move"
                  cancelText="Cancelled"
                  confirm={() => TraineeStatus(record)}
                  cancel={() => TraineeCancelStatus(record)}
                >
                  <TableIconHolder color={THEME.red} size={"22px"}>
                    <Tooltip placement="top" title={"Move to Staff"}>
                      <img src={SvgIcons.move} alt="Move to Staff" />
                    </Tooltip>
                  </TableIconHolder>
                </CustomPopconfirm>
              </>
            )}
              <TableIconHolder
                color={THEME.green}
                size={"22px"}
                onClick={() => {
                  ViewTraineeDetail(record);
                }}
              >

                <Tooltip placement="top" title={"view"}>
                  <img src={SvgIcons.viewIcon} width={22} alt="view" />
                </Tooltip>

              </TableIconHolder>
      
          </Flex>
        );
      },
    }
  ];

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const AddTraing = () => {
    setModalTitle("Add Training");
    setTrigger(trigger + 1);
    setModalContent(
      <TrainingForm
        formname={"AddTrainingForm"}
        FormExternalClose={FormExternalClose}
        addtrigger={trigger}
      />
    );
    showModal();
  };

  let content;

  if (AllTrainingStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllTrainingStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.traineeId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllTrainingStatus === "failed") {
    content = <h2>{AllTrainingError}</h2>;
  }
 
  return (
    <div>
      <CustomPageTitle Heading={"Training Details"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col
          span={24}
          md={10}
          style={{ display: "flex", gap: "10px", alignItems: "baseline" }}
        >
          <CustomPageFormTitle Heading={"Training"} />
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
                  onClick={AddTraing}
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

export default ViewTraining;
