import { Col, Form } from 'antd'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { BiReset } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { CustomRow } from '../../../../components/CustomRow'
import Flex from '../../../../components/Flex'
import Button from '../../../../components/Form/CustomButton'
import { CustomDatePicker } from '../../../../components/Form/CustomDatePicker'
import { CustomInput } from '../../../../components/Form/CustomInput'
import { CustomSelect } from '../../../../components/Form/CustomSelect'
import { CustomTextArea } from '../../../../components/Form/CustomTextArea'
import { APIURLS } from '../../../../utils/ApiUrls/Client'
import { APIURLS as HrmUrls } from '../../../../utils/ApiUrls/Hrm'
import request from '../../../../utils/request'
import { selectCurrentId, selectCurrentRole } from '../../../Auth/authSlice'
import { getProjecttype, selectProjectType, viewclientprofile } from '../../../Client/ClientSlice'
import { getClientProfile, getlientFormError, getlientFormStatus, viewClientForm } from '../../ErpClientSlice'
import { CustomDropSelect } from '../../../../components/Form/CustomDropSelect'
import AddProjectType from '../../../Client/ProjectType/Partials/AddProjectType'
import { CustomModal } from '../../../../components/CustomModal'

const AddClientForm = ({ ProjectRecord, FormExternalClose }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [proType, setProType] = useState([])
    const [trigger,setTrigger] = useState(0)
      // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
    const RoleType = useSelector(selectCurrentRole)
    useEffect(() => {
        dispatch(getProjecttype())
    }, [])

    const Type = useSelector(selectProjectType)
    const ProjectTypes = Type?.map(item => (
        {
            label: item.projectType,
            value: item.projectTypeId,
        }
    ))
    
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

    const onReset = () => {
        form.resetFields()
    }

    const onClose = () => {
        FormExternalClose()
    }
    
    const onCloseThird =()=>{
        handleOk()
    }

    const handleProjectTypeModal = () => {
        setTrigger(trigger + 1)
        // setModalTitle("Add Project Type");
        setModalContent(
          <AddProjectType
            // formname={"AddProjectType"}
            Requiretrigger={trigger}
            FormCloseThird={onCloseThird}
          />
        );
        showModal();
      };

    const handleProjectType = (e) => {
        const FindProjectType = Type?.find((val) => val.projectTypeId === e)
        setProType(FindProjectType?.projectTypeId)
    }

    useEffect(() => {
        form.setFieldsValue({ projectTypeId: proType })
    }, [proType])

    useEffect(() => {
        if (ProjectRecord) {
            form.setFieldsValue(ProjectRecord)
            // ProjectRecord.status ? form.setFieldsValue({status:'Approved'})  : form.setFieldsValue({status:'Rejected'})
        }
    }, [ProjectRecord])


    //=====================Client name===================================

    const ClientId = useSelector(selectCurrentId);
    const Role = useSelector(selectCurrentRole);  //  role type


    const onFinish = (values) => {

        const record = { ...values, date: selectedDate, clientId: ClientId }

        const newValues = {
            clientId: record.clientId,
            projectName: record.projectName,
            date: record.date,
            skillsAndDescription: record.skillsAndDescription,
            features: record.features,
        }
        if (ProjectRecord) {
            UpdateClientForm(record)
        } else {
            AddClientForm(newValues);
        }
    };

    const AddClientForm = (values) => {
        const newval = { ...values, roleType: RoleType }
        request.post(`${HrmUrls.POSTREQUIREMENTS}`, newval)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Submited Successfully")
                    form.resetFields();
                    // FormExternalClosee()
                }
            })
            .catch(function (error) {
                toast.error("Adding Failed");
            });
    }

    const UpdateClientForm = (values) => {
        const newval = { ...values, projectTypeId: values?.projectType }
        request.put(`${HrmUrls.CLIENTREQUESTUPDATE}${values.projectId}`, values)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Submited Successfully")
                    form.resetFields();
                    FormExternalClose()
                }
            })
            .catch(function (error) {
                console.log(error, 'eror');
                toast.error("Adding Failed");
            });
    }
    return (
        <Fragment>
            <Form
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={
                    {
                        date: dayjs(),

                    }

                }
                onFinish={onFinish}
                autoComplete="off"
            >
                <CustomRow space={[12, 12]}>
                    <Col span={24} md={12}>
                        <CustomInput
                            name={"projectName"}
                            label={"Project Name"}
                            placeholder={"Enter Project Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Project Name!",
                                },
                            ]}
                            // disabled={ProjectRecord ? true : false}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        {
                            ProjectRecord ?
                                <CustomInput
                                    name={"date"}
                                    label={"Date"}
                                    disabled
                                />
                                :
                                <CustomDatePicker label={'Date'}
                                    name={'date'} onChange={handleOnChange}
                                />
                        }

                    </Col>
                    {
                        Role == 'Manager' &&
                        <>
                            {/* <Col span={24} md={12}>
                                <CustomSelect
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Project Status!",
                                        },
                                    ]}
                                    options={status} placeholder={'Status'} label={'Project Status'} name={'projectStatus'} />

                            </Col> */}
                            <Col span={24} md={12}>
                                <CustomInput
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Project Duration!",
                                        },
                                    ]}
                                    placeholder={'Duration'} label={'Project Duration'} name={'duration'} />
                                <CustomInput name={'projectId'} display={'none'} />
                            </Col>
                            <Col span={24} md={12}>
                                <CustomDropSelect
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Enter Project Status!",
                                        },
                                    ]}
                                    options={ProjectTypes} placeholder={'Type'} label={'Project Type'} name={'projectType'} onChange={handleProjectType} onButtonClick={handleProjectTypeModal} />
                                <CustomInput name={'projectTypeId'} display={'none'}/>
                            </Col>
                        </>
                    }



                    <Col span={24} md={12}>
                        <CustomInput label={'Features'} placeholder={'Features'}
                            name={'features'} disabled={ProjectRecord ? true : false} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomTextArea label={'Skill & Description'}
                            name={'skillsAndDescription'} disabled={ProjectRecord ? true : false} />
                    </Col>

                </CustomRow>
                <Flex center={"true"} style={{ margin: '10px' }}>

                    {ProjectRecord ?
                        <>

                            <Button.Primary text={"Update"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Cancel"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => onClose()}
                            />

                        </>
                        : <>
                            <Button.Success text={"Add"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Reset"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => onReset()}
                            />
                        </>
                    }
                </Flex>

                {/* {loading ? <Spin /> :null} */}
            </Form>
            <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
        </Fragment>
    )
}

export default AddClientForm