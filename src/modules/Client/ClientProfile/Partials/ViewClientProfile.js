import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { Col, Dropdown } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../components/Flex";
import { CustomModal } from "../../../../components/CustomModal";
import Button from "../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoading } from "../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { AddClientProfile } from "./AddClientProfile";
import {
  getClientProfile,
  getClientProfileError,
  getClientProfileStatus,
  viewclientprofile,
} from "../../ClientSlice";
import { TableIconHolder } from "../../../../components/CommonStyled";
import { AiOutlineEye } from "react-icons/ai";
import { CustomPopconfirm } from "../../../../components/CustomPopConfirm";
import { THEME } from "../../../../theme";
import { toast } from "react-toastify";
import request, { base } from "../../../../utils/request";
import { MdDelete } from "react-icons/md";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import CardViewProfile from "./CardViewProfile";
import { CustomCardView } from "../../../../components/CustomCardView";
import image from "../../../../Images/IDAEUX LOGO.png";
import { CiMenuKebab } from "react-icons/ci";

export const ViewClientProfile = () => {
  const navigate = useNavigate();

  // const DEL_PARTY_URL = 'party/edit_party'
  // let api = useAxios();

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
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();

  const ClientDetails = useSelector(viewclientprofile);
  const ViewProfileStatus = useSelector(getClientProfileStatus);
  const ViewProfileError = useSelector(getClientProfileError);

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

  useEffect(() => {
    setDataSource(ClientDetails);
  }, [ClientDetails]);

  useEffect(() => {
    dispatch(getClientProfile());
  }, []);

  const handleConfirm = (record) => {
    DeleteClientProfile(record);
  };

  const DeleteClientProfile = (record) => {
    request
      .delete(`${APIURLS.DELETECLIENTPROFILE}/${record.clientId}`)
      .then((response) => {
        toast.info("Deleted Successfully");
        dispatch(getClientProfile());
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
      title: "Client name",
      dataIndex: "clientName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.clientName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.clientName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Contact No",
      dataIndex: "phoneNumber",
    },
    {
      title: "Location",
      dataIndex: "city",
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => ViewClientProfile(record)}
            >
              <AiOutlineEye />
            </TableIconHolder>

            <TableIconHolder
              color={THEME.blue}
              size={"22px"}
              onClick={() => EditClientForm(record)}
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

  if (ViewProfileStatus === "loading") {
    content = <CommonLoading />;
  } else if (ViewProfileStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({
          //   onClick: () => handleRowClick(record),
        })}
      />
    );
  } else if (ViewProfileStatus === "failed") {
    content = <h2>{ViewProfileError}</h2>;
  }

  const FormExternalClose = () => {
    handleOk();
    dispatch(getClientProfile());
  };

  //  ========== Edit========//

  const EditClientForm = (record) => {
    setModalTitle("Update Profile");
    setWidth(900);
    setModalContent(
      <AddClientProfile
        formname={"AddEmployeeProfileForm"}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        profilerecord={record}
      />
    );
    showModal();
  };

  // ======== View========//

  const ViewClientProfile = (record) => {
    setModalTitle("View Profile");
    setWidth(600);
    setModalContent(
      <CardViewProfile
        formname={"AddEmployeeProfileForm"}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        profilerecord={record}
      />
    );
    showModal();
  };

  const handlenavigate = (record) => {
    navigate(`/AddClientProfile`);
  };
  
  const handleViewNavigate = (record) => {
    navigate(`/clientView/${record.clientId}`)
  };

  const createDropdownItems = (record,index) => [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            EditClientForm(record,index);
          }}
        >
          Edit
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <CustomPopconfirm
              record={record}
              confirm={handleConfirm}
              // cancel={handlePopConfrmCancel}
              title={"Delete the Client Profile"}
              description={"Are you sure to delete this Client Profile?"}
            >
                <p>Delete</p>
            </CustomPopconfirm>
      ),
    },
  ];

  return (
    <Fragment>
      <CustomPageTitle Heading={"View Client Profile"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        {/* <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Client Names"} /> */}
          {/* <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          /> */}
        {/* </Col> */}
        <Col span={24} md={24}>
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
      {/* <CustomStandardTable
        columns={columns}
        data={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      /> */}
      {/* {content} */}
      <CustomRow space={[24, 24]} style={{marginTop:"20px"}}>
        {dataSource?.map((item,index) => (
          <Col span={24} md={6} key={item?.clientId}>
            <CustomCardView style={{ padding: "25px 10px" }}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <img
                  src={`${base}${item?.clientProfile}`}
                  alt=""
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <Dropdown menu={{ items: createDropdownItems(item,index) }} placement="bottomLeft">
                  <CiMenuKebab
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      fontSize: "18px",
                    }}
                  />
                </Dropdown>

                <p style={{ fontSize: "18px", padding: "5px 0px" }}>
                  {item?.clientName}
                </p>
                <p style={{ fontSize: "14px", padding: "5px 0px" }}>
                  {item?.phoneNumber}
                </p>
                {/* <Button style={{ margin: "5px 0px" }} onClick={()=>ViewClientProfile(item)}>View Profile</Button> */}
                <Button style={{ margin: "5px 0px" }} onClick={()=>handleViewNavigate(item)}>View Profile</Button>
              </div>
            </CustomCardView>
          </Col>
        ))}
      </CustomRow>

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={width}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
