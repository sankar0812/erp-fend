import { Col, Form } from "antd";
import { CustomInput } from "../../../../components/Form/CustomInput";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import { toast } from "react-toastify";
import Flex from "../../../../components/Flex";
import { CustomRow } from "../../../../components/CustomRow";
import Button from "../../../../components/Form/CustomButton";
import { useEffect, useState } from "react";
import { CustomDatePicker } from "../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { getProjectDetails } from "../../ProjectSlice";
import { useDispatch } from "react-redux";

export const EditProjectDetails = ({ projectRecord , Close ,formReset}) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    const onReset = () => {
        Close()
    }

    useEffect(() => {
        form.setFieldsValue(projectRecord)
        const dateFormat = 'YYYY/MM/DD';

        const taskDate = new Date(projectRecord?.date);
        const taskDatee = dayjs(taskDate).format(dateFormat);
        form.setFieldsValue({date : dayjs(taskDatee, dateFormat),})

    }, [projectRecord,formReset])

    const handleDate =(date)=>{
        setSelectedDate(date)
    }

    const onFinish = (value) => {
        const newvalue = {...value , date : selectedDate}
        UpdateProjectDetails(newvalue)
    };

    const onFinishFailed = (errorInfo) => {

    };

    const UpdateProjectDetails = (value) => {

        request.put(`${APIURLS.PUT_PROJECT_DETAILS}${projectRecord?.taskId}`, value)
            .then(function (response) {
                toast.info("Updated Project Details Successfully")
                dispatch(getProjectDetails())
                Close()
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
            name='EditProjectDetails'
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

                <Col span={24} md={8}>

                    <CustomInput label={'Project Name'} name={'projectName'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Project Name ',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={8}>

                    <CustomInput label={'Type of Project'} name={'typeOfProject'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Type ',
                            }
                        ]}
                    />

                </Col>

                <Col span={24} md={8}>

                    <CustomDatePicker label={'Date'} name={'date'} onChange={handleDate}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter The Date ',
                            }
                        ]}
                    />

                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Primary text={'Update'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={onReset} />
            </Flex>
        </Form>
    )
}
