import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { lensProp, over } from "ramda";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../graphql/userQueries";

const LoginFormPage = ({ onHandle }) => {
  const [formError, setFormError] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [getUser, { loading: userLoading, error: userError, data: userData }] =
    useLazyQuery(GET_USER);

  const handleChange = (fieldName) => (event) => {
    const newValue = event.target.value;
    setFormData(over(lensProp(fieldName), () => newValue, formData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = formData;
    getUser({ variables: { username, password } });
  };

  useEffect(() => {
    if (userData && !userError) {
      const { ok, message } = userData.getUser;
      if (ok) {
        onHandle({
          label: "GET_ADMIN_PERMISSION",
          permission: { ok },
        });
      } else setFormError(message);
    } else if (userError) setFormError(userError);
  }, [userData, userError]);

  useEffect(() => {
    if (formError) setTimeout(() => {
      setFormError(null);
    }, 5000);
  }, [formError]);

  return (
    <div className="flex justify-center items-center w-full">
      {userLoading ? (
        <>En cours de chargement</>
      ) : (
        <form
          className="bg-white p-6 mt-20 rounded-lg shadow-md w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <h1 className="text-lg font-medium mb-10">Connexion à Vinantic</h1>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              {"Nom d'utilisateur"}
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange("username")}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
            />
          </div>

          {formError && <div className="text-red-500">{formError}</div>}
          {userError && <div className="text-red-500">{userError}</div>}

          <div className="flex justify-center mt-10">
            <button
              className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginFormPage;

LoginFormPage.propTypes = {
  onHandle: PropTypes.func.isRequired,
};
