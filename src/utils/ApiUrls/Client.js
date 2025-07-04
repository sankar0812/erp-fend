//Client Profile
const POSTPROFILE = 'clientProfile/save'
const GETCLIENTPROFILE = 'clientProfile'
const PUTCLIENTPROFILE = 'client/edit'
const DELETECLIENTPROFILE = 'clientProfile/delete'

//Client Quotation
const GETCLIENTQUOTATION = 'quotation/view'
const PUTCLIENTQUOTATION = 'quotation/approval/rejection/'
const GET_ALL_CLIENT_QUOTATION = "quotation/admin/view"

//Client Invoice
const GETCLIENTINVOICE = 'receipt/invoice/view'
const PUTCLIENTINVOICE = ''
const GET_CLIENT_INDIVIDUAL_INCOICE = 'invoice/client'


// Client Form 
const POSTCLIENTFORM = 'clientForm/save'
const GETCLIENTFORM = 'clientForm/view'
const PATCHAPROVAL = 'clientForm/details/edit'
const PUTCLIENTFORM = 'clientForm/edit'
const PUTCLIENTFORMREQUIREMENT = 'clientRequirement/edit/'


// Client Project name 
const GETCLIENTPROJECT = 'client/project'

// Client Reports
const POST_CLIENT_iNVOICE_REPORTS = 'invoice/cilent';
const POST_CLIENT_RECEIPT_REPORTS = 'receipt/client';
const POST_CLIENT_MAINTAINPAY_REPORTS = 'maintenancePayment/client';

// Client Quotation
const GET_CLIENT_QUOTATION = "quotation/view"
const PUT_CLIENT_QUOTATION = "quotation/edit/"
const PUT_CLIENT_QUOTATION_STATUS_CHANGE = 'quotation/admin/status/edit/'
const PUT_CLIENT_OR_ADMIN_CHANGING_STATUS = "quotation/Client/status/edit/"

// Client Requirement 
const GET_CLIENT_ADDED_REQUIREMENTS = "Requirement/view/"

// Client Receipt 

const GET_CLIENT_RECEIPT = 'receipt/client'
const GET_INDIVIDUAL_CLIENT_RECEIPT = 'receipt/payment'
const GET_INDIVIDUAL_CLIENT_MAINTENANCE = 'maintenancePayment/client'

// Individual Client Report 

const POST_INDIVIDUAL_INVOICE_SEARCH = 'invoice/cilent'
const POST_INDIVIDUAL_RECEIPT_SEARCH = 'receipt/client'
const POST_INDIVIDUAL_MAINTAIN_SEARCH = 'maintenancePayment/client'

export const APIURLS = {

  //client details
  ERP_POSTPROFILE: POSTPROFILE,
  ERP_GETCLIENTPROFILE: GETCLIENTPROFILE,
  ERP_PUTCLIENTPROFILE: PUTCLIENTPROFILE,
  ERP_DELETECLIENTPROFILE: DELETECLIENTPROFILE,

  //client Quotation
  ERP_GETCLIENTQUOTATION: GETCLIENTQUOTATION,
  ERP_PUTCLIENTQUOTATION: PUTCLIENTQUOTATION,

  //client Invoice
  ERP_GETCLIENTINVOICE: GETCLIENTINVOICE,
  ERP_PUTCLIENTINVOICE: PUTCLIENTINVOICE,
  GET_CLIENT_INDIVIDUAL_INCOICE : GET_CLIENT_INDIVIDUAL_INCOICE,

  // Client Form

  POSTCLIENTFORM: POSTCLIENTFORM,
  PUTCLIENTFORM: PUTCLIENTFORM,
  GETCLIENTFORM: GETCLIENTFORM,
  PATCHAPROVAL: PATCHAPROVAL,

  // cLIENT PROJECTS

  GETCLIENTPROJECT: GETCLIENTPROJECT,

  // Client Reports
  POST_CLIENT_iNVOICE_REPORTS: POST_CLIENT_iNVOICE_REPORTS,
  POST_CLIENT_RECEIPT_REPORTS: POST_CLIENT_RECEIPT_REPORTS,
  POST_CLIENT_MAINTAINPAY_REPORTS: POST_CLIENT_MAINTAINPAY_REPORTS,

  // Client Quotation
  GET_CLIENT_QUOTATION: GET_CLIENT_QUOTATION,
  PUT_CLIENT_QUOTATION: PUT_CLIENT_QUOTATION,
  PUT_CLIENT_QUOTATION_STATUS_CHANGE: PUT_CLIENT_QUOTATION_STATUS_CHANGE,
  PUT_CLIENT_OR_ADMIN_CHANGING_STATUS: PUT_CLIENT_OR_ADMIN_CHANGING_STATUS,
  GET_ALL_CLIENT_QUOTATION: GET_ALL_CLIENT_QUOTATION,

  // Client Requirement 
  GET_CLIENT_ADDED_REQUIREMENTS: GET_CLIENT_ADDED_REQUIREMENTS,
  PUTCLIENTFORMREQUIREMENT : PUTCLIENTFORMREQUIREMENT , 

  GET_CLIENT_RECEIPT : GET_CLIENT_RECEIPT,

  GET_INDIVIDUAL_CLIENT_RECEIPT : GET_INDIVIDUAL_CLIENT_RECEIPT,
  GET_INDIVIDUAL_CLIENT_MAINTENANCE : GET_INDIVIDUAL_CLIENT_MAINTENANCE,

  POST_INDIVIDUAL_INVOICE_SEARCH : POST_INDIVIDUAL_INVOICE_SEARCH,
  POST_INDIVIDUAL_RECEIPT_SEARCH : POST_INDIVIDUAL_RECEIPT_SEARCH,
  POST_INDIVIDUAL_MAINTAIN_SEARCH : POST_INDIVIDUAL_MAINTAIN_SEARCH,
}