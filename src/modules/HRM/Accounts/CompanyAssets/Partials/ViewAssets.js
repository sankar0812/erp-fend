import React, { useEffect, useState } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import Flex from "../../../../../components/Flex";
import ButtonStandard from "../../../../../components/Form/CustomStandardButton";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomModal } from "../../../../../components/CustomModal";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { THEME } from "../../../../../theme";
import { Col, Tooltip } from "antd";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { useDispatch } from "react-redux";
import {
  getAssets,
  getAssetsError,
  getAssetsStatus,
  selectAllAssets,
} from "../../AccountsSlice";
import { useSelector } from "react-redux";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { SvgIcons } from "../../../../../Images";
import { AddAssets } from "./AddAssets";
import { ViewAssetDetail } from "./ViewAssetDetail";
import { useNavigate } from "react-router-dom";

export const ViewAssets = () => {
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
    dispatch(getAssets());
  }, []);

  const AllAssets = useSelector(selectAllAssets);
  const AllAssetsStatus = useSelector(getAssetsStatus);
  const AllAssetsError = useSelector(getAssetsError);
  useEffect(() => {
    setDataSource(AllAssets);
  }, [AllAssets]);

  const EditAssets = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Assets Details");
    setModalContent(
      <AddAssets
        formname={"UpdateForm"}
        FormExternalClosess={FormExternalClose}
        formReset={formReset}
        Assetsrecord={record}
        Trigger={trigger}
      />
    );
    showModal();
  };

  const ViewAssetDetails = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("View Assets Details");
    setModalContent(<ViewAssetDetail AssetsViewRecord={record} />);
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
      title: "Assets Values",
      dataIndex: "assetValues",
    },
    {
      title: "Action",
      render: (record, purchase) => {
        return (
          <>
            <Flex center={"true"} gap={"15px"}>

              {/* <TableIconHolder
                color={THEME.green}
                size={"22px"}
                onClick={() => {
                  ViewAssetDetails(record);
                }}
              >
                <Tooltip placement="top" title={"view"}>
                  <img src={SvgIcons.viewIcon} alt="view" />
                </Tooltip>
              </TableIconHolder> */}

              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  EditAssets(record);
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

  if (AllAssetsStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllAssetsStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.companyAssetsId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllAssetsStatus === "failed") {
    content = <h2>{AllAssetsError}</h2>;
  }

  const AddAsset = () => {
    navigate('/addAssets')
  }

  return (
    <div>
      <CustomPageTitle Heading={"View Assets"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Assets"}
            style={{ marginRight: "10px" }}
            onClick={AddAsset}
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
            width={1200}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </div>
  );
};
