import React from "react";
import {
  useCan,
  useNavigation,
  useTranslate,
  userFriendlyResourceName,
  useResource,
  useRouterContext,
  IResourceItem,
} from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";
import type { ListButtonProps } from "@pankod/refine-mui";

// We use @mui/icons-material for icons but you can use any icon library you want.
import { ListOutlined } from "@mui/icons-material";

/**
 * `<ListButton>` is using uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/list-button} for more details.
 */

// export type CustomListButtonProps = ListButtonProps & {
//   icon:
// }

export const ListButton: React.FC<ListButtonProps> = ({
  resourceNameOrRouteName,
  hideText = false,
  accessControl,
  ignoreAccessControlProvider = false,
  svgIconProps,
  children,
  onClick,
  ...rest
}) => {
  const accessControlEnabled =
    accessControl?.enabled ?? !ignoreAccessControlProvider;
  const hideIfUnauthorized = accessControl?.hideIfUnauthorized ?? false;
  const { resource, resourceName } = useResource({
    resourceNameOrRouteName,
  });

  const { listUrl: generateListUrl } = useNavigation();
  const { Link } = useRouterContext();

  const translate = useTranslate();

  const { data } = useCan({
    resource: resourceName,
    action: "list",
    queryOptions: {
      enabled: accessControlEnabled,
    },
    params: {
      resource,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const listUrl = generateListUrl(resource.route!);

  const { sx, ...restProps } = rest;

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Link
      to={listUrl}
      replace={false}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (data?.can === false) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <Button
        disabled={data?.can === false}
        // startIcon={!hideText && <ListOutlined {...svgIconProps} />}
        startIcon={!hideText && resource?.icon}
        title={disabledTitle()}
        sx={{ minWidth: 0, ...sx }}
        {...restProps}
      >
        {hideText
          ? // <ListOutlined fontSize="small" {...svgIconProps} />
            resource?.icon
          : children ??
            translate(
              `${resourceName}.titles.list`,
              userFriendlyResourceName(resource.label ?? resourceName, "plural")
            )}
      </Button>
    </Link>
  );
};
