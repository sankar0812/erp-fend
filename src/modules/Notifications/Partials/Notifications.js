import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, selectAllNotifications } from './NotificationSlice'
import { StyledNotification } from './style'
import { CustomRow } from '../../../components/CustomRow'
import { Col } from 'antd'

const Notifications = () => {
  const dispatch = useDispatch()
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    dispatch(getNotification())
  }, [])

const AllNotifications = useSelector(selectAllNotifications)

useEffect(() => {
  setDataSource(AllNotifications)
}, [AllNotifications])
  
  return (
    <StyledNotification>
    <CustomRow space={[12, 12]}>
      {dataSource?.map((item, index) => (
        <Col span={24} md={24} key={index}>
          <h6>{item?.message ? `${item?.message}`:''}&nbsp;</h6>
          <p>
            {/* {item.first_name && item.last_name ? `${item.first_name} ${item.last_name}` : ''} */}
            {/* {item.project_title ? ` ${item.project_title}` : ''} */}
            <span>{item?.date ? `${item.date}` : ''}</span>
          </p>
          <p>{item?.event_date}</p>
        </Col>
      ))}
    </CustomRow>
    </StyledNotification>
  )
}

export default Notifications