import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { base } from '../../../../../utils/request';
import Flex from '../../../../../components/Flex';
import { CustomLableBack } from '../../../../../components/CustomLableBack';
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import Button from '../../../../../components/Form/CustomButton';
import { FiPlus } from 'react-icons/fi';
import { CustomModal } from '../../../../../components/CustomModal';
import { getInActiveEmployee, getInitialEmployeeError, getInitialEmployeeStatus, selectAllInActiveEmployee } from '../../EmployeeSlice';
import { useSelector } from 'react-redux';

export const InActiveTable = () => {
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
      dispatch(getInActiveEmployee())
    }, [])
  
    const InitialEmployeeDetails = useSelector(selectAllInActiveEmployee)
    const InitialEmployeeStatus = useSelector(getInitialEmployeeStatus)
    const InitialEmployeeError = useSelector(getInitialEmployeeError)
  
    useEffect(() => {
      setDataSource(InitialEmployeeDetails)
    }, [InitialEmployeeDetails])
  
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
        dataIndex: "profile",
        render: (profile) => {
          return <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit:"cover" }}
          />
        }
      },
      {
        title: "Name",
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
        title: "Department",
        dataIndex: "departmentName",
      },
      {
        title: "Designation",
        dataIndex: "designationName",
      },
      {
        title: "Gender",
        dataIndex: "gender",
      },
      {
        title: "Mobile",
        dataIndex: "phoneNumber",
      },
      {
        title: "Email",
        dataIndex: "email",
      }
    ];
  
    let content;
  
    if (InitialEmployeeStatus === 'loading') {
      content = <CommonLoading />
    } else if (InitialEmployeeStatus === 'succeeded') {
      const rowKey = (dataSource) => dataSource.employeeId;
      content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })} />
    } else if (InitialEmployeeStatus === 'failed') {
      content = <h2>{InitialEmployeeError}</h2>
    }
  
    const FormExternalClose = () => {
      handleOk();
    };
  
  
    const handleRowClick = (record) => {
      navigate(`/viewemployee/${record.employeeId}`)
    };
  
    return (
      <Fragment>
        <Flex>
        <CustomLableBack />
        <CustomPageTitle Heading={"InActive Employee"} />
        </Flex>
        <CustomRow
          space={[24, 24]}
          style={{ background: "#dae1f3", padding: "12px 0px" }}
        >
          <Col span={24} md={10} style={{ display: "flex", gap: "20px", alignItems: 'baseline' }}>
            <CustomPageFormTitle Heading={"Employee"} />
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
