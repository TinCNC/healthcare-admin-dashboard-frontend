import React from "react";
import { TextField, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
// import { MuiTextFieldProps } from "@refinedev/mui";

export type DateTimeFieldPropsWithLoading =
  DateTimePickerProps<dayjs.Dayjs | null> & {
    loading?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerProps?: any;
  };

export const LoadingDateTimeField: React.FC<DateTimeFieldPropsWithLoading> = ({
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
    <DateTimePicker {...registerProps} sx={{ ...sx }} {...restProps} />
  );
};
