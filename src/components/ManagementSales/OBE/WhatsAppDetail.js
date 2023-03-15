import React from "react";
import { IconButton } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditPhoneNumber from "./EditPhoneNumber";
import { styled } from "@mui/material/styles";

const WhatsAppDetail = ({
  phoneNumber,
  email,
  setChangeData,
  setLoading,
  id,
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

  return (
    <>
      <HtmlTooltip
        title={
          <>
            <div className="cursor-pointer text-white flex space-x-3">
              <EditPhoneNumber
                email={email}
                setChangeData={setChangeData}
                setLoading={setLoading}
                id={id}
              />
              {phoneNumber && (
                <a
                  className="cursor-pointer"
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat
                </a>
              )}
            </div>
          </>
        }
        style={{ fontSize: 5 }}
      >
        <IconButton>
          {phoneNumber ? (
            <WhatsAppIcon className="text-green-500" />
          ) : (
            <WhatsAppIcon />
          )}
        </IconButton>
      </HtmlTooltip>
    </>
  );
};

export default WhatsAppDetail;
