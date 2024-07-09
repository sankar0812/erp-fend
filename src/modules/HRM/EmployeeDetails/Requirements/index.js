import React from 'react'
import { AddCandidateForm } from './Partials/AddCandidate'
import { CustomCardView } from '../../../../components/CustomCardView'

export const Requirement = () => {
  return (
    <div>Requirement
      <CustomCardView>
        <AddCandidateForm />
      </CustomCardView>
    </div>
  )
}
