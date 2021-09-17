import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveState } from "../../helpers/localStorage";
import FormComponet from "./components/formComponet";

const LogIn = () => {
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const [emailIsValid, setemailIsValid] = useState(true);
  const history = useHistory();
  const onSubmit = (data) => {
    return data.email && data.password && passwordIsValid && emailIsValid
      ? Valid(data)
      : noValid();
  };
  const Valid = (data) => {
    console.log("aa", data);
    saveState(data, "auth");
    history.push("/home");
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
    <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mt-4 ">
        <div>{form}</div>
      </div>
    </div>
  );
};

export default LogIn;
