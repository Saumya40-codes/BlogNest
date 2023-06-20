import React from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
export default function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  return (
    <Routes>
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : navigate('/login')
      }}
    ></Route>
    </Routes>
  )
}