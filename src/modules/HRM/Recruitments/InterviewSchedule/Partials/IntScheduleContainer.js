import React, { useState } from 'react'
import { CustomModal } from '../../../../../components/CustomModal';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle';
import { SheduleForm } from './IntScheduleForm';
import { SheduleTable } from './IntScheduleTable';

export const SheduleContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);


  // ===== Modal Functions Start =====

  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {
      setIsModalOpen(false);
      FormCancelRest();
  };

  const handleCancel = () => {
      setIsModalOpen(false);
      FormCancelRest();
  };

  const FormExternalClose = ()=>{
      handleOk()

  }

  // ===== Modal Functions End =====

  // -------  Form Reset Funtion

  const FormCancelRest = () => {
      setFormReset(formReset + 1)
  }

  const AddNewShedule = () => {
      setModalTitle("Add Interview Shedule");
      setModalContent(<SheduleForm FormExternalClose={FormExternalClose} formname={'AddInterviewShedule'} handleOk={handleOk} formReset={formReset} />);
      showModal();
  };


  return (

      <CustomCardView style={{height: "auto"}}>

          <CustomPageFormTitle Heading={'View Interview Shedule'} />
          
          <SheduleTable AddNewShedule={AddNewShedule}/>

          <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
      </CustomCardView>


  )
}