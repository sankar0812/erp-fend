import { Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { APIURLS } from '../../../../utils/ApiUrls/Hrm';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { getProjectDetails } from '../../ProjectSlice';
import { useDispatch } from 'react-redux';
import { CustomUpload } from '../../../../components/Form/CustomUpload';
import Flex from '../../../../components/Flex';
import Button from '../../../../components/Form/CustomButton';


const PromotingProjectModal = ({ projectRecord, Close, formReset ,GetTaskDetailsByRole , GetTaskDetailsByEmployee }) => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [imgUrl, setImageUrl] = useState([])
    console.log(projectRecord, 'projectRecordprojectRecord');

    useEffect(() => {
        form.resetFields()
    }, [formReset])

    const onFinish = (value) => {
        const newvalue = {
            projectStatus: "completed",
            url : imgUrl[0] ,
            typeOfProject: projectRecord?.typeOfProject,
        };
        console.log(newvalue, 'newvaluenewvalue');
        request
            .put(`${APIURLS.PUT_OVERALL_PROJECTSTATUS_CHANGE}${projectRecord?.taskId}`, newvalue)
            .then(function (response) {
                toast.success("Project Status Changed Successfully");
                dispatch(getProjectDetails())
                GetTaskDetailsByRole()
                GetTaskDetailsByEmployee()
                Close()
            })
            .catch(function (error) {
                console.error(error, "check");
            });

    };
console.log(imgUrl[0] ,'imgUrl[0] imgUrl[0] imgUrl[0] ');
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (error) => {
                reject(error)
            };
        });

    const handleDocument = async (img) => {
        if (img.fileList.length > 0) {
            const ImageObj = await Promise.all(img.fileList.map(async (value) => {
                // Assuming getBase64 returns a Promise
                const base64Result = await getBase64(value.originFileObj);
                const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
                // Now, you can use base64Result
                // const newObj = {
                //     productImagesUploadUrl: slicedImageUrl,
                //     type:value.type
                // }

                return slicedImageUrl

            }));

            setImageUrl(ImageObj);
        }
    }

    const onFinishFailed = (errorInfo) => {

    };

    return (
        <Form
            name='PromoteProject'
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Flex center={'true'}>
                <CustomUpload label={'Upload Research Document'} name={'url'} onChange={handleDocument} accept={'.pdf'}
                    rules={[
                        {
                            required: true,
                            message: 'Please Upload Document ',
                        }
                    ]}
                />
            </Flex>
            <Flex center={'true'} gap={'20px'} style={{ marginTop: '30px' }} >
                <Button.Success text={'Proceed'} htmlType={'submit'} />
                <Button.Danger text={'Cancel'} onClick={Close} />
            </Flex>
        </Form>
    )
}

export default PromotingProjectModal