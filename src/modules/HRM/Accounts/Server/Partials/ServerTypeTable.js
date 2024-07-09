import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getServerType, getServerTypeError, getServerTypeStatus, selectAllServerType } from '../../AccountsSlice';
import { AddServerType } from './AddServerType';
import { useSelector } from 'react-redux';
import Flex from '../../../../../components/Flex';
import { TableIconHolder } from '../../../../../components/CommonStyled';
import { THEME } from '../../../../../theme';
import { FiEdit } from 'react-icons/fi'
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import ButtonStandard from '../../../../../components/Form/CustomStandardButton';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import { CustomModal } from '../../../../../components/CustomModal';

const ServerTypeTable = () => {
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formReset, setFormReset] = useState(0);
    const [dataSource, setDataSource] = useState([]);
    const [trigger, setTrigger] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServerType());
      }, []);
    
      const AllServerType = useSelector(selectAllServerType);
      const AllServerTypeStatus = useSelector(getServerTypeStatus);
      const AllServerTypeError = useSelector(getServerTypeError);

      useEffect(() => {
        setDataSource(AllServerType);
      }, [AllServerType]);

    const showModal = () => {
        setIsModalOpen(true);
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

    const AddServerTypes = () => {
        setModalTitle("Add Server Type");
        setModalContent(
          <AddServerType
            FormExternalCloses={FormExternalClose}
            formname={"AddServerType"}
          />
        );
        showModal();
      };

      const EditServerType = (record) => {
        setTrigger(trigger + 1);
        setModalTitle("Update Server Type");
        setModalContent(
          <AddServerType
            formname={"UpdateForm"}
            FormExternalCloses={FormExternalClose}
            ServerTyperecord={record}
            updateTrigger={trigger}
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
          title: "Server Type",
          dataIndex: "serverTypeName",
        },
        {
          title: "Action",
          render: (record, purchase) => {
            return (
              <>
                <Flex flexstart={"true"} gap={"15px"}>
                  <TableIconHolder
                    color={THEME.blue}
                    size={"22px"}
                    onClick={() => {
                        EditServerType(record);
                    }}
                  >
                    <FiEdit />
                  </TableIconHolder>
                  <Flex end={"true"}></Flex>
                </Flex>
              </>
            );
          },
        },
      ];

    let content;

    if (AllServerTypeStatus === "loading") {
      content = <CommonLoading />;
    } else if (AllServerTypeStatus === "succeeded") {
      const rowKey = (dataSource) => dataSource.serverTypeId;
      content = (
        <CustomStandardTable
          columns={columns}
          data={dataSource}
          rowKey={rowKey}
        />
      );
    } else if (AllServerTypeStatus === "failed") {
      content = <h2>{AllServerTypeError}</h2>;
    }
  return (
    <div>
      <CustomPageTitle Heading={"View Server Type"} />
      <CustomCardView>
        <Flex end={"true"}>
          <ButtonStandard.Primary
            text={"Add Server Type"}
            style={{ marginRight: "10px" }}
            onClick={AddServerTypes}
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
            width={500}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </CustomRow>
      </CustomCardView>
    </div>
  )
}

export default ServerTypeTable