import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { FiEdit, FiPlus } from "react-icons/fi";
import Flex from "../../../../../components/Flex";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPopconfirm } from "../../../../../components/CustomPopConfirm";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import valuee from "../../../../../Images/avatar.png";

// import useAxios from '../../../../utils/useAxios';
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";


import { UseHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDepartment } from "../../EmployeeSlice";
import { EmployeeQualificationForm } from "./QualificationForm";

export const ViewEmployeeQualificationTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [modelwith, setModelwith] = useState(0);
  const [updateservice, setUpdateservice] = useState(0);
  const [trigger, setTrigger] = useState(0);

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

  // ===== Modal Functions End =====

  // const UpdateParty = (record) => {
  //     setTrigger(trigger + 1)
  //     setModelwith(800)
  //     setModalTitle("Update Party");
  //     // setModalContent(<AddPartyForm Partydata={record} Trigger={trigger} FormClose={handleOk} FornUpdate={FornUpdate} />);
  //     showModal();
  // };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  // ======== Get Party ===========

  // const dispatch = useDispatch()

  // const AllDepartment = useSelector(selectAllDepartment)
  // const DepartmentStatus = useSelector(getDepartmentStatus)
  // const DepartmentError = useSelector(getDepartmentError)

  // console.log(AllDepartment,'AllDepartment');

  // useEffect(() => {
  //     dispatch(getDepartment())
  // }, [])

  // useEffect(() => {
  //     GetParty();
  // }, [])

  // const GetParty = ()=>{
  //     api.get(`party/add_party/`)
  //     .then((response) => {
  //         console.log(response);
  //         toast.info("get party Successfully")
  //     }).catch(error => {
  //         console.log(error);
  //     });
  // }

  // useEffect(() => {
  //     setDataSource(AllSelect)
  // }, [AllSelect])

  // console.log(AllSelect, 'AllSelectw');

  // const FornUpdate = () => {
  //     setUpdateservice(updateservice + 1)
  // }

  // ========== Delete post ==========

  // const handleConfirm = (record) => {
  //     DeleteParty(record)
  // }

  // const DeleteParty = (record) => {
  //     request.delete(`${DEL_PARTY_URL}/${record?.id}/`)
  //         .then((response) => {
  //             dispatch(getParty())
  //             toast.info("Deleted Successfully")
  //         }).catch(error => {
  //             if (error.response.status === 400) {
  //                 toast.error("Something Went Wrong")
  //             } else {
  //                 toast.error("Failed")
  //             }
  //         });
  // };

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
      dataIndex: "image",
      render: (value) => (
        <img
          src={valuee}
          alt="Employee"
          width="50"
          height="50"
          style={{ borderRadius: "50%",objectFit:"cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "employee_name",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.employee_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.employee_name).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Employee ID",
      dataIndex: "department",
    },
    {
      title: "Aadhar",
      dataIndex: "role",
    },
    {
      title: "Degree",
      dataIndex: "degree",
    },
    {
      title: "Bank Book",
      dataIndex: "mobile",
    },
    {
      title: "Pan Number",
      dataIndex: "email",
    },
    // {
    //   title: "Highest Qualification",
    //   dataIndex: "joining_date",
    // },
  ];

  // let content;

  // if (PartyStatus === 'loading') {
  //     content = <CommonLoading />
  // } else if (PartyStatus === 'succeeded') {
  //     const rowKey = (dataSource) => dataSource.id;
  //     content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
  // } else if (PartyStatus === 'failed') {
  //     content = <h2>{PartyError}</h2>
  // }

  const FormExternalClose = () => {
    handleOk();
  };

  const AddEmployeeQualification = () => {
    setModalTitle("Add Employee Qualification");
    setModalContent(
      <EmployeeQualificationForm
        formname={"AddEmployeeProfileForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
      />
    );
    showModal();
  };

  const handleRowClick = (record) => {
    dispatch(addDepartment(record))
    navigate('/viewemployeequalification')
  };

  return (
    <Fragment>
      <CustomPageTitle Heading={"Employee Qualification"} />
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomPageFormTitle Heading={"Employee"} />
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
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  // onClick={() => navigate("/addemployee")}
                  onClick={AddEmployeeQualification}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>
      <CustomTable
        columns={columns}
        data={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      {/* {content} */}
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
