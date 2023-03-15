import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputReducers = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return initialInputState;
};
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducers, initialInputState);
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };
  const valueBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  return {
    value: inputState.value,
    hasError,
    valueIsValid,
    valueChangeHandler,
    reset,
    valueBlurHandler,
  };
};

export default useInput;
