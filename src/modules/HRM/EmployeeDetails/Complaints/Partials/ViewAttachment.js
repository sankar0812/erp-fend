import React from 'react'
import Flex from '../../../../../components/Flex';
import { base } from '../../../../../utils/request';

const ViewAttachment = ({record}) => {

  return (
    <div>
        <Flex center={'true'}>
            <img src={`${base}${record?.attachments}`} width={'200px'} />
        </Flex>
    </div>
  )
}

export default ViewAttachment