import React, { useContext, useState } from "react";
import {
  useGetIdentity,
  useGetLocale,
  useSetLocale,
  useTranslate,
  useLogout,
  useActiveAuthProvider,
  useNavigation,
  pickNotDeprecated,
} from "@refinedev/core";
import { HamburgerMenu } from "./hamburgerMenu";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Badge,
} from "@mui/material";

import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  Menu as MenuIcon,
  Person,
  ShoppingCart,
} from "@mui/icons-material";

import { getStoredProcedures } from "api";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import {
  // WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import i18n from "@/i18n";

import { ColorModeContext } from "@/contexts/color-mode";

import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

// type IUser = {
//   id: number;
//   name: string;
//   avatar: string;
// };

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  // const authProvider = useActiveAuthProvider();
  // const { data: user } = useGetIdentity({
  //   v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  // });

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

  const t = useTranslate();
  const { push } = useNavigation();
  const authProvider = useActiveAuthProvider();
  const { mode, setMode } = useContext(ColorModeContext);

  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const [cartCount, setCartCount] = useState<number>(0);

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  getStoredProcedures("totalcarts").then((count) => {
    setCartCount(count);
  });

  return (
    <AppBar position={prefferedSticky ? "sticky" : "relative"}>
      <Toolbar>
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <WalletMultiButton />
          <IconButton
            onClick={() => {
              push("/orders");
            }}
          >
            <Badge badgeContent={cartCount} color="success">
              <ShoppingCart sx={{ color: "white" }} />
            </Badge>
          </IconButton>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              disableUnderline
              defaultValue={currentLocale}
              inputProps={{ "aria-label": "Without label" }}
              variant="standard"
              sx={{
                color: "inherit",
                "& .MuiSvgIcon-root": {
                  color: "inherit",
                },
              }}
            >
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <MenuItem
                  selected={currentLocale === lang}
                  key={lang}
                  defaultValue={lang}
                  onClick={() => {
                    changeLanguage(lang);
                  }}
                  value={lang}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      sx={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                      src={`/images/flags/${lang}.svg`}
                    />
                    {lang === "en" ? "English" : "German"}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton
            color="inherit"
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>

          {(user?.avatar || user?.name) && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    sx={{
                      textTransform: "none",
                      color: "white",
                      // color: "primary.contrastText",
                    }}
                  >
                    <Stack
                      direction="row"
                      gap="16px"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {user?.name && (
                        <Typography variant="subtitle2">
                          {user?.name}
                        </Typography>
                      )}
                      <Avatar src={user?.avatar} alt={user?.name} />
                    </Stack>
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {/* <MenuItem onClick={popupState.close}>Profile</MenuItem> */}
                    <MenuItem onClick={popupState.close}>
                      <Person /> {t("buttons.my_account", "My account")}
                    </MenuItem>
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        mutateLogout();
                        popupState.close();
                      }}
                    >
                      <Logout /> {t("buttons.logout", "Logout")}
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          )}
          {/* <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
              }}
              variant="subtitle2"
            >
              {user?.name}
            </Typography>
            <Avatar src={user?.avatar} alt={user?.name} />
          </Stack> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
