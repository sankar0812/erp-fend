import { Card } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../../components/Flex';
import request, { base } from '../../../../utils/request';
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import { CustomModal } from '../../../../components/CustomModal';
import { ReasonForCancellationModal, ReasonForHoldModal } from './ReasonModal';
import { ProjectDetailCancelled, ProjectDetailHold, ProjectDetailWithoutHoldandCancelled } from './ProjectDetailModal';
import { DraggableItem, StyledStatusChange,} from '../style';
import { selectCurrentId, selectCurrentRoleId, selectCurrentRoleName } from '../../../Auth/authSlice';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../../../utils/UserRoles/UserRole';
import { CustomTag } from '../../../../components/Form/CustomTag';
import { MdOutlineAccessTime } from "react-icons/md";


const ProjectStatusChange = ({ id }) => {

    const [draggedItem, setDraggedItem] = useState(null);
    const [proDetails, setProDetails] = useState([])
    const [trigger, setTrigger] = useState(0)
    const [droppedToDoData, setDropedToDoData] = useState([])
    const [eligibleToDrag, setEligibleToDrag] = useState(false)
    const [eligibleTLToDrag, setEligibleTLToDrag] = useState(false)
    const [eligiblePLToDrag, setEligiblePLToDrag] = useState(false)

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const [modelwith, setModelwith] = useState(0);

    const [modalTitle, setModalTitle] = useState();

    const [modalContent, setModalContent] = useState(null);

    const EnteringId = useSelector(selectCurrentId)
    const EnteringRoleId = useSelector(selectCurrentRoleId)
    const CurrentRole = useSelector(selectCurrentRoleName)

    useEffect(() => {
        if (CurrentRole === USER_ROLES.EMPLOYEE || CurrentRole === USER_ROLES.TRAINEE ) {
            setEligibleToDrag(true)
            GetTaskDetailsForEmp()
        }
        else if (CurrentRole === USER_ROLES.TEAMLEADER) {
            // setEligibleToDrag(false)
            setEligibleTLToDrag(true)
            GetTaskDetails()
        }
        else if (CurrentRole === USER_ROLES.PROJECHEAD){
            setEligiblePLToDrag(true)
            GetTaskDetails()
        }
        else {
            // setEligibleToDrag(false)
            GetTaskDetails()
        }
    }, [])
console.log(proDetails,'proDetailsproDetails');
    const GetTaskDetails = () => {
        request.get(`${APIURLS.GET_TASKDETAILS}${id}`)
            .then(function (response) {
                setProDetails(response?.data)
            })
            .catch(function (error) {
            })
    }
    console.log(proDetails,'proDetailsproDetailsproDetails');
    const GetTaskDetailsForEmp = () => {
        request.get(`${APIURLS.GET_TASK_BY_EMP_BY_ID}${EnteringId}/${EnteringRoleId}/${id}/`)
            .then(function (response) {
                setProDetails(response?.data?.project)
            })
            .catch(function (error) {
            })
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const close = () => {
        handleOk();
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };

    const handleCancel = () => {

        if (eligibleToDrag) {
            GetTaskDetailsForEmp()
        }
        else {
            GetTaskDetails()
        }
        setIsModalOpen(false);
    };

    const handleDragStart = (pro) => {

        // if (pro?.roleName === 'TL') {
        //     setEligibleTLToDrag(true)
        // }
        // else {
        //     setEligibleTLToDrag(false)
        // }
        setDraggedItem(pro)
    }

    const handleDragOver = (e) => {

        e.preventDefault()
    }

    const handleOnDropPending = (e) => {
        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)

        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        const ChangeStatus = () => {
            const ChangeToPending = {
                projectStatus: 'pending'
            }

            request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, ChangeToPending)
                .then(function (response) {
                    // toast.info("Changed Project Status Successfully")
                    if (eligibleToDrag) {
                        GetTaskDetailsForEmp()
                    }
                    else {
                        GetTaskDetails()
                    }
                })
                .catch(function (error) {
                    // if (error.response.status && error.response.status === 400) {
                    //     toast.error(error.response?.data)
                    // }
                    // else {
                    //     toast.error('Failed')
                    // }
                })
        }

        ChangeStatus()
    };

    const handleOnDropToDo = (e) => {
        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)

        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        const ChangeStatus = () => {

            const ChangeToToDo = {
                projectStatus: "todo"
            }

            request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, ChangeToToDo)
                .then(function (response) {
                    // toast.info("Changed Project Status Successfully")
                    if (eligibleToDrag) {
                        GetTaskDetailsForEmp()
                    }
                    else {
                        GetTaskDetails()
                    }
                })
                .catch(function (error) {
                    // if (error.response.status && error.response.status === 400) {
                    //     toast.error(error.response?.data)
                    // }
                    // else {
                    //     toast.error('Failed')
                    // }
                })
        }

        ChangeStatus()
    };

    const handleOnDropOnProcess = (e) => {
        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)


        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        // ========== Alter Way For Future Use  ============  //

        // const updatedTaskListDetails = proDetails?.taskList.filter(
        //     (task) => task !== droppedToDoData
        // );

        // // If proDetails exists, create a new object with updated taskList
        // if (proDetails) {
        //     const updatedProDetails = {
        //         ...proDetails,
        //         taskList: updatedTaskListDetails,
        //     };

        //     // Set the updated proDetails using setProDetails
        //     setProDetails(updatedProDetails);
        // }

        // ========================================================= // 

        const ChangeStatus = () => {

            const ChangeToOnProcess = {
                projectStatus: "onprocess"
            }

            request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, ChangeToOnProcess)
                .then(function (response) {
                    // toast.info("Changed Project Status Successfully")
                    if (eligibleToDrag) {
                        GetTaskDetailsForEmp()
                    }
                    else {
                        GetTaskDetails()
                    }
                })
                .catch(function (error) {
                    // if (error.response.status && error.response.status === 400) {
                    //     toast.error(error.response?.data)
                    // }
                    // else {
                    //     toast.error('Failed')
                    // }
                })
        }

        ChangeStatus()
    };

    const handleOnDropOnCompleted = (e) => {

        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)

        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        const ChangeStatus = () => {

            const ChangeToCompleted = {
                projectStatus: 'completed'
            }

            request.put(`${APIURLS.PUT_PROJECT_STATUS_UPDATION}${TransferedData?.taskListId}`, ChangeToCompleted)
                .then(function (response) {
                    // toast.info("Changed Project Status Successfully")
                    if (eligibleToDrag) {
                        GetTaskDetailsForEmp()
                    }
                    else {
                        GetTaskDetails()
                    }
                })
                .catch(function (error) {
                    // if (error.response.status && error.response.status === 400) {
                    //     toast.error(error.response?.data)
                    // }
                    // else {
                    //     toast.error('Failed')
                    // }
                })
        }

        ChangeStatus()
    };

    const handleOnDropHold = (e) => {

        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)

        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        const AddReasonForHold = () => {
            setModelwith(700)
            setTrigger(trigger + 1)
            setModalTitle("Add Reason");
            setModalContent(<ReasonForHoldModal TransferedData={TransferedData} close={close} trigger={trigger} GetTaskDetails={GetTaskDetails} GetTaskDetailsForEmp={GetTaskDetailsForEmp} />);
            showModal();
        }

        AddReasonForHold()
    };

    const handleOnDropOnCancelled = (e) => {
        e.preventDefault();

        const TransferedData = draggedItem

        setDropedToDoData(TransferedData)

        const updatedTaskListDetails = proDetails?.taskList.filter(
            (task) => task !== droppedToDoData
        );

        setProDetails([
            {
                ...proDetails,
                taskList: updatedTaskListDetails,
            },
        ]);

        const AddReasonForCancellation = () => {
            setModelwith(700)
            setTrigger(trigger + 1)
            setModalTitle("Add Reason");
            setModalContent(<ReasonForCancellationModal TransferedData={TransferedData} close={close} trigger={trigger} GetTaskDetails={GetTaskDetails} GetTaskDetailsForEmp={GetTaskDetailsForEmp} />);
            showModal();
        }

        AddReasonForCancellation()

    };

    const ViewProjectDetails = (pro) => {
        // console.log(pro,'ppppppppppppppp');
        // if (pro?.roleName === 'TL') {
        //     setEligibleTLToDrag(true)
        // }
        // else{
        //     setEligibleTLToDrag(false)
        //     setEligibleToDrag(false)
        // }
        setModelwith(800)
        setTrigger(trigger + 1)
        setModalTitle("Task Details");
        setModalContent(<ProjectDetailWithoutHoldandCancelled projectdetails={pro} proDetails={proDetails} />);
        showModal1();
    }

    const ViewProjectDetailsHold = (pro) => {
        setModelwith(800)
        setTrigger(trigger + 1)
        setModalTitle("Task Details");
        setModalContent(<ProjectDetailHold projectdetails={pro} proDetails={proDetails} />);
        showModal();
    }

    const ViewProjectDetailsCancelled = (pro) => {
        setModelwith(800)
        setTrigger(trigger + 1)
        setModalTitle("Task Details");
        setModalContent(<ProjectDetailCancelled projectdetails={pro} proDetails={proDetails} />);
        showModal();
    }

    const formatDate = (dateString) => {
        
        const dateObject = new Date(dateString);
        const monthString = dateObject.toLocaleString('default', { month: 'short' });
        const day = dateObject.getDate();
        const formattedDate = `${monthString} ${day}`;
        return formattedDate;
      };

      console.log(proDetails,'gg');

    return (
        <StyledStatusChange >
            {/* <CustomRow space={[12, 12]}> */}
            {/* <CustomLableBack /> */}
            
            <Flex gap={'20px'}>
                <div className='statusChange' style={{background:"#F6FDC3"}}>
                
                    <Card style={{ background: '#ded233' }} className='statusChange' >
                        <h1 style={{ textAlign: 'center' }}>PENDING</h1>
                    </Card>
                    {
                        eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                            <Card onDragOver={handleDragOver} onDrop={handleOnDropPending} droppable style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange'  >
                                <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                                {/* <p>{droppedToDoData?.employeeName}</p>
                        <p>{droppedToDoData?.departmentName}</p> */}
                            </Card>
                        </>) : null
                    }
                    {/* // Without TL //    PENDING       ======> If needed  */}

                    {/* {
                        proDetails?.taskList?.map((pro, index) => (

                            pro?.projectStatus === 'pending' ? (
                                <Fragment>
                                    <DraggableItem>
                                        <Card key={index}
                                            draggable={eligibleToDrag || eligibleTLToDrag}
                                            onDrop={handleOnDropPending}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            style={{ marginTop: '10px', background: "lightyellow", textAlign: 'center' }}
                                            onClick={() => ViewProjectDetails(pro)}
                                        >
                                            <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            ) : null
                        ))
                    } */}

                    {/* // Without TL //    PENDING       ======> If needed  */}

                    {
                        proDetails?.taskList?.map((pro, index) => {

                            if (pro?.projectStatus === 'pending') {

                                const draggable = pro?.roleName === 'TL' ? eligibleTLToDrag : pro?.roleName === 'ProjectHead' ? eligiblePLToDrag : eligibleToDrag;
                                console.log(pro, 'propropro');
                                return (
                                    <Fragment key={index}>
                                        <DraggableItem>
                                            <Card
                                                draggable={draggable}
                                                onDrop={handleOnDropPending}
                                                onDragStart={() => handleDragStart(pro)}
                                                onDragOver={handleDragOver}
                                                droppable={'true'}
                                                style={{ margin: '10px', background: "lightyellow", cursor:'grabbing' }}
                                                onClick={() => ViewProjectDetails(pro)}
                                            >

                                                <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                        <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                                            </Card>
                                        </DraggableItem>
                                    </Fragment>
                                );
                            } else {
                                return null;
                            }
                        })
                    }

                </div>

            <div className='statusChange' style={{background:"#F2EFE5"}}>
                <Card style={{ background: 'grey' }} className='statusChange'>
                    <h1 style={{ color: 'white', textAlign: 'center' }}>TODO</h1>
                </Card>
                {
                    eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                        <Card onDragOver={handleDragOver} onDrop={handleOnDropToDo} droppable={'true'} style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange' >
                            <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                        </Card>
                    </>) : null
                }

                {/* // Without TL //    TODO       ======> If needed  */}
                {/* {
                        proDetails?.taskList?.map((pro, index) => (
                            pro?.projectStatus === 'todo' ? (
                                <Fragment>
                                    <DraggableItem>
                                        <Card key={index}
                                            draggable={eligibleToDrag || eligibleTLToDrag}
                                            onDrop={handleOnDropToDo}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            droppable
                                            style={{ marginTop: '10px', background: 'lightgrey', textAlign: "center" }}
                                            onClick={() => ViewProjectDetails(pro)}
                                        >
                                            <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            ) : null
                        ))
                    } */}
                {/* // Without TL //    TODO       ======> If needed  */}

                {
                    proDetails?.taskList?.map((pro, index) => {

                        if (pro?.projectStatus === 'todo') {

                            const draggable = pro?.roleName === 'TL' ? eligibleTLToDrag : pro?.roleName === 'ProjectHead' ? eligiblePLToDrag : eligibleToDrag;

                            return (
                                <Fragment key={index}>
                                    <DraggableItem>
                                        <Card
                                            draggable={draggable}
                                            onDrop={handleOnDropToDo}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            droppable={'true'}
                                            style={{ margin: '10px', background: 'lightgrey', cursor:'grabbing' }}
                                            onClick={() => ViewProjectDetails(pro)}
                                        >
                                            {/* <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                            <div style={{ marginTop: '20px' }}>
                                                {
                                                    pro?.priority === 'high' ?
                                                        (<><CustomTag color={'red'} title={'High'} /></>) :
                                                        pro?.priority === 'medium' ?
                                                            (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                            pro?.priority === 'low' ?
                                                                (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                }
                                            </div> */}
                                             <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                    <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            );
                        } else {
                            return null;
                        }
                    })
                }
            </div>

            <div className='statusChange' style={{background:"#CEE6F3"}}>
                <Card style={{ background: 'blue' }} className='statusChange'>
                    <h1 style={{ color: 'white', textAlign: 'center' }}>ON PROCESS</h1>
                </Card>
                {
                    eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                        <Card onDragOver={handleDragOver} onDrop={handleOnDropOnProcess} droppable={'true'} style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange' >
                            <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                        </Card>
                    </>) : null

                }
                {/* // Without TL //    ONPROCESS       ======> If needed  */}

                {/* {proDetails?.taskList?.map((pro, index) => (
                        pro?.projectStatus === 'onprocess' ? (
                            <Fragment key={index}>
                                <DraggableItem>
                                    <Card
                                        draggable={eligibleToDrag || eligibleTLToDrag}
                                        onDrop={handleOnDropOnProcess}
                                        onDragStart={() => handleDragStart(pro)}
                                        onDragOver={handleDragOver}
                                        style={{ marginTop: '10px', background: 'lightblue', textAlign: "center" }}
                                        onClick={() => ViewProjectDetails(pro)}
                                    >
                                        <p>{pro?.employeeName}</p>
                                        <p>{pro?.departmentName}</p>
                                        <p>{pro?.projectStatus}</p>
                                    </Card>
                                </DraggableItem>
                            </Fragment>
                        ) : null
                    ))} */}
                {/* // Without TL //    ONPROCESS       ======> If needed  */}

                {
                    proDetails?.taskList?.map((pro, index) => {

                        if (pro?.projectStatus === 'onprocess') {

                            const draggable = pro?.roleName === 'TL' ? eligibleTLToDrag : pro?.roleName === 'ProjectHead' ? eligiblePLToDrag : eligibleToDrag;

                            return (
                                <Fragment key={index}>
                                    <DraggableItem> 
                                        <Card
                                            draggable={draggable}
                                            onDrop={handleOnDropOnProcess}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            style={{ margin: '10px', background: 'lightblue', cursor:'grabbing' }}
                                            onClick={() => ViewProjectDetails(pro)}
                                        >
                                            {/* <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                            <div style={{ marginTop: '20px' }}>
                                                {
                                                    pro?.priority === 'high' ?
                                                        (<><CustomTag color={'red'} title={'High'} /></>) :
                                                        pro?.priority === 'medium' ?
                                                            (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                            pro?.priority === 'low' ?
                                                                (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                }
                                            </div> */}
                                             <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                    <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            );
                        } else {
                            return null;
                        }
                    })
                }
            </div>

            <div className='statusChange' style={{background:"#CEDEBD"}}>
                <Card style={{ background: 'green' }} className='statusChange'>
                    <h1 style={{ color: "white", textAlign: "center" }}>COMPLETED</h1>
                </Card>
                {
                    eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                        <Card onDragOver={handleDragOver} onDrop={handleOnDropOnCompleted} droppable={'true'} style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange' >
                            <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                        </Card>
                    </>) : null
                }

                {proDetails?.taskList?.map((pro, index) => (
                    pro?.projectStatus === 'completed' ? (
                        <Fragment key={index}>
                            <Card onDrop={handleOnDropOnCompleted}
                                style={{ margin: '10px', background: 'lightgreen', cursor:'grabbing' }}
                                onClick={() => ViewProjectDetails(pro)}
                            >
                                {/* <p>{pro?.employeeName}</p>
                                <p>{pro?.departmentName}</p>
                                <p>{pro?.projectStatus}</p>
                                <div style={{ marginTop: '20px' }}>
                                    {
                                        pro?.priority === 'high' ?
                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                            pro?.priority === 'medium' ?
                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                pro?.priority === 'low' ?
                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                    }
                                </div> */}
                                 <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                    <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                            </Card>
                        </Fragment>
                    ) : null
                ))}

            </div>

            <div className='statusChange' style={{background:"#FFEEBB"}}>
                <Card style={{ background: 'orange' }} className='statusChange'>
                    <h1 style={{ color: 'white', textAlign: 'center' }}>HOLD</h1>
                </Card>
                {
                    eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                        <Card onDragOver={handleDragOver} onDrop={handleOnDropHold} droppable={'true'} style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange'>
                            <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                        </Card>
                    </>) : null
                }

                {/* // Without TL //    HOLD       ======> If needed  */}
                {/* 
                    {
                        proDetails?.taskList?.map((pro, index) => (
                            pro?.projectStatus === 'hold' ? (
                                <Fragment>
                                    <DraggableItem>
                                        <Card key={index}
                                            draggable={eligibleToDrag}
                                            onDrop={handleOnDropHold}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            style={{ marginTop: '10px', background: "#f5c962", textAlign: 'center' }}
                                            onClick={() => ViewProjectDetailsHold(pro)}
                                        >
                                            <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            ) : null
                        ))
                    } */}
                {/* // Without TL //    HOLD       ======> If needed  */}

                {
                    proDetails?.taskList?.map((pro, index) => {

                        if (pro?.projectStatus === 'hold') {

                            const draggable = pro?.roleName === 'TL' ? eligibleTLToDrag : pro?.roleName === 'ProjectHead' ? eligiblePLToDrag : eligibleToDrag;

                            return (
                                <Fragment key={index}>
                                    <DraggableItem>
                                        <Card
                                            draggable={draggable}
                                            onDrop={handleOnDropHold}
                                            onDragStart={() => handleDragStart(pro)}
                                            onDragOver={handleDragOver}
                                            style={{ margin: '10px', background: "#f5c962", cursor:'grabbing' }}
                                            onClick={() => ViewProjectDetailsHold(pro)}
                                        >
                                            {/* <p>{pro?.employeeName}</p>
                                            <p>{pro?.departmentName}</p>
                                            <p>{pro?.projectStatus}</p>
                                            <div style={{ marginTop: '20px' }}>
                                                {
                                                    pro?.priority === 'high' ?
                                                        (<><CustomTag color={'red'} title={'High'} /></>) :
                                                        pro?.priority === 'medium' ?
                                                            (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                            pro?.priority === 'low' ?
                                                                (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                }
                                            </div> */}
                                             <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                    <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                                        </Card>
                                    </DraggableItem>
                                </Fragment>
                            );
                        } else {
                            return null;
                        }
                    })
                }

            </div>

            <div className='statusChange' style={{background:"#FFE1E1"}}>
                <Card style={{ background: 'red' }} className='statusChange'>
                    <h1 style={{ textAlign: 'center' }}>CANCELLED</h1>
                </Card>
                {
                    eligibleToDrag || CurrentRole === USER_ROLES.TEAMLEADER || USER_ROLES.PROJECHEAD ? (<>
                        <Card onDragOver={handleDragOver} onDrop={handleOnDropOnCancelled} droppable={'true'} style={{ margin: '10px', width:"250px", background: '#f5f5f5' }} className='statusChange' >
                            <Flex center={'true'}><h1 style={{ border: "dashed 2px grey", padding: "5px" }}>+ Drag here</h1></Flex>
                        </Card>
                    </>) : null
                }
                {
                    proDetails?.taskList?.map((pro, index) => (
                        pro?.projectStatus === 'cancelled' ? (
                            <Fragment>
                                <DraggableItem>
                                    <Card key={index}
                                        onDrop={handleOnDropOnCancelled}
                                        onDragOver={handleDragOver}
                                        style={{ margin: '10px', background: "#f76a65", cursor:'grabbing' }}
                                        onClick={() => ViewProjectDetailsCancelled(pro)}
                                    >
                                        {/* <p>{pro?.employeeName}</p>
                                        <p>{pro?.departmentName}</p>
                                        <p>{pro?.projectStatus}</p>
                                        <div style={{ marginTop: '20px' }}>
                                            {
                                                pro?.priority === 'high' ?
                                                    (<><CustomTag color={'red'} title={'High'} /></>) :
                                                    pro?.priority === 'medium' ?
                                                        (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                        pro?.priority === 'low' ?
                                                            (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                            }
                                        </div> */}
                                         <div style={{display:"flex",justifyContent:'space-between', marginTop:'10px'}}>
                                                <p>{pro?.employeeName}</p>
                                                <p>{pro?.departmentName}</p>
                                                </div>
                                                <div style={{display:"flex",justifyContent:'space-between'}}>
                                                <p style={{ marginTop: '10px' }}>{pro?.projectStatus}</p>
                                                <div style={{display:'flex',gap:'5px',marginTop:'10px'}}>
                                                <div style={{marginTop:'1px'}}><MdOutlineAccessTime/></div>
                                                <div style={{marginBottom:'-3px'}}>{pro?.startDate && formatDate(pro.startDate)}</div>
                                                </div>
                                                </div>
                                                <div style={{ marginTop: '10px',display:'flex', justifyContent:'space-between' }}>
                                                    <div>
                                                    {
                                                        pro?.priority === 'high' ?
                                                            (<><CustomTag color={'red'} title={'High'} /></>) :
                                                            pro?.priority === 'medium' ?
                                                                (<><CustomTag color={'orange'} title={'Medium'} /></>) :
                                                                pro?.priority === 'low' ?
                                                                    (<><CustomTag color={'yellow'} title={'Low'} /></>) : null
                                                    }
                                                    </div>
                                                    <div>
                                                    <img src={`${base}${pro?.profile}`} alt="" width={"50px"} height={"50px"}  style={{objectFit : "cover",borderRadius : "50%",boxShadow : "0 0 5px 5px rgba(0, 0, 0, 0.03)",margin : "auto"}}/>
                                                    </div>
                                                </div>
                                    </Card>
                                </DraggableItem>
                            </Fragment>
                        ) : null
                    ))
                }
            </div>
        </Flex>
            {/* </CustomRow> */ }
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
            <CustomModal isVisible={isModalOpen1} handleOk={handleOk} handleCancel={handleCancel1} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />
        </StyledStatusChange >
    );
};


export default ProjectStatusChange