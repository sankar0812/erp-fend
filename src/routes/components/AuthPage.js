import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RandDAuthendicated, adminAuthenticated, clientAuthenticated, employeeAuthenticated, TLAuthenticated, PLAuthenticated, ManagerAuthendicated, AccountantAuthendicated, TraineeAuthendicated, ProjectManagerAuthenticated } from '../config/user'
import Flex from '../../components/Flex'
import styled from 'styled-components'
import { DashLayout } from '../../layout/DashLayout'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, selectCurrentId, selectCurrentRole, selectCurrentRoleId, selectCurrentRoleName, selectEmployeeId, } from '../../modules/Auth/authSlice'
import { USER_ROLES } from '../../utils/UserRoles/UserRole'
import { toast } from 'react-toastify'
import request from '../../utils/request'


const PageFlex = styled(Flex)`
  overflow: hidden;
`
const AuthPage = ({ isAuthenticated }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const [authenticatedRoutes, setAuthenticatedRoutes] = useState([]);
    
    const Role = useSelector(selectCurrentRole)
    const RoleID = useSelector(selectCurrentRoleId)
    const RoleName = useSelector(selectCurrentRoleName)
    const UniqueCurrentId = useSelector(selectCurrentId);
    const EmployeeId =useSelector(selectEmployeeId)

    
    const GETLOGOUTURL = 'logout'      //<<<<<<<<<<<<<<<<<<<<  User Expire Get Response
    const GETEMPLOGUTURL = 'resignations/view' //<<<<<<<<<<<<<<<<<<<<  Employee/TL/ProjectHead/  Resignations Expire 


    useEffect(() => {
        if (isAuthenticated) {

            if (Role === USER_ROLES.ADMIN) {
                setAuthenticatedRoutes(adminAuthenticated)
                GetEmployeeExpire()
            }
            else if (Role === USER_ROLES.EMPLOYEE) {
                setAuthenticatedRoutes(employeeAuthenticated)
                GetTokenExpire()
                GetEmployeeExpire()
            }
            else if (Role === USER_ROLES.TEAMLEADER) {
                setAuthenticatedRoutes(TLAuthenticated)
                GetTokenExpire()
                GetEmployeeExpire()
            }
            else if (Role === USER_ROLES.PROJECHEAD) {
                setAuthenticatedRoutes(PLAuthenticated)
                GetTokenExpire()
                GetEmployeeExpire()
            }
            else if (Role === USER_ROLES.CLIENT) {
                setAuthenticatedRoutes(clientAuthenticated)
                GetTokenExpire()
            }
            else if (Role === USER_ROLES.RESEARCH_DEVELOPER) {
                setAuthenticatedRoutes(RandDAuthendicated)
                GetTokenExpire()
            }
            else if (Role === USER_ROLES.MANAGER) {
                setAuthenticatedRoutes(ManagerAuthendicated)
                GetTokenExpire()
                GetEmployeeExpire()
            }
            else if (Role === USER_ROLES.ACCOUNTANT) {
                setAuthenticatedRoutes(AccountantAuthendicated)
                GetTokenExpire()
            }
            else if (Role === USER_ROLES.TRAINEE) {
                setAuthenticatedRoutes(TraineeAuthendicated)
                GetTokenExpire()
            }
            else if (Role === USER_ROLES.SUPERADMIN) {
                setAuthenticatedRoutes(adminAuthenticated)
            }
            else if (Role === USER_ROLES.PROJECTMANAGER) {
                setAuthenticatedRoutes(ProjectManagerAuthenticated)
            }
            else {
                navigate('/signin')
            }
        }

    }, [isAuthenticated, location])

    const GetTokenExpire = () => {

        request.get(`${GETLOGOUTURL}/${UniqueCurrentId}/${RoleID}/${RoleName}`)
            .then(function (response) {
                if (response.data?.status === false) {
                    toast.warn("User Expire!")
                    console.log(response, 'falsetokennnn');
                    dispatch(logOut());
                }
                else {
                    console.log(response, 'truetokenjkkk');
                }
                console.log(response, 'expireeee');
            })
            .catch(function (error) {
                console.log(error, 'logerrr');

            });
    }

    const GetEmployeeExpire = () => {
        const resignationsParam = 'resignationsview'

        request.get(`${GETEMPLOGUTURL}`,{params:{resignationsParam}})
            .then(function (response) {
                if (response?.data?.status === false) {
                    toast.warn("User Expire!")
                    dispatch(logOut());
                }
                // else {
                //     console.log(response, 'employeeeexpiretr');
                // }
            })
            .catch(function (error) {
                console.log(error, 'emlogerrr');

            });
    }


    return (
        <PageFlex>
            {isAuthenticated && (
                <DashLayout>
                    <Routes>
                        {authenticatedRoutes.map(({ routePath, Component }) => {
                            return (
                                <Route
                                    key={routePath}
                                    path={routePath}
                                    element={<Component />}
                                ></Route>
                            )
                        })}
                    </Routes>
                </DashLayout>
            )}
        </PageFlex>
    )
}

export default AuthPage
