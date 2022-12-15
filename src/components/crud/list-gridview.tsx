import React, { useState } from "react";
import {
  useResourceWithRoute,
  useTranslate,
  useRouterContext,
  userFriendlyResourceName,
  ResourceRouterParams,
  useRefineContext,
} from "@pankod/refine-core";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CreateButton,
  Breadcrumb,
  CircularProgress,
} from "@pankod/refine-mui";
import type { ListProps } from "@pankod/refine-mui";

export type ListGridViewProps = ListProps & {
  loading?: boolean;
  loadingMsg?: string;
};

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<ListGridViewProps> = ({
  title,
  loading,
  loadingMsg,
  canCreate,
  children,
  createButtonProps,
  resource: resourceFromProps,
  cardProps,
  cardHeaderProps,
  cardContentProps,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
}) => {
  const { useParams } = useRouterContext();

  const [preLoad, setPreLoad] = useState<boolean>(true);

  const isLoading = loading || preLoad;

  var delayInMilliseconds = 50;

  setTimeout(function () {
    setPreLoad(false);
  }, delayInMilliseconds);

  const { resource: routeResourceName } = useParams<ResourceRouterParams>();

  const translate = useTranslate();

  const resourceWithRoute = useResourceWithRoute();

  const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

  const isCreateButtonVisible =
    canCreate ?? (resource.canCreate || createButtonProps);

  const { options } = useRefineContext();
  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? options?.breadcrumb
      : breadcrumbFromProps;

  const breadcrumbComponent =
    typeof breadcrumb !== "undefined" ? (
      <>{breadcrumb}</> ?? undefined
    ) : (
      <Breadcrumb />
    );

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton
      resourceNameOrRouteName={resource.route}
      {...createButtonProps}
    />
  ) : null;

  return (
    <Card {...(cardProps ?? {})} {...(wrapperProps ?? {})}>
      {breadcrumbComponent}
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={
          title ?? (
            <Typography variant="h5">
              <Box component="span" marginRight="8px">
                {resource.icon}
              </Box>
              {translate(
                `${resource.name}.titles.list`,
                userFriendlyResourceName(
                  resource.label ?? resource.name,
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
        {...(cardHeaderProps ?? {})}
        {...(headerProps ?? {})}
      />
      <CardContent {...(cardContentProps ?? {})} {...(contentProps ?? {})}>
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
