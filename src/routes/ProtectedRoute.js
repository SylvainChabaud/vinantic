import React, { useState } from "react";
import PropTypes from "prop-types";
import { propOr } from "ramda";
import LoginFormPage from "../pages/LoginFormPage";

const ProtectedRoute = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const onHandle = ({ label, permission }) => {
    permission && setIsLogged(permission.ok);
  };

  return <>{isLogged ? children : <LoginFormPage onHandle={onHandle} />}</>;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

ProtectedRoute.defaultProps = {
  children: <></>,
};
