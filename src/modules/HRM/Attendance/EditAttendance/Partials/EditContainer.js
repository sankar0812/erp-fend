import React, { Fragment, useEffect, useState } from 'react'
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm'
import { attendancetype } from '../../../../../components/SampleData'
import { useDispatch, useSelector } from 'react-redux'
import { EditSearch } from './EditSearch'
import { EditTable } from './EditTable'
import request from '../../../../../utils/request'
import { getShift, selectAllShift } from '../../../../HRM/EmployeeDetails/EmployeeSlice'
import { CustomHolder } from './Style'

export const EditContainer = () => {

    const [searchedData, setSearchedData] = useState({})  // --> 
    const [attendanceData, setAttendanceData] = useState([])
    const [tableData, setTableData] = useState([])
    const [shiftOpt, setShiftOpt] = useState([])

    const [resetAll, setResetAll] = useState(0)

    const [formReset, setFormReset] = useState(0);

    const dispatch = useDispatch();

    const onChangeSearch = (arg) => {
        setSearchedData(arg)
    }

    const changeSendDate = (arg) => {
    }

    useEffect(() => {
        if (Object.entries(searchedData).length != 0) {
            fetchData(searchedData);
        }
    }, [searchedData])


    const FormRest = () => {
        setFormReset(formReset + 1);
    };

    useEffect(() => {
        fetchData(searchedData)
    }, [formReset])
    

    useEffect(() => {
        if (attendanceData.length != 0) {
            const attData = attendanceData[0];
            if (Object.entries(attData).length != 0) {
                if (attData?.shiftName === attendancetype[0].value) {
                    setTableData(attData?.attendanceDetails)
                } else {
                    const attenData = attData?.attendanceType?.filter((item) => item?.shiftId === searchedData?.shiftOpt);

                    if (attenData.length != 0) {
                        setTableData(attenData[0]?.shiftTypeDetails)
                    } else {
                        setTableData([])
                    }
                }
            }
        }
        else {
            setTableData([])
        }
    }, [attendanceData])


    useEffect(() => {
        dispatch(getShift())
    }, [])

    const AllShiftDetails = useSelector(selectAllShift)

    useEffect(() => {
        setShiftOpt(AllShiftDetails)
    }, [AllShiftDetails])

    useEffect(() => {
        if (resetAll) {
            setTableData([]);
            setSearchedData({});
        }
    }, [resetAll])


    const fetchData = (value) => {
        request.get(`${APIURLS?.EDITGETATT}`, {
            params: {
                employeesParam: 'employees',
                attendanceParam: value?.attenType,
                date:value?.attendanceDate,
            }
        })
            .then(function (response) {
                setAttendanceData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <Fragment>
            <CustomHolder width={'600px'}>
                <EditSearch handleChange={onChangeSearch} shiftOpt={shiftOpt} setResetAll={setResetAll} changeSendDate={changeSendDate} />
            </CustomHolder>

            {
                Object.entries(searchedData).length != 0 && (
                    <CustomHolder mt={'20px'}>
                        <EditTable data={tableData} FormRest={FormRest}/>
                    </CustomHolder>
                )
            }
        </Fragment>
    )
}

