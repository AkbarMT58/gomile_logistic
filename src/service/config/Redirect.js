import { useHistory } from "react-router-dom";

const Redirect = (path) => {
  const history = useHistory();
  return history.push(path);
};

export default Redirect;
