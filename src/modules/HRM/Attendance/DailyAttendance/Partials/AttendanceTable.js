import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { base } from '../../../../../utils/request';
import { CustomTag } from '../../../../../components/Form/CustomTag';
import { CommonLoading } from '../../../../../components/CommonLoading';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomRow } from '../../../../../components/CustomRow';
import { Col } from 'antd';
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch';
import { CustomModal } from '../../../../../components/CustomModal';
import { SelectDailyEntry, getCountAttStatus, getCountAttStatusError, getDailyEntry } from '../../AttendanceSlice';
import { useSelector } from 'react-redux';

export const AttendanceTable = () => {
    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);
    const [trigger,setTrigger] = useState(0)
    const dispatch = useDispatch()
  
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
  
    // ===== Modal Functions Start =====
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const FormRest = () => {
      setFormReset(formReset + 1);
    };
  
    const FormExternalClose = () => {
      handleOk();
      FormRest()
    };
  
    useEffect(() => {
      dispatch(getDailyEntry())
    }, [])
  
    const AllAttendanceEntry = useSelector(SelectDailyEntry)
    const AllAttendanceEntryStatus = useSelector(getCountAttStatus)
    const AllAttendanceEntryError = useSelector(getCountAttStatusError)
  
    // const UpdateDesignation = (record) => {
    //   setTrigger(trigger+1)
    //   setModalTitle('Designation');
    //   setModalContent(<AddDesignationModal FormExternalClosee={FormExternalClose} formname={'editdesignation'} formReset={formReset} designationrecord={record} updatetrigger={trigger} />);
    //   showModal()
    // }
  
    useEffect(() => {
      setDataSource(AllAttendanceEntry)
    }, [AllAttendanceEntry])

  
    const TableColumn = [
      {
        title: 'SI No',
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
        title: 'User Id',
        dataIndex: 'userId'
      },
      {
        title: "User Name",
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
    //   {
    //     title: 'Role',
    //     dataIndex: 'roleName',
    //     render: (record) => {
    //       return (
    //         <Fragment>
    //         <div style={{textAlign:"center"}}>
    //         <CustomTag bordered={"true"} color={"success"} title={record} />
    //         </div>
    //       </Fragment>
    //       );
    //     },
    //   },
      {
        title: 'Date',
        dataIndex: 'inDate'
      },
      {
        title: 'In Time',
        dataIndex: 'inTime'
      },
      {
        title: 'Out Time',
        dataIndex: 'outTime'
      },
      {
        title: 'Working Hours',
        dataIndex: 'workingHour'
      },
      // {
      //   title: 'IP Address',
      //   dataIndex: 'ipAddress'
      // },
    ]
  
    const handleSearchs = (value) => {
      setSearchTexts(value);
    };
  
    // const AddEmployeeDesinationDetails = () => {
    //   setModalTitle("Add Staff Designation");
    //   setModalContent(
    //     <AddDesignationModal
    //       formname={"AddDesignationForm"}
    //       FormExternalCloses={FormExternalClose}
    //     />
    //   );
    //   showModal();
    // };
  
    let content;
  
    if (AllAttendanceEntryStatus === 'loading') {
      content = <CommonLoading />
    } else if (AllAttendanceEntryStatus === 'succeeded') {
      const rowKey = (dataSource) => dataSource.employeeId;
      content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllAttendanceEntryStatus === 'failed') {
      content = <h2>
        {AllAttendanceEntryError}
      </h2>
    }
  
  return (
    <div>
    
    <CustomRow
      space={[24, 24]}
      style={{ background: "#dae1f3", padding: "12px" }}
    >
      <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
        <CustomInputSearch
          placeholder={"search ..."}
          value={searchTexts}
          onChange={(e) => handleSearchs(e.target.value)}
        />
      </Col>
    </CustomRow>
    {content}
    {/* <CustomStandardTable columns={TableColumn} data={dataSource} /> */}
    <CustomModal
      isVisible={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      width={800}
      modalTitle={modalTitle}
      modalContent={modalContent}
    />
  </div>
  )
}
