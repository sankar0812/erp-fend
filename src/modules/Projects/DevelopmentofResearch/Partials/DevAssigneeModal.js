import { Col, Form } from "antd"
import { CustomRow } from "../../../../components/CustomRow"
import Button from "../../../../components/Form/CustomButton"
import { useEffect, useState } from "react"
import request from "../../../../utils/request"
import { toast } from "react-toastify"
import Flex from "../../../../components/Flex"
import { allprojectHeadDetails, getProjectHeadDetails } from "../../ProjectSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RANDDURLS } from "../../../../utils/ApiUrls/RandD"
import { getDevCompletedProjects } from "../DevelopmentSlice"
import { CustomSelect } from "../../../../components/Form/CustomSelect"
import { CustomInput } from "../../../../components/Form/CustomInput"


export const DevAssigneeModal = ({ devrec, trigger, FormExternalClose }) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [devValue, setDevValue] = useState([])

    useEffect(() => {
        form.setFieldsValue(devrec)
        // form.setFieldsValue({ employeeId: devrec?.userName })
    }, [devrec, trigger])

    useEffect(() => {
        form.setFieldsValue({ employeeId: devValue })
    }, [devValue, trigger])

    useEffect(() => {
        dispatch(getProjectHeadDetails());
    }, []);

    const AllProjectHead = useSelector(allprojectHeadDetails)

    // const radiooptions = [
    //     {
    //         label: 'Pending',
    //         value: 'pending',
    //     },
    //     {
    //         label: 'Todo',
    //         value: 'todo',
    //     },
    //     {
    //         label: 'On Process',
    //         value: 'onprocess',
    //     },
    //     {
    //         label: 'Completed',
    //         value: 'completed',
    //     },
    //     {
    //         label: 'Hold',
    //         value: 'hold',
    //     },
    //     {
    //         label: 'Cancelled',
    //         value: 'cancelled',
    //     },
    // ]

    const radiooptions = AllProjectHead?.map((head) => ({ label: head?.employeeName, value: head?.employeeId }))
    // const FeeExtraOptions = AllFeeExtra?.map((extra) => ({ label: extra.field_name, value: extra.field_name }))
    const handleStatusRadio = (e) => {
        setDevValue(e)
    }

    const onReset = () => {
        FormExternalClose()
    }

    const onFinish = (value) => {
        ChangeStatus(value)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const ChangeStatus = (value) => {

        const NewVal = { ...value, employeeId: value?.userName }
        
        request.put(`${RANDDURLS.PUT_DEV_ASSIGNEE}${devrec?.researchDevelopmentFileId}`, NewVal)
            .then(function (response) {
                toast.info("Assigned Successfully !")
                FormExternalClose()
                dispatch(getDevCompletedProjects())
                // GetTaskDetails()
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

    return (
        <Form
            name='ChangeStatusModalPro'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">

            <CustomRow space={[24, 24]}>

                <Col span={24} md={24}>
                    <Flex center={'true'} >

                        <CustomSelect label={'Select Project Head'} name={'userName'} options={radiooptions} onChange={handleStatusRadio}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select the Project Head ',
                                }
                            ]}
                        />
                        <CustomInput name={'employeeId'} display={'none'} />
                    </Flex>
                </Col>
            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Update'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}
