import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";

const initialState = {
  designation: [],
  department: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  EmployeeDetails: [],
  qualification: [],
  initialemployee: [],
  bankDetails: [],
  leave: [],
  shift: [],
  attendance: [],
  awards: [],
  inActive: [],
  departmentintable:[],
};

//GET AWARDS EMPLOYEE
export const getAwards = createAsyncThunk(
  "awards",
  async () => {
    try {
      const awardsParam = 'allPhoto';
      const response = await request.get(`${APIURLS.GETAWARDS}`, {
        params: { awardsParam }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });



// get employee designation

export const getDesignation = createAsyncThunk(
  "designation",
  async () => {
    try {
      const designationParam = 'designation';
      const response = await request.get(`${APIURLS.GETDESIGNATION}`, {
        params: { designationParam }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });

// get employee bank detail

export const getBankDetail = createAsyncThunk(
  "bank",
  async () => {
    try {
      const bankParam = 'bank';
      const response = await request.get('bank', {
        params: { bankParam }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });


// get employee department

export const getDepartment = createAsyncThunk(
  "Departmentt",
  async () => {
    try {
      const departmentParam = 'department';
      const response = await request.get(`${APIURLS.GETDEPARTMENT}`, {
        params: { departmentParam }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });
// get employee leave

export const getLeave = createAsyncThunk(
  "Leave",
  async () => {
    try {
      const employeeleave = 'employeeleave';
      const response = await request.get(`${APIURLS.GETLEAVE}`, {
        params: { employeeleave }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });

export const getAttendance = createAsyncThunk(
  "Attendance",
  async () => {
    try {
      const attendance = 'employeeattendance';
      const response = await request.get(`${APIURLS.GETATTENDANCEPUNCH}`, {
        params: { attendance }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });


// get initial employee details

export const getInitialEmployee = createAsyncThunk(
  "InitialEmployee/Get",
  async () => {
    try {
      const employeesview = 'employeesview';
      const response = await request.get(`${APIURLS.GETINITIALEMPLOYEE}`, {
        params: { employeesview }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });

  // get Departrment details

export const getDepartmentinTable = createAsyncThunk(
  "DepartmentInTable/Get",
  async () => {
    try {
      const departmentParam = 'department';
      const response = await request.get(`${APIURLS.GETDEPARTMENT}`, {
        params: { departmentParam }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });


export const getQualification = createAsyncThunk(
  "Qualifications/Get",
  async () => {
    try {
      const response = await request.get('qualification/view');
      return [...response.data];
    }
    catch (error) {
      throw error;
    }
  }
);

export const getShift = createAsyncThunk(
  "Shift/Get",
  async () => {
    try {
      const shift = 'Shift';
      const response = await request.get(`${APIURLS.GETSHIFT}`, {
        params: { shift }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });

  export const getInActiveEmployee = createAsyncThunk(
    "InActiveEmployee/Get",
    async () => {
      try {
        const employeesview = 'inactive';
        const response = await request.get(`${APIURLS.GETINACTIVEEMPLOYEE}`, {
          params: { employeesview }
        })
        return [...response.data];
      } catch (error) {
        // throw error;
      }
    });

const employeeSlice = createSlice({
  name: "employeedetails",
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.EmployeeDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Awards

      .addCase(getAwards.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAwards.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.awards = action.payload;
      })
      .addCase(getAwards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Designation

      .addCase(getDesignation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designation = action.payload;
      })
      .addCase(getDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Department

      .addCase(getDepartment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.department = action.payload;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

         // Department in Table

         .addCase(getDepartmentinTable.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDepartmentinTable.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.departmentintable = action.payload;
        })
        .addCase(getDepartmentinTable.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
  


      // InitialEmployeeDetails

      .addCase(getInitialEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInitialEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.initialemployee = action.payload;
      })
      .addCase(getInitialEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // BankDetails

      .addCase(getBankDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBankDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bankDetails = action.payload;
      })
      .addCase(getBankDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Qualification

      .addCase(getQualification.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getQualification.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.qualification = action.payload;
      })
      .addCase(getQualification.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Shift

      .addCase(getShift.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.shift = action.payload;
      })
      .addCase(getShift.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Leave

      .addCase(getLeave.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getLeave.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.leave = action.payload;
      })
      .addCase(getLeave.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Attendance 
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attendance = action.payload;
      })

       // inActive employee 
       .addCase(getInActiveEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inActive = action.payload;
      })
  },
});

// Awards

export const selectAllAwards = (state) => state.employee.awards
export const getAwardsStatus = (state) => state.employee.status
export const getAwardsError = (state) => state.employee.error

// Attendance 
export const getAttendancePunch = (state) => state.employee.attendance;


// Designation

export const selectAllDesignation = (state) => state.employee.designation;
export const getDesignationStatus = (state) => state.employee.status;
export const getDesignationError = (state) => state.employee.error;

// Department

export const selectAllDepartment = (state) => state.employee.department;
export const getDepartmentStatus = (state) => state.employee.status;
export const getDepartmentError = (state) => state.employee.error;


// Department in Table

export const selectAllDepartmentinTable = (state) => state.employee.departmentintable;
export const getDepartmentinTableStatus = (state) => state.employee.status;
export const getDepartmentinTableError = (state) => state.employee.error;


// Bank Details

export const selectAllBankDetails = (state) => state.employee.bankDetails;
export const getBankDetailsStatus = (state) => state.employee.status;
export const getBankDetailsError = (state) => state.employee.error;

// Leave details 
export const selectLeaveDetails = (state) => state.employee.leave;
export const getLeaveDetailsStatus = (state) => state.employee.status;
export const getLeaveDetailsError = (state) => state.employee.error;

// InitialEmployeeDetails

export const selectAllInitialEmployee = (state) => state.employee.initialemployee;
export const getInitialEmployeeStatus = (state) => state.employee.status;
export const getInitialEmployeeError = (state) => state.employee.error;

export const viewEmpDetails = (state) => state.employee.EmployeeDetails

//Qualification

export const selectAllQualification = (state) => state.employee.qualification
export const getQualificationStatus = (state) => state.employee.status
export const getQualificationError = (state) => state.employee.error

//Shift

export const selectAllShift = (state) => state.employee.shift
export const getShiftStatus = (state) => state.employee.status
export const getShiftError = (state) => state.employee.error

//inActiveEmployee

export const selectAllInActiveEmployee = (state) => state.employee.inActive

export const { reducer } = employeeSlice;
export const { addDepartment } = employeeSlice.actions;

export default employeeSlice.reducer;
