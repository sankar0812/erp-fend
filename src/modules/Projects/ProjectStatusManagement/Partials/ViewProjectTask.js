import React from 'react'
import { CustomTabs } from '../../../../components/CustomTabs'
import ProjectStatusChange from './ProjectStatusChange';
import ViewAllTasks from './ViewAllTasks';
import { useParams } from 'react-router-dom';
import CalenderView from './CalenderView';
import { StyledTab } from '../style';
import { CustomLableBack } from '../../../../components/CustomLableBack';
import { CustomPageTitle } from '../../../../components/CustomPageTitle';
import Flex from '../../../../components/Flex';

const ViewProjectTaskStatus = () => {

    const { id } = useParams()

    const items = [
        { key:"1", label: 'Task Status', children: <ProjectStatusChange id={id} /> },
        { key:"2", label: 'All Tasks', children: <ViewAllTasks id={id} /> },
        { key:"3", label: 'Calender', children: <CalenderView /> },
    ];

    const handleTab = () => {

    }

    return (
        <div>
            <StyledTab>
                <Flex>
                    <CustomLableBack />
                    <CustomPageTitle Heading={'Task Details'} />
                </Flex>
                <CustomTabs tabs={items} onChange={handleTab} />
            </StyledTab>
        </div>
    )
}

export default ViewProjectTaskStatus