import React from 'react'
import AuthRouter from './components/AuthRouter'
import { Routes, Route } from 'react-router'

const Routers = ({ token }) => {

    const isAuthenticated = Boolean(token);

    return (
        <Routes>
          <Route
            path="/*"
            element={
              <AuthRouter isAuthenticated={isAuthenticated} />
            }
          />
        </Routes>
    )
}

export default Routers
