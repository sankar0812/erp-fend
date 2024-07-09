import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAssetsBrand, getAssetsBrandError, getAssetsBrandStatus, selectAllAssetsBrand } from '../../AccountsSlice';
import { useSelector } from 'react-redux';
import Flex from '../../../../../components/Flex';
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { Col, Tooltip } from 'antd';
import { SvgIcons } from '../../../../../Images';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import ButtonStandard from '../../../../../components/Form/CustomStandardButton';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomModal } from '../../../../../components/CustomModal';
import { THEME } from '../../../../../theme';
import { AddBrand } from '../Partials/AddBrand';

export const ViewBrands = () => {
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
      dispatch(getAssetsBrand());
    }, []);
  
    const AllBrands = useSelector(selectAllAssetsBrand);
    const AllBrandsStatus = useSelector(getAssetsBrandStatus);
    const AllBrandsError = useSelector(getAssetsBrandError);
  
    useEffect(() => {
      setDataSource(AllBrands);
    }, [AllBrands]);
  
    const EditBrand = (record) => {
      setTrigger(trigger + 1);
      setModalTitle("Update Brands");
      setModalContent(
        <AddBrand
          formname={"UpdateForm"}
          formReset={formReset}
          Brandrecord={record}
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
        title: "Brand Name",
        dataIndex: "brandName",
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
                    EditBrand(record);
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
  
    if (AllBrandsStatus === "loading") {
      content = <CommonLoading />;
    } else if (AllBrandsStatus === "succeeded") {
      const rowKey = (dataSource) => dataSource?.brandId;
      content = (
        <CustomStandardTable
          columns={columns}
          data={dataSource}
          rowKey={rowKey}
        />
      );
    } else if (AllBrandsStatus === "failed") {
      content = <h2>{AllBrandsError}</h2>;
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
  
    const AddBrands = () => {
      setTrigger(trigger + 1);
      setModalTitle("Add Brand");
      setModalContent(
        <AddBrand
          formname={"AddForm"}
          FormExternalCloses={FormExternalClose}
        />
      );
      showModal();
    }
  
    return (
      <div>
        <CustomPageTitle Heading={"View Brands"} />
        <CustomCardView>
          <Flex end={"true"}>
            <ButtonStandard.Primary
              text={"Add Brands"}
              style={{ marginRight: "10px" }}
              onClick={AddBrands}
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
