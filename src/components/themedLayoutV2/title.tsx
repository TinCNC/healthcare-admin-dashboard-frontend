import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import { Link as MuiLink, SvgIcon, Typography } from "@mui/material";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";

const defaultText = "Virtual Health Assistant";

const defaultIcon = (
  <svg
    // width="24"
    // height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 506 506"
    enableBackground="new 0 0 506 506"
    xmlSpace="preserve"
    data-testid="first-aid-kit"
  >
    <path
      fill="#E57373"
      d="M475.6,123.4H351.2v12.4c0,8-2.4,14.4-10,14.4s-14-6.4-14-14.4v-12.4H182v16c0,8-6.4,14.4-14,14.4
    s-14-6.4-14-14.4v-16H36.4c-15.2,0-31.6,11.2-31.6,28.8V185h500v-32.8C504,135.8,492,123.4,475.6,123.4z"
    />
    <path
      fill="#BF360C"
      d="M4,181.4v246.8c0,16.4,15.2,32,31.2,32h434.4c16.8,0,28.4-16.4,28.4-32V181.4H4z"
    />
    <g>
      <polygon
        fill="#FF8A65"
        points="103.6,193.4 103.6,183.4 103.6,177.4 55.6,177.4 55.6,183.4 55.6,193.4 	"
      />
      <polygon
        fill="#FF8A65"
        points="452.4,195.4 452.4,183.8 452.4,175.4 404.4,175.4 404.4,183.8 404.4,195.4 	"
      />
    </g>
    <path
      fill="#795548"
      d="M304.4,45.8H201.2c-25.2,0-45.6,18.8-45.6,41.6V141c0,5.6,4.4,10,10,10s10-4.4,10-10V87.4
    c0-13.6,13.2-22,25.6-22h103.2c13.6,0,22.4,8.8,22.4,22v50c0,5.6,4.4,10,10,10s10-4.4,10-10v-50C346.8,63.4,328.8,45.8,304.4,45.8z"
    />
    <path
      fill="#EEEEEE"
      d="M348.8,299h-58c-2.4,0-6-3.6-6-6v-58.4c0-2.8-0.8-3.2-4-3.2H232c-2.8,0-7.2,0.4-7.2,3.2V293
    c0,2.4,0.4,6-2,6H164c-2.8,0-6.8,0.4-6.8,3.2v41.2c0,3.2,4,7.2,6.8,7.2h58.8c2.4,0,2-0.4,2,2v58c0,3.2,4.4,7.6,7.2,7.6h48.8
    c3.2,0,4-4.8,4-7.6v-58c0-2,3.6-2,6-2h58c3.2,0,3.6-4.4,3.6-7.2v-41.2C352.8,299.4,352,299,348.8,299z"
    />
    <path d="M324.8,125.4H181.2c-2.4,0-4-1.6-4-4s1.6-4,4-4h143.6c2.4,0,4,1.6,4,4S326.8,125.4,324.8,125.4z" />
    <path
      d="M471.6,464.2H37.2C18,464.2,0,445,0,424.2V153.4c0-20.8,18.8-32,37.2-32h116c2.4,0,4,1.6,4,4s-1.6,4-4,4h-116
    c-14.4,0-29.2,8.4-29.2,24v270.8c0,16,14.4,32,29.2,32h434.4c15.6,0,26.4-16.8,26.4-32V153.4c0-14.8-10-24-26.4-24H352.4
    c-2.4,0-4-1.6-4-4s1.6-4,4-4h119.2c20.4,0,34.4,12.8,34.4,32v270.8C506,443.4,492.4,464.2,471.6,464.2z"
    />
    <path
      d="M107.6,201.4H52c-2.4,0-4-1.6-4-4v-24c0-2.4,1.6-4,4-4h55.6c2.4,0,4,1.6,4,4v24C111.6,199.4,109.6,201.4,107.6,201.4z
     M56,193.4h47.6v-16H56V193.4z"
    />
    <path
      d="M454,201.4h-51.6c-2.4,0-4-1.6-4-4v-24c0-2.4,1.6-4,4-4H454c2.4,0,4,1.6,4,4v24C458,199.4,456.4,201.4,454,201.4z
     M406.4,193.4H450v-16h-43.6V193.4z"
    />
    <path
      d="M167.2,157c-8.8,0-16-7.2-16-16V87.4c0-26,22-45.6,51.6-45.6H306c28.4,0,48.4,18.8,48.4,45.6v50c0,8.8-7.2,16-16,16
    s-16-7.2-16-16v-50c0-11.6-8.8-14-16.4-14H202.8c-9.6,0-19.6,4.4-19.6,14V141C183.2,149.8,176,157,167.2,157z M202.8,49.8
    c-21.2,0-43.6,13.2-43.6,37.6V141c0,4.4,3.6,8,8,8s8-3.6,8-8V87.4c0-12.8,11.2-22,27.6-22H306c15.2,0,24.4,8.4,24.4,22v50
    c0,4.4,3.6,8,8,8s8-3.6,8-8v-50c0-22.4-16.8-37.6-40.4-37.6H202.8z"
    />
    <path d="M50,189.4H6c-2.4,0-4-1.6-4-4s1.6-4,4-4h44c2.4,0,4,1.6,4,4S52,189.4,50,189.4z" />
    <path d="M400.4,189.4h-12c-2.4,0-4-1.6-4-4s1.6-4,4-4h12c2.4,0,4,1.6,4,4S402.8,189.4,400.4,189.4z" />
    <path d="M356.4,189.4H109.2c-2.4,0-4-1.6-4-4s1.6-4,4-4h247.2c2.4,0,4,1.6,4,4S358.8,189.4,356.4,189.4z" />
    <path d="M496,189.4h-40c-2.4,0-4-1.6-4-4s1.6-4,4-4h40c2.4,0,4,1.6,4,4S498.4,189.4,496,189.4z" />
    <path
      d="M272.8,425h-38c-7.6,0-12.4-5.2-12.4-13.2v-55.2h-55.2c-8,0-13.2-4.8-13.2-12.4v-38.4c0-7.6,5.2-12.4,13.2-12.4h55.2v-55.2
    c0-7.6,5.2-13.2,12.4-13.2h38c7.6,0,12.8,5.2,12.8,13.2v55.2h55.2c3.6,0,6.8,1.2,9.2,3.2c2.4,2.4,4,5.6,4,9.2v38.4
    c0,7.2-5.2,12.4-13.2,12.4h-55.2v55.2C285.6,419.8,280.4,425,272.8,425z M167.2,301.4c-2,0-5.2,0.4-5.2,4.4v38.4
    c0,2.8,1.6,4.4,5.2,4.4h59.2c2.4,0,4,1.6,4,4v59.2c0,2,0.4,5.2,4.4,5.2h38c4.4,0,4.8-3.6,4.8-5.2v-59.2c0-2.4,1.6-4,4-4h59.2
    c3.2,0,5.2-1.6,5.2-4.4v-38.4c0-1.6-0.4-2.4-1.2-3.2c-0.8-0.8-2.4-1.2-4-1.2h-59.2c-2.4,0-4-1.6-4-4v-59.2c0-1.6-0.4-5.2-4.8-5.2
    h-38c-4,0-4.4,3.2-4.4,5.2v59.2c0,2.4-1.6,4-4,4L167.2,301.4L167.2,301.4z"
    />
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
  icon = defaultIcon,
  text = defaultText,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <MuiLink
      to="/"
      component={ActiveLink}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        ...wrapperStyles,
      }}
    >
      <SvgIcon height="24px" width="24px" color="primary">
        {icon}
      </SvgIcon>
      {!collapsed && (
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          fontSize="inherit"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {text}
        </Typography>
      )}
    </MuiLink>
  );
};
