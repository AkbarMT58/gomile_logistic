import React from "react";
import { IconButton } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import FlagIcon from "@mui/icons-material/Flag";
import { styled } from "@mui/material/styles";
import { setFlagDataCM } from "service/api";
import swal from "sweetalert";

const SetFlag = ({
  setChangeData,
  setLoading,
  dataFromSearch,
  setSearchData,
  email,
}) => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const setFlagCustomer = async (level) => {
    setLoading(true);
    const body = JSON.stringify({ email, level });
    const data = await setFlagDataCM(body);
    if (data?.status === 200) {
      swal("Updated!", "Flag updated succesfully", "success");
      setChangeData((prev) => !prev);
      if (dataFromSearch) {
        setSearchData(`/${email}`);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <HtmlTooltip
        title={
          <>
            <div className="cursor-pointer text-white flex space-x-3">
              <FlagIcon
                className="text-green-500"
                fontSize="small"
                onClick={() => setFlagCustomer(3)}
              />
              <FlagIcon
                className="text-blue-500"
                fontSize="small"
                onClick={() => setFlagCustomer(2)}
              />
              <FlagIcon
                className="text-red-500"
                fontSize="small"
                onClick={() => setFlagCustomer(1)}
              />
            </div>
          </>
        }
        style={{ fontSize: 5 }}
      >
        <IconButton>
          <FlagIcon />
        </IconButton>
      </HtmlTooltip>
    </>
  );
};

export default SetFlag;
