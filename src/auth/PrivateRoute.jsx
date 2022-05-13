import {Navigate} from 'react-router-dom'
import React, {useContext } from 'react'
import AuthContext from './AuthContext'

function PrivateRoute({ children }) {
    const user = useContext(AuthContext)
    return user.user? children : <Navigate to="/klndr_front/login" />;
  }

export default PrivateRoute;