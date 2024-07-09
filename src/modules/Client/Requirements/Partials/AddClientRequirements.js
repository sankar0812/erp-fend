import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../components/CustomRow";
import Button from "../../../../components/Form/CustomButton";
import Flex from "../../../../components/Flex";
import { CustomTextArea } from "../../../../components/Form/CustomTextArea";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { CustomInputNumber } from "../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../components/CustomModal";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import { CustomDropSelect } from "../../../../components/Form/CustomDropSelect";
import { getClientProfile, getProjecttype, selectProjectType, viewclientprofile } from "../../ClientSlice";
import AddProjectType from "../../ProjectType/Partials/AddProjectType";
import { selectCurrentRole } from "../../../Auth/authSlice";

export const AddClientRequirements = ({ FormExternalClosee, formReset, requireRecord }) => {

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [trigger, setTrigger] = useState(0)
    const [projectTo, setProjectTo] = useState()
    const [ImageInitialValue, setImageInitialValue] = useState([]);

    const ViewProjecttype = useSelector(selectProjectType)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }


    const handleCancel = () => {
        setIsModalOpen(false);

    }

    const ClientDetails = useSelector(viewclientprofile)
    const RoleName = useSelector(selectCurrentRole)

    useEffect(() => {
        if (requireRecord) {
            // form.setFieldsValue(requireRecord)
            const requireDate = new Date(requireRecord?.date)

            const dateFormat = 'YYYY-MM-DD';
            const FrmDateee = dayjs(requireDate).format(dateFormat);


            form.setFieldsValue({
                date: dayjs(FrmDateee),
            })
            // form.setFieldsValue(requireRecord)
        }
    }, [requireRecord,formReset])

    useEffect(() => {
        dispatch(getClientProfile())
    }, [])


    const onFinish = (values) => {
        const record = {...values ,date:selectedDate}
        const newvalues = {
            projectName:record.projectName,
            duration:record.duration,
            date:record.date,
            clientId:record.clientName,
            projectTypeId:record.projectTypeId,
            skillsAndDescription:record.skillsAndDescription,
            features:record.features,
            roleName : RoleName,
        }
        const newvaluesUpdate = {
            projectName:record.projectName,
            duration:record.duration,
            date:record.date,
            clientId:record.clientId,
            projectTypeId:record.projectTypeId,
            skillsAndDescription:record.skillsAndDescription,
            features:record.features,
        }
        if (requireRecord) {
            UpdateRequirements(newvaluesUpdate)
        }
        else {
            AddRequirements(newvalues)
        }

    };

    const AddRequirements = (values) => {
        const newvalue ={
            projectName : values?.projectName,
            duration : values?.duration,

        }
        request.post(`${APIURLS.POSTREQUIREMENTS}`, values)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Requirements Added Successfully")
                    form.resetFields();
                    // FormExternalClosee()
                }

            })
            .catch(function (error) {
                toast.error("Adding Failed");
                console.log(error);
            });
    }

    const UpdateRequirements = (values, id) => {
        request.put(`${APIURLS.PUTREQUIREMNTS}/${requireRecord?.projectId}`, values)
            .then(function (response) {
                toast.info("Client Requirements Updated Successfully")
                if (FormExternalClosee) {
                    FormExternalClosee()
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Updated Failed')
            });
    }

    const SelectClientOptions = ClientDetails?.map((item) => ({
        label: item.clientName,
        value: item.clientId
    }))


    const onReset = () => {
        form.resetFields()
    };
    // ==========Project Type Get ===================//

    useEffect(() => {
        dispatch(getProjecttype())
    }, [])

    const ProjectTypeoptions = ViewProjecttype?.map((item) => ({
        label: item.projectType,
        value: item.projectTypeId,
    }))

    useEffect(() => {
        if (requireRecord) {
            form.setFieldsValue({ projectName: requireRecord?.projectName })
            form.setFieldsValue({ duration: requireRecord?.duration })
            form.setFieldsValue({ serviceId: requireRecord?.serviceId })
            form.setFieldsValue({ clientName: requireRecord?.clientName })
            form.setFieldsValue({ clientId: requireRecord?.clientId })
            form.setFieldsValue({ projectTypeId: requireRecord?.projectTypeId })
            form.setFieldsValue({ skillsAndDescription : requireRecord?.skillsAndDescription})
            form.setFieldsValue({ features : requireRecord?.features})
            // form.setFieldsValue({ clientName : requireRecord?.clientName})
            // form.setFieldsValue(requireRecord)
           
        }

    }, [requireRecord, ImageInitialValue,formReset])

    const FormClose = () => {
        handleOk()
        dispatch(getProjecttype())
    }

    const handleProjectType = () => {
        setTrigger(trigger + 1)
        // setModalTitle("Add Project Type");
        setModalContent(
            <AddProjectType
                // formname={"AddProjectType"}
                formReset={formReset}
                Requiretrigger={trigger}
                FormClose={FormClose}
                setProjectTo={setProjectTo}
            />
        );
        showModal();
    };

    const handleOnChange = (date) => {
        setSelectedDate(date);
    };

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
                                    message: "Please Enter Project Name !",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInputNumber
                            name={"duration"}
                            label={"Duration"}
                            placeholder={"Enter Duration"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter the Duration !",
                                },
                            ]}
                        />
                    </Col>

                    {/* <Col span={24} md={12}>
                            <CustomInput
                                label={"Services"}
                                placeholder={"Enter Services"}
                                name={"serviceId"}
                            // options={serviceId}
                            />
                        </Col> */}
                    <Col span={24} md={12}>
                        <CustomDatePicker
                            name={"date"}
                            label={"Date"}
                            onChange={handleOnChange}
                            disabled={requireRecord ? true : false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Choose Date !",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomSelect
                            name={"clientName"}
                            label={"Client Name"}
                            placeholder={'Client Name'}
                            options={SelectClientOptions}
                            disabled={requireRecord ? true : false}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Client Name !",
                                },
                            ]}
                        />
                        <CustomInput name={'clientId'} display={'none'}/>
                    </Col>
                    <Col span={24} md={12}>
                        <CustomDropSelect
                            label={"Project Type"}
                            name={"projectTypeId"}
                            placeholder={'Please Select Project Type'}
                            options={ProjectTypeoptions}
                            showSearch={true}
                            onButtonClick={handleProjectType}
                            buttonLabel={'Add Project Type'}
                        // onChange={handleFindId}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomTextArea label={'Skill & Description'}
                            name={'skillsAndDescription'} />
                    </Col>
                    <Col span={24} md={12}>
                        <CustomInput label={'Features'} placeholder={'Features'}
                            name={'features'} />
                    </Col>
                    {/* <CustomInput name={'projectTypeId'} display={'none'} /> */}

                </CustomRow>

                <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
                    {
                        requireRecord ? (<>
                            <Button.Primary text={"Update"} htmlType={"submit"} />
                            <Button.Danger
                                text={"Close"}
                                icon={<BiReset style={{ marginRight: "5px" }} />}
                                onClick={() => FormExternalClosee()}
                            /></>) : (<>
                                <Button.Primary text={"Save"} htmlType={"submit"} />
                                <Button.Danger
                                    text={"Reset"}
                                    icon={<BiReset style={{ marginRight: "5px" }} />}
                                    onClick={() => onReset()}
                                />
                            </>)
                    }

                </Flex>

                <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} width={400} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />

            </Form>
        </Fragment>
    );
};