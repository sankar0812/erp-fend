import { combineReducers } from "redux"
import authReducer from '../modules/Auth/authSlice'
import employeeReducer from '../modules/HRM/EmployeeDetails/EmployeeSlice'
import payrollReducer from '../modules/HRM/Payroll/PayrollSlice' 
import HolidayReducer from '../modules/HRM/Holiday/HolidaySlice'
import promotionReducer from '../modules/HRM/Promotions/PromotionSlice'
import complaintsReducer from '../modules/HRM/Complaints/ComplaintsSlice'
import resignationReducer from '../modules/HRM/ExitType/Resignation/ResignationSlice'
import employeeTrueReducer from '../modules/HRM/ExitType/Exit/Partials/ExitSlice'
import businessprofileSlice from '../modules/BusinessProfile/BusinessSlice'
import notificationReducers from '../modules/Notifications/Partials/NotificationSlice'
import trainingReducers from '../modules/HRM/Training/TrainingSlice'
import reportsReducers from '../modules/HRM/Reports/ReportsSlice'
import adminAccountReducers from '../modules/AdminAccount/AdminAccountSlice'
import userDetailsReducers from '../modules/AddUsers/UserSlice'

import candidateReducers from '../modules/HRM/Recruitments/RecruitmentSlice'

import ClientDetailsReducers from '../modules/Client/ClientSlice'
import ErpClientReducer from '../modules/ErpClient/ErpClientSlice'
import QuotationReducer from '../modules/HRM/Accounts/Quotation/quotationSlice'
import InvoiceReducer from '../modules/HRM/Accounts/Invoice/invoiceSlice'
import OrganizationReducer from '../modules/Organization/Announcement/announceSlice'
import attendanceReducer from '../modules/HRM/Attendance/AttendanceSlice'
import projectReducers from '../modules/RandD/Project/ProjectSlice'
import AccountsReducers from '../modules/HRM/Accounts/AccountsSlice'
import AdminDashboardReducers from '../modules/Dashboard/AdminDashboard/Partials/AdminDashboardSlice'
import ManagerDashboardReducers from '../modules/Dashboard/ManagerDashBoard/Partials/ManagerDashboardSlice'
import PLDashboardReducers from '../modules/Dashboard/PLDashboard/Partials/PLDashboardSlice'
import TLDashboardReducers from '../modules/Dashboard/TLDashboard/Partials/TLDashboardSlice'
import DashboardReducers  from  '../modules/Dashboard/DashboardSlice'
import AccountantReducers from '../modules/Dashboard/AccountantDashBoard/Partials/AccountantSlice'
import ProjectReducer from '../modules/Projects/ProjectSlice'
import developmentReducer from '../modules/Projects/DevelopmentofResearch/DevelopmentSlice'
import afterRandDReducer from '../modules/Projects/AfterResearchDevelopment/AfterRandDSlice'
import PMDashboardReducers from '../modules/Dashboard/PMDashboard/Partials/PMDashSlice'


const rootReducer = combineReducers({
    auth:authReducer,
    employee: employeeReducer,
    salaries:payrollReducer,
    holiday:HolidayReducer,
    promotions:promotionReducer,
    complaint:complaintsReducer,
    resignations:resignationReducer,
    employeesTrue:employeeTrueReducer,
    businessProfile:businessprofileSlice,
    // employeeCountt:employeeCountReducer,
    notifications:notificationReducers,
    trainingg:trainingReducers,
    reports:reportsReducers,
    adminaccget:adminAccountReducers,
    userdetails:userDetailsReducers,

    candidatee:candidateReducers,

    Client:ClientDetailsReducers,
    erpClient:ErpClientReducer,
    quotation:QuotationReducer,
    invoice:InvoiceReducer,
    organization:OrganizationReducer,

    attendance:attendanceReducer,
    projects:projectReducers,
    accounts:AccountsReducers,

    adminDash:AdminDashboardReducers,
    managerDash:ManagerDashboardReducers,
    plDash:PLDashboardReducers,
    tlDash:TLDashboardReducers,
    pmDash : PMDashboardReducers,


    Dashboard:DashboardReducers,
    accountantDash:AccountantReducers,
    Project:ProjectReducer,
    developmentDetails : developmentReducer,
    afterRandDdetails : afterRandDReducer ,

})

export default rootReducer;