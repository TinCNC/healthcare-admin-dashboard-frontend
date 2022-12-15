import React from "react";
import { Skeleton, Avatar } from "@pankod/refine-mui";
import type { AvatarProps } from "@pankod/refine-mui";

export type AvatarPropsWithLoading = AvatarProps & {
  loading?: boolean;
  registerProps?: any;
};

export const LoadingAvatar: React.FC<AvatarPropsWithLoading> = ({
  loading,
  registerProps,
  ...rest
}) => {
  //   const [preLoad, setPreLoad] = useState<boolean>(true);

  const { variant, sx, ...restProps } = rest;
  const isLoading = loading || false;

  const defaultVariant = variant || "circular";

  //   var delayInMilliseconds = 50;

  //   setTimeout(function () {
  //     setPreLoad(false);
  //   }, delayInMilliseconds);

  const getSkeletonVariant = (
    variant: "square" | "circular" | "rounded" | undefined
  ): "text" | "circular" | "rectangular" | "rounded" | undefined => {
    switch (variant) {
      case "square":
        return "rectangular";
      case "circular":
        return "circular";
      case "rounded":
        return "rounded";
      default:
        return "circular";
    }
  };

  // console.log(variant);

  // console.log(getSkeletonVariant(variant));

  return isLoading ? (
    <Skeleton width="auto" variant={getSkeletonVariant(defaultVariant)}>
      <Avatar sx={{ ...sx }} />
    </Skeleton>
  ) : (
    <Avatar
      variant={defaultVariant}
      sx={{ ...sx }}
      {...restProps}
      // alt={getValues("username")}
      // src={imagePreview || getValues("image")}
      // sx={{ width: 320, height: 320 }}
    />
  );
};
