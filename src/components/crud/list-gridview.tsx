import React, { useState } from "react";
import {
  useTranslate,
  userFriendlyResourceName,
  useRefineContext,
  useRouterType,
  useResource,
} from "@refinedev/core";
import { CreateButton, Breadcrumb } from "@refinedev/mui";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import type { ListProps } from "@refinedev/mui";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */

export type ListGridViewProps = ListProps & {
  loading?: boolean;
  loadingMsg?: string;
};

export const List: React.FC<ListGridViewProps> = ({
  title,
  loading,
  loadingMsg,
  canCreate,
  children,
  createButtonProps,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const routerType = useRouterType();

  const [preLoad, setPreLoad] = useState<boolean>(true);

  const isLoading = loading || preLoad;

  var delayInMilliseconds = 50;

  setTimeout(function () {
    setPreLoad(false);
  }, delayInMilliseconds);

  const { resource } = useResource(resourceFromProps);

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonProps);

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? (
      <>{breadcrumb}</> ?? undefined
    ) : (
      <Breadcrumb />
    );

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton
      resource={
        routerType === "legacy"
          ? resource?.route
          : resource?.identifier ?? resource?.name
      }
      {...createButtonProps}
    />
  ) : null;

  return (
    <Card {...(wrapperProps ?? {})}>
      {breadcrumbComponent}
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={
          title ?? (
            <Typography variant="h5">
              <Box component="span" marginRight="8px">
                {resource?.meta?.icon ?? resource?.icon}
              </Box>
              {translate(
                `${resource?.name}.titles.list`,
                userFriendlyResourceName(
                  resource?.meta?.label ??
                    resource?.options?.label ??
                    resource?.label ??
                    resource?.name,
                  "plural"
                )
              )}
            </Typography>
          )
        }
        action={
          <Box display="flex" gap="16px" {...headerButtonProps}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
                  })
                : headerButtons
              : defaultHeaderButtons}
          </Box>
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "calc(100vh - (340px))",
            }}
          >
            <CircularProgress />
            <Typography>{loadingMsg || translate("loading")}</Typography>
          </Box>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};
