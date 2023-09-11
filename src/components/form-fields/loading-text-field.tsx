import React from "react";
import { TextField, Skeleton, TextFieldProps } from "@mui/material";
// import { MuiTextFieldProps } from "@refinedev/mui";

export type TextFieldPropsWithLoading = TextFieldProps & {
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerProps?: any;
};

export const LoadingTextField: React.FC<TextFieldPropsWithLoading> = ({
  loading,
  registerProps,
  ...rest
}) => {
  //   const [preLoad, setPreLoad] = useState<boolean>(true);

  const { sx, ...restProps } = rest;

  const isLoading = loading || false;

  //   var delayInMilliseconds = 50;

  //   setTimeout(function () {
  //     setPreLoad(false);
  //   }, delayInMilliseconds);

  return isLoading ? (
    <Skeleton width="auto">
      <TextField sx={{ ...sx }} {...restProps} disabled />
    </Skeleton>
  ) : (
    <TextField {...registerProps} sx={{ ...sx }} {...restProps} />
  );
};
