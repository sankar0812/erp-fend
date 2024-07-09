import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col, Tooltip } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialEmployee,
  getInitialEmployeeError,
  getInitialEmployeeStatus,
  getLeave,
  getLeaveDetailsError,
  getLeaveDetailsStatus,
  selectAllInitialEmployee,
  selectLeaveDetails,
} from "../../EmployeeSlice";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { CustomPopconfirm } from "../../../../../components/CustomPopConfirm";
import { RiDeleteBinLine } from "react-icons/ri";
import { THEME } from "../../../../../theme";
import { AddEmpLeaveForm } from "./EmployeeLeave";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import {
  selectCurrentId,
  selectCurrentRoleId,
  selectCurrentRoleName,
} from "../../../../Auth/authSlice";
import { CustomTag } from "../../../../../components/Form/CustomTag";
import { SvgIcons } from "../../../../../Images";
import { ViewEmployeeDetails } from "./ViewEmployeeDetails";

export const ViewEmployee = ({ call }) => {
  const navigate = useNavigate();

  // const DEL_PARTY_URL = 'party/edit_party'
  // let api = useAxios();

  const Employeeid = useSelector(selectCurrentId);
  const RoleId = useSelector(selectCurrentRoleId);
  const RoleName = useSelector(selectCurrentRoleName);

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch();

  const InitialEmployeeDetails = useSelector(selectLeaveDetails);
  const InitialEmployeeStatus = useSelector(getLeaveDetailsStatus);
  const InitialEmployeeError = useSelector(getLeaveDetailsError);

  useEffect(() => {
    GetEmployeeLeave();
  }, [call]);

  const GetEmployeeLeave = () => {
    request
      .get(`${APIURLS.GETEMPLOYEELEAVE}${Employeeid}/${RoleId}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  // const EmployeeFindId = InitialEmployeeDetails?.filter((item) => item?.employeeId === Employeeid);
  // const EmployeeFindId = useMemo(
  //   () =>
  //     InitialEmployeeDetails?.filter((item) => item?.employeeId == Employeeid),
  //   [InitialEmployeeDetails, Employeeid]
  // );

  // useEffect(() => {
  //   if (EmployeeFindId) {
  //     setDataSource(EmployeeFindId);
  //   }
  // }, [EmployeeFindId]);

  // useEffect(() => {
  //   dispatch(getLeave());
  // }, []);

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

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  const FormExternalClose = () => {
    handleOk();
    // dispatch(getLeave())
  };

  const dummycancel = () =>{
    
  }
  //=========== Edit Leave=======
  const EditEmployeeDetails = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Edit Emp Leave");
    setModalContent(
      <AddEmpLeaveForm
        formname={"Edit Emp Leave"}
        leaverecord={record}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        updatetrigger={trigger}
        GetEmployeeLeave={GetEmployeeLeave}
      />
    );
    showModal();
  };

  const VieweLeaveDetail = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("view Employee Leave");
    setModalContent(
      <ViewEmployeeDetails
        formname={"view Employee Leave"}
        leaverecord={record}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
      />
    );
    showModal();
  };

  //================= Delete leave============

  const handleConfirm = (record) => {
    DeleteEmpLeave(record);
  };

  const DeleteEmpLeave = (record) => {
    request
      .delete(`${APIURLS.DELETEEMPLEAVE}/${record?.employeeLeaveId}`)
      .then((response) => {
        toast.info("Deleted Successfully");
        GetEmployeeLeave();
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
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
      title: "Status",
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
            {record.leavetype === "pending" && (
              <TableIconHolder color={THEME.blue} size={"22px"}>
                <FiEdit onClick={() => EditEmployeeDetails(record)} />
              </TableIconHolder>
            )}
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                VieweLeaveDetail(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>

            {record.leavetype === "pending" && (
              <CustomPopconfirm
              record={record}
              confirm={handleConfirm}
              cancel={dummycancel}
              title={"Delete the Emp Leave List"}
              description={"Are you sure to delete this Emp Leave?"}
            >
              <TableIconHolder color={THEME.red} size={"22px"}>
                <MdDelete />
              </TableIconHolder>
            </CustomPopconfirm>
            )}

          </Flex>
        );
      },
    },
  ];

  // let content;

  // if (InitialEmployeeStatus === "loading") {
  //   content = <CommonLoading />;
  // } else if (InitialEmployeeStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeLeaveId;
  //   content = (
  //     <CustomStandardTable
  //       columns={columns}
  //       data={dataSource}
  //       rowKey={rowKey}
  //     />
  //   );
  // } else if (InitialEmployeeStatus === "failed") {
  //   content = <h2>{InitialEmployeeError}</h2>;
  // }

  const handleRowClick = (record) => {
    navigate(`/AddEmployeeLeave/${record.employeeId}`);
  };

  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Staff"} />
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        {/* <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                //   onClick={AddEmployeeDetails}`
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col> */}
      </CustomRow>
      <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey}/>
      {/* {content} */}
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
