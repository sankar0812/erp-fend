import { Card, Col } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import request from '../../../../../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { CustomRow } from '../../../../../../components/CustomRow';
import { CustomInput } from '../../../../../../components/Form/CustomInput';
import { CustomModal } from '../../../../../../components/CustomModal';
import { CustomDatePicker } from '../../../../../../components/Form/CustomDatePicker';
import { CustomSelect } from '../../../../../../components/Form/CustomSelect';
import { getClientProfile, getProjecttype, selectProjectType, viewclientprofile } from '../../../../../Client/ClientSlice';
import { CustomInputNumber } from '../../../../../../components/Form/CustomInputNumber';
import { CustomTextArea } from '../../../../../../components/Form/CustomTextArea';


export const HeaderQuotation = ({ setSelectedDate, quotrecord }) => {

    //=========Find Select party Fields ============//
    const [findParty, setFindParty] = useState(false)
    //=======
    const dispatch = useDispatch()


    //=====================Client name ===================================

    const ClientDetails = useSelector(viewclientprofile)

    const SelectClientOptions = ClientDetails.map((item) => ({
        label: item.clientName,
        value: item.clientId
    }))


    useEffect(() => {
        dispatch(getClientProfile())
    }, [])

    const handleclient = (value) => {
        // const PartNameSelect = ClientDetails?.find((mem) => mem.id === value);
        // setSelectedParty(PartNameSelect);
        setFindParty(value)
    };

    //=============Project Type ===================//

    const ViewProjecttype = useSelector(selectProjectType)


    useEffect(() => {
        dispatch(getProjecttype())
    }, [])

    const ProjectTypeoptions = ViewProjecttype.map((item) => ({
        label: item.projectType,
        value: item.projectTypeId,
    }))
    //===================Date onChange fn======================//
    const handleOnChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <Fragment>
            <Card>
                <CustomRow space={[24, 24]} >
                    <Col span={24} md={8}>

                        <CustomRow space={[24, 24]}>
                            <Col span={24} md={24}>
                                <CustomInput
                                    label={'Client Name'} name={'clientName'} disabled={'true'}
                                    placeholder={'Client Name'} />
                                <CustomInput
                                    label={'Client Id'} name={'clientId'} disabled={'true'} display={'none'}
                                    placeholder={'Client Name'} />
                            </Col>
                            <Col span={24} md={24}>
                                <CustomInput
                                    label={'Project Type'} name={'projectType'} disabled={'true'}
                                    placeholder={'Project Type'} />
                            </Col>

                        </CustomRow>

                    </Col>
                    <Col span={24} md={8}>
                        <CustomRow space={[24, 24]}>
                            <Col span={24} md={24}>
                                <CustomInputNumber label={'Client Mobile Number'} disabled={'true'} name={'mobileNumber'} />
                            </Col>
                            <Col span={24} md={24}>

                                <CustomInput label={'Project Status'} name={'projectStatus'} disabled={'true'} />
                            </Col>

                        </CustomRow>
                    </Col>

                    <Col span={24} md={8}>

                        <CustomRow space={[24, 24]}>

                            <CustomInput label={'Company Name'}
                                display={'none'}
                                name={'companyId'} />
                            <Col span={24} md={24}>
                                <CustomDatePicker label={'Date'} onChange={handleOnChange} name={'date'} rules={[
                                    {
                                        required: true,
                                        message: 'Please Fill Details!',
                                    },
                                ]}
                                />

                            </Col>
                            <Col span={24} md={24}>

                                <CustomTextArea label={'Client Address'} name={'address'} disabled={'true'} />

                            </Col>
                        </CustomRow>

                    </Col>

                </CustomRow>
            </Card>
        </Fragment>
    );
};
