import React, { useState } from "react";
import Loading from "../../components/loading/loading";
import { saveState } from "../../helpers/localStorage";
import { useHttp } from "../../hooks/useHttp";
import FormComponet from "./components/formComponet";

const SignUp = ({ verify }) => {
  const [usernameIsValid, setusernameIsValid] = useState(true);
  const [passwordIsValid, setpasswordIsValid] = useState(true);
  const [emailIsValid, setemailIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { request } = useHttp();

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
  const Valid = async (data) => {
    try {
      setLoading(true);
      const newData = await request(
        "https://appslack.herokuapp.com/api/register/",
        "POST",
        {
          email: data.email,
          userName: data.username,
          password: data.password,
        }
      );
      saveState({ token: newData.token, userId: newData.userId }, "auth");
      await verify();
    } catch (error) {}

    setLoading(false);
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
    <>
      {loading ? (
        <div style={{ marginTop: "20%", marginLeft: "24%" }}>
          <Loading />
        </div>
      ) : (
        <div className="min-h-screen flex  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 mt-4">
            <div>{form}</div>
          </div>
        </div>
      )}
    </>
  );
};
export default SignUp;
