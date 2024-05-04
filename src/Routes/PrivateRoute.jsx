
import PropTypes from 'prop-types';
import useContextData from "../hooks/useContextData";
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
     const { user, loading } = useContextData();
     if (loading) {
        return (
          <div className='flex items-center justify-center mt-10 text-red-700'>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        );
     }
     if (user?.email) {
        return children;
    }
  return <Navigate to={'/login'} replace />
}

PrivateRoute.propTypes = {
    children:PropTypes.node
}

export default PrivateRoute
