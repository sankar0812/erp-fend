import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import request from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { Form } from 'antd';
import { CustomInput } from '../../../../../components/Form/CustomInput';
import Flex from '../../../../../components/Flex';
import Button from '../../../../../components/Form/CustomButton';
import { toast } from 'react-toastify';
import { getServerType } from '../../AccountsSlice';

export const AddServerType = ({ formname, FormExternalCloses, ServerTyperecord, updateTrigger }) => {

    const [form] = useForm();

    useEffect(() => {
      form.resetFields();
    }, [form, updateTrigger]);

    useEffect(() => {
      form.setFieldsValue(ServerTyperecord);
    }, [ServerTyperecord, updateTrigger, form]);

    const dispatch = useDispatch();
    
    const AddServerType = (value) => {
      request
      .post(`${APIURLS.POSTSERVERTYPE}`, value)
      .then(function (response) {
        toast.success("ServerType Added Successfully");
        FormExternalCloses();
        dispatch(getServerType());
        form.resetFields();
        })
        .catch((error) => {});
      };
      
      const EditServerType = (value) => {
        request
        .put(`${APIURLS.PUTSERVERTYPE}${ServerTyperecord?.serverTypeId}`, value)
        .then(function (response) {
          toast.success("ServerType Updated Successfully");
          FormExternalCloses();
          dispatch(getServerType());
          form.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
      };
      
      const onFinish = (values) => {
        if (ServerTyperecord) {
          EditServerType(values);
        }
        else{
          AddServerType(values);
        }
      };
      
      const onFinishFailed = (value) => {};
      
      const onReset = () => {
        form.resetFields();
      };

      return (
        <Form
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        form={form}
        name={formname}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ margin: "30px 0px" }}>
          <CustomInput
            label={"Server Type"}
            placeholder={"Server Type"}
            name={"serverTypeName"}
            rules={[
              {
                required: true,
                message: "Please Enter Server Type !!!",
              },
            ]}
          />
        </div>
        <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
          {/* {designationrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
            />
          </>
        ) : ( */}
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
          {/* )} */}
        </Flex>
      </Form>
    );
}
