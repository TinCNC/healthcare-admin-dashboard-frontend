import React, { useEffect } from "react";
import {
  useGo,
  // useResource,
  useRouterType,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
// import { Info } from "@mui/icons-material";
import {
  Stack,
  Button,
  // Tooltip,
  Typography,
  Grid,
} from "@mui/material";

export const ForbiddenComponent: React.FC = () => {
  // const [errorMessage, setErrorMessage] = useState<string>();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  // const { resource, action } = useResource();

  const translate = useTranslate();

  // console.log(resource);

  // useEffect(() => {
  //   if (resource === undefined) {
  //     if (routerType === "legacy") {
  //       push("/departments");
  //     } else {
  //       go({ to: "/departments" });
  //     }
  //   }
  //   // if (resource && action) {
  //   //   setErrorMessage(
  //   //     translate(
  //   //       "pages.error.info",
  //   //       {
  //   //         action,
  //   //         resource: resource?.name,
  //   //       },
  //   //       `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`
  //   //     )
  //   //   );
  //   // }
  // }, [action, resource]);

  return (
    <Grid display="flex" justifyContent="center" alignItems="center" mt={20}>
      <Grid container direction="column" display="flex" alignItems="center">
        <Typography variant="h1">403</Typography>
        <Stack direction="row" spacing="2">
          <Typography>
            {translate(
              "pages.error.403",
              "You do not have permission to access this page."
            )}
          </Typography>
          {/* 
          {errorMessage && (
            <Tooltip title={errorMessage}>
              <Info data-testid="error-component-tooltip" />
            </Tooltip>
          )} */}
        </Stack>
        <Button
          onClick={() => {
            if (routerType === "legacy") {
              push("/");
            } else {
              go({ to: "/" });
            }
          }}
        >
          {translate("pages.error.backHome", "Back Home")}
        </Button>
      </Grid>
    </Grid>
  );
};
