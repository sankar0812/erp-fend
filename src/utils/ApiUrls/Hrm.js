//Admin Account

const GETADMINACCOUNT = "admin/view/";
const PUTADMINACCOUNT = "admin/edit/";

// Organization(Company)
const POSTANNOUNCE = "announcement/save";
const GETANNOUNCE = "announcement";
const PUTANNOUNCE = "announcement/edit";
const DELETEANNOUNCE = "announcement/announcementdelete";

//Client Profile
const POSTPROFILE = "clientProfile/save";
const GETCLIENTPROFILE = "client/true/false";
const PUTCLIENTPROFILE = "client/edit/";
const DELETECLIENTPROFILE = "clientProfile/delete";
const GETVIEWCLIENT = "clientProfile/view/";
const CLIENTSTATUS = "client/status/";

//Client requirements
const POSTREQUIREMENTS = "clientRequirement/save";
const GETREQUIREMENTS = "clientRequirement/view";
const PUTREQUIREMNTS = "clientRequirement/edit";
const PUTAPROVAL = "clientRequirement/details/edit";

// Client Requirements Project Type
const POSTPROJECTTYPE = "projectType/save";
const GETPROJECTTYPE = "projectType/view";
const PUTPROJECTTYPE = "updateProjectType";
const DELETEPROJECTTYPE = "projectType/delete";

// Accounts quotation
const POSTQUOTATION = "quotation/save";
const PUTQUOTATION = "quotation/edit";
const GETQUOTATION = "quotation/view";

const POSTRECEIPTS = "receipt/save";
const GETRCEIPTS = "receipt/details";

//Accounts Invoice
const POSTINVOICE = "invoice/save";
const GETINVOICEVIEW = "invoice";
const POSTIVOICEVIEW = "invoice/date";
const PUTINVOICE = "invoice/edit";
const DELETEINVOICE = "invoice/delete";

// Accounts Maintain

const POSTMAINTAIN = "maintenance/save";
const GETMAINTAIN = "maintenance/view";
const PUTMAINTAIN = "maintenance/edit";
const PUTSTATUSMAINTAIN = "maintenance/status";
const FILTER_MAINTENANCE = "maintenance/date"

// Accounts Server Maintain
const POSTSERVERMAINTAIN = "serverMaintenance/save";
const PUTSERVERMAINTAIN = "serverMaintenance/edit";
const GETSERVERMAINTAIN = "serverMaintenance/view";

  //balancesheet
 const GETBALANCESHEET = "balance/sheet";

//  Maintain Terms
const POSTTERMS = "terms/save";
const PUTTERMS = "terms/edit";
const GETTERMS = "terms";

// Account Reports
const GETREPORTS = "receipt/invoice/view";

// Account Expense
const PUTEXPENSETYPE = "expensetype/edit/";
const POSTEXPENSETYPE = "expensetype/save";
const GETEXPENSETYPE = "expensetype";
const POSTEXPENSE = "expense/save";
const GETEXPENSE = "expensedetails/view";
const PUTEXPENSE = "expense/editdeexpense/";

//Account brand
const POSTASSETBRAND = "brand/save";
const GETASSETBRAND = "brand";
const PUTASSETBRAND = "brand/edit/";

//Account assets
const POSTASSETS = "companyassets/save";
const GETASSETS = "company/assest/view";
const PUTASSETS = "companyassets/edit/";

//Account accessories
const POSTASSETACCESSORIES = "accessories/save";
const GETASSETACCESSORIES = "accessories";
const PUTASSETACCESSORIES = "accessories/edit/";

//Account ServersType
const POSTSERVERTYPE = "serverType/save";
const PUTSERVERTYPE = "serverType/edit/";
const GETSERVERTYPE = "serverType";

//Account Server
const POSTSERVER = "server/save";
const GETSERVER = "server";
const PUTSERVER = "server/edit/";

//Account AssignAssets
const POSTASSIGNASSETS = "assets/save";
const GETASSIGNASSETS = "brand/accessories";
const GETASSIGNASSETSVIEW = "assets/view";
const PUTASSIGNASSETS = "assets/edit/";

// Accounts PayementIn Invoice
const GETSEARCHPAY = "receipt/invoice";   
const POSTINVOICEPAY = "receipt/save";
const GETSELECTSEARCH = 'client/payment'

// Accounts PayementIn Maintainenance
const GETMAINTAINPAY = "maintenancePayment";
const GETMAINTAINCLIENTPAY = "maintenancePayment/client"; // CLIENT BASED MAINTENANCE INVOICES
const PUTMAINTAINPAY = "maintenancePayment/edit";

// Awards
const POSTAWARDS = "awards/save";
const PUTAWARDS = "edit";
const GETAWARDS = "photo";
const POSTSEARCH = "awards/date";

//bank detail api
const PUTBANKDETAILS = "bank/edit/";
const BANKDETAILS = "bank";

//personal details api
const PUTPERSONALDETAILS = "personal/edit/";
const PERSONALDETAILS = "personal";

//Emergency Contact
const PUTEMERGENCYDETAIL = "emergencycontacts/edit/";
const EMERGENCYDETAIL = "emergencycontacts";

//Family Details
const PUTFAMILYDETAIL = "family/edit/";
const FAMILYDETAIL = "family";

//Departments
const POSTDEPARTMENT = "department/save";
const PUTDEPARTMENT = "department/edit/";
const GETDEPARTMENT = "department";

const GETLEAVE = "employeeleave/view";
const GETATTENDANCEPUNCH = "attendance";

//Designation
const POSTDESIGNATION = "designation/save";
const PUTDESIGNATION = "designation/edit/";
const GETDESIGNATION = "designation";

//Initial Employee Details
const POSTINITIALEMPLOYEE = "employees/save";
const PUTINITIALEMPLOYEE = "employees/edit/";
const GETINITIALEMPLOYEE = "employees/view";
const GETINITIALEMPLOYEETRUE = "employees/true";
const POSTLEAVE = "employeeleave/save";
const PUTLEAVE = "employeeleave/edit";

const DELETEEMPLEAVE = "employeeleave/delete";
const EMPLOYEESTATUS = "employees/status/";
const GETEMPLOYEELEAVE = "employeeleave/";
const GETEMPLOYEEASSETS = "assets/view/employee/";
const GETEMPLOYEEPROJECTS = "project/employees/";
const GETPROJECTSEMPLOYEE = "project/member/";

//Holiday
const POSTHOLIDAY = "leavetype/save";
const PUTHOLIDAY = "leavetype/edit/";
const GETHOLIDAY = "leavetype";
const POSTHOLIDAYSEARCH = "holidays/report";

//Promotions
const POSTPROMOTIONS = "promotions/save";
const PUTPROMOTIONS = "promotions/edit/";
const GETPROMOTIONS = "promotions/view";

//Employee Qualification
const PUTQUALIFICATIONDETAIL = "qualification/update/";
const QUALIFICATIONDETAIL = "qualification";

//Employee Complaints
const POSTCOMPLAINTS = "complaints/save";
const GETCOMPLAINTS = "complaints/view";
const PUTCOMPLAINTS = "complaints/edit/";

// DepartmentRole
const GETDEPARTMENTROLE = "department/role";
const GETDEPARTMENTEMP = "department/emp/salary";

//training payroll
const GETPAYROLLDEPARTMENT = "department/trainee/salary/view";

//Resignations / Exit Type
const POSTRESINATIONS = "resignations/save";
const PUTRESIGNATIONS = "resignations/edit";
const RESIGNATIONS = "resignations";
const RESIGNATIONVIEW = "resignations/view";
const RESIGNATIONEDIT = "resignations/edit/";

//Shifts
const POSTSHIFT = "shift/save";
const GETSHIFT = "shift";
const PUTSHIFT = "shift/edit/";

//Dashboard
const GETEMPLOYEECOUNTS = "employees/year/count";
const GETDASHDEPARTMENTS = "employees/department";
const GETDASHBOARDDETAILS = "dashboard";
const GETGENDERS = "employees/other";
const GETATTENDANCEPER = "attendance1/percentage";
const GETABSENTTABLES = "attendance1/absent/count";

//  Attendance
const GETATTENDANCE = "employees/shift";
const EDITGETATTENDANCE = "employees/attendance";
const PUTATTENDANCE = "attendance/edit";
const PostAttendance = "attendance/save";
const POSTDATEATTENDANCE = "attendance/month";
const GETTOTALHRSATT = "attendance/today";
const GETATTCOUNT = "attendance/month/count";
const GETDAILYATT = "attendance/employees";
const GETDAILYENTRY = "attendance/view/today";
const GETTRAINEEDAILYENTRY = "attendance/view/trainee";

// Business Profile
const POSTBUSINESSPROFILE = "company/save";
const GETBUSINESSPROFILE = "company";
const PUTBUSINESSPROFILE = "company/edit/";

//Notification
const GETNOTIFICATIONS = "notifications";

//Training Details
const GETTRAININGS = "training/view";
const POSTTRAININGS = "training/save";
const PUTTRAINING = "training/edit/";
const STATUSTRAINING = "training/status/";
const PUTTRAINEESTATUS = "training/details/edit/";
const GETTRAINEEDETAIL = "training/view/details/";

// Report(Payroll)
const GETPAYROLLREPORTS = "department/emp/payroll";

// Requirements CANDIDATE
const GETCANDIDATEE = "candidate/candidate";
const POSTCANDIDATEE = "candidate/save";
const PUTCANDIDATEE = "candidate/";
const PATCHCANDIDATE = "interview/edit/";
const PATCHCANDIDATECANCEL = "candidate/cancelled/";
const GETCANDIDATEROLE = "application/vacancy/role";
const PUTCANDIDATESTATUS = "candidate/details/edit/";
const POSITIONGET = 'hiring/role'

//InterviewShedule
const GETINTERVIEWSCHEDULE = "schedulingDetails/candidate";
const POSTINTERVIEWSCHEDULE = "interviewSchedule/save";
const PUTINTERVIEWSCHEDULE = "interviewSchedule/edit/";
const PATCHINTERVIEWSCHEDULE = "interviewSchedule/edit/";

//Task Assigning
const GETTASKASSIGNING = "findTaskAssignedDetails";
const POSTTASKASSIGNING = "taskAssigned/save";
const PUTTASKASSIGNING = "taskAssigned/edit/";
const PATCHTASKASSIGN = "taskAssigned/";

//Group Discussion
const GETGROUPDISCUSSION = "groupDiscussionDetails";
const POSTGROUPDISCUSSION = "groupDiscussion/save";
const PUTGROUPDISCUSSION = "groupDiscussion/edit/";
const PATCHGROUPDISCUSSION = "groupDiscussion/edit/";

//HR Interview
const GETHRINTERVIEW = "hrInterviewDetails";
const POSTHRINTERVIEW = "hrInterview/save";
const PUTHRINTERVIEW = "hrInterview/";
const PATCHHRINTERVIEW = "hrInterview/";

//Offer
const GETOFFERS = "FindOfferDetails";
const POSTOFFERS = "offer/save";
const PUTOFFERS = "offerLetter/";
const PATCHOFFERS = "offerLetter/";

//Appointment
const GETAPPOINTMENT = "findAppointmentDetails";
const POSTAPPOINTMENT = "appointment/save";

//Hiring Details
const POSTJOBROLE = "application/save";
const GETJOBROLE = "application";
const POSTHIRING = "hiring/save";
const GETHIRING = "hiring/view";
const PUTHIRING = "hiring/edit/";
const PUTHIRINGACTIVE = "hiring/status/";

// manager dashboard
const GETMANAGERCOMPLAINTS = "complaints/dashboard";
const GETMANAGERDASHRESIGNATION = "resignations/dashboard";
const GETMANAGERDASHATTENDANCE = "attendance/dashboard/percentage";

const GETMANAGERDASHEXPENSE = "expense/dashboard";
const GETMANAGERDASHCARD = "manager/count/dashboard";
const GETMANAGERDASHHOLIDAYS = "holidays";
const GETMANAGERANNOUNCE = "announcement/dashboard";
const GETMANAGERDASHDEPARTMENT = "employees/department/training";
const GETTRAINEEATTENDANCE = "attendance/trainee/dashboard/percentage";
const GETDASHHIRING = "hiring/dashboard";

//accountant dashboard
const GETINVOICEDASH = "invoice/dashboard";
const GETRECEIPTDASH = "receipt/dashboard/view";
const GETMAINTAININVOICEDASH = "maintenance/dashboard";
const GETCLIENTCOUNTDASH = "client/year/count";

const GETEXPENSEINCOME = "expense/dashboard/currentmonth";
const GETEXPENSETYPES = "expense/dashboard/type";
const GETINVOICE = "invoice/dashboard/previous";
const GETDASHASSETS = "assets/balance";

//employee complints
const GETEMPCOMPLAINTS = "complaints/employee/";
const GETEMPATTENDANCE = "attendance/month/";

//employee Leave
const GETMANAGERDASHLEAVE = "employeeleave/dashboad";
const GETPLDASHLEAVE = "employeeleave/PL";
const GETPROJECTCOUNT = "research/project/dashboard/previous";
const GETPROJECTSTATUS = 'research/projectmanager/dashboard';
const GETPROJECTTASK = 'research/project/dashboard/priority/count';
const GETNEWPROJECT = 'newproject/dashboard/year';
const GETPROJECTEND = 'project/dashboard/enddate';
const GETPROJECTHEADCARD = 'projectmanager/count/dashboard';
const GETTLDASHLEAVE = "";
const GETCARDDATA = "admin/count/dashboard";
const GETEMPLOYEEDASHLEAVE = "employee/trainee/dashboard/";
const GETWORKINGPROJECT = "project/team/member/";
const GETDASHMYTEAM = "project/my/task/";
const GETALLPROJECTHEADCARD = 'projectmanager/count/dashboard';

//employee dashboard
const GETEMPLOYEEDASHCARD = "employee/card/dashboard/";

//client dashboard
const GETCLIENTDASHCARD = "client/count/";
const GETCLIENTPROJECTSTATUS = "client/project/status/";
const GETCLIENTCURRENTPAYMENT = "client/current/payment/";
const GETCLIENTWORKEMP = "client/working/member/";
const GETQUATATIONAPPROVAL = 'client/quotation/'

//PL dash data
const GETPLATTENDANCE = "attendance/dashboard/";
const GETPLWORKINGMEMBERS = "project/head/working/member/"
const GETPLHIGHPRIORITY = "project/head/working/task/priority/"
const GETPLPROJECTLIST = "project/head/year/"
const GETPLPROJECTLEAVES = "project/head/working/leavelist/"
const GETPLCARD = "project/head/count/"

//dashboard 
const GETPROJECTLIST = 'task/working/'

// User
const POSTUSER = "user/save";
const GETUSER = "User";
const PUTUSER = "user/edit/";
const STATUSUSER = "user/ststus/";
const GETINDIVIDUALUSER = "user";

const GETUSERURL = "user/";
const USERSTATUS = "user/status/";
const GETINACTIVEUSER = "user/false";

// employee exit
const GETEMPLOYEEEXIT = "employeeexit/assets";
const POSTEMPLOYEEEXIT = "employeeexit/save";
const GETALLEMPLOYEEEXIT = "employeeexit/view";

// Basic Salary
const POSTBASICSALARY = "salary/save";
const GETBASICSALARY = "salary/type/view";
const PUTBASICSALARY = "department/employee/salary/";
const GETWITHOUTBASICSALARYEMP = "department/role/filter";

//basic salary trainee
const GETWITHOUTBASICSALARYTRAINEE = "department/role/filter/trainee";
const GETTRAINEEBASICSALARY = "salary/type/trainee";
const PUTTRAINEEBASICSALARY = "department/trainee/salary/";

// Payroll
const POSTPAYROLL = "payroll/save";
const GETPAYROLL = "monthly/payroll/view";
const PUTPAYROLL = "payroll/type/edit/";

// Trainee Payroll
const POSTTRAINEEPAYROLL = "payroll/save";
const GETTRAINEEPAYROLL = "monthly/payroll/trainee";
const PUTTRAINEEPAYROLL = "payroll/type/edit/";

//experience get url
const GETEXPERIENCE = "employee/experience/";
const GETEXITEXPERIENCE = "employee/exit/";

//manager
const CLIENTREQUESTADD = "clientRequirement/save";
const CLIENTREQUESTGET = "clientRequirement/view";

// Manger reports/ admin reports

const POSTREPORTDATESEARCH = "employeeleave/manager"; //  employee leave reports
const POSTREPORTDATECOMSEARCH = "complaints/manager"; // employee Complaints reports
const POSTREPORTDATEASSETSEARCH = "employeeassets/manager"; // EMPLOYEE ASSETS REPORTS
const GETREPORTASSET = "employeeassets/report"; // EMPLOYEE ASSETS VIEW REPORTS
const POSTREPORTDATEEXITSEARCH = "employeeexit/manager"; // Employee ExitType Reports
const POSTREPORTDATEPROMOTIONSEARCH = "promotions/manager"; // Employee Promotion Reports
const POSTREPORTDATERESIGNATION = "resignations/manager"; // EMPLOYEE Resignation Reports
const POSTREPORT_APPOINTEMENT = "appointment/manager"; // Employee Apponitement Reports
const POSTREPORTDATE_ATTENDANCE = "attendance/manager"; // Employee Attendance Reports

const POSTREPORTTRAINEELEAVE = "employeeleave/trainee/manager"; // trainee leave reports
const POSTREPORTTRAINEECOMPLAINTS = "complaints/trainee/manager"; // trainee complaints reports
const POSTREPORTTRAINEEATTENDANCE = "attendance/manager/trainee"; // trainee attendance reports
const GETTRAINEEDEPARTMENTROLE = "department/trainee"; // trainee department
const POSTREPORTTRAINEESTATUS = "trainee/manager"; // trainee status
const GET_TRAINING_BY_DEPT = "department/role/trainee"

//company announcement
const POSTANNOUNCEMENTREPORT = "announcement/report";

// Employee Reports

const POSTEMPLOYEELEAVEREPORTS = "employeeleave/datesmonth";
const POSTTRAINEELEAVEREPORTS = "employeeleave/trainee";
const POSTEMPLOYEECOMPLAINTSRPORTS = "complaints/datesmonth";
const POSTTRAINEECOMPLAINTSRPORTS = "complaints/trainee";
const POSTEMPATTENDANCEREPOERTS = "attendance/employee/monthname";
const POSTTRAINEEATTENDANCEREPOERTS = "attendance/trainee/monthname";

const CLIENTREQUESTUPDATE = "clientRequirement/edit/";
const RESEARCHGET = "research/view";

//PL Project
const RESEARCHEDIT = "research/edit/";

//Employee Project
const TASKASSIGNGET = "demo";

const GET_TASKDETAILS = 'task/view/'
const GET_TASK_BY_ROLE = 'task/employee/report/'
const GET_TASK_BY_EMP = 'task/employee/role/'
const GET_TASK_BY_EMP_BY_ID = 'task/employee/role/task/'


// ADMIN/ACCOUNTANT REPORTS
const POST_INVOICE_REPORTS = "invoice/manager";
const POST_MAINTAININVOICES_REPORTS = "maintenance/manager";
const POST_SERVER_MAINTAIN_REPORTS = "serverMaintenance/manager";
const POST_RECEIPTS_REPORTS = "receipt/manager";
const POST_EXPENSE_REPORT = "expense/manager";
const POST_COMPANYASSET_REPORTS = "companyassets/manager";
const POST_SERVER_REPORTS = "server/manager";
const GET_COMPANYASSET_REPORT = "companyassets/report";
const GET_SERVER_REPORT = "server/report";

// Project Status Updation

const PUT_PROJECT_STATUS_UPDATION = "taskList/status/edit/";
const PUT_TASK_DETAILS = "taskList/edit/";
const PUT_PROJECT_DETAILS = "task/edit/";
const PUT_OVERALL_PROJECTSTATUS_CHANGE = "task/status/edit/";

//InActive employee

const GETINACTIVEEMPLOYEE = "employees/inactive/view";


// Project Head 
const GET_PROJECT_HEAD = 'projecthead/view'

// Deadline Task Details
const GET_DEADLINE_TASK_DETAILS ="task/enddate/"

//AI Chat
const POSTAI = "generate-text1"

export const APIURLS = {
  //admin account

  GETADMINACCOUNT: GETADMINACCOUNT,
  PUTADMINACCOUNT: PUTADMINACCOUNT,

  // organization(company)
  POSTANNOUNCE: POSTANNOUNCE,
  GETANNOUNCE: GETANNOUNCE,
  PUTANNOUNCE: PUTANNOUNCE,
  DELETEANNOUNCE: DELETEANNOUNCE,

  //client details
  POSTPROFILE: POSTPROFILE,
  GETCLIENTPROFILE: GETCLIENTPROFILE,
  PUTCLIENTPROFILE: PUTCLIENTPROFILE,
  DELETECLIENTPROFILE: DELETECLIENTPROFILE,
  GETVIEWCLIENT: GETVIEWCLIENT,
  CLIENTSTATUS: CLIENTSTATUS,

  //CLIENT requirements
  POSTREQUIREMENTS: POSTREQUIREMENTS,
  GETREQUIREMENTS: GETREQUIREMENTS,
  PUTREQUIREMNTS: PUTREQUIREMNTS,
  PUTAPROVAL: PUTAPROVAL,

  // Accounts quotation
  POSTQUOTATION: POSTQUOTATION,
  PUTQUOTATION: PUTQUOTATION,
  GETQUOTATION: GETQUOTATION,

  // Accounts Invoice

  POSTINVOICE: POSTINVOICE,
  GETINVOICEVIEW: GETINVOICEVIEW,
  PUTINVOICE: PUTINVOICE,
  POSTIVOICEVIEW,
  POSTIVOICEVIEW, // report date filter
  DELETEINVOICE: DELETEINVOICE,

  // Accounts Invoice Maintainance
  POSTMAINTAIN: POSTMAINTAIN,
  PUTMAINTAIN: PUTMAINTAIN,
  PUTSTATUSMAINTAIN: PUTSTATUSMAINTAIN,
  GETMAINTAIN: GETMAINTAIN,

  // Accounts Server Maintainance
  POSTSERVERMAINTAIN: POSTSERVERMAINTAIN,
  PUTSERVERMAINTAIN: PUTSERVERMAINTAIN,
  GETSERVERMAINTAIN: GETSERVERMAINTAIN,

  //balancesheet
  GETBALANCESHEET: GETBALANCESHEET,

  // Maintain terms
  POSTTERMS: POSTTERMS,
  PUTTERMS: PUTTERMS,
  GETTERMS: GETTERMS,

  // Accounts PayementIn Invoice
  GETSEARCHPAY: GETSEARCHPAY,
  POSTINVOICEPAY: POSTINVOICEPAY,
  GETSELECTSEARCH:GETSELECTSEARCH,

  //Accounts PayementIn Maintenance
  GETMAINTAINPAY: GETMAINTAINPAY,
  PUTMAINTAINPAY: PUTMAINTAINPAY,
  GETMAINTAINCLIENTPAY: GETMAINTAINCLIENTPAY,

  // Accounts reports
  GETREPORTS: GETREPORTS,

  // Accounts Expense
  PUTEXPENSETYPE: PUTEXPENSETYPE,
  POSTEXPENSETYPE: POSTEXPENSETYPE,
  GETEXPENSETYPE: GETEXPENSETYPE,
  POSTEXPENSE: POSTEXPENSE,
  GETEXPENSE: GETEXPENSE,
  PUTEXPENSE: PUTEXPENSE,

  //accounts assetsbrand
  POSTASSETBRAND: POSTASSETBRAND,
  GETASSETBRAND: GETASSETBRAND,
  PUTASSETBRAND: PUTASSETBRAND,

  //accounts assets
  POSTASSETS: POSTASSETS,
  GETASSETS: GETASSETS,
  PUTASSETS: PUTASSETS,

  //accounts accessories
  POSTASSETACCESSORIES: POSTASSETACCESSORIES,
  GETASSETACCESSORIES: GETASSETACCESSORIES,
  PUTASSETACCESSORIES: PUTASSETACCESSORIES,

  //Account Servers
  PUTSERVERTYPE: PUTSERVERTYPE,
  POSTSERVERTYPE: POSTSERVERTYPE,
  GETSERVERTYPE: GETSERVERTYPE,

  //accounts server
  POSTSERVER: POSTSERVER,
  GETSERVER: GETSERVER,
  PUTSERVER: PUTSERVER,

  //accounts Assigning assets
  POSTASSIGNASSETS: POSTASSIGNASSETS,
  GETASSIGNASSETS: GETASSIGNASSETS,
  GETASSIGNASSETSVIEW: GETASSIGNASSETSVIEW,
  PUTASSIGNASSETS: PUTASSIGNASSETS,

  // awards

  POSTAWARDS: POSTAWARDS,
  PUTAWARDS: PUTAWARDS,
  GETAWARDS: GETAWARDS,
  POSTSEARCH: POSTSEARCH,

  // Project Type
  POSTPROJECTTYPE: POSTPROJECTTYPE,
  GETPROJECTTYPE: GETPROJECTTYPE,
  PUTPROJECTTYPE: PUTPROJECTTYPE,
  DELETEPROJECTTYPE: DELETEPROJECTTYPE,

  //Client Receipt

  POSTRECEIPTS: POSTRECEIPTS,
  GETRCEIPTS: GETRCEIPTS,

  //bank detail api
  PUTBANKDETAIL: PUTBANKDETAILS,
  GETBANKDETAIL: BANKDETAILS,

  //personal details api
  PUTPERSONALDETAIL: PUTPERSONALDETAILS,
  GETPERSONALDETAILS: PERSONALDETAILS,

  //Emergency Contact
  PUTEMERGENCYDETAILS: PUTEMERGENCYDETAIL,
  GETEMERGENCYDETAILS: EMERGENCYDETAIL,

  //Family Details
  PUTFAMILYDETAILS: PUTFAMILYDETAIL,
  GETFAMILYDETAILS: FAMILYDETAIL,

  //Department
  POSTDEPARTMENT: POSTDEPARTMENT,
  PUTDEPARTMENT: PUTDEPARTMENT,
  GETDEPARTMENT: GETDEPARTMENT,

  // Leave
  GETLEAVE: GETLEAVE,

  // Emp Attendance
  GETATTENDANCEPUNCH: GETATTENDANCEPUNCH,

  //Designation
  POSTDESIGNATION: POSTDESIGNATION,
  PUTDESIGNATION: PUTDESIGNATION,
  GETDESIGNATION: GETDESIGNATION,

  //Initial Employee Details
  POSTINITIALEMPLOYEE: POSTINITIALEMPLOYEE,
  PUTINITIALEMPLOYEE: PUTINITIALEMPLOYEE,
  GETINITIALEMPLOYEE: GETINITIALEMPLOYEE,
  GETINITIALEMPLOYEETRUE: GETINITIALEMPLOYEETRUE,
  POSTLEAVE: POSTLEAVE,
  PUTLEAVE: PUTLEAVE,
  DELETEEMPLEAVE: DELETEEMPLEAVE,
  EMPLOYEESTATUS: EMPLOYEESTATUS,
  GETEMPLOYEELEAVE: GETEMPLOYEELEAVE,
  GETEMPLOYEEASSETS: GETEMPLOYEEASSETS,
  GETEMPLOYEEPROJECTS:GETEMPLOYEEPROJECTS,
  GETPROJECTSEMPLOYEE:GETPROJECTSEMPLOYEE,

  //Holiday
  POSTHOLIDAY: POSTHOLIDAY,
  PUTHOLIDAY: PUTHOLIDAY,
  GETHOLIDAY: GETHOLIDAY,
  POSTHOLIDAYSEARCH: POSTHOLIDAYSEARCH,

  //Promotions
  POSTPROMOTIONS: POSTPROMOTIONS,
  PUTPROMOTIONS: PUTPROMOTIONS,
  GETPROMOTIONS: GETPROMOTIONS,

  //Employee Qualification
  PUTQUALIFICATION: PUTQUALIFICATIONDETAIL,
  GETQUALIFICATION: QUALIFICATIONDETAIL,

  //Employee Complaints
  POSTCOMPLAINT: POSTCOMPLAINTS,
  GETCOMPLAINT: GETCOMPLAINTS,
  PUTCOMPLAINT: PUTCOMPLAINTS,

  //Department Role
  GETDEPARTMENTROLE: GETDEPARTMENTROLE,
  GETDEPARTMENTEMP: GETDEPARTMENTEMP,

  //training payroll
  GETPAYROLLDEPARTMENT: GETPAYROLLDEPARTMENT,

  //RESIGNATIONS
  POSTRESINATIONS: POSTRESINATIONS,
  PUTRESIGNATIONS: PUTRESIGNATIONS,
  RESIGNATIONS: RESIGNATIONS,
  RESIGNATIONVIEW: RESIGNATIONVIEW,
  RESIGNATIONEDIT: RESIGNATIONEDIT,

  //Shift

  POSTSHIFT: POSTSHIFT,
  GETSHIFT: GETSHIFT,
  PUTSHIFT: PUTSHIFT,

  //inactiveemplyee

  GETINACTIVEEMPLOYEE: GETINACTIVEEMPLOYEE,

  //Dashboard
  GETEMPLOYEECOUNT: GETEMPLOYEECOUNTS,
  GETDASHDEPARTMENT: GETDASHDEPARTMENTS,
  GETDASHBOARDDETAIL: GETDASHBOARDDETAILS,
  GETGENDERDETAIL: GETGENDERS,
  GETATTENDANCEPERCENTAGE: GETATTENDANCEPER,
  GETABSENTTABLE: GETABSENTTABLES,

  POSTSHIFT: POSTSHIFT,
  GETSHIFT: GETSHIFT,
  PUTSHIFT: PUTSHIFT,

  //  Attendance
  GETATT: GETATTENDANCE, // -----> Get Attendance Search
  EDITGETATT: EDITGETATTENDANCE, // -----> Get Edit Attendance Search
  PUTATT: PUTATTENDANCE, // -----> Put Attendance
  PostAttendance: PostAttendance,
  POSTDATEATTENDANCE: POSTDATEATTENDANCE, //  Date Filter
  GETTOTALHRSATT: GETTOTALHRSATT,
  GETATTCOUNT: GETATTCOUNT,
  GETDAILYATT: GETDAILYATT, // Daily attendanace
  GETDAILYENTRY: GETDAILYENTRY,
  GETTRAINEEDAILYENTRY: GETTRAINEEDAILYENTRY,

  // Business Profile
  POSTBUSINESSPROFILE: POSTBUSINESSPROFILE,
  GETBUSINESSPROFILE: GETBUSINESSPROFILE,
  PUTBUSINESSPROFILE: PUTBUSINESSPROFILE,

  //NOTIFICATION

  GETNOTIFICATION: GETNOTIFICATIONS,

  //Training
  POSTTRAINING: POSTTRAININGS,
  GETTRAINING: GETTRAININGS,
  PUTTRAINING: PUTTRAINING,
  STATUSTRAINING: STATUSTRAINING,
  PUTTRAINEESTATUS: PUTTRAINEESTATUS,
  GETTRAINEEDETAIL: GETTRAINEEDETAIL,
  GET_TRAINING_BY_DEPT : GET_TRAINING_BY_DEPT,

  GETNOTIFICATION: GETNOTIFICATIONS,

  // Reports ( Payroll )
  GETPAYROLLREPORTS: GETPAYROLLREPORTS,
  GETTRAINEEDEPARTMENTROLE: GETTRAINEEDEPARTMENTROLE,
  GETREPORTASSET:GETREPORTASSET,

  // Requirements
  GETCANDIDATE: GETCANDIDATEE,
  POSTCANDIDATE: POSTCANDIDATEE,
  PUTCANDIDATE: PUTCANDIDATEE,
  PATCHCANDIDATECANCEL:PATCHCANDIDATECANCEL,
  PATCHCANDIDATE: PATCHCANDIDATE,
  GETCANDIDATEROLE: GETCANDIDATEROLE,
  PUTCANDIDATESTATUS: PUTCANDIDATESTATUS,
  POSITIONGET : POSITIONGET,

  // Intreview schedule
  GETINTERVIEWSCHEDULE: GETINTERVIEWSCHEDULE,
  POSTINTERVIEWSCHEDULE: POSTINTERVIEWSCHEDULE,
  PUTINTERVIEWSCHEDULE: PUTINTERVIEWSCHEDULE,
  PATCHINTERVIEWSCHEDULE: PATCHINTERVIEWSCHEDULE,

  // Task Assigning
  GETTASKASSIGNING: GETTASKASSIGNING,
  PUTTASKASSIGNING: PUTTASKASSIGNING,
  POSTTASKASSIGNING: POSTTASKASSIGNING,
  PATCHTASKASSIGN: PATCHTASKASSIGN,

  // Group Discussion
  GETGROUPDISCUSSION: GETGROUPDISCUSSION,
  PUTGROUPDISCUSSION: PUTGROUPDISCUSSION,
  POSTGROUPDISCUSSION: POSTGROUPDISCUSSION,
  PATCHGROUPDISCUSSION: PATCHGROUPDISCUSSION,

  // HR Interview
  GETHRINTERVIEW: GETHRINTERVIEW,
  POSTHRINTERVIEW: POSTHRINTERVIEW,
  PUTHRINTERVIEW: PUTHRINTERVIEW,
  PATCHHRINTERVIEW: PATCHHRINTERVIEW,

  // Offers
  GETOFFERS: GETOFFERS,
  POSTOFFERS: POSTOFFERS,
  PUTOFFERS: PUTOFFERS,
  PATCHOFFERS: PATCHOFFERS,

  // Apppointment
  GETAPPOINTMENT: GETAPPOINTMENT,
  POSTAPPOINTMENT: POSTAPPOINTMENT,

  // Hiring details
  POSTJOBROLE: POSTJOBROLE,
  GETJOBROLE: GETJOBROLE,
  POSTHIRING: POSTHIRING,
  GETHIRING: GETHIRING,
  PUTHIRING: PUTHIRING,
  PUTHIRINGACTIVE: PUTHIRINGACTIVE,

  //manager dashboard
  GETMANAGERCOMPLAINTS: GETMANAGERCOMPLAINTS,
  GETMANAGERDASHRESIGNATION: GETMANAGERDASHRESIGNATION,
  GETMANAGERDASHATTENDANCE: GETMANAGERDASHATTENDANCE,
  GETMANAGERDASHEXPENSE: GETMANAGERDASHEXPENSE,
  GETMANAGERDASHCARD: GETMANAGERDASHCARD,
  GETMANAGERDASHHOLIDAYS: GETMANAGERDASHHOLIDAYS,
  GETMANAGERANNOUNCE: GETMANAGERANNOUNCE,
  GETMANAGERDASHDEPARTMENT: GETMANAGERDASHDEPARTMENT,
  GETTRAINEEATTENDANCE: GETTRAINEEATTENDANCE,
  GETDASHHIRING: GETDASHHIRING,

  //accountant dashboard
  GETINVOICEDASH: GETINVOICEDASH, //>>>>>>>>>Invoice Dash list
  GETRECEIPTDASH: GETRECEIPTDASH, //>>>>>>>>> Receipts Dash List
  GETMAINTAININVOICEDASH: GETMAINTAININVOICEDASH, //>>>>>>>>> Receipts Dash List
  GETCLIENTCOUNTDASH: GETCLIENTCOUNTDASH,
  GETEXPENSEINCOME: GETEXPENSEINCOME,
  GETEXPENSETYPES: GETEXPENSETYPES,
  GETINVOICE: GETINVOICE,
  GETDASHASSETS: GETDASHASSETS,

  //PL dash data
  GETPLATTENDANCE: GETPLATTENDANCE,
  GETPLHIGHPRIORITY: GETPLHIGHPRIORITY,
  GETPLWORKINGMEMBERS:GETPLWORKINGMEMBERS,
  GETPLPROJECTLIST:GETPLPROJECTLIST,
  GETPLPROJECTLEAVES:GETPLPROJECTLEAVES,
  GETPLCARD:GETPLCARD,

  //dashboard
  GETPROJECTLIST:GETPROJECTLIST,

  //employeee complaints
  GETEMPCOMPLAINTS: GETEMPCOMPLAINTS,
  GETEMPATTENDANCE: GETEMPATTENDANCE,

  //employee leave
  GETMANAGERDASHLEAVE: GETMANAGERDASHLEAVE,
  GETPLDASHLEAVE: GETPLDASHLEAVE,
  GETPROJECTCOUNT:GETPROJECTCOUNT,
  GETPROJECTSTATUS:GETPROJECTSTATUS,
  GETPROJECTTASK:GETPROJECTTASK,
  GETNEWPROJECT:GETNEWPROJECT,
  GETPROJECTEND:GETPROJECTEND,
  GETPROJECTHEADCARD:GETPROJECTHEADCARD,
  GETTLDASHLEAVE: GETTLDASHLEAVE,
  GETEMPLOYEEDASHLEAVE: GETEMPLOYEEDASHLEAVE,
  GETCARDDATA: GETCARDDATA,
  GETWORKINGPROJECT: GETWORKINGPROJECT,
  GETDASHMYTEAM: GETDASHMYTEAM,

  //employee dashboard
  GETEMPLOYEEDASHCARD: GETEMPLOYEEDASHCARD,

    //client dashboard
    GETCLIENTDASHCARD: GETCLIENTDASHCARD,
    GETCLIENTPROJECTSTATUS: GETCLIENTPROJECTSTATUS,
    GETCLIENTCURRENTPAYMENT: GETCLIENTCURRENTPAYMENT,
    GETCLIENTWORKEMP: GETCLIENTWORKEMP,
    GETQUATATIONAPPROVAL: GETQUATATIONAPPROVAL,

  // User
  POSTUSER: POSTUSER,
  GETUSER: GETUSER,
  PUTUSER: PUTUSER,
  STATUSUSER: STATUSUSER,
  GETINDIVIDUALUSER: GETINDIVIDUALUSER,

  GETUSERURL: GETUSERURL,
  USERSTATUS: USERSTATUS,
  GETINACTIVEUSER: GETINACTIVEUSER,

  // employee exit
  GETEMPLOYEEEXIT: GETEMPLOYEEEXIT,
  POSTEMPLOYEEEXIT: POSTEMPLOYEEEXIT,
  GETALLEMPLOYEEEXIT: GETALLEMPLOYEEEXIT,

  // Basic Salary
  POSTBASICSALARY: POSTBASICSALARY,
  GETBASICSALARY: GETBASICSALARY,
  PUTBASICSALARY: PUTBASICSALARY,
  GETWITHOUTBASICSALARYEMP: GETWITHOUTBASICSALARYEMP,

  //basicsalary trainee
  GETWITHOUTBASICSALARYTRAINEE: GETWITHOUTBASICSALARYTRAINEE,
  GETTRAINEEBASICSALARY: GETTRAINEEBASICSALARY,
  PUTTRAINEEBASICSALARY: PUTTRAINEEBASICSALARY,

  // Payroll
  GETPAYROLL: GETPAYROLL,
  PUTPAYROLL: PUTPAYROLL,
  POSTPAYROLL: POSTPAYROLL,

  // Trainee Payroll
  GETTRAINEEPAYROLL: GETTRAINEEPAYROLL,
  PUTTRAINEEPAYROLL: PUTTRAINEEPAYROLL,
  POSTTRAINEEPAYROLL: POSTTRAINEEPAYROLL,

  //experience get url
  GETEXPERIENCE: GETEXPERIENCE,
  GETEXITEXPERIENCE: GETEXITEXPERIENCE,

  //MANAGER
  CLIENTREQUESTADD: CLIENTREQUESTADD,
  CLIENTREQUESTGET: CLIENTREQUESTGET,
  CLIENTREQUESTUPDATE: CLIENTREQUESTUPDATE,
  RESEARCHGET: RESEARCHGET,

  // Manager reports/ admin
  POSTREPORTDATESEARCH: POSTREPORTDATESEARCH,
  POSTREPORTDATE_COMPLAINT_SEARCH: POSTREPORTDATECOMSEARCH,
  POSTREPORTDATE_ASSET_SEARCH: POSTREPORTDATEASSETSEARCH,
  POSTREPORTDATE_ExitType_SEARCH: POSTREPORTDATEEXITSEARCH,
  POSTREPORTDATE_PROMOTION_SEARCH: POSTREPORTDATEPROMOTIONSEARCH,
  POSTREPORTDATE_RESIGNATION: POSTREPORTDATERESIGNATION,
  POSTREPORTDATE_APPOINTEMENT: POSTREPORT_APPOINTEMENT,
  POSTREPORTDATE_ATTENDANCE: POSTREPORTDATE_ATTENDANCE,

  // trainee report
  POSTREPORTTRAINEELEAVE: POSTREPORTTRAINEELEAVE,
  POSTREPORTTRAINEECOMPLAINTS: POSTREPORTTRAINEECOMPLAINTS,
  POSTREPORTTRAINEEATTENDANCE: POSTREPORTTRAINEEATTENDANCE,
  POSTREPORTTRAINEESTATUS: POSTREPORTTRAINEESTATUS,

  // company report
  POSTANNOUNCEMENTREPORT: POSTANNOUNCEMENTREPORT,

  // employee reports

  POSTEMPLOYEE_LEAVE_REPORTS: POSTEMPLOYEELEAVEREPORTS,
  POSTTRAINEE_LEAVE_REPORTS: POSTTRAINEELEAVEREPORTS,
  POSTEMPLOYEE_COMPLAINTS_REPORTS: POSTEMPLOYEECOMPLAINTSRPORTS,
  POSTTRAINEE_COMPLAINTS_REPORTS: POSTTRAINEECOMPLAINTSRPORTS,
  POST_EMP_ATTENDANCE_REPOERTS: POSTEMPATTENDANCEREPOERTS,
  POST_TRAINEE_ATTENDANCE_REPOERTS: POSTTRAINEEATTENDANCEREPOERTS,

  //PL Project
  RESEARCHEDIT: RESEARCHEDIT,

  //Employee project
  TASKASSIGNGET: TASKASSIGNGET,

  // admin/accountant reports

  POST_INVOICE_REPORTS: POST_INVOICE_REPORTS,
  POST_MAINTAININVOICES_REPORTS: POST_MAINTAININVOICES_REPORTS,
  POST_SERVER_MAINTAIN_REPORTS: POST_SERVER_MAINTAIN_REPORTS,
  POST_RECEIPTS_REPORTS: POST_RECEIPTS_REPORTS,
  POST_EXPENSE_REPORT: POST_EXPENSE_REPORT,
  POST_COMPANYASSET_REPORTS: POST_COMPANYASSET_REPORTS,
  POST_SERVER_REPORTS: POST_SERVER_REPORTS,
  GET_COMPANYASSET_REPORT: GET_COMPANYASSET_REPORT,
  GET_SERVER_REPORT: GET_SERVER_REPORT,

  //PL Project
  RESEARCHEDIT: RESEARCHEDIT,

  // Project Status Updation

  PUT_PROJECT_STATUS_UPDATION,
  GET_TASKDETAILS,
  PUT_PROJECT_DETAILS,
  PUT_TASK_DETAILS,
  PUT_OVERALL_PROJECTSTATUS_CHANGE,

  GET_TASK_BY_ROLE,         // Filter Project by Assigned
  GET_TASK_BY_EMP,          // Filter by Employee Task     
  GET_TASK_BY_EMP_BY_ID ,   // Filter by Employee Task by ID

  // Project Head
  
  GET_PROJECT_HEAD,

  GETALLPROJECTHEADCARD : GETALLPROJECTHEADCARD,

  // Task Deadline

  GET_DEADLINE_TASK_DETAILS : GET_DEADLINE_TASK_DETAILS,

//ai chat
POSTAI:POSTAI,

FILTER_MAINTENANCE : FILTER_MAINTENANCE,
};
