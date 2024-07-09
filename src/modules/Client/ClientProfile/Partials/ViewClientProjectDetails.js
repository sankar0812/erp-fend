import React from 'react'
import { CustomRow } from '../../../../components/CustomRow'
import { Avatar, Col, Progress, Tooltip } from 'antd'
import { CustomPageFormSubTitle, CustomPageFormTitle, CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomCardView } from '../../../../components/CustomCardView'
import Flex from '../../../../components/Flex'
import styled from 'styled-components'
import { FaAngleRight } from 'react-icons/fa'
const ProfilePicHolder = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
& div{
    width: 80px; 
    height: 80px;
    border-radius: 50%; 
    overflow: hidden; 
}
& img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #dededec7;
}
`
const BioDataHolder = styled.div`
display: flex;
flex-direction: column;
margin-left: 15px;
justify-content: center;
h1:first-child {
    font-size: 18px; 
    color:#000;
    font-weight: bold;
    margin: 3px 0px;
  }
`
const ProfileCardHolder = styled.div`
background:white;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.03);
margin:auto;
max-width:100%;
border-radius:10px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height:100% !important;
padding: 20px 10px; 
.text1 {
    color:#000;
}
.text2 {
    font-size: 20px;
    color:#000;
    padding:5px;
}
`
const ProjectListHolder = styled.div`
background:white;
box-shadow: 0 0 5px 5px rgba(0,0,0,0.03);
margin:auto;
max-width:100%;
border-radius:10px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height:100% !important;
padding: 20px; 
margin:15px 0px;
& h1 {
    color:#000;
    font-size: 16px;
    margin-bottom:10px;
}
`
const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: -10px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  & img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  }
`;
const AvatarGroupContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ClientProfile = () => {
    const Data = [
        {
            projectName: 'HiBiller',
            totalMembers: 4,
            progressPercentage: 60,
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuhQ2TxrT5ErhQGec8GQNpG3PBRCEEP6_yEdMGqo2jyniYGkbhTEYLIZr2dlqY3UX6E4I&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7tYWaQ53GpZsXrqhvnUqrD37XjV3R5RtBB5YNQ_xcdHn1M51myNPHTQCPvv95vA6y24&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYE7aTGrdoWar0tWyrXtc3mBqvSWDPBMyhbU2w1TgqIpV8uqXV-qYofl_kU-IDwFd1Vrc&usqp=CAU'
            ]
        },
        {
            projectName: 'HRM',
            totalMembers: 6,
            progressPercentage: 30,
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuhQ2TxrT5ErhQGec8GQNpG3PBRCEEP6_yEdMGqo2jyniYGkbhTEYLIZr2dlqY3UX6E4I&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7tYWaQ53GpZsXrqhvnUqrD37XjV3R5RtBB5YNQ_xcdHn1M51myNPHTQCPvv95vA6y24&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYvk6-AlpuA-TO1RJQDN2fS-u9QsON0jPjWrDskvRleo07K6aI-BIMtKX7yHYfq71now&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYE7aTGrdoWar0tWyrXtc3mBqvSWDPBMyhbU2w1TgqIpV8uqXV-qYofl_kU-IDwFd1Vrc&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG7tYWaQ53GpZsXrqhvnUqrD37XjV3R5RtBB5YNQ_xcdHn1M51myNPHTQCPvv95vA6y24&usqp=CAU',
            ]
        },
        {
            projectName: 'Erp',
            totalMembers: 8,
            progressPercentage: 80,
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuhQ2TxrT5ErhQGec8GQNpG3PBRCEEP6_yEdMGqo2jyniYGkbhTEYLIZr2dlqY3UX6E4I&usqp=CAU',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyYvk6-AlpuA-TO1RJQDN2fS-u9QsON0jPjWrDskvRleo07K6aI-BIMtKX7yHYfq71now&usqp=CAU',
            ]
        },
    ]
    return (
        <>
            <CustomPageTitle Heading={'Client Profile'} />
            <CustomRow space={[12, 12]}>
                <Col span={24} lg={16} >
                    <CustomRow space={[24, 24]}>
                        <Col span={24}>   {/*  ====  Profile Hodlder */}
                            <CustomCardView>
                                <CustomRow>
                                    <Col span={24} md={4}  >
                                        <ProfilePicHolder>
                                            <div>
                                                <img src='https://i.pinimg.com/736x/76/da/03/76da03c579566626fa270bdb6df1280b.jpg' alt='Profile' />
                                            </div>
                                        </ProfilePicHolder>
                                    </Col>
                                    <Col span={24} md={11}  >
                                        <BioDataHolder>
                                            <h1>Personal Details</h1>
                                            <h1>Name&nbsp;:&nbsp;Luffy</h1>
                                            <h1>Ph.No&nbsp;:&nbsp;9876543210</h1>
                                            <h1>Email&nbsp;:&nbsp;monkey@gmail.com</h1>
                                            <h1>Gender&nbsp;:&nbsp;male</h1>
                                        </BioDataHolder>
                                    </Col>
                                    <Col span={24} md={9}  >
                                        <BioDataHolder>
                                            <h1>Address Details</h1>
                                            <h1>Foosha Town</h1>
                                            <h1>Windmill Island</h1>
                                            <h1>987876</h1>
                                        </BioDataHolder>
                                    </Col>
                                </CustomRow>
                            </CustomCardView>
                        </Col>
                        <Col span={24}>   {/*  ====  Profile Card  */}
                            <CustomRow space={[12, 12]}>
                                <Col span={24} sm={12} md={12} lg={6}>
                                    <ProfileCardHolder >
                                        <div>
                                            <h1 className='text1'>Project Count</h1>
                                            <h1 className='text2'>6</h1>
                                        </div>
                                        <FaAngleRight />
                                    </ProfileCardHolder>
                                </Col>
                                <Col span={24} sm={12} md={12} lg={6}>
                                    <ProfileCardHolder >
                                        <div>
                                            <h1 className='text1'>Progress Percentage</h1>
                                            <h1 className='text2'>69%</h1>
                                        </div>
                                        <FaAngleRight />
                                    </ProfileCardHolder>
                                </Col>
                                <Col span={24} sm={12} md={12} lg={6}>
                                    <ProfileCardHolder >
                                        <div>
                                            <h1 className='text1'>Completed Projects</h1>
                                            <h1 className='text2'>6</h1>
                                        </div>
                                        <FaAngleRight />
                                    </ProfileCardHolder>
                                </Col>
                                <Col span={24} sm={12} md={12} lg={6}>
                                    <ProfileCardHolder >
                                        <div>
                                            <h1 className='text1'>New Projects</h1>
                                            <h1 className='text2'>6</h1>
                                        </div>
                                        <FaAngleRight />
                                    </ProfileCardHolder>
                                </Col>
                            </CustomRow>
                        </Col>
                    </CustomRow>
                    <CustomPageFormSubTitle Heading={'Project List'} />
                    {/* =====   Project List Card   ===== */}
                    <Col>
                        {Data.map((item, index) => {
                            return (
                                <Col span={24}>
                                    <ProjectListHolder>
                                        <div>
                                            <h1>{index + 1}.&nbsp;{item.projectName}</h1>
                                            <Avatar.Group
                                                maxCount={3}
                                                maxStyle={{
                                                    color: '#f56a00',
                                                    backgroundColor: '#fde3cf',
                                                }}
                                                maxPopoverTrigger='click'
                                            >
                                                {item.images.slice(0, 3).map((value, index) => {
                                                    return (
                                                        <Avatar
                                                            key={index}
                                                            style={{
                                                                backgroundColor: '#f56a00',
                                                            }}
                                                            src={value}
                                                        />
                                                    );
                                                })}
                                                {item.images.length > 3 && (
                                                    <Tooltip
                                                        // title={'Monkey D. Luffy'}
                                                        placement="top"
                                                    >
                                                        {item.images.slice(3).map((value, index) => (
                                                            <Avatar
                                                                key={index}
                                                                style={{
                                                                    backgroundColor: '#f56a00',
                                                                }}
                                                                src={value}
                                                            />
                                                        ))}
                                                    </Tooltip>
                                                )}
                                            </Avatar.Group>
                                            <div>Total Members: {item.images.length}</div>
                                        </div>
                                        <Progress type='circle' status='active' percent={item.progressPercentage} width={70} strokeWidth={10} />
                                    </ProjectListHolder>
                                </Col>
                            )
                        })}
                    </Col>
                </Col>
                {/* =====   Bill List   ===== */}
                <Col span={24} lg={8}>
                    <CustomPageFormTitle Heading={'View Bill List'} />
                    <CustomRow space={[12, 12]}>
                        <Col span={24} md={12} lg={24}>
                            <CustomCardView>
                                <CustomPageFormTitle Heading={'Invoice List'} />
                            </CustomCardView>
                        </Col>
                        <Col span={24} md={12} lg={24}>
                            <CustomCardView>
                                <CustomPageFormTitle Heading={'Quotation List'} />
                            </CustomCardView>
                        </Col>
                    </CustomRow>
                </Col>
            </CustomRow>
        </>
    )
}
export default ClientProfile