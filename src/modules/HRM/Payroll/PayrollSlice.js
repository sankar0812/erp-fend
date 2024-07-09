import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";


const initialState = {
    salary: [],
    traineesalary:[],
    payroll: [],
    traineepayroll: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// get  salary

export const getSalary = createAsyncThunk(
    "salaryy",
    async () => {
        try {
            const payrollMonth = 'pay';
            const response = await request.get(`${APIURLS.GETBASICSALARY}`, {
                params: { payrollMonth }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
        }
    });

    // get trainee salary

export const getTraineeSalary = createAsyncThunk(
    "Traineesalary",
    async () => {
        try {
            const payrollMonth = 'trainee';
            const response = await request.get(`${APIURLS.GETTRAINEEBASICSALARY}`, {
                params: { payrollMonth }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
        }
    });

// get  Payroll

export const getPayroll = createAsyncThunk(
    "get/payroll",
    async () => {
        try {
            const payrollMonth = 'payrollDetails';
            const response = await request.get(`${APIURLS.GETPAYROLL}`, {
                params: { payrollMonth }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
        }
    });

    // get trainee Payroll

export const getTraineePayroll = createAsyncThunk(
    "get/traineepayroll",
    async () => {
        try {
            const payrollMonth = 'payrollDetails';
            const response = await request.get(`${APIURLS.GETTRAINEEPAYROLL}`, {
                params: { payrollMonth }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
        }
    });

const payrollSlice = createSlice({
    name: "salarydetails",
    initialState,
    reducers: {
        addSalary: (state, action) => {
            state.salarydetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            // Salary

            .addCase(getSalary.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getSalary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.salary = action.payload;
            })
            .addCase(getSalary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

               // trainee Salary

               .addCase(getTraineeSalary.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getTraineeSalary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.traineesalary = action.payload;
            })
            .addCase(getTraineeSalary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })


            // Payroll

            .addCase(getPayroll.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getPayroll.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.payroll = action.payload;
            })
            .addCase(getPayroll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

              //trainee Payroll

              .addCase(getTraineePayroll.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getTraineePayroll.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.traineepayroll = action.payload;
            })
            .addCase(getTraineePayroll.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

    },
});

// Salary

export const selectAllSalary = (state) => state.salaries.salary;
export const getSalaryStatus = (state) => state.salaries.status;
export const getSalaryError = (state) => state.salaries.error;

// Trainee Salary

export const selectAllTraineeSalary = (state) => state.salaries.traineesalary;
export const getSalaryTraineeStatus = (state) => state.salaries.status;
export const getSalaryTraineeError = (state) => state.salaries.error;

// Payroll

export const selectAllPayroll = (state) => state.salaries.payroll;
export const getPayrollStatus = (state) => state.salaries.status;
export const getPayrollError = (state) => state.salaries.error;

//trainee Payroll

export const selectAllTraineePayroll = (state) => state.salaries.traineepayroll;
export const getTraineePayrollStatus = (state) => state.salaries.status;
export const getTraineePayrollError = (state) => state.salaries.error;

export const { reducer } = payrollSlice;
export const { addSalary } = payrollSlice.actions;

export default payrollSlice.reducer;
