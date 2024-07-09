import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import { Col } from "antd";
import { FiPlus } from "react-icons/fi";
import Flex from "../../../../components/Flex";
import { CustomModal } from "../../../../components/CustomModal";
import { useNavigate } from "react-router-dom";
import { CustomPageFormTitle, CustomPageTitle, } from "../../../../components/CustomPageTitle";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";
import { useDispatch, useSelector } from "react-redux";
import { getInitialEmployee, getInitialEmployeeError, getInitialEmployeeStatus, selectAllInitialEmployee } from "../../EmployeeDetails/EmployeeSlice";
import { CommonLoading } from "../../../../components/CommonLoading";
import request, { base } from "../../../../utils/request";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";



export const EmployeeAttendance = () => {
  const navigate = useNavigate();

  // const DEL_PARTY_URL = 'party/edit_party'
  // let api = useAxios();

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const[presentData,setPresentData] = useState([])

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
    dispatch(getInitialEmployee())
  }, [])

  const InitialEmployeeDetails = useSelector(selectAllInitialEmployee)
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
          style={{ borderRadius: "50%",objectFit:"cover" }}
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
      title: "Mobile",
      dataIndex: "phoneNumber",
    },
  ];

  let content;

  if (InitialEmployeeStatus === 'loading') {
    content = <CommonLoading />
  } else if (InitialEmployeeStatus === 'succeeded') {
    const rowKey = (dataSource) => dataSource.employeeId;
    content = <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey} style={{cursor: 'pointer'}}  onRow={(record) => ({
      onClick: () => handleRowClick(record),
    })} />
  } else if (InitialEmployeeStatus === 'failed') {
    content = <h2>{InitialEmployeeError}</h2>
  }

  const FormExternalClose = () => {
    handleOk();
  };

  const AddEmployeeDetails = () => {
    setModalTitle("Add Staff Profile");
    setModalContent(
    //   <AddEmployeeForm
    //     formname={"AddEmployeeProfileForm"}
    //     FormExternalClosee={FormExternalClose}
    //     formReset={formReset}
    //   />
    );
    showModal();
  };

  const handleRowClick = (record) => {
    navigate(`/AddAttendance/${record.employeeId}`)
  };

  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", padding: "12px 0px" }}
        >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Staff"} />
          <CustomInputSearch
            placeholder={"search ..."}
            value={searchTexts}
            onChange={(e) => handleSearchs(e.target.value)}
          />
        </Col>
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                {/* <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={AddEmployeeDetails}
                /> */}
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
};
