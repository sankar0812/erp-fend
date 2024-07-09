import UserSignin from "../../modules/Auth/Components/UserSignin";
import RegisterMenu from '../../modules/LoginPage/Partials/RegisterMenu';
import PasswordForm from '../../modules/Auth/Components/PasswordForm';
import { ViewEmploye } from "../../modules/HRM/EmployeeDetails/ViewEmployee";
import ViewEmployeeProfile from "../../modules/HRM/EmployeeDetails/ViewEmployee/Partials/ViewEmployeeProfile";
import { EmployeeQualification } from "../../modules/HRM/EmployeeDetails/Qualifications";
import { ViewQualification } from "../../modules/HRM/EmployeeDetails/Qualifications/Partials/ViewQualification";
import { Requirement } from "../../modules/HRM/EmployeeDetails/Requirements";
// import { Requirement } from "../../modules/HRM/EmployeeDetails/Requirements/Partials";
import { AddUserMain } from "../../modules/AddUsers";
import AddUser from "../../modules/AddUsers/Partials/AddUser";
import { Department } from "../../modules/HRM/EmployeeDetails/ViewDepartments";
import Demo from "../../modules/HRM/Payroll/Demo";
import ViewLeave from "../../modules/HRM/Leave/Partials/ViewLeave";
import ViewHoliday from "../../modules/HRM/Holiday/Partials/HolidayView";
import { Promotions } from "../../modules/HRM/Promotions";
import { EmployeeComplaints } from "../../modules/HRM/Complaints";
import { ExtraTables } from "../../modules/HRM/EmployeeDetails/ExtraTables";
import { EmpExit } from "../../modules/HRM/ExitType/Exit/idex";
import ViewDesignations from "../../modules/HRM/EmployeeDetails/ViewDesignations/Partials/ViewDesignations";
import ViewDepartments from "../../modules/HRM/EmployeeDetails/ViewDepartments/Partials/ViewDepartments";
import { ViewShift } from "../../modules/HRM/EmployeeDetails/ExtraTables/Partials/ViewShift";
import Payroll from "../../modules/HRM/Payroll/Partials";
import { EditAttendance } from "../../modules/HRM/Attendance/EditAttendance";
import { Training } from "../../modules/HRM/Training";

import {AllReportsIndex } from "../../modules/HRM/Reports"; // -->
import { ViewBusinessProfile } from "../../modules/BusinessProfile/Partials/ViewBusinessProfile";
import { Payslip } from "../../modules/HRM/Reports/PayrollReports/Partials/Payslip/Payslip";
import { ViewAdminAccount } from "../../modules/AdminAccount/Partials/ViewAdminAccount";
import EmployeeLeave from "../../modules/HRM/EmployeeDetails/Leave/Partials";
// import { Example } from "../../modules/Example";
import { NetWorkError } from "../../modules/NetworkError";
import PageNotFound from "../../modules/PageNotFound";


// =============== Client Start ==========

import { ClientProfile, } from "../../modules/Client/ClientProfile"; // client profile
import { Attendance } from "../../modules/HRM/Attendance/PunchAttendance";
import AddAttendance from "../../modules/HRM/Attendance/PunchAttendance/AddAttendance";
import { BulkAttendance } from "../../modules/HRM/Attendance/BulkAttendance";
import { AddClientProfile } from "../../modules/Client/ClientProfile/Partials/AddClientProfile";
import ClientRequirement from "../../modules/Client/Requirements";

import { ErpClientQuotationMain } from "../../modules/ErpClient/ClientQuotation";
import { ErpClientInvoiceMain } from "../../modules/ErpClient/ClientInvoice";

import { AddClientRequirements } from "../../modules/Client/Requirements/Partials/AddClientRequirements";
import ClientReceipts from "../../modules/Client/Receipt/index";

import Quotation from "../../modules/HRM/Accounts/Quotation/ViewQuotation";
import { AddQuotation } from "../../modules/HRM/Accounts/Quotation/AddQuotaions/Partials/AddQuotation";

import { Recruitment } from "../../modules/HRM/Recruitments/Candidate";
import { TaskAssigning } from "../../modules/HRM/Recruitments/TaskAssaining";

import { InterviewGroupDiscussion } from "../../modules/HRM/Recruitments/GroupDiscussion";

import { HrInterview } from "../../modules/HRM/Recruitments/HRInterview";
import { Offers } from "../../modules/HRM/Recruitments/Offer";
import { Appointments } from "../../modules/HRM/Recruitments/Appointment";

import Invoice from "../../modules/HRM/Accounts/Invoice";
import { AddInvoice } from "../../modules/HRM/Accounts/Invoice/Partials/AddInvoice";

import { Hiring } from "../../modules/HRM/Recruitments/HiringDetails";
import { HiringForm } from "../../modules/HRM/Recruitments/HiringDetails/Partials/HiringForm";
import { ViewHiringDetails } from "../../modules/HRM/Recruitments/HiringDetails/Partials/ViewHiringDetails";

import Awards from "../../modules/HRM/EmployeeDetails/Awards";
import { AddAwards } from "../../modules/HRM/EmployeeDetails/Awards/Partials/AddAwards";
import ProjectType from "../../modules/Client/ProjectType";
import AddProjectType from "../../modules/Client/ProjectType/Partials/AddProjectType";
import ErpClientProfile from "../../modules/ErpClient/ClientProfile/Partials/ErpClientProfileDetails";
import AddAnnounce from "../../modules/Organization/Announcement/AddAnnounce";
import ViewAnnounce from "../../modules/Organization/Announcement/ViewAnnounce";
import ViewReceipts from "../../modules/Client/Receipt/ViewReceipts";
import ViewClientReceiptsCard from "../../modules/Client/Receipt/ViewReceipts/Partials/ViewClientReciptsCard";
import { Sample } from "../../modules/RandD/Sample";
import { Project } from "../../modules/RandD/Project";
import EmpAttendanceView from "../../modules/HRM/Attendance/AdminAttendance";
import DailyCalender from "../../modules/HRM/Attendance/AdminAttendance/Partials/DailyCalender";
import AddClientPRofileMain from "../../modules/Client/ClientProfile/Partials/AddClientPRofileMain";
import { Expense } from "../../modules/HRM/Accounts/Expense";
import { CompanyAssets } from "../../modules/HRM/Accounts/CompanyAssets";
import { AddAssets } from "../../modules/HRM/Accounts/CompanyAssets/Partials/AddAssets";

import ClientRequirementsMain from "../../modules/Client/Requirements/Partials/ClientRequirementsMain";
import { Server } from "../../modules/HRM/Accounts/Server";
import { AddServer } from "../../modules/HRM/Accounts/Server/Partials/AddServer";
import AddClientForm from "../../modules/ErpClient/ClientRequireForm/Partials/AddClientForm";
import ClientRequireForm from "../../modules/ErpClient/ClientRequireForm";
import AddClientFormMain from "../../modules/ErpClient/ClientRequireForm/Partials/AddClientFormMain";
import { AdminDashboard } from "../../modules/Dashboard/AdminDashboard";
import { ComplaintsView } from "../../modules/HRM/EmployeeDetails/Complaints";
import { PLDashBoard } from "../../modules/Dashboard/PLDashboard";
import { TLDashboard } from "../../modules/Dashboard/TLDashboard";
import { Component } from "react";
import { AssigningAssets } from "../../modules/HRM/EmployeeDetails/AssigingAssets";
import { NewResignation } from "../../modules/HRM/ExitType/Resignation/NewResignation";
import { ManagerDashBoard } from "../../modules/Dashboard/ManagerDashBoard";
import { ViewNewResignation } from "../../modules/HRM/ExitType/Resignation/NewResignation/Partials/ViewResignation";
import { ManagerResignationTable } from "../../modules/HRM/ExitType/Resignation/NewResignation/Partials/ManagerResignationTable";
import { MaindenanceInvoice } from "../../modules/HRM/Accounts/MaindenanceInvoice/Maintenances";
import { AddMaintainInvoice } from "../../modules/HRM/Accounts/MaindenanceInvoice/Maintenances/Partials/AddMaintainInvoice";

import AccountantDashboard from "../../modules/Dashboard/AccountantDashBoard";

import { AssigningAssetsForm } from "../../modules/HRM/EmployeeDetails/AssigingAssets/Partials/AssigningAssetsForm";

import EmployeeExit from "../../modules/HRM/ExitType/Exit/Partials/EmployeeExit";

import { ViewResignationDetails } from "../../modules/HRM/ExitType/Resignation/NewResignation/Partials/ViewResignationDetails";
import AwardsContainer from "../../modules/HRM/EmployeeDetails/Awards/Partials/AwardsContainer";
import EmployeesDashboard from "../../modules/Dashboard/EmployeesDashboard";

import QuotaionContainer from "../../modules/HRM/Accounts/Quotation/AddQuotaions";

import { ViewClientRequest } from "../../modules/Projects/ClientRequest/ClientRequest";
import { ViewClientRequirement } from "../../modules/Projects/ClientRequirement.js/ViewClientRequirement";
import { ViewResesearchDocs } from "../../modules/Projects/ResearchDocumentation/ViewResesearchDocs";

import { ViewClientProjectQuot } from "../../modules/Projects/ClientsQuotation/ViewClientProjectQuot";
import { ViewProjectDocs } from "../../modules/Projects/ProjectDocumentation/ViewProjectDocs";
import { ViewTestingDocs } from "../../modules/Projects/TestingDocumentation/ViewTestingDocs";

import { OfferLetter } from "../../modules/HRM/Certificate/OfferLetter";
import { ExperianceCertificate } from "../../modules/HRM/Certificate/ExperianceCertificate";
import PayementIn from "../../modules/HRM/Accounts/PaymentIn/indexMain";
import ViewBasicSalary from "../../modules/HRM/Payroll/ViewBasicSalary/Partials/ViewBasicSalary";
import ViewPayroll from "../../modules/HRM/Payroll/ViewPayroll/Partials/ViewPayroll";

import AddServerMaintenance from "../../modules/HRM/Accounts/ServerMaintenance/AddServerMaintain";
import ViewServerMaintenance from "../../modules/HRM/Accounts/ServerMaintenance";

import { ExitExperience } from "../../modules/HRM/Certificate/ExitExperience";
import AllEmployeeReports from "../../modules/HRM/EmployeeDetails/Reports";
import { ViewAssiginigTask } from "../../modules/Projects/ProjectAssigningTask/ViewAssiginigTask";
import ClientReports from "../../modules/ErpClient/Reports";
import { TraineeDashboardDetails } from "../../modules/Dashboard/TraineeDashBoard";
import CardViewProfile from "../../modules/Client/ClientProfile/Partials/CardViewProfile";
import { ViewTrainingDetails } from "../../modules/HRM/Training/Partials/ViewTraining";
import { DailyAttendance } from "../../modules/HRM/Attendance/DailyAttendance";
import ProjectStatusChange from "../../modules/Projects/ProjectStatusManagement/Partials/ProjectStatusChange";
import ViewProjectTaskStatus from "../../modules/Projects/ProjectStatusManagement/Partials/ViewProjectTask";
import { ProjectManagement } from "../../modules/Projects/ProjectStatusManagement/Partials/ProjectManagement";
import { ViewInActiveEmployee } from "../../modules/HRM/EmployeeDetails/ViewInActiveEmployee";
import { ViewUserDetails } from "../../modules/AddUsers/Partials/ViewUserDetails";
import { InActiveTable } from "../../modules/HRM/EmployeeDetails/ViewInActiveEmployee/Partials/InActiveTable";
import { AllBasicSalary } from "../../modules/HRM/Payroll/AllPayroll/AllBasicSalary";
import { ViewAllBasicSalary } from "../../modules/HRM/Payroll/AllPayroll/AllViewBasicSalary";
import { AllPayrollDetail } from "../../modules/HRM/Payroll/AllPayroll/AllPayrollDetail";
import { AllViewPayroll } from "../../modules/HRM/Payroll/AllPayroll/AllViewPayroll";
import { ClientDashboard } from "../../modules/Dashboard/ClientDashboard";
import ShowingResearchedDoc from "../../modules/Projects/ResearchDocumentation/ShowingResearchedDoc";

import { ViewAllAfterRandDList } from "../../modules/Projects/AfterResearchDevelopment/Partials/ViewAllAfterR&D";
import { DevCompletedList } from "../../modules/Projects/DevelopmentofResearch/Partials/DevCompletedList";
import { ApprovedbyManagementProjectList } from "../../modules/Projects/DevelopmentofResearch/Partials/ApprovedByManagementProjectList";
import { ShowingDevCompletedDoc } from "../../modules/Projects/DevelopmentofResearch/Partials/ShowingDevCompletedDoc";
import { ApprovedProjectList } from "../../modules/Projects/DevelopmentofResearch/Partials/ApprovedProjectList";
import { PMDashboard } from "../../modules/Dashboard/PMDashboard";
import { ViewAllProjectForTesting } from "../../modules/Projects/AfterResearchDevelopment/Partials/AllProjectsForTesting";
import { ViewAllApprovedProjectForTesting } from "../../modules/Projects/AfterResearchDevelopment/Partials/AssigningTestingDept";
import ShowingProjectDoc from "../../modules/Projects/AfterResearchDevelopment/Partials/ShowingProjectDoc";
import { ShowingTestedDocuments } from "../../modules/Projects/TestingDocumentation/ShowingTestedDocuments";
import { ViewAllProjectForHosting } from "../../modules/Projects/Hosting/Partials/ViewAllProjectsForHosting";
import ShowingHostedDoc from "../../modules/Projects/Hosting/Partials/ShowingHostedDoc";
import ShowingApprovedHostedDoc from "../../modules/Projects/Hosting/Partials/ShowingApprovedHostingDoc";
import { ViewClientReceipt } from "../../modules/ErpClient/ClientInvoice/Partials/ViewClientReceipt";
import { AIChat } from "../../modules/AIChat";
import { InterviewShedule } from "../../modules/HRM/EmployeeDetails/Requirements/Partials/InterviewSchedule";
import { InterviewSheduleContain } from "../../modules/HRM/Recruitments/InterviewSchedule";
import Reports from "../../modules/HRM/Reports/AllReports/Partials/AccountReports";
import { BalanceDetails } from "../../modules/HRM/Accounts/BalanceSheet";




// =============== Client End ==========

export const anonymous = [
    {
        routePath: '/signin',
        Component: UserSignin,
    },
    {
        routePath: '/register',
        Component: RegisterMenu,
    },
    {
        routePath: '/password',
        Component: PasswordForm,
    },
]

export const adminAuthenticated = [

    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/',
        Component: AdminDashboard,
    },
    {
        routePath: 'user',
        Component: AddUserMain,
    },
    {
        routePath: 'userDetail/:id',
        Component: ViewUserDetails,
    },
    //========== Organization====================
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'business_profile',
        Component: ViewBusinessProfile,
    },
    {
        routePath: 'AddAnnounce',
        Component: AddAnnounce,
    },
    {
        routePath: 'ViewAnnounce',
        Component: ViewAnnounce,
    },

    //===============================================
    {
        routePath: 'adduser',
        Component: AddUser,
    },
    {
        routePath: 'viewprofile',
        Component: ViewEmploye,
    },
    {
        routePath: 'viewemployee/:id',
        Component: ViewEmployeeProfile,
    },
    {
        routePath: 'viewqualification',
        Component: EmployeeQualification,
    },
    {
        routePath: 'viewemployeequalification',
        Component: ViewQualification,
    },
    {
        routePath: 'requirement',
        Component: Requirement,
    },
    {
        routePath: 'extra_table',
        Component: ExtraTables,
    },
    {
        routePath: 'all_departments',
        Component: Department,
    },
    {
        routePath: 'basicsalary',                    //==============Payroll============//
        Component: Demo,
    },
    {
        routePath: 'view_basicsalary',
        Component: ViewBasicSalary,
    },
    {
        routePath: 'payroll',
        Component: Payroll,
    },
    {
        routePath: 'view_payroll',
        Component: ViewPayroll,
    },
    {
        routePath: 'leave',
        Component: ViewLeave,
    },
    {
        routePath: 'AddAwards',
        Component: AwardsContainer
    },
    {
        routePath: 'complaints',
        Component: ComplaintsView,
    },
    {
        routePath: 'promotions',
        Component: Promotions,
    },
    {
        routePath: 'Awards',
        Component: Awards,
    },
    {
        routePath: 'assigningAssets',
        Component: AssigningAssets,
    },
    {
        routePath: 'AddAssigningAssets',
        Component: AssigningAssetsForm,
    },
    {
        routePath: 'view_designations',
        Component: ViewDesignations,
    },
    {
        routePath: 'view_departments',
        Component: ViewDepartments,
    },
    {
        routePath: 'view_shift',
        Component: ViewShift,
    },
    {
        routePath: 'Attendance',
        Component: DailyAttendance,
    },
    {
        routePath: 'bulkattendance',
        Component: BulkAttendance,
    },
    {
        routePath: 'AddAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'editattendance',
        Component: EditAttendance,
    },
    {
        routePath: 'AttendanceCountView',
        Component: EmpAttendanceView,
    },
    {
        routePath: 'DailyAttendance/:id',
        Component: DailyCalender,
    },
    {
        routePath: 'exit',
        Component: EmpExit,
    },
    {
        routePath: 'employeeExit',
        Component: EmployeeExit,
    },
    {
        routePath: 'training',
        Component: Training,
    },
    {
        routePath: 'all_reports',
        Component: AllReportsIndex,
    },
    {
        routePath: 'payslip/:id',
        Component: Payslip,
    },

    // ================Accounts =================
    {
        routePath: 'AddQuotation',
        Component: QuotaionContainer,
    },
    {
        routePath: 'quotation',
        Component: Quotation,
    },
    {
        routePath: 'invoice',
        Component: Invoice,
    },
    {
        routePath: 'AddInvoice',
        Component: AddInvoice,
    },
    {
        routePath: 'Payement_invoice_maintainInvoice',   // Payment-Invoicepay/maintain
        Component: PayementIn,
    },
    {
        routePath: 'report',   // reports
        Component: Reports,
    },
    { 
        routePath: 'expense',
        Component: Expense,
    },
    {
        routePath: 'viewAssets',
        Component: CompanyAssets,
    },
    {
        routePath: 'addAssets',
        Component: AddAssets,
    },
    {
        routePath: 'server',
        Component: Server,
    },
    {
        routePath: 'addServer',
        Component: AddServer,
    },
    {
        routePath: 'maintenanceInvoice',
        Component: MaindenanceInvoice,
    },
    {
        routePath: 'AddMaintainInvoice',
        Component: AddMaintainInvoice,
    },
    {
        routePath: 'AddServer_Maintenance',
        Component: AddServerMaintenance,
    },
    {
        routePath: 'ViewServer_Maintenance',
        Component: ViewServerMaintenance,
    },

    // =========== Client Start 

    {
        routePath: 'AddClientProfile',
        Component: AddClientPRofileMain, // client profile
    },

    {
        routePath: 'clientprofile',
        Component: ClientProfile, // client profilerequirements
    },
    {
        routePath: 'ProjectType',
        Component: ProjectType,
    },
    {
        routePath: 'AddProjectType',
        Component: AddProjectType,
    },
    {
        routePath: 'AddClientsRequiremets',
        Component: ClientRequirementsMain,
    },
    {
        routePath: 'ViewClientProjectQuot',
        Component: ViewClientProjectQuot
    },
    {

        routePath: 'Receipts',
        Component: ViewReceipts,      // view receipts
    },
    {

        routePath: 'ViewClientReceipts/:id',
        Component: ViewClientReceiptsCard,      //Client  view receipts
    },
    {

        routePath: 'AddReceipts',
        Component: ClientReceipts,      //Client add receipts
    },
    {
        routePath: 'requirements',
        Component: ClientRequirement,
    },


    // =========== Client End===

    //============== Resignations
    {
        routePath: 'View_resignations',
        Component: ManagerResignationTable,
    },
    //============== Holidays============
    {
        routePath: 'holiday',
        Component: ViewHoliday,
    },
    {
        routePath: 'clientView/:id',
        Component: CardViewProfile,
    },
    {
        routePath: 'inAciveEmployee',
        Component: ViewInActiveEmployee,
    },

    // ========== PROJECT ============== //
    
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'view_research_document',
        Component: ShowingResearchedDoc
    },
    {
        routePath: 'view_approved_projects',
        Component: ApprovedbyManagementProjectList
    },
    {
        routePath: 'assigntask_approved_projects',
        Component: ApprovedProjectList
    },
    {
        routePath: 'viewClientQuotation',
        Component: ErpClientQuotationMain, // client profile
    },
    {
        routePath: 'view_dev_document',
        Component: ShowingDevCompletedDoc
    },
    {
        routePath: 'view_project_document',
        Component: ShowingProjectDoc
    },
    {
        routePath: 'view_projects_for_testing',
        Component: ViewAllProjectForTesting
    },
    {
        routePath: 'ViewTestingDocs',
        Component: ViewTestingDocs
    },
    {
        routePath: 'view_tested_document',
        Component: ShowingTestedDocuments
    },
    {
        routePath: 'view_approved_projects_for_testing',
        Component: ViewAllApprovedProjectForTesting
    },
    {
        routePath: 'view_hosted_document',
        Component: ShowingApprovedHostedDoc
    },
    {
        routePath: 'Resignation',
        Component: ManagerResignationTable,
    },
    {
        routePath: 'exitExperience/:id',
        Component: ExitExperience
    },
    {
        routePath: 'experienceCertificate/:id',
        Component: ExperianceCertificate
    }, 
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
    {
        routePath: 'viewTraining/:id',
        Component: ViewTrainingDetails,
    },

       // employee E-Recruitments Start

       {
        routePath: 'hiring_details',
        Component: Hiring,
    },
    {
        routePath: 'view_hiring/:id',
        Component: ViewHiringDetails,
    },
    {
        routePath: 'add_hiring',
        Component: HiringForm,
    },
    {
        routePath: 'add_candidate',
        Component: Recruitment,
    },
    {
        routePath: 'interview_shedule',
        Component: InterviewSheduleContain,
    },
    {
        routePath: 'task_assigning',
        Component: TaskAssigning,
    },
    {
        routePath: 'group_Discussion',
        Component: InterviewGroupDiscussion
    },
    {
        routePath: 'hr_Interview',
        Component: HrInterview
    },
    {
        routePath: 'offer',
        Component: Offers
    },
    {
        routePath: 'appointment',
        Component: Appointments
    },
    // ======E-Recruitments End
]

export const employeeAuthenticated = [       //<<<<<<<<<<<<<<<<<<<<<  EMPLOYEEE     <<<<<<<<<<<<<<<<<<<<<<<<<//
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: '/',
        Component: EmployeesDashboard,
    },
    {
        routePath: 'complaint',
        Component: EmployeeComplaints,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'AddPunchingAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'AttendanceCountView/:id',
        Component: DailyCalender,
    },
    {
        // routePath: 'employee_leave/:id',
        routePath: 'employee_leave',
        Component: EmployeeLeave,
    },
    // {
    //     routePath: 'resignation',
    //     Component: EmpResignation,
    // },
    {
        routePath: 'resignation',
        Component: NewResignation,
    },
    {
        routePath: 'Awards',
        Component: Awards,
    },
    {
        routePath: 'Employee_all_reports',
        Component: AllEmployeeReports,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'change_project_status/',
        Component: ProjectStatusChange,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },

]


export const TLAuthenticated = [                   //<<<<<<<<<<<<<<<<<<<<<  TL <<<<<<<<<<<<<<<<<<<<<<//
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: '/',
        Component: TLDashboard,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'complaint',
        Component: EmployeeComplaints,
    },
    {
        routePath: 'AddPunchingAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'AttendanceCountView/:id',
        Component: DailyCalender,
    },
    {
        routePath: 'employee_leave',
        Component: EmployeeLeave,
    },
    {
        routePath: 'resignation',
        Component: NewResignation,
    },
    {
        routePath: 'Awards',
        Component: Awards,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
    {
        routePath: 'Employee_all_reports',
        Component: AllEmployeeReports,
    },
  

]

export const PLAuthenticated = [                           //<<<<<<<<<<<<<<<<<<<<<  PROJECTHEAD <<<<<<<<<<<<<<<<<//
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: '/',
        Component: PLDashBoard,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'complaint',
        Component: EmployeeComplaints,
    },
    {
        routePath: 'AddPunchingAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'AttendanceCountView/:id',
        Component: DailyCalender,
    },
    {
        routePath: 'employee_leave',
        Component: EmployeeLeave,
    },
    {
        routePath: 'resignation',
        Component: NewResignation,
    },
    {
        routePath: 'Awards',
        Component: Awards,
    },
    // {
    //     routePath: 'ViewResesearchDocs',
    //     Component: ViewResesearchDocs
    // },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'view_research_document',
        Component: ShowingResearchedDoc
    },
    {
        routePath: 'view_dev_document',
        Component: ShowingDevCompletedDoc
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
    {
        routePath: 'Employee_all_reports',
        Component: AllEmployeeReports,
    },

]

export const clientAuthenticated = [                 //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     Client Role   >>>>>>>>>>>>>>>>>>>>>>//
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: '/',
        Component: ClientDashboard,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'addrequirement',
        Component: AddClientFormMain,
    },
    {
        routePath: 'requireform',
        Component: ClientRequireForm,
    },
    {
        routePath: 'viewClientQuotation',
        Component: ErpClientQuotationMain, // client profile
    },
    {
        routePath: 'viewClientInvoice/:id',
        Component: ErpClientInvoiceMain, // client profile
    },
    {
        routePath: 'all_reports',
        Component: ClientReports,
    },
    {
        routePath: 'viewClientReceipt',
        Component: ViewClientReceipt,
    }
]

export const RandDAuthendicated = [                        // >>>>>>>>>>>>>Research / RandD >>>>>>>>>>>>>>>>>>>>>>>>
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/',
        Component: Sample,
    },
    {
        routePath: 'project',
        Component: Project,
    },
    {
        routePath: 'resignation',
        Component: NewResignation,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
]

export const ManagerAuthendicated = [                        // >>>>>>>>>>>>>Reseach / RandD >>>>>>>>>>>>>>>>>>>>>>>>
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/',
        Component: ManagerDashBoard,
    },
    {
        routePath: 'AddAnnounce',
        Component: AddAnnounce,
    },
    {
        routePath: 'ViewAnnounce',
        Component: ViewAnnounce,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'project',
        Component: Project,
    },
    {
        routePath: 'viewprofile',
        Component: ViewEmploye,
    },
    {
        routePath: 'inAciveEmployee',
        Component: InActiveTable,
    },
    {
        routePath: 'viewemployee/:id',
        Component: ViewEmployeeProfile,
    },
    {
        routePath: 'extra_table',
        Component: ExtraTables,
    },
    {
        routePath: 'leave',
        Component: ViewLeave,
    },
    //============== Holidays============
    {
        routePath: 'holiday',
        Component: ViewHoliday,
    },
    //===================================
    {
        routePath: 'Awards',
        Component: Awards,
    },
    {
        routePath: 'AddAwards',
        Component: AwardsContainer
    },
    {
        routePath: 'training',
        Component: Training,
    },
    {
        routePath: 'viewTraining/:id',
        Component: ViewTrainingDetails,
    },
    {
        routePath: 'exit',
        Component: EmpExit,
    },
    {
        routePath: 'employeeExit',
        Component: EmployeeExit,
    },
    {
        routePath: 'complaints',
        Component: ComplaintsView,
    },
    {
        routePath: 'Attendance',
        Component: DailyAttendance,
    },
    {
        routePath: 'promotions',
        Component: Promotions,
    },
    {
        routePath: 'assigningAssets',
        Component: AssigningAssets,
    },
    {
        routePath: 'AddAssigningAssets',
        Component: AssigningAssetsForm,
    },
    {
        routePath: 'Resignation',
        Component: ManagerResignationTable,
    },
    // employee Recruitments Start

    {
        routePath: 'hiring_details',
        Component: Hiring,
    },
    {
        routePath: 'view_hiring/:id',
        Component: ViewHiringDetails,
    },
    {
        routePath: 'add_hiring',
        Component: HiringForm,
    },
    {
        routePath: 'add_candidate',
        Component: Recruitment,
    },
    {
        routePath: 'interview_shedule',
        Component: InterviewSheduleContain,
    },
    {
        routePath: 'task_assigning',
        Component: TaskAssigning,
    },
    {
        routePath: 'group_Discussion',
        Component: InterviewGroupDiscussion
    },
    {
        routePath: 'hr_Interview',
        Component: HrInterview
    },
    {
        routePath: 'offer',
        Component: Offers
    },
    {
        routePath: 'appointment',
        Component: Appointments
    },
    // ======Recruitments End
    {
        routePath: 'clientRequest',
        Component: ViewClientRequest
    },
    {
        routePath: 'ViewClientRequirement',
        Component: ViewClientRequirement
    },
    {
        routePath: 'ViewClientProjectQuot',
        Component: ViewClientProjectQuot
    },
    {
        routePath: 'ViewProjectDocs',
        Component: ViewProjectDocs
    },
    {
        routePath: 'ViewTestingDocs',
        Component: ViewTestingDocs
    },
    {

        routePath: 'offerLetter',
        Component: OfferLetter
    },
    {
        routePath: 'experienceCertificate/:id',
        Component: ExperianceCertificate
    },
    {
        routePath: 'exitExperience/:id',
        Component: ExitExperience
    },
    {
        routePath: 'all_reports',
        Component: AllReportsIndex,
    },
    {
        routePath: 'basicsalary',                    //==============Payroll============//
        Component: AllBasicSalary,
    },
    {
        routePath: 'view_basicsalary',
        Component: ViewAllBasicSalary,
    },
    {
        routePath: 'payroll',
        Component: AllPayrollDetail,
    },
    {
        routePath: 'view_payroll',
        Component: AllViewPayroll,
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'viewClientQuotation',
        Component: ErpClientQuotationMain, // client profile
    },
    {
        routePath: 'assigntask_approved_projects',
        Component: ApprovedProjectList
    },
    {
        routePath: 'view_research_document',
        Component: ShowingResearchedDoc
    },
    {
        routePath: 'view_dev_document',
        Component: ShowingDevCompletedDoc
    },
    {
        routePath: 'view_projects_for_testing',
        Component: ViewAllProjectForTesting
    },
    {
        routePath: 'view_project_document',
        Component: ShowingProjectDoc
    },
    {
        routePath: 'view_tested_document',
        Component: ShowingTestedDocuments
    },
    {
        routePath: 'view_hosted_document',
        Component: ShowingApprovedHostedDoc
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
]


export const AccountantAuthendicated = [
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/',
        Component: AccountantDashboard,
    },
    // ================Accounts =================
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'AddQuotation',
        Component: QuotaionContainer,
    },
    {
        routePath: 'viewemployee/:id',
        Component: ViewEmployeeProfile,
    },
    {
        routePath: 'quotation',
        Component: Quotation,
    },
    {
        routePath: 'invoice',
        Component: Invoice,
    },
    {
        routePath: 'AddInvoice',
        Component: AddInvoice,
    },
    {
        routePath: 'Payement_invoice_maintainInvoice',   // Payment-Invoicepay/Maintainpay
        Component: PayementIn,
    },
    {
        routePath: 'report',   // reports
        Component: Reports,
    },
    {
        routePath: 'expense',
        Component: Expense,
    },
    {
        routePath: 'viewAssets',
        Component: CompanyAssets,
    },
    {
        routePath: 'addAssets',
        Component: AddAssets,
    },
    {
        routePath: 'server',
        Component: Server,
    },
    {
        routePath: 'addServer',
        Component: AddServer,
    },
    {
        routePath: 'maintenanceInvoice',
        Component: MaindenanceInvoice,
    },
    {
        routePath: 'AddMaintainInvoice',
        Component: AddMaintainInvoice,
    },
    {
        routePath: 'AddServer_Maintenance',
        Component: AddServerMaintenance,
    },
    {
        routePath: 'ViewServer_Maintenance',
        Component: ViewServerMaintenance,
    },
    {
        routePath: 'ViewClientProjectQuot',
        Component: ViewClientProjectQuot
    },
    {
        routePath: 'viewTraining/:id',
        Component: ViewTrainingDetails,
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
    {
        routePath: 'balance_sheet',
        Component: BalanceDetails,
    },
]


export const TraineeAuthendicated = [
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: 'networkerror',
        Component: NetWorkError,
    },
    {
        routePath: '/',
        Component: TraineeDashboardDetails,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'complaint',
        Component: EmployeeComplaints,
    },
    {
        routePath: 'trainee_leave',
        Component: EmployeeLeave,
    },
    {
        routePath: 'AddPunchingAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'AttendanceCountView/:id',
        Component: DailyCalender,
    },
    {
        routePath: 'trainee_all_reports',
        Component: AllEmployeeReports,
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
]

export const ProjectManagerAuthenticated = [                           //<<<<<<<<<<<<<<<<<<<<<  PROJECTMANAGER <<<<<<<<<<<<<<<<<//
    {
        routePath: '*',
        Component: PageNotFound,
    },
    {
        routePath: '/',
        Component: PMDashboard,
    },
    {
        routePath: 'profile',
        Component: ViewAdminAccount,
    },
    {
        routePath: 'complaint',
        Component: EmployeeComplaints,
    },
    {
        routePath: 'AddPunchingAttendance/:id',
        Component: AddAttendance,
    },
    {
        routePath: 'AttendanceCountView/:id',
        Component: DailyCalender,
    },
    {
        routePath: 'employee_leave',
        Component: EmployeeLeave,
    },
    {
        routePath: 'resignation',
        Component: NewResignation,
    },
    {
        routePath: 'Awards',
        Component: Awards,
    },
    {
        routePath: 'ViewResesearchDocs',
        Component: ViewResesearchDocs
    },
    {
        routePath: 'project_management',
        Component: ProjectManagement,
    },
    {
        routePath: 'ViewAssiginigTask',
        Component: ViewAssiginigTask,
    },
    {
        routePath: 'view_project_status/:id',
        Component: ViewProjectTaskStatus,
    },
    {
        routePath: 'view_research_document',
        Component: ShowingResearchedDoc
    },
    {
        routePath: 'view_dev_document',
        Component: ShowingDevCompletedDoc
    },
    {
        routePath: 'view_approved_projects',
        Component: ApprovedProjectList
    },
    {
        routePath: 'view_approved_by_management_projects',
        Component: ApprovedbyManagementProjectList
    },
    {
        routePath: 'view_dev_completed',
        Component: DevCompletedList
    },
    {
        routePath: 'view_after_R_and_D_List',
        Component: ViewAllAfterRandDList
    },
    {
        routePath: 'view_projects_for_testing',
        Component: ViewAllProjectForTesting
    },
    {
        routePath: 'view_approved_projects_for_testing',
        Component: ViewAllApprovedProjectForTesting
    },
    {
        routePath: 'view_project_document',
        Component: ShowingProjectDoc
    },
    {
        routePath: 'view_tested_document',
        Component: ShowingTestedDocuments
    },
    {
        routePath: 'view_all_projects_for_hosting',
        Component: ViewAllProjectForHosting
    },
    {
        routePath: 'view_hosted_document',
        Component: ShowingHostedDoc
    },
    {
        routePath: 'chatAI',
        Component: AIChat,
    },
]

