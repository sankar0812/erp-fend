import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { base } from '../../../../../utils/request';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { CustomModal } from '../../../../../components/CustomModal';
import Flex from '../../../../../components/Flex';
import { CustomLableBack } from '../../../../../components/CustomLableBack';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { getInActiveUser, getUserError, getUserStatus, selectAllInActiveUser } from '../../../../AddUsers/UserSlice';
import { useSelector } from 'react-redux';
import { CommonLoading } from '../../../../../components/CommonLoading';

export const UserInActiveTable = () => {
    const navigate = useNavigate();
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
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getInActiveUser())
    }, [])
  
    const InitialUserDetails = useSelector(selectAllInActiveUser)
    const InitialUserStatus = useSelector(getUserStatus)
    const InitialUserError = useSelector(getUserError)
  
    useEffect(() => {
      setDataSource(InitialUserDetails)
    }, [InitialUserDetails])
  
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
  
    const data = [
      {
        key: "1",
        employee_name: "Andaman",
        mobile: "3541354564",
        department: "hbdsfgh",
        degree: "hbdsfgh",
        email: "hbdsfgh@gmail.com",
        role: "hbdsfgh",
        joining_date: "12/1/2000",
      },
  
      {
        key: "2",
        employee_name: "Albin",
        mobile: "3541354564",
        department: "hbdsfgh",
        degree: "hbdsfgh",
        email: "hbdsfgh@gmail.com",
        role: "hbdsfgh",
        joining_date: "12/1/2000",
      },
    ];
  
    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "url",
            render: (url) => {
              return <img
                src={`${base}${url}`}
                alt="Staff"
                width="50"
                height="50"
                style={{ borderRadius: "50%", objectFit:"cover" }}
              />
            }
          },
        {
            title: "Name",
            dataIndex: "username",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.username)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.username).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Email ID",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "roleType",
        },
        {
            title: "Mobile No",
            dataIndex: "mobileNumber",
        },
    ]
  
    let content;
  
    if (InitialUserStatus === 'loading') {
      content = <CommonLoading />
    } else if (InitialUserStatus === 'succeeded') {
      const rowKey = (dataSource) => dataSource.userId;
      content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
        onClick: () => handleRowClick(record)})} />
    } else if (InitialUserStatus === 'failed') {
      content = <h2>{InitialUserError}</h2>
    }
  
    const FormExternalClose = () => {
      handleOk();
    };
  
  
    const handleRowClick = (record) => {
        navigate(`/userDetail/${record.userId}`)
    };
  
    return (
      <Fragment>
        <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"InActive User"} />
        </Flex>
        <CustomRow
          space={[24, 24]}
          style={{ background: "#dae1f3", padding: "12px 0px" }}
        >
          <Col span={24} md={10} style={{ display: "flex", gap: "20px", alignItems: 'baseline' }}>
            <CustomPageFormTitle Heading={"User"} />
            <CustomInputSearch
              placeholder={"search ..."}
              value={searchTexts}
              onChange={(e) => handleSearchs(e.target.value)}
            />
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
}
