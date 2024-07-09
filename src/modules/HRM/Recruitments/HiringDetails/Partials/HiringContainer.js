import React, { useState } from 'react'
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle';
import { HiringTable } from './HiringTable';
import { CustomModal } from '../../../../../components/CustomModal';
import { HiringForm } from './HiringForm';

export const HiringContainer = () => {
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

  const AddNewHiring = () => {
    setModalTitle("Add Hiring");
    setModalContent(<HiringForm FormExternalClose={FormExternalClose} formname={'AddHiring'} handleOk={handleOk} formReset={formReset} />);
    showModal();
};

return (
  <CustomCardView style={{height: "auto"}}>

  <CustomPageFormTitle Heading={'View Hiring Details'} />
  
  <HiringTable AddNewHiring={AddNewHiring}/>

  <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
</CustomCardView>
)
}
