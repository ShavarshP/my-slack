import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveState } from "../../helpers/localStorage";
import FormComponet from "./components/formComponet";

const SignUp = () => {
  const [usernameIsValid, setusernameIsValid] = useState(true);
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const [emailIsValid, setemailIsValid] = useState(true);

  const history = useHistory();
  const onSubmit = (data) => {
    return data.email &&
      data.username &&
      data.password &&
      passwordIsValid &&
      usernameIsValid &&
      emailIsValid
      ? Valid(data)
      : noValid();
  };

  // const login = async () => {
  //   history.push("/home");
  // };
  const Valid = (data) => {
    console.log(data);
    saveState(data, "auth");
    history.push("/home");
  };

  const noValid = () => {
    setpasswordIsValid(false);
    setusernameIsValid(false);
    setemailIsValid(false);
    alert("invalid");
    return false;
  };

  const isValid = (form) => {
    const name = /^([A-Za-zéàë]{2,40} ?)+$/;
    const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setusernameIsValid(name.test(form.username) || form.username === "");
    setpasswordIsValid(password.test(form.password) || form.password === "");
    setemailIsValid(email.test(form.email) || form.email === "");
  };

  const form = (
    <FormComponet
      isValid={isValid}
      valid={{
        passwordIsValid: passwordIsValid,
        usernameIsValid: usernameIsValid,
        emailIsValid: emailIsValid,
      }}
      onSubmit={onSubmit}
      type={"Sign up"}
      emailI={true}
    />
  );
  return (
    <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mt-4">
        <div>{form}</div>
      </div>
    </div>
  );
};
export default SignUp;
