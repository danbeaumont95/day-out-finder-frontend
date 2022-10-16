/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: any) {
  const auth = localStorage.getItem('accessToken') ? true : null;
  return auth ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
