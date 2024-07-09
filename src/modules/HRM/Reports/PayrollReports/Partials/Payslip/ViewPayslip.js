import React, { Fragment, useState } from 'react'
import { CustomPageTitle } from '../../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'



export const ViewPayslip = () => {
    const navigate = useNavigate();

    // const DEL_PARTY_URL = 'party/edit_party'
    // let api = useAxios();
  
    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);
  
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
        // {
        //   title: "Image",
        //   dataIndex: "profile",
        //   render: (profile) => {
        //     return <img
        //       src={`${base}${profile}`}
        //       alt="Staff"
        //       width="50"
        //       height="50"
        //       style={{ borderRadius: "50%" }}
        //     />
        //   }
    
        // },
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
    
    const handleRowClick = (record) => {
        navigate(`/viewemployee/${record.employeeId}`)
      };
  return (
    <Fragment>
    <CustomPageTitle Heading={"Employee Payslip"} />
    <CustomRow
      space={[24, 24]}
      style={{ background: "#dae1f3", paddingTop: "12px" }}
    >
      <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
        <CustomInputSearch
          placeholder={"search ..."}
          value={searchTexts}
          onChange={(e) => handleSearchs(e.target.value)}
        />
      </Col>
      {/* <Col span={24} md={14}>
        <CustomRow space={[24, 24]}>
          <Col span={24} md={16}></Col>
          <Col span={24} md={8} style={{ float: "right" }}>
            <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
              <Button.Primary
                style={{ borderRadius: "6px" }}
                icon={<FiPlus style={{ fontSize: "20px" }} />}
                text={"Add"}
                onClick={AddEmployeeDetails}
              />
            </Flex>
          </Col>
        </CustomRow>
      </Col> */}
    </CustomRow>
    {/* <CustomStandardTable
      columns={columns}
      data={data}
      onRow={(record) => ({
        onClick: () => handleRowClick(record),
      })}
    /> */}
    {content}
    {/* <CustomModal
      isVisible={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      width={800}
      modalTitle={modalTitle}
      modalContent={modalContent}
    /> */}
  </Fragment>
  )
}
