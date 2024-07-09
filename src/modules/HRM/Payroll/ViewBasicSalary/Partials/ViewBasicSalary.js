import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Flex from '../../../../../components/Flex'
import { CustomModal } from '../../../../../components/CustomModal'
import { FiEdit} from 'react-icons/fi'
import { CustomRow } from '../../../../../components/CustomRow'
import { Col } from 'antd'
import { CustomPageFormTitle, CustomPageTitle } from '../../../../../components/CustomPageTitle'
import CustomInputSearch from '../../../../../components/Form/CustomInputSearch'
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable'
import { CommonLoading } from '../../../../../components/CommonLoading'
import { CustomLableBack } from '../../../../../components/CustomLableBack'
import { UpdateBasicSalary } from './UpdateBasicSalary'
import { getSalary, getSalaryError, getSalaryStatus, selectAllSalary } from '../../PayrollSlice'
import { base } from '../../../../../utils/request'


const ViewBasicSalary = () => {

    const [dataSource, setDataSource] = useState([])
    const [searchTexts, setSearchTexts] = useState([]);
    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0)
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
        FormRest()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest()
    };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    const FormExternalClose = () => {
        handleOk();

    };

    useEffect(() => {
        dispatch(getSalary())
    }, [])
    
    const AllBasicSalaryDetails = useSelector(selectAllSalary)
    const AllBasicSalaryStatus = useSelector(getSalaryStatus)
    const AllBasicSalaryError = useSelector(getSalaryError)
    
    const UpdateBasicSalaryy = (record) => {
      setTrigger(trigger+1)
      setModalTitle('Update Baic Salary ');
      setModalContent(<UpdateBasicSalary FormExternalClosee={FormExternalClose} formname={'editbasicsalary'} formReset={formReset} updatebasicrecord={record} updatetrigger={trigger} />);
      showModal()
    }

    useEffect(() => {
        setDataSource(AllBasicSalaryDetails)
    }, [AllBasicSalaryDetails])

    // {
    //     AllBasicSalaryDetails..map((item, index) => (
    // }
    const TableColumn = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: "Image",
            dataIndex: "profile",
            render: (profile) => {
              return (
                <img
                  src={`${base}${profile}`}
                  alt="Staff"
                  width="50"
                  height="50"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              );
            },
          },
        {
            title: "Department Name",
            dataIndex: "departmentName",
            filteredValue: searchTexts ? [searchTexts] : null,
            onFilter: (value, record) => {
                return (
                    String(record.departmentName)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.departmentName).includes(value.toUpperCase())
                );
            },
        },
        {
            title: "Staff Name",
            dataIndex: "userName",
        },
        {
            title: "Basic Amount",
            dataIndex: "salaryAmount",
        },
        {
            title: 'Action',
            render: (record) => {
              return (
                <Flex center={"true"} gap={'10px'}>
                  <FiEdit onClick={() => UpdateBasicSalaryy(record)} />
                </Flex>
              );
            },
          },
    ]

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    // const AddHoliday = () => {
    //     setModalTitle("Add Holidays");
    //     setTrigger(trigger+1)
    //     setModalContent(
    //         <HolidayForm
    //             formname={"AddHolidayForm"}
    //             FormExternalClose={FormExternalClose}
    //             updatetrigger={trigger}
    //         />
    //     );
    //     showModal();
    // };

    let content;

    if (AllBasicSalaryStatus === 'loading') {
        content = <CommonLoading />
    } else if (AllBasicSalaryStatus === 'succeeded') {
        const rowKey = (dataSource) => dataSource.salaryTypeListId;
        content = <CustomStandardTable columns={TableColumn} data={dataSource} rowKey={rowKey} />
    } else if (AllBasicSalaryStatus === 'failed') {
        content = <h2>
            {AllBasicSalaryError}
        </h2>
    }

    return (
        <div>
            <Flex>
                <CustomLableBack />
                <CustomPageTitle Heading={"View Basic Salary Details"} />
            </Flex>
            <CustomRow
                space={[24, 24]}
                style={{ background: "#dae1f3", padding: "12px 0px" }}
            >
               <Col span={24} md={10} style={{ display: "flex", gap: "10px", alignItems: 'baseline' }}>
                    <CustomPageFormTitle Heading={"Search"} />
                    <CustomInputSearch
                        placeholder={"search ..."}
                        value={searchTexts}
                        onChange={(e) => handleSearchs(e.target.value)}
                    />
                </Col>
                <Col span={24} md={8}>
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
        </div>
    )
}

export default ViewBasicSalary