import React from "react";
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
  // CreateButton,
  // Breadcrumb,
} from "@mui/material";

import { CreateButton, Breadcrumb } from "@pankod/refine-mui";
import type { ListProps } from "@pankod/refine-mui";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
  title,
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
        {children}
      </CardContent>
    </Card>
  );
};
