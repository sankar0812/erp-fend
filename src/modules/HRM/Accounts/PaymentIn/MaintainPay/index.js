import React from "react";
import MaintainInvoicePayForm from "./Partials/MaintainInvoicePayForm";

const MaintainPay = () => {

  return (
    <div>
      {/* <CustomTabs tabs={tabs} defaultActiveKey={"1"} onChange={onChangeTabs} />
       */}
       <Fragment>
        <CustomPageTitle Heading={'PaymentIn / Receipts'}/>
        <MaintainInvoicePayForm/>
    </Fragment>
    </div>
  );
};

export default MaintainPay;
