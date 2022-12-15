import React from "react";
import { TextField, Skeleton } from "@pankod/refine-mui";
import type { MuiTextFieldProps } from "@pankod/refine-mui";

export type TextFieldPropsWithLoading = MuiTextFieldProps & {
  loading?: boolean;
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
