import React from 'react'
import { CustomCardView } from '../../../../components/CustomCardView'
import { CustomPageTitle } from '../../../../components/CustomPageTitle'
import AddClientForm from './AddClientForm'

const AddClientFormMain = () => {
  return (
    <div>

      <CustomCardView width={'1000px'}>
      <CustomPageTitle Heading={'Add Requirements Form'} />
        <AddClientForm />
      </CustomCardView>

    </div>
  )
}

export default AddClientFormMain