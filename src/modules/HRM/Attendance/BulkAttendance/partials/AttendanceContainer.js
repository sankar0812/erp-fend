import React, { Fragment, useEffect, useState } from 'react'
import { CustomHolder } from './Style'
import { AddSearch } from './AddSearch'
import { AttendanceTable } from './AttendanceTable'
import { useDispatch, useSelector } from 'react-redux'
import { getShift, selectAllShift } from '../../../EmployeeDetails/EmployeeSlice'
import dayjs from 'dayjs'
import request from '../../../../../utils/request'
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm'
import { attendancetype } from '../../../../../components/SampleData'

export const AttendanceContainer = () => {

    const [searchedData, setSearchedData] = useState({})  // --> 
    const [attendanceData, setAttendanceData] = useState([])
    const [tableData, setTableData] = useState([])
    const [shiftOpt, setShiftOpt] = useState([])
    const [shiftData, setShiftData] = useState([])

    const [sendDate, setSendDate] = useState(dayjs().format("YYYY-MM-DD"));

    const [resetAll, setResetAll] = useState(0)

    const dispatch = useDispatch();

    const onChangeSearch = (arg) => {
        setSearchedData(arg)
    }

    const changeSendDate = (arg) => {
        setSendDate(arg)
    }

    useEffect(() => {
        if (Object.entries(searchedData).length != 0) {
            fetchData(searchedData);
        }
    }, [searchedData])

    useEffect(() => {
        if (attendanceData.length != 0) {
            const attData = attendanceData[0];
            if (Object.entries(attData).length != 0) {
                if (attData?.shiftName === attendancetype[0].value) {
                    setShiftData([])
                    setTableData(attData?.attendanceDetails)
                } else {
                    const attenData = attData?.attendanceType?.filter((item) => item?.shiftId === searchedData?.shiftOpt);

                    if (attenData.length != 0) {
                        setShiftData(attenData)
                        setTableData(attenData[0]?.shiftTypeDetails)
                    } else {
                        setShiftData([])
                        setTableData([])
                    }
                }
            }
        }
        else {
            setShiftData([])
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
            setShiftData([]);
            setSearchedData({});
        }
    }, [resetAll])


    const fetchData = (value) => {
        request.get(`${APIURLS?.GETATT}`, {
            params: {
                employeesParam: 'employees',
                attendanceParam: value?.attenType
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
                <AddSearch handleChange={onChangeSearch} shiftOpt={shiftOpt} setResetAll={setResetAll} changeSendDate={changeSendDate} />
            </CustomHolder>

            {
                Object.entries(searchedData).length != 0 && (
                    <CustomHolder mt={'20px'}>
                        <AttendanceTable data={tableData} shiftData={shiftData} sendDate={sendDate} />
                    </CustomHolder>
                )
            }
        </Fragment>
    )
}

