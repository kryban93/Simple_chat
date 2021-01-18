import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return authUser ? <Component {...props} /> : <Redirect to='/login' />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
