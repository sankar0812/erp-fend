import { Col, Form } from "antd"
import { useEffect } from "react"
import { APIURLS } from "../../../../utils/ApiUrls/Client"
import { selectCurrentRoleName } from "../../../Auth/authSlice"
import request from "../../../../utils/request"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import Button from "../../../../components/Form/CustomButton"
import Flex from "../../../../components/Flex"
import { CustomRow } from "../../../../components/CustomRow"
import { CustomTextArea } from "../../../../components/Form/CustomTextArea"
import { getAllClientQuotationView } from "../../ErpClientSlice"
import { useDispatch } from "react-redux"

export const RejectedReasonModal = ({ quoterecord , GetClientQuotation , FormExternalClose}) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        form.resetFields()
    }, [])

    useEffect(() => {
        dispatch(getAllClientQuotationView())
    }, [])

    const CurrentRole = useSelector(selectCurrentRoleName)

    const onFinish = (value) => {
        const newValue = {
            ...value,
            clientStatus: 'rejected',
            roleName: CurrentRole
        }
        request.put(`${APIURLS.PUT_CLIENT_OR_ADMIN_CHANGING_STATUS}${quoterecord.quotation_id}`, newValue)
            .then(resp => {
                toast.success("Quotation Cancelled Successfully !")
                dispatch(getAllClientQuotationView())
                GetClientQuotation()
                FormExternalClose()
            })
            .catch(error => { console.log(error, 'erorr') })

    };

    const onFinishFailed = (errorInfo) => {

    };


    return (
        <Form
            name='ReasonCancellationModal'
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
                    <CustomTextArea label={'Reason For Rejection'} name={'rejectedReason'}
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Reason For Rejection ',
                            }
                        ]}
                    />
                </Col>

            </CustomRow>

            <Flex center={"true"} gap={'20px'} style={{ margin: '30px' }}>
                <Button.Danger text={'Add'} htmlType={'submit'} />
                <Button.Success text={'Cancel'} />
            </Flex>
        </Form>
    )
}