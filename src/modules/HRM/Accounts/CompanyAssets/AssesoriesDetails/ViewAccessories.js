import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAccessories, getAccessoriesError, getAccessoriesStatus, selectAllAccessories } from '../../AccountsSlice';
import { useSelector } from 'react-redux';
import { AddAccessories } from '../Partials/AddAccessories';
import Flex from '../../../../../components/Flex';
import { TableIconHolder } from '../../../../../components/CommonStyled';
import { Col, Tooltip } from 'antd';
import { SvgIcons } from '../../../../../Images';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { THEME } from '../../../../../theme';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import ButtonStandard from '../../../../../components/Form/CustomStandardButton';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomModal } from '../../../../../components/CustomModal';
import { base } from '../../../../../utils/request';

export const ViewAccessories = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [formReset, setFormReset] = useState(0);

  const dispatch = useDispatch();

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
    dispatch(getAccessories());
  }, []);

  const AllAccessories = useSelector(selectAllAccessories);
  const AllAccessoriesStatus = useSelector(getAccessoriesStatus);
  const AllAccessoriesError = useSelector(getAccessoriesError);

  useEffect(() => {
    setDataSource(AllAccessories);
  }, [AllAccessories]);

  const EditAccessoriess = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Accessories");
    setModalContent(
      <AddAccessories
        formname={"UpdateForm"}
        formReset={formReset}
        Accessoriesrecord={record}
        Trigger={trigger}
        FormExternalCloses={FormExternalClose}
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
      title: "Image",
      dataIndex: "image",
      render: (image) => {
        return <img
          src={`${base}${image}`}
          alt="Staff"
          width="50"
          height="50"
          style={{ borderRadius: "50%", objectFit:"cover" }}
        />
      }
    },
    {
      title: "Accessories Name",
      dataIndex: "accessoriesName",
    },
    {
      title: "Color",
      render: (record) => {
        return (
          <Flex>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: `${record.color}`,
              }}
            ></div>&nbsp;
            <div>{record.color}</div>
          </Flex>
        );
      },
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
                  EditAccessoriess(record);
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

  if (AllAccessoriesStatus === "loading") {
    content = <CommonLoading />;
  } else if (AllAccessoriesStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource?.accessoriesId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AllAccessoriesStatus === "failed") {
    content = <h2>{AllAccessoriesError}</h2>;
  }

  // const data = [
  //   {
  //     date: "10/02/2023",
  //     clientName: "10/02/2023",
  //     companyName: "10/02/2023",
  //     projectType: "10/02/2023",
  //     quotationId: "10/02/2023",
  //     amount: "10/02/2023",
  //   },
  // ];

  const AddAccessoriess = () => {
    setTrigger(trigger + 1);
    setModalTitle("Add Accessories");
    setModalContent(
      <AddAccessories
        formname={"AddForm"}
        FormExternalCloses={FormExternalClose}
      />
    );
    showModal();
  }

  return (
    <div>
      <CustomPageTitle Heading={"View Accessories"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Accessories"}
            style={{ marginRight: "10px" }}
            onClick={AddAccessoriess}
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
            width={600}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </div>
  );
}
