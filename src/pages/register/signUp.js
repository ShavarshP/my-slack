import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { saveState } from "../../helpers/localStorage";
import FormComponet from "./components/formComponet";

const SignUp = () => {
  const [usernameIsValid, setusernameIsValid] = useState(true);
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const history = useHistory();
  const onSubmit = (data) => {
    return data.username && data.password && passwordIsValid && usernameIsValid
      ? Valid(data)
      : noValid();
  };

  const login = async () => {
    history.push("/home");
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
      type={"Sign up"}
    />
  );
  return (
    <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>{form}</div>
        <div className="cursor-pointer flex justify-center rounded-lg text-sm bg-gray-300 h-9 border-2 border-purple-600 hover:bg-gray-400">
          <button
            onClick={login}
            className="font-medium text-indigo-900 hover:text-indigo-900 "
          >
            googl
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
