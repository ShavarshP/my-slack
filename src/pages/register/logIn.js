import React, { useState } from "react";
import { saveState } from "../../helpers/localStorage";
import { useHttp } from "../../hooks/useHttp";

import Loading from "../../components/loading/loading";
import FormComponet from "./components/formComponet";

const URL = "https://appslack.herokuapp.com/api/login/";

const LogIn = ({ verify }) => {
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const [emailIsValid, setemailIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { request } = useHttp();

  const onSubmit = (data) => {
    return data.email && data.password && passwordIsValid && emailIsValid
      ? Valid(data)
      : noValid();
  };

  const Valid = async (data) => {
    try {
      setLoading(true);
      const newData = await request(URL, "POST", {
        email: data.email,
        password: data.password,
      });
      saveState(newData, "auth");
      await verify();
    } catch (error) {}
    setLoading(false);
  };

  const noValid = () => {
    setpasswordIsValid(false);
    setemailIsValid(false);
    alert("invalid");
    return false;
  };

  const isValid = (form) => {
    const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setpasswordIsValid(password.test(form.password) || form.password === "");
    setemailIsValid(email.test(form.email) || form.email === "");
  };

  const form = (
    <FormComponet
      isValid={isValid}
      valid={{
        passwordIsValid: passwordIsValid,
        emailIsValid: emailIsValid,
      }}
      onSubmit={onSubmit}
      type={"Log in"}
    />
  );

  return (
    <>
      {loading ? (
        <div style={{ marginTop: "20%", marginLeft: "24%" }}>
          <Loading />
        </div>
      ) : (
        <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 mt-4 ">
            <div>{form}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
