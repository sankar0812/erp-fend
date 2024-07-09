import React, { useEffect, useState } from 'react'
import { EditRound, StyledUser, UserCard, UserImageCard } from '../style'
import { CustomRow } from '../../../components/CustomRow'
import { Col } from 'antd'
import Flex from '../../../components/Flex'
import pro from '../../../Images/bglogin.png'
import { GrEdit } from 'react-icons/gr'
import { CustomModal } from '../../../components/CustomModal'
import AddUser from './AddUser'
import { useParams } from 'react-router-dom'
import { APIURLS } from '../../../utils/ApiUrls'
import request, { base } from '../../../utils/request'
import { selectCurrentRole, selectCurrentRoleID, selectCurrentUser } from '../../Auth/authSlice'
import { useSelector } from 'react-redux'

export const ViewUser = () => {

    const [formReset, setFormReset] = useState(0);
    const [trigger, setTrigger] = useState(0)
    const [setDetails, setDetailsGet] = useState([])

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const { id } = useParams()

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

    const userr = useSelector(selectCurrentRoleID)
    const name = useSelector(selectCurrentRole)

    useEffect(() => {
        GetUserDetaisss();
      }, []);
    
      const GetUserDetaisss = () => {

        request
          .get(`${APIURLS.GETINDIVIDUALUSER}/${userr}/`)
          .then(function (response) {
            setDetailsGet(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    const UserForm = () => {
        setModalTitle("User");
        setTrigger(trigger + 1)
        setModalContent(
            <AddUser
                formname={"UserrForm"}
                FormExternalClose={FormExternalClose}
                updatetrigger={trigger}
            />
        );
        showModal();
    };

    return (
        <StyledUser>
            <Flex center={'true'}>
                <UserImageCard>
                    <img
                        src={`${base}${setDetails?.imageUrl}`}
                        alt="img"
                        width={100}
                        height={100}
                        style={{ borderRadius: "25%", objectFit: "cover" }}
                    />
                </UserImageCard>
            </Flex>

            <CustomRow space={[12, 12]}>

                <Col span={24} md={12} >
                    <UserCard>
                        <CustomRow>
                            <Col span={24} md={12} >
                                <h1>USER NAME :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.username}</p>
                            </Col>
                            <Col span={24} md={12}>
                                <h1>Mobile Number :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.mobileNumber}</p>
                            </Col>
                            <Col span={24} md={12}>
                                <h1>Email ID :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.email}</p>
                            </Col>
                        </CustomRow>
                    </UserCard>
                </Col>

                <Col span={24} md={12}>
                    <UserCard>
                        <CustomRow>
                            <Col span={24} md={12} >
                                <h1>Address :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.address}</p>
                            </Col>
                            <Col span={24} md={12}>
                                <h1>Location :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.location}</p>
                            </Col>
                            <Col span={24} md={12}>
                                <h1>City :</h1>
                            </Col>
                            <Col span={24} md={12}>
                                <p>{setDetails?.city}</p>
                            </Col>
                        </CustomRow>
                    </UserCard>
                </Col>
            </CustomRow>
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </StyledUser>
    )
}
