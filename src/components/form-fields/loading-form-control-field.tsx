import React from "react";
import { Skeleton, FormControl, FormControlProps } from "@mui/material";

export type LoadingFormControlProps = FormControlProps & {
  loading?: boolean;
};

export const LoadingFormControl: React.FC<LoadingFormControlProps> = ({
  loading,
  children,
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
      <FormControl sx={{ ...sx }} {...restProps}>
        {children}
      </FormControl>
    </Skeleton>
  ) : (
    <FormControl sx={{ ...sx }} {...restProps}>
      {children}
    </FormControl>
  );
};
