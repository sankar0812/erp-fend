import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null,
    name: null,
    roleId: null,
    roleType: null,
    roleName: null,
    id: null,
    departmentId: null,
    profile: null,
    employeeId: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { name, token, roleId, roleName, roleType, id, departmentId, profile, employeeId } = action.payload
            state.name = name
            state.roleId = roleId
            state.roleName = roleName
            state.roleType = roleType
            state.token = token
            state.id = id
            state.departmentId = departmentId
            state.profile = profile
            state.employeeId = employeeId
        },
        logOut: (state, action) => {
            state.name = null
            state.token = null
            state.roleId = null
            state.roleName = null
            state.roleType = null
            state.id = null
            state.departmentId = null
            state.profile = null
            state.employeeId = null
        }
    }
})
export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRole = (state) => state.auth.roleType
export const selectCurrentRoleId = (state) => state.auth.roleId
export const selectCurrentRoleName = (state) => state.auth.roleName

export const selectCurrentId = (state) => state.auth.id
export const selectDepartmentId = (state) => state.auth.departmentId
export const setProfile = (state) => state.auth.profile
export const selectEmployeeId = (state) => state.auth.employeeId

export default authSlice.reducer