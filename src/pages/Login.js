import React from "react";
import useInput from "hooks/use-input";
import swal from "sweetalert";
import { setUser, getUser } from "helpers/parseJWT";
import { login } from "service/auth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const re = /<\/?[^>]+>/gi;
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput(
    (value) =>
      value.trim() !== "" && !re.test(String(value).toLocaleLowerCase())
  );

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      !re.test(String(value).toLocaleLowerCase() && value.trim().length <= 6)
  );

  const nameValidationFeedback =
    enteredName.trim() === ""
      ? "Username can't be empty."
      : !re.test(String(enteredName).toLocaleLowerCase()) &&
        "Username format not valid.";

  const passwordValidationFeedback =
    enteredPassword.trim() === ""
      ? "Password can't be empty."
      : !re.test(String(enteredPassword).toLocaleLowerCase())
      ? "Password format not valid."
      : enteredPassword.trim().length <= 6 && "Password must be 6 characters";

  let formIsValid = false;
  if (passwordIsValid && nameIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      nama: enteredName,
      password: enteredPassword,
    });
    const isLogin = true;
    if (formIsValid) {
      const data = await login(body, isLogin);
      if (data) {
        await setUser(data);
        swal({
          title: `Welcome ${getUser()
            .user?.slice(0, 1)
            .toUpperCase()}${getUser().user?.slice(1)}`,
          text: "Login succesfully!",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        history.push("/");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full md:w-96 mx-auto p-14 bg-gray-100 rounded-lg shadow-md">
        <form
          className="flex flex-col text-sm text-gray-400"
          onSubmit={submitHandler}
        >
          <div className="flex mb-4 justify-center">
            <img src="/logoOCIpng2.png" alt="logo" className="w-42" />
          </div>
          <label htmlFor="nama" className="my-2">
            Username
          </label>
          <input
            type="text"
            name="nama"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 bg-white border rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
              nameInputHasError
                ? "border-red-500 ring ring-red-300 outline-none"
                : "border-orange-400"
            }`}
          />
          {nameInputHasError && (
            <p className="text-red-500 text-xs">{nameValidationFeedback}</p>
          )}
          <label htmlFor="password" className="my-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={enteredPassword}
            autoComplete="true"
            onChange={passwordChangeHandler}
            className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 bg-white border rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
              passwordInputHasError
                ? "border-red-500 ring ring-red-300 outline-none"
                : "border-orange-400"
            }`}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p className="text-red-500 text-xs">{passwordValidationFeedback}</p>
          )}
          <button
            type="submit"
            className="bg-yellow-500 mt-5 p-3 rounded-md text-white font-bold text-md"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
