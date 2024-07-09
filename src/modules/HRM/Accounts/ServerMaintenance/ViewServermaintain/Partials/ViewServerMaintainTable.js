import { Col, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { TableIconHolder } from "../../../../../../components/CommonStyled";
import { CustomCardView } from "../../../../../../components/CustomCardView";
import { CustomModal } from "../../../../../../components/CustomModal";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import Flex from "../../../../../../components/Flex";
import ButtonStandard from "../../../../../../components/Form/CustomStandardButton";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { SvgIcons } from "../../../../../../Images";
import { THEME } from "../../../../../../theme";
import {
  getServerMaintain,
  getServerMaintainError,
  getServerMaintainStatus,
  selectAllServerMaintain,
} from "../../../AccountsSlice";
import AddServerMainForm from "../../AddServerMaintain/Partials/AddServerMainForm";

const ViewServerMaintainTable = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTexts, setSearchTexts] = useState([]); //---------Seach Bar --------
  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const FormExternalClose = () => {
    handleOk();
  };

  useEffect(() => {
    dispatch(getServerMaintain());
  }, []);

  const AllServerMaintain = useSelector(selectAllServerMaintain);
  const AllServerMaintainStatus = useSelector(getServerMaintainStatus);
  const AllServerMaintainError = useSelector(getServerMaintainError);


  useEffect(() => {
    setDataSource(AllServerMaintain);
  }, [AllServerMaintain]);

  const handleSet = ()=>{
    dispatch(getServerMaintain());
      handleOk()
  }

  const EditServermaintenance = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Server Details");
    setModalContent(
      <AddServerMainForm
        formname={"UpdateForm"}
        FormExternalClosess={FormExternalClose}
        handleSet={handleSet}
        ServerMainRecord={record}
        Trigger={trigger}
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
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Server Type",
      dataIndex: "serverTypeName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: (record, purchase) => {
        return (
          <>
            <Flex center={"true"} gap={"15px"}>
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  EditServermaintenance(record);
                }}
              >
                <Tooltip placement="top" title={"edit"}>
                  <img src={SvgIcons.editIcon} alt="edit" />
                </Tooltip>
              </TableIconHolder>
            </Flex>
          </>
        );
      },
    },
  ];

  let content;

  if (AllServerMaintainStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllServerMaintainStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.serverMaintenanceId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllServerMaintainStatus === "failed") {
    content = <h2>{AllServerMaintainError}</h2>;
  }
 
  const HandleAddserverMain = () => {
    navigate("/AddServer_Maintenance");
  };
  return (
    <Fragment>
      <CustomPageTitle Heading={"View Server Maintenance"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Server"}
            style={{ marginRight: "10px" }}
            onClick={HandleAddserverMain}
          />
        </Flex>
        <CustomRow space={[12, 12]}>
          <Col span={24} md={24}>
            {/* <CustomTable columns={columns} data={data} /> */}
            {content}
          </Col>
          <CustomModal
            isVisible={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={1000}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};

export default ViewServerMaintainTable;
