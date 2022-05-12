import {Navigate} from 'react-router-dom'

function PrivateRoute({ children }) {
    const auth = true; //useAuth va aqui
    return auth ? children : <Navigate to="/klndr_front/register" />;
  }

export default PrivateRoute;