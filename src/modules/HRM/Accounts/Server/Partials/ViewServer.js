import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Flex from '../../../../../components/Flex';
import { TableIconHolder } from '../../../../../components/CommonStyled';
import { THEME } from '../../../../../theme';
import { Col, Tooltip } from 'antd';
import { SvgIcons } from '../../../../../Images';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import ButtonStandard from '../../../../../components/Form/CustomStandardButton';
import { CustomModal } from '../../../../../components/CustomModal';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomTable } from '../../../../../components/Form/CustomTable';
import { getServer, getServerError, getServerStatus, selectAllServer } from '../../AccountsSlice';
import { useSelector } from 'react-redux';
import { AddServer } from './AddServer';

export const ViewServer = () => {
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
      dispatch(getServer());
    }, []);
  
    const AllServer = useSelector(selectAllServer);
    const AllServerStatus = useSelector(getServerStatus);
    const AllServerError = useSelector(getServerError);
  
    useEffect(() => {
      setDataSource(AllServer);
    }, [AllServer]);
  
    const EditServer = (record) => {
      setTrigger(trigger + 1);
      setModalTitle("Update Server Details");
      setModalContent(
        <AddServer
          formname={"UpdateForm"}
          FormExternalClosess={FormExternalClose}
          formReset={formReset}
          ServerRecord={record}
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
        title: "Server Name",
        dataIndex: "serverName",
      },
      {
        title: "Action",
        render: (record, purchase) => {
          return (
            <>
              <Flex center='true' gap={"15px"}>
  
                <TableIconHolder
                  color={THEME.blue}
                  size={"22px"}
                  onClick={() => {
                    EditServer(record);
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
  
    if (AllServerStatus === "loading") {
      content = <CommonLoading />;
    } else if (AllServerStatus === "succeeded") {
      const rowKey = (dataSource) => dataSource.serverId;
      content = (
        <CustomStandardTable
          columns={columns}
          data={dataSource}
          rowKey={rowKey}
        />
      );
    } else if (AllServerStatus === "failed") {
      content = <h2>{AllServerError}</h2>;
    }
  

    const AddServerPage = () => {
      navigate('/addServer')
    }
  
    return (
      <div>
        <CustomPageTitle Heading={"View Server"} />
        <CustomCardView>
          <Flex end={"true"}>
            <ButtonStandard.Primary
              text={"Add Server"}
              style={{ marginRight: "10px" }}
              onClick={AddServerPage}
            />
          </Flex>
          <CustomRow space={[12, 12]}>
            <Col span={24} md={24}>
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
}
