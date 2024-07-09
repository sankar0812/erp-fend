import { Card, Col, Dropdown, Progress } from "antd"
import { Fragment, useState } from "react"
import Flex from "../../../../components/Flex"
import { ImageProfile } from "../../../../layout/Partials/Style"
import request, { base } from "../../../../utils/request"
import { ContentBox, DashCardTitle, Overhid, PercentageBox } from "./style"
import { AiOutlineInbox } from "react-icons/ai"
import { StyledSaleCardRight } from "../style";
import { CustomRow } from "../../../../components/CustomRow"
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomModal } from "../../../../components/CustomModal"
import { CiCirclePlus } from "react-icons/ci";
import { CustomTag } from "../../../../components/Form/CustomTag"
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable"
import ReactApexChart from "react-apexcharts"
import { CustomCardView } from "../../../../components/CustomCardView"

export const NoticePeriodCard = ({ noticeData }) => {

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

    //=================== Reason  =====================================//

    const ReasonShow = ({ record }) => {
        return <p>{record?.reason}</p>
    }
    const ReasonClick = (record) => {
        setModalContent(
            <ReasonShow
                formname={"Reason"}
                record={record}
            />

        );
        setModalTitle("View Reason");
        showModal();
    };

    //=================== FromDate & ToDate================================//

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Employee Name',
            dataIndex: 'userName'
        },
        {
            title: 'From Date',
            dataIndex: 'fromDate'
        },
        {
            title: 'To Date',
            dataIndex: 'toDate'
        },
    ]
    // ====== Duration Modal ===================//

    const DurationShow = ({ record }) => {
        return <Overhid> <CustomStandardTable columns={columns} data={noticeData} /> </Overhid>
    }
    const FromDateClick = (record) => {
        setModalContent(
            <DurationShow
                formname={"Durations"}
                record={record}
            />
        );
        showModal();
    };
    const items = [
        {
            key: "1",
            label: "Duration",
            onClick: () => {
                setModalContent(<FromDateClick />);
                setModalTitle("Duration");
                showModal();
            },
        },

    ];
    return (
        <Fragment>
            <Card >
                <Flex spacebetween={"true"}>

                    <h1 style={{ fontSize: '18px', color: '#545454', fontWeight: '600' }}>Notice Period</h1>

                    <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                        placement="bottomRight">

                        <a onClick={(e) => e.preventDefault()}>
                            <DashCardTitle>
                                <BsThreeDotsVertical />
                            </DashCardTitle>
                        </a>
                    </Dropdown>

                </Flex>
                {noticeData?.map((item) => {
                    return (
                        <CustomRow space={[12, 12]}>
                            {/* <CustomCardView> */}
                            <Col span={24} sm={8} md={8} lg={6}>
                                <ImageProfile>
                                    <img src={`${base}${item?.profile}`} alt="Profile" />
                                </ImageProfile>
                            </Col>
                            <Col span={24} sm={16} md={16} lg={18}>
                                <ContentBox>
                                    <h1>{item?.userName}({item?.userId})</h1>
                                    <Flex>
                                        <p>Resignation Date :</p> <p>{item?.resignationsDate}</p>
                                    </Flex>
                                    <Flex aligncenter={'true'}>
                                        <p>Reason :</p><CiCirclePlus onClick={() => ReasonClick(item)} />

                                    </Flex>
                                    <Flex>
                                        {item?.type === 'approved' && <CustomTag title={'Approved'} color={'yellow'} />}
                                        {item?.type === 'rejected' && <CustomTag title={'Rejected'} color={'error'} />}
                                    </Flex>

                                </ContentBox>
                                <hr style={{border : "1px dashed grey",marginTop : "10px"}}/>
                            </Col>
                            {/* </CustomCardView> */}
                        </CustomRow>
                    )
                })}
            </Card >
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={500}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    )
}

export const ProjectStatusCard = () => {
    // const SideProfile = useSelector(setProfile)    // profile

    const AllComplaints = ''
    return (
        <Fragment>
            {/* <Card> */}
            <StyledSaleCardRight>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User Id</th>
                            <th>Complaint Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllComplaints?.length > 0 ? (
                            AllComplaints.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.userId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                        paddingTop: "30px",
                                    }}
                                >
                                    <AiOutlineInbox />
                                    &nbsp;No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </StyledSaleCardRight>
            {/* </Card> */}
        </Fragment>
    )
}
export const ProjectTypeCard = ({ projectData }) => {
    return (
        <Fragment>
            <CustomRow space={[24, 24]} style={{ height: "260px", overflow: "auto" }}>
                <Col span={24} md={24} lg={24}>
                    <Card style={{ rowGap: "20px" }}>
                        <h1 style={{ fontSize: '18px', color: '#545454', fontWeight: '600' }}>
                            Project type
                        </h1>
                        {projectData?.map((item) => {
                            return (
                                <>
                                    <Flex spacebetween="true" style={{ margin: '15px 0px' }}>
                                        <h3 style={{ fontSize: '14px', color: '#545454' }}>{item?.project_type}</h3>
                                    </Flex>
                                    <PercentageBox Colors={item?.color}>
                                        {/* <Progress percent={item?.percentage} size="large" /> */}
                                        <Progress strokeLinecap="butt" percent={item?.percentage} />
                                    </PercentageBox>
                                </>
                            )
                        })}

                    </Card>
                </Col>
            </CustomRow>
        </Fragment>
    )
}

export const EmployeeLeaveStatus = ({ AllDashLeaves }) => {

    return (
        <Fragment>
            {/* <Card> */}
            <StyledSaleCardRight>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Emp Id</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Date</th>
                            <th>Leave Type</th>
                            <th>cancellation Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {AllDashLeaves?.length > 0 ? (
                            AllDashLeaves.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.userId}</td>
                                    <td>{item?.userName}</td>
                                    <td>{item?.departmentName}</td>
                                    <td>{item?.toDate}</td>
                                    <td>{item?.leavetype}</td>
                                    <td>{item?.cancellationReason}</td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        fontSize: "15px",
                                        textAlign: "center",
                                        paddingTop: "30px",
                                    }}
                                >
                                    <AiOutlineInbox />
                                    &nbsp;No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </StyledSaleCardRight>
            {/* </Card> */}
        </Fragment>
    )
}


