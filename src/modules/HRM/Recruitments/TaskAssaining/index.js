import React, { Fragment } from 'react'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import { TaskAssignContainer } from './Partials/TaskAssigningContainer'

export const TaskAssigning = () => {
  return (
    <Fragment>
      <CustomPageTitle Heading={'TaskAssigning'}/>
      <TaskAssignContainer />
    </Fragment>
  )
}