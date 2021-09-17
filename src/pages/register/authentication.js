import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveState } from "../../helpers/localStorage";
import FormComponet from "./components/formComponet";

const Authentication = () => {
  const [usernameIsValid, setusernameIsValid] = useState(true);
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const history = useHistory();
  const onSubmit = (data) => {
    return data.username && data.password && passwordIsValid && usernameIsValid
      ? Valid(data)
      : noValid();
  };
  const Valid = (data) => {
    saveState(data, "auth");
    history.push("/home");
  };

  const noValid = () => {
    setpasswordIsValid(false);
    setusernameIsValid(false);
    alert("krkin pordir");
    return false;
  };

  const isValid = (form) => {
    console.log("maladec");
    const name = /^([A-Za-zéàë]{2,40} ?)+$/;
    const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setusernameIsValid(name.test(form.username) || form.username === "");
    setpasswordIsValid(password.test(form.password) || form.password === "");
  };

  const form = (
    <FormComponet
      isValid={isValid}
      valid={{
        passwordIsValid: passwordIsValid,
        usernameIsValid: usernameIsValid,
      }}
      onSubmit={onSubmit}
      type={"Loign in"}
    />
  );
  return (
    <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>{form}</div>
      </div>
    </div>
  );
};

export default Authentication;
